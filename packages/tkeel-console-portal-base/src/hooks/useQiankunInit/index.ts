import { useTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { init, InitOptions } from '@/tkeel-console-portal-base/utils/qiankun';

type Options = Omit<InitOptions, 'lifeCycles'>;

export default function useQiankunInit({
  menus,
  documents,
  navigate,
  refetchMenus,
}: Options) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    init({
      theme,
      menus,
      documents,
      navigate,
      lifeCycles: {
        beforeLoad() {
          setIsLoading(true);
          return Promise.resolve();
        },
        beforeMount() {
          setIsLoading(true);
          return Promise.resolve();
        },
        afterMount() {
          setIsLoading(false);
          return Promise.resolve();
        },
        beforeUnmount() {
          return Promise.resolve();
        },
        afterUnmount() {
          return Promise.resolve();
        },
      },
      refetchMenus,
    });
  }, [theme, menus, documents, navigate, refetchMenus]);

  return { isLoading };
}
