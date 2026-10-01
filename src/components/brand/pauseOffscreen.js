/**
 * Pauses the CSS animations of every drawing that is off screen, and lets them
 * run again when it comes back. The experience page alone had ~150 looping
 * animations running in drawings nobody could see, and the browser paid for
 * them on every frame of the scroll: frames dropped, and a dropped frame makes
 * the page leap instead of glide. It also meant a drawing that "draws itself in"
 * had often finished doing so below the fold, so the reader arrived to a still
 * picture. Paused, it starts where it is seen.
 *
 * Only the outermost <svg> of each drawing is watched; the pause rule in
 * brand.css reaches everything inside it. New drawings (a route change, a
 * WhenNear block mounting) are picked up as they arrive. Returns a cleanup.
 */
const pauseOffscreen = (root = document.body) => {
  if (typeof IntersectionObserver === 'undefined' || typeof MutationObserver === 'undefined') {
    return () => {};
  }

  const visibility = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) target.removeAttribute('data-offscreen');
        else target.setAttribute('data-offscreen', '');
      });
    },
    // A little slack either side, so a drawing is already moving as it enters.
    { rootMargin: '120px 0px' }
  );

  const watched = new WeakSet();
  const watch = (node) => {
    if (!(node instanceof Element)) return;
    const svgs = node.tagName.toLowerCase() === 'svg' ? [node] : node.querySelectorAll('svg');
    svgs.forEach((svg) => {
      if (watched.has(svg) || svg.parentElement?.closest('svg')) return;
      watched.add(svg);
      visibility.observe(svg);
    });
  };

  // A page being left takes its drawings with it; stop watching them.
  const forget = (node) => {
    if (!(node instanceof Element)) return;
    const svgs = node.tagName.toLowerCase() === 'svg' ? [node] : node.querySelectorAll('svg');
    svgs.forEach((svg) => {
      if (!watched.has(svg)) return;
      watched.delete(svg);
      visibility.unobserve(svg);
    });
  };

  watch(root);
  const mutations = new MutationObserver((records) => {
    records.forEach((record) => {
      record.removedNodes.forEach(forget);
      record.addedNodes.forEach(watch);
    });
  });
  mutations.observe(root, { childList: true, subtree: true });

  return () => {
    mutations.disconnect();
    visibility.disconnect();
  };
};

export default pauseOffscreen;
