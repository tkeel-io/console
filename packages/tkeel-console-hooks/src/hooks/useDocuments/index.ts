import { useGlobalPortalValue } from '@tkeel/console-business-components';
import type { UserDocumentsReturns } from '@tkeel/console-types';

import * as config from './config';

export default function useDocuments(): UserDocumentsReturns {
  const { documents } = useGlobalPortalValue();
  const { setIsOpen, setPath } = documents;

  const onOen = (path: string) => {
    setPath(path);
    setIsOpen(true);
  };

  const onClose = () => {
    setPath('');
    setIsOpen(false);
  };

  return { ...documents, config, onOen, onClose };
}
