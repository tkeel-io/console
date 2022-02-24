import { useEffect, useState } from 'react';

import { init, InitArgs } from '@/tkeel-console-portal-base/utils/qiankun';

type Args = Omit<InitArgs, 'lifeCycles'>;

export default function useQiankunInit({
  platformName,
  menus,
  navigate,
  themeName,
}: Args) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    init({
      platformName,
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
    });
  }, [menus, navigate, platformName, themeName]);

  return { isLoading };
}
