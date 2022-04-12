import { useGlobalPortalValue } from '@tkeel/console-business-components';
import type { UserDocumentsReturns } from '@tkeel/console-types';

import * as config from './config';

export default function useDocuments(): UserDocumentsReturns {
  const { documents } = useGlobalPortalValue();
  const { setIsOpen, setPath } = documents;

  const open = (path: string) => {
    setPath(path);

    setTimeout(() => {
      setIsOpen(true);
    });
  };

  const close = () => {
    setPath('');
    setIsOpen(false);
  };

  return { ...documents, config, open, close };
}
