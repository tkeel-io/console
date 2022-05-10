import { toast } from '@tkeel/console-components';

import { isPortal } from '../env';
import { getPortalToast } from '../plugin';

export function getToastCrossEnv() {
  if (isPortal()) {
    return toast;
  }
  return getPortalToast();
}
