import { Image, StyleProps } from '@chakra-ui/react';

type Props = {
  src?: string;
  sx?: StyleProps;
};

export default function LoginBackgroundLogo({ src, sx }: Props) {
  return <Image width="auto" maxHeight="56px" src={src} {...sx} />;
}
