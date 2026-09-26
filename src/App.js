import { Suspense, lazy, useEffect, useRef } from 'react';
import './App.css';
import './styles/brand.css';
import './styles/marks.css';
import './styles/hub.css';
import About from './components/about/about';
import Experience from './components/experience/experience';
import Navbar from './components/navigation/navbar';
import SiteFooter from './components/navigation/SiteFooter';
import RouteMeta from './components/navigation/RouteMeta';
import SkipLink from './components/navigation/SkipLink';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import MyProjects from './components/projects/projects';
import StackPage from './components/stack/StackPage';
import Ventures from './components/ventures/ventures';
import RadiiPage from './components/brand/RadiiPage';
import StackSelectPage from './components/brand/StackSelectPage';
import MoonphasePage from './components/brand/MoonphasePage';
import EvodepsPage from './components/brand/EvodepsPage';
import FreelancePage from './components/brand/FreelancePage';
import LabsolPage from './components/brand/LabsolPage';
import CasePage from './components/brand/CasePage';
import UazPage from './components/brand/UazPage';
import ContactPage from './components/contact/ContactPage';
import Decisions from './components/decisions/Decisions';
import Study from './components/study/Study';
import Changelog from './components/changelog/Changelog';
import Terminal from './components/terminal/Terminal';
import Backdrop from './components/brand/Backdrop';
import { ScrollRail, useShownLocation } from './components/navigation/Transitions';
import { ThemeProvider } from './theme/ThemeProvider';
import { I18nProvider, useTranslation } from './i18n/I18nProvider';

// Lazy: a canvas game is dead weight in the bundle for every visitor who came
// to read about the work, and most of them will never open this route.
const Play = lazy(() => import('./components/play/Play'));

/* Every route renders from one location, and it is not the router's. It is the
   one the browser is currently showing, which lags the router's by exactly one
   view transition — see components/navigation/Transitions.jsx. Pulling the
   routes into their own component is what gives that location somewhere to
   live inside the Router. */
const Pages = () => {
  const shown = useShownLocation();

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
