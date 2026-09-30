import { Suspense, lazy, useEffect, useRef } from 'react';
import './App.css';
import './styles/brand.css';
import './styles/marks.css';
import './styles/hub.css';
import About from './components/about/about';
import Navbar from './components/navigation/navbar';
import SiteFooter from './components/navigation/SiteFooter';
import RouteMeta from './components/navigation/RouteMeta';
import SkipLink from './components/navigation/SkipLink';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Terminal from './components/terminal/Terminal';
import Backdrop from './components/brand/Backdrop';
import { ScrollRail, useShownLocation } from './components/navigation/Transitions';
import { ThemeProvider } from './theme/ThemeProvider';
import { I18nProvider, useTranslation } from './i18n/I18nProvider';

// Lazy: a canvas game is dead weight in the bundle for every visitor who came
// to read about the work, and most of them will never open this route.
const Play = lazy(() => import('./components/play/Play'));

// Every other page, too. The home page is what most visitors open first, and it
// was arriving with the code of the stack wall, the catalogue, the brand stories
// and the decision log inside the same file, which a phone has to download and
// run before it can paint a face. Each of those is its own chunk now, fetched
// when the page is asked for — and, once the home page has painted and the
// browser is idle, fetched anyway (see prefetchPages below), so that going to
// the next page is as quick as it was when everything was in one file.
const loaders = {
  Experience: () => import('./components/experience/experience'),
  MyProjects: () => import('./components/projects/projects'),
  StackPage: () => import('./components/stack/StackPage'),
  Ventures: () => import('./components/ventures/ventures'),
  RadiiPage: () => import('./components/brand/RadiiPage'),
  StackSelectPage: () => import('./components/brand/StackSelectPage'),
  MoonphasePage: () => import('./components/brand/MoonphasePage'),
  EvodepsPage: () => import('./components/brand/EvodepsPage'),
  FreelancePage: () => import('./components/brand/FreelancePage'),
  LabsolPage: () => import('./components/brand/LabsolPage'),
  CasePage: () => import('./components/brand/CasePage'),
  UazPage: () => import('./components/brand/UazPage'),
  ContactPage: () => import('./components/contact/ContactPage'),
  Decisions: () => import('./components/decisions/Decisions'),
  Study: () => import('./components/study/Study'),
  Changelog: () => import('./components/changelog/Changelog'),
};
const Experience = lazy(loaders.Experience);
const MyProjects = lazy(loaders.MyProjects);
const StackPage = lazy(loaders.StackPage);
const Ventures = lazy(loaders.Ventures);
const RadiiPage = lazy(loaders.RadiiPage);
const StackSelectPage = lazy(loaders.StackSelectPage);
const MoonphasePage = lazy(loaders.MoonphasePage);
const EvodepsPage = lazy(loaders.EvodepsPage);
const FreelancePage = lazy(loaders.FreelancePage);
const LabsolPage = lazy(loaders.LabsolPage);
const CasePage = lazy(loaders.CasePage);
const UazPage = lazy(loaders.UazPage);
const ContactPage = lazy(loaders.ContactPage);
const Decisions = lazy(loaders.Decisions);
const Study = lazy(loaders.Study);
const Changelog = lazy(loaders.Changelog);

// Once the page has loaded and the browser has nothing better to do, fetch the
// other pages' code one by one, in the order a reader is most likely to go. They
// come down at idle priority and never compete with what is on screen.
const prefetchPages = () => {
  const order = ['Experience', 'MyProjects', 'StackPage', 'Ventures', 'ContactPage', 'Decisions', 'Study', 'RadiiPage'];
  const rest = Object.keys(loaders).filter((name) => !order.includes(name));
  const queue = [...order, ...rest];
  const idle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 1500));
  const next = () => {
    const name = queue.shift();
    if (!name) return;
    loaders[name]().catch(() => {}).finally(() => idle(next));
  };
  idle(next);
};

/* Every route renders from one location, and it is not the router's. It is the
   one the browser is currently showing, which lags the router's by exactly one
   view transition — see components/navigation/Transitions.jsx. Pulling the
   routes into their own component is what gives that location somewhere to
   live inside the Router. */
