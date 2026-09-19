import { Suspense, lazy, useEffect } from 'react';
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
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MyProjects from './components/projects/projects';
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
import Terminal from './components/terminal/Terminal';
import { ThemeProvider } from './theme/ThemeProvider';
import { I18nProvider } from './i18n/I18nProvider';

// Lazy: a canvas game is dead weight in the bundle for every visitor who came
// to read about the work, and most of them will never open this route.
const Play = lazy(() => import('./components/play/Play'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // React Router keeps the scroll position across route changes, so moving from
  // a long page to a short one leaves the reader clamped partway down the new
  // one — it reads as the page yanking itself upward.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="App">
          <Router>
            <ScrollToTop />
            <RouteMeta />
            <Navbar></Navbar>
            <SkipLink />
            <main id="main">
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/projects" element={<MyProjects/>} />
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
            <SiteFooter />
            {/* Inside the Router: its commands navigate. */}
            <Terminal />
          </Router>
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
