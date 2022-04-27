import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  alignItems?: 'center';
  logo: string;
  title: ReactNode;
  slogan: ReactNode;
};

const defaultStyles = {
  logo: {
    width: '80px',
    height: '80px',
    marginBottom: '16px',
  },
  slogan: {
    paddingTop: '4px',
  },
};

const centerStyles = {
  logo: {
    width: '96px',
    height: '96px',
    marginBottom: '28px',
  },
  slogan: {
    paddingTop: '12px',
  },
};

export default function LoginBrand({ alignItems, logo, title, slogan }: Props) {
  const styles = alignItems === 'center' ? centerStyles : defaultStyles;

  return (
    <Flex direction="column" alignItems={alignItems}>
      <Image {...styles.logo} src={logo} />
      <Heading>{title}</Heading>
      <Text {...styles.slogan}>{slogan}</Text>
    </Flex>
  );
}