const Pages = () => {
  const shown = useShownLocation();

  useEffect(() => {
    if (document.readyState === 'complete') {
      prefetchPages();
      return undefined;
    }
    window.addEventListener('load', prefetchPages, { once: true });
    return () => window.removeEventListener('load', prefetchPages);
  }, []);

  // React Router keeps the scroll position across route changes, so moving from
  // a long page to a short one leaves the reader clamped partway down the new
  // one — it reads as the page yanking itself upward. Keyed on what is on
  // screen rather than on where the router has gone: scrolling while the
  // outgoing page is still being photographed would animate the jump.
  //
  // Not on the first run, though. Switching language remounts this whole tree
  // (see below), and a reader who switches halfway down a page should stay
  // halfway down it rather than be thrown back to the top.
  const settled = useRef(false);
  useEffect(() => {
    if (!settled.current) {
      settled.current = true;
      return;
    }
    window.scrollTo(0, 0);
  }, [shown.pathname]);

  return (
    <main id="main">
      {/* No fallback: the page being left stays on screen until the next one's code
          has arrived, and with the prefetch below that is almost never a wait. */}
      <Suspense fallback={null}>
      <Routes location={shown}>
        <Route path="/" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<MyProjects />} />
        <Route path="/stack" element={<StackPage />} />
        {/* Library merged into the stack page; the old address lands on its shelves. */}
        <Route path="/library" element={<Navigate to="/stack#library" replace />} />
        <Route path="/ventures" element={<Ventures />} />
        {/* Brand stories. Reached from the timeline and the ventures hub,
            but each is a real URL so it can be linked to on its own. */}
        <Route path="/radii" element={<RadiiPage />} />
        <Route path="/stackselect" element={<StackSelectPage />} />
        <Route path="/moonphase" element={<MoonphasePage />} />
        <Route path="/evodeps" element={<EvodepsPage />} />
        <Route path="/freelance" element={<FreelancePage />} />
        <Route path="/labsol" element={<LabsolPage />} />
        <Route path="/case" element={<CasePage />} />
        {/* Education, told the same way as the roles. Reached from the
            education card on the CV. */}
        <Route path="/uaz" element={<UazPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Not in the navbar: it is reached from the practice section,
            the footer and the terminal, which is where the readers who
            want it are already looking. */}
        <Route path="/decisions" element={<Decisions />} />
        <Route path="/study" element={<Study />} />
        <Route path="/changelog" element={<Changelog />} />

        {/* A laptop that jumps bugs. On its own route, and reused by
            the catch-all below: a mistyped URL used to render nothing
            at all, and now it renders the one thing here that exists
            purely for fun. */}
        <Route
          path="/play"
          element={
            <Suspense fallback={null}>
              <Play />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={null}>
              <Play notFound />
            </Suspense>
          }
        />
      </Routes>
      </Suspense>
    </main>
  );
};

/* The Router lives here rather than in App because it needs the language, and
   the language comes from a provider App renders.

   `basename` is what puts the language in the URL: with it set to /en, every
   <Link to="/projects"> in the app writes /en/projects and nothing else has to
   know the feature exists. It cannot change on a live Router, so `key` remounts
   it when the language does — by which point setLang has already rewritten the
   address, so the new Router finds the URL it expects. */
const Site = () => {
  const { lang } = useTranslation();

  return (
    <div className="App">
      {/* Behind everything, on every route, and outside the Router so a
          language change does not restart its drift. It is a div and a
          stylesheet — nothing in it reacts to anything, so it costs the app
          nothing to have it mounted for the whole session. */}
      <Backdrop />
      <Router basename={lang === 'en' ? '/en' : undefined} key={lang}>
        {/* Outside <Pages>: it belongs to the window rather than to any one
            route, which is also why it does not cross with them. */}
        <ScrollRail />
        <RouteMeta />
        <Navbar></Navbar>
        <SkipLink />
        <Pages />
        <SiteFooter />
        {/* Inside the Router: its commands navigate. */}
        <Terminal />
      </Router>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Site />
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
