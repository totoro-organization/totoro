import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { SessionProvider } from 'src/contexts/SessionContext';
import { CommonsProvider } from 'src/contexts/CommonsContext';

const App = () => {

  const content = useRoutes(routes);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <SessionProvider>
          <CommonsProvider>
            {content}
          </CommonsProvider>
        </SessionProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;