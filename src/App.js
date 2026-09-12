import { useEffect } from 'react';
import './App.css';
import './styles/brand.css';
import './styles/marks.css';
import './styles/hub.css';
import About from './components/about/about';
import Experience from './components/experience/experience';
import Navbar from './components/navigation/navbar';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MyProjects from './components/projects/projects';
import Ventures from './components/ventures/ventures';
import RadiiPage from './components/brand/RadiiPage';
import StackSelectPage from './components/brand/StackSelectPage';
import MoonphasePage from './components/brand/MoonphasePage';
import EvodepsPage from './components/brand/EvodepsPage';
import FreelancePage from './components/brand/FreelancePage';
import LabsolPage from './components/brand/LabsolPage';
import { ThemeProvider } from './theme/ThemeProvider';
import { I18nProvider } from './i18n/I18nProvider';

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
            <Navbar></Navbar>
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
            </Routes>
          </Router>
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
