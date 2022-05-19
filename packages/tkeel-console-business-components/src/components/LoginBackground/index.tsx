import { Box, StyleProps } from '@chakra-ui/react';

import LoginBackgroundLogo from '../LoginBackgroundLogo';

type Props = {
  backgroundImage?: string;
  logo?: string;
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
    logo?: StyleProps;
  };
};

export default function LoginBackground({
  backgroundImage,
  logo,
  sx,
  styles,
}: Props) {
  return (
    <Box
      paddingTop="20px"
      paddingLeft="20px"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundImage={backgroundImage}
      {...styles?.root}
      {...sx}
    >
      {logo && <LoginBackgroundLogo src={logo} sx={styles?.logo} />}
    </Box>
  );
}
