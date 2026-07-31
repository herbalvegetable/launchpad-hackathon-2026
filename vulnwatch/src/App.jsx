import { Routes, Route } from 'react-router-dom';
import { useTeamProfile } from './context/TeamProfileContext';
import Navbar from './components/Navbar';
import OnboardingWizard from './components/Onboarding/OnboardingWizard';
import DashboardPage from './pages/DashboardPage';
import CVEDetailPage from './pages/CVEDetailPage';
import SearchPage from './pages/SearchPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import TeamPage from './pages/TeamPage';
import CodebaseAnalysisPage from './pages/CodebaseAnalysisPage';

export default function App() {
  const { team } = useTeamProfile();

  if (!team || team.onboarded === false) {
    return <OnboardingWizard />;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/cve/:cveId" element={<CVEDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/codebase-analysis" element={<CodebaseAnalysisPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}
