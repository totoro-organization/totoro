import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './hooks/useAuth';
import { TagsProvider } from './contexts/TagsContext';

const App = () => {

  const content = useRoutes(routes);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <AuthProvider>
          <TagsProvider>
            {content}
          </TagsProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
