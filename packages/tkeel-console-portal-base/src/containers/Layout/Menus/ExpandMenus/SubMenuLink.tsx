import { Link } from '@chakra-ui/react';

import { isDarkMenuTheme } from '@/tkeel-console-portal-base/utils';

import { useMenuLinkProps } from './MenuLink';

type Props = {
  path: string;
  name: string;
};

function SubMenuLink({ path, name }: Props) {
  const { as, to, active } = useMenuLinkProps(path);
  const isDarkTheme = isDarkMenuTheme();
  const defaultColor = isDarkTheme ? 'gray.400' : 'gray.600';
  const hoverStyle = active ? {} : { color: isDarkTheme ? 'white' : 'primary' };

  return (
    <Link
      display="flex"
      alignItems="center"
      height="40px"
      paddingLeft="40px"
      color={active ? 'white' : defaultColor}
      borderRadius="4px"
      backgroundColor={active ? 'primary' : 'inherit'}
      _hover={hoverStyle}
      as={as}
      to={to}
    >
      {name}
    </Link>
  );
}

export default SubMenuLink;
