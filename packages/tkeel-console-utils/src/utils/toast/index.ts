import { toast } from '@tkeel/console-components';

import { isPortal } from '../env';
import { getPortalToast } from '../plugin';

// eslint-disable-next-line import/prefer-default-export
export function getToastCrossEnv() {
  if (isPortal()) {
    return toast;
  }
  return getPortalToast();
}
