import { useEffect, useState } from 'react';

import { init, InitArgs } from '@/tkeel-console-portal-base/utils/qiankun';

type Args = Omit<InitArgs, 'lifeCycles'>;

export default function useQiankunInit({
  menus,
  navigate,
  themeName,
  refetchMenus,
}: Args) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    init({
      menus,
      navigate,
      themeName,
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
  }, [menus, navigate, themeName, refetchMenus]);

  return { isLoading };
}
