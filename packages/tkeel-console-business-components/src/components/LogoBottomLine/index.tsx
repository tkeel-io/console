import { Image, ImageProps } from '@chakra-ui/react';

import logoBottomLineDark from '@/tkeel-console-business-components/assets/images/logo-bottom-line-dark.svg';
import logoBottomLineLight from '@/tkeel-console-business-components/assets/images/logo-bottom-line-light.svg';

interface Props extends ImageProps {
  theme?: 'dark' | 'light';
}

export default function LogoBottomLine({ theme = 'dark', ...rest }: Props) {
  return (
    <Image
      src={theme === 'dark' ? logoBottomLineDark : logoBottomLineLight}
      width="200px"
      {...rest}
    />
  );
}
