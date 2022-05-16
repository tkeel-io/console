import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';

import { GlobalPortalProvider } from '@tkeel/console-business-components';
import { ToastContainer } from '@tkeel/console-components';
import type { CommonConfig, PlatformConfig } from '@tkeel/console-constants';
import { APPEARANCE } from '@tkeel/console-constants';
import { useLocationChange } from '@tkeel/console-hooks';
import {
  useDeploymentConfigQuery,
  usePortalConfigQuery,
} from '@tkeel/console-request-hooks';
import useConfigQuery from '@tkeel/console-request-hooks/src/hooks/queries/useConfigQuery';
import { Colors } from '@tkeel/console-themes';

import Routes from '@/tkeel-console-portal-base/routes';
import themes, {
  DEFAULT_THEME,
  DEFAULT_THEME_NAME,
  ThemeNames,
} from '@/tkeel-console-themes/index';

import DocumentsContainer from '../DocumentsContainer';

interface Props {
  documentHeadComponent: ReactNode;
  requireAuthContainer: ReactNode;
  requireNoAuthContainer: ReactNode;
  requireNoAuthRoutes: ReactNode;
  notRequireAuthRoutes?: ReactNode;
  userActionMenusComponent: ReactNode;
}

const themeName =
  (GLOBAL_PORTAL_CONFIG.client.themeName as ThemeNames) || DEFAULT_THEME_NAME;
const theme = themes[themeName] || DEFAULT_THEME;

export type { Props };

export default function Contents({
  documentHeadComponent,
  requireAuthContainer,
  requireNoAuthContainer,
  requireNoAuthRoutes,
  notRequireAuthRoutes,
  userActionMenusComponent,
}: Props) {
  usePortalConfigQuery<CommonConfig>({
    path: 'config.common',
    defaultConfig: APPEARANCE.COMMON_CONFIG,
  });
  usePortalConfigQuery<PlatformConfig>({
    path: 'config.platform',
    defaultConfig: APPEARANCE.PLATFORM_CONFIG,
  });
  const [isOpenDocuments, setIsOpenDocuments] = useState(false);
  const [documentsPath, setDocumentsPath] = useState('');

  const { config } = useDeploymentConfigQuery();
  const docsBaseURL = config?.docsURL ?? '';

  const { extra, isFetched } = useConfigQuery();

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
      ...extra?.theme?.colors,
    } as Colors,
  };

  return (
    <ChakraProvider theme={newTheme}>
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
