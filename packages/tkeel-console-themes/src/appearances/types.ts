interface CommonConfig {
  slogan: string;
  logoMark: string;
  backgroundImage: string;
  backgroundImageLogo: 'logoTypeDark' | 'logoTypeLight' | 'noLogo' | '';
}

interface PlatformConfig {
  admin: {
    platformName: string;
    logoTypeLight: string;
    logoTypeDark: string;
  };
  tenant: {
    platformName: string;
    logoTypeLight: string;
    logoTypeDark: string;
  };
}

interface Appearance {
  common: CommonConfig;
  platform: PlatformConfig;
}

export type { Appearance, CommonConfig, PlatformConfig };
