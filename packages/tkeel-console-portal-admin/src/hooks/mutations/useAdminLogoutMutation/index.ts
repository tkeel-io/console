import { useState } from 'react';

type Options = {
  onSuccess: () => void;
};

export default function useAdminLogoutMutation({ onSuccess }: Options) {
  const [isLoading, setIsLoading] = useState(false);
  const mutate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 500);
  };

  return { isLoading, mutate };
}
