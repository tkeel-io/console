import PlatformConfigItem, {
  Styles as PlatformConfigItemStyles,
} from '../PlatformConfigItem';
import type { Styles as UploadStyles } from '../UploadInput';
import UploadInput from '../UploadInput';

interface Props {
  title: string;
  logo: string;
  updateLogo: (src: string) => unknown;
  styles?: PlatformConfigItemStyles;
  uploadInputStyles?: UploadStyles;
}

export default function LogoConfigItem({
  title,
  logo,
  updateLogo,
  styles,
  uploadInputStyles,
}: Props) {
  return (
    <PlatformConfigItem
      title={title}
      formField={
        <UploadInput
          type="rectangle"
          src={logo}
          setSrc={updateLogo}
          styles={uploadInputStyles}
        />
      }
      styles={styles}
    />
  );
}
