import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { StatusProvider } from './contexts/StatusContext';
// import { I18nextProvider } from 'react-i18next';
// import i18next from 'i18next';

// import { common_en, common_fr } from 'src/translations';
// import { LangEnum } from './models';
import { SidebarProvider } from './contexts/SidebarContext';
import { ToastProvider } from './contexts/ToastContext';
import { SessionProvider } from './contexts/SessionContext';

const App = () => {
  // const { lang } = useSession();

  // i18next.init({
  //   interpolation: { escapeValue: false }, // React already does escaping
  //   lng: LangEnum.fr, // language to use
  //   resources: {
  //     en: {
  //       common: common_en // 'common' is our custom namespace
  //     },
  //     fr: {
  //       common: common_fr
  //     }
  //   }
  // });

  const content = useRoutes(routes);

  return (
    // <I18nextProvider i18n={i18next}>
      <SessionProvider>
        <ToastProvider>
          <SidebarProvider>
            <ThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CssBaseline />
                  <StatusProvider>{content}</StatusProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </SidebarProvider>
        </ToastProvider>
      </SessionProvider>
    // </I18nextProvider>
  );
};
export default App;
