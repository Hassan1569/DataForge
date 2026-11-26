import AppRouter from '@/app/router/AppRouter.jsx';
import { SettingsProvider } from '@/context/SettingsContext.jsx';

export default function App() {
  return (
    <SettingsProvider>
      <AppRouter />
    </SettingsProvider>
  );
}