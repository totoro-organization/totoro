import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './hooks/useAuth';
import { StatusProvider } from './contexts/StatusContext';
import useAuth from './hooks/useAuth';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import { common_en, common_fr } from 'src/translations';
import { LangEnum } from './models';
import { SidebarProvider } from './contexts/SidebarContext';
import { ToastProvider } from './contexts/ToastContext';

const App = () => {
  const { lang } = useAuth();

  i18next.init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: LangEnum.fr, // language to use
    resources: {
      en: {
        common: common_en // 'common' is our custom namespace
      },
      fr: {
        common: common_fr
      }
    }
  });

  const content = useRoutes(routes);

  return (
    <I18nextProvider i18n={i18next}>
      <ToastProvider>
        <SidebarProvider>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              <AuthProvider>
                <StatusProvider>{content}</StatusProvider>
              </AuthProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </SidebarProvider>
      </ToastProvider>
    </I18nextProvider>
  );
};
export default App;
