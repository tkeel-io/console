import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';

import { GlobalPortalProvider } from '@tkeel/console-business-components';
import { ToastContainer } from '@tkeel/console-components';
import { useLocationChange } from '@tkeel/console-hooks';
import {
  useConfigAppearanceQuery,
  useConfigThemeColorsQuery,
  useDeploymentConfigQuery,
} from '@tkeel/console-request-hooks';
import type { Colors } from '@tkeel/console-themes';
import { getTheme } from '@tkeel/console-themes';

import Routes from '@/tkeel-console-portal-base/routes';
import GlobalStyles from '@/tkeel-console-portal-base/styles/GlobalStyles';

import DocumentsContainer from '../DocumentsContainer';

interface Props {
  documentHeadComponent: ReactNode;
  requireAuthContainer: ReactNode;
  requireNoAuthContainer: ReactNode;
  requireNoAuthRoutes: ReactNode;
  notRequireAuthRoutes?: ReactNode;
  userActionMenusComponent: ReactNode;
}

const theme = getTheme();

export type { Props };

export default function Contents({
  documentHeadComponent,
  requireAuthContainer,
  requireNoAuthContainer,
  requireNoAuthRoutes,
  notRequireAuthRoutes,
  userActionMenusComponent,
}: Props) {
  useConfigAppearanceQuery();
  const [isOpenDocuments, setIsOpenDocuments] = useState(false);
  const [documentsPath, setDocumentsPath] = useState('');

  const { config } = useDeploymentConfigQuery();
  const docsBaseURL = config?.docsURL ?? '';

  const { colors, isFetched } = useConfigThemeColorsQuery();

  useLocationChange({
    onChange: () => {
      setDocumentsPath('');
      setIsOpenDocuments(false);
    },
  });

  if (!isFetched) return null;

  const newTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      ...colors,
    } as Colors,
  };

  return (
    <ChakraProvider theme={newTheme}>
      <GlobalStyles />
      <GlobalPortalProvider
        value={{
          documents: {
            isOpen: isOpenDocuments,
            baseURL: docsBaseURL,
            path: documentsPath,
            setIsOpen: setIsOpenDocuments,
            setPath: setDocumentsPath,
          },
        }}
      >
        {documentHeadComponent}
        <Routes
          requireAuthContainer={requireAuthContainer}
          requireNoAuthContainer={requireNoAuthContainer}
          requireNoAuthRoutes={requireNoAuthRoutes}
          notRequireAuthRoutes={notRequireAuthRoutes}
          userActionMenusComponent={userActionMenusComponent}
        />
        <DocumentsContainer />
        <ToastContainer />
      </GlobalPortalProvider>
    </ChakraProvider>
  );
}
