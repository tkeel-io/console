import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  align?: 'center';
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
  title: {
    paddingBottom: '4px',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '40px',
    color: 'gray.800',
  },
};

const centerStyles = {
  logo: {
    width: '96px',
    height: '96px',
    marginBottom: '28px',
  },
  title: {
    paddingBottom: '12px',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '28px',
    color: 'gray.900',
  },
};

export default function LoginBrand({ align, logo, title, slogan }: Props) {
  const styles = align === 'center' ? centerStyles : defaultStyles;

  return (
    <Flex direction="column" alignItems={align}>
      {logo && <Image {...styles.logo} src={logo} />}
      {title && <Heading {...styles.title}>{title}</Heading>}
      {slogan && (
        <Text
          fontSize="14px"
          lineHeight="20px"
          color="gray.500"
          textAlign={align}
        >
          {slogan}
        </Text>
      )}
    </Flex>
  );
}
