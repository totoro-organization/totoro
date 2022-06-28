import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './hooks/useAuth';
import { CommonsProvider } from './contexts/CommonsContext';

const App = () => {

  const content = useRoutes(routes);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <AuthProvider>
          <CommonsProvider>
            {content}
          </CommonsProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
