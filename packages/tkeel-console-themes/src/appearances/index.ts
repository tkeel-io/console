import type { AppearanceName } from '@tkeel/console-types';
import { env, plugin } from '@tkeel/console-utils';

import qingcloud from './qingcloud';
import tkeel from './tkeel';

enum AppearanceNames {
  TKeel = 'tkeel',
  QingCloud = 'qingcloud',
}

const DEFAULT_APPEARANCE_NAME = AppearanceNames.TKeel;

function getAppearanceNameInPortal() {
  const { APPEARANCE_NAME } = process.env;
  const appearanceName = GLOBAL_PORTAL_CONFIG.client?.appearanceName;
  const currentAppearanceName = APPEARANCE_NAME ?? appearanceName;

  return (currentAppearanceName as AppearanceName) ?? DEFAULT_APPEARANCE_NAME;
}

export const appearances = {
  tkeel,
  qingcloud,
};

export const DEFAULT_APPEARANCE = appearances[DEFAULT_APPEARANCE_NAME];

export function getAppearance() {
  const isPortal = env.isPortal();

  if (!isPortal) {
    return plugin.getPortalProps().client.appearance;
  }

  const name = getAppearanceNameInPortal();

  return appearances[name] ?? DEFAULT_APPEARANCE;
}
