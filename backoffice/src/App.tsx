import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './hooks/useAuth';
import { StatusProvider } from './contexts/StatusContext';

const App = () => {

  const content = useRoutes(routes);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <AuthProvider>
          <StatusProvider>
            {content}
          </StatusProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
