import { useCallback, useEffect, useId, useRef, useState } from 'react';
import '../../App.css';
import Wordmark from './Wordmark';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from '../../i18n/I18nProvider';

// Ordered by what the visitor is here to weigh: who he is, what he has
// shipped under real accountability, the companies he runs, and only then the
// repository catalogue. Projects used to sit second, which put the smallest
// claim ahead of the two largest.
const LINKS = [
    { to: '/', labelKey: 'nav.about' },
    { to: '/experience', labelKey: 'nav.experience' },
    { to: '/ventures', labelKey: 'nav.ventures' },
    { to: '/projects', labelKey: 'nav.projects' },
    { to: '/contact', labelKey: 'nav.contact' },
];

// Brand pages are reached from their hub, so they light that hub up in the bar
// rather than leaving no entry marked as current.
const PARENT_OF = {
    '/radii': '/experience',
    '/evodeps': '/experience',
    '/freelance': '/experience',
    '/labsol': '/experience',
    '/case': '/experience',
    '/stackselect': '/ventures',
    '/moonphase': '/ventures',
};

const MenuIcon = () => (
    <svg className="control-icon menu-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {/* Two bars that rotate into a cross, so the control explains its own
            state instead of swapping to an unrelated glyph. */}
        <line className="menu-bar menu-bar-top" x1="4" y1="9" x2="20" y2="9" />
        <line className="menu-bar menu-bar-bottom" x1="4" y1="15" x2="20" y2="15" />
        <line className="menu-bar menu-bar-x1" x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
        <line className="menu-bar menu-bar-x2" x1="18.5" y1="5.5" x2="5.5" y2="18.5" />
    </svg>
);

MenuIcon.displayName = 'MenuIcon';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navRef = useRef(null);
    const menuButtonRef = useRef(null);
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuId = useId();

    const activePath = PARENT_OF[location.pathname] || location.pathname;

    const closeMenu = useCallback(() => setMenuOpen(false), []);

    useEffect(() => {
        const node = navRef.current;
        if (!node) return undefined;

        // The bar's height feeds --navbar-h, which every page uses as its top
        // clearance. It is measured rather than hardcoded because the row is
        // taller on desktop than on a phone, and the control group's contents
        // can change.
        //
        // Only the bar itself is measured: the mobile menu is absolutely
        // positioned, so opening it no longer changes this number. That is what
        // stopped the old bug where tapping anything re-flowed the bar — the
        // wrapped link row changed the bar's height, which moved every page's
        // top margin, which resized the viewport on mobile, which re-wrapped the
        // bar again.
        const publish = () => {
            document.documentElement.style.setProperty(
                '--navbar-h',
                `${Math.ceil(node.getBoundingClientRect().height)}px`
            );
        };
        publish();

        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', publish);
            return () => window.removeEventListener('resize', publish);
        }
        const observer = new ResizeObserver(publish);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // Navigating away with the sheet open would leave it hanging over the new
    // page.
    useEffect(() => {
        closeMenu();
    }, [location.pathname, closeMenu]);

    useEffect(() => {
        if (!menuOpen) return undefined;

        const onKeyDown = (event) => {
            if (event.key !== 'Escape') return;
            closeMenu();
            menuButtonRef.current?.focus();
        };
        // The sheet lives inside the nav, so one containment check covers both
        // the sheet and the button that opened it.
        const onPointerDown = (event) => {
            if (navRef.current?.contains(event.target)) return;
            closeMenu();
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('mousedown', onPointerDown);
        document.addEventListener('touchstart', onPointerDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('touchstart', onPointerDown);
        };
    }, [menuOpen, closeMenu]);

    const go = (to) => {
        navigate(to);
        closeMenu();
    };

    const renderLinks = (variant) =>
        LINKS.map(({ to, labelKey }) => {
            const isActive = activePath === to;
            return (
                <li key={to} className={isActive ? 'active' : ''}>
                    <button
                        type="button"
                        className="nav-link-button"
                        onClick={() => go(to)}
                        aria-current={isActive ? 'page' : undefined}
                        // Only one of the two lists is on screen at a time, but
                        // both are in the DOM. Hiding the offscreen one from the
                        // tab order keeps focus from vanishing into it.
                        tabIndex={variant === 'sheet' && !menuOpen ? -1 : undefined}
                    >
                        {labelKey ? t(labelKey) : null}
                    </button>
                </li>
            );
        });

    return (
        <nav className={`navbar${menuOpen ? ' menu-open' : ''}`} ref={navRef}>
            <Wordmark className="navbar-logo" />

            <ul className="nav-links nav-links-inline">{renderLinks('inline')}</ul>

            <div className="navbar-controls">
                <ThemeToggle />
                <LanguageToggle />
                <button
                    type="button"
                    ref={menuButtonRef}
                    className="navbar-control navbar-menu-button"
                    onClick={() => setMenuOpen((current) => !current)}
                    aria-expanded={menuOpen}
                    aria-controls={menuId}
                    aria-label={menuOpen ? t('nav.closeMenu') : t('nav.menu')}
                >
                    <MenuIcon />
                </button>
            </div>

            {/* Absolutely positioned against the bar rather than wrapped into
                it: a wrapped row changes the bar's own height, and that is what
                made the layout jump around on a phone. */}
            <div className="nav-sheet" id={menuId} data-open={menuOpen ? 'true' : 'false'}>
                <ul className="nav-links nav-links-sheet">{renderLinks('sheet')}</ul>
            </div>
        </nav>
    );
};

export default Navbar;
