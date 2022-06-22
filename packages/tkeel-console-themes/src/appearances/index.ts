import qingcloud from './qingcloud';
import tkeel from './tkeel';

export const appearances = {
  tkeel,
  qingcloud,
};

export enum AppearanceNames {
  TKeel = 'tkeel',
  QingCloud = 'qingcloud',
}

export const DEFAULT_APPEARANCE_NAME = AppearanceNames.TKeel;

export const DEFAULT_APPEARANCE = appearances[DEFAULT_APPEARANCE_NAME];
