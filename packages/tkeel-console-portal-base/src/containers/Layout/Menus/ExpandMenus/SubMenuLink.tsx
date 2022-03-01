import { Link } from '@chakra-ui/react';

import { isDarkMenuTheme } from '@/tkeel-console-portal-base/utils';

import { useMenuLinkProps } from './MenuLink';

type Props = {
  path: string;
  name: string;
};

function SubMenuLink({ path, name }: Props) {
  const { as, to, active } = useMenuLinkProps(path);
  const isDarkMenu = isDarkMenuTheme();
  const defaultColor = isDarkMenu ? 'gray.400' : 'gray.600';
  const hoverStyle = active
    ? {}
    : { color: isDarkMenu ? 'white' : 'primary', fontWeight: '600' };

  return (
    <Link
      display="flex"
      alignItems="center"
      height="28px"
      paddingLeft="40px"
      color={active ? 'primary' : defaultColor}
      fontWeight={active ? '500' : 'normal'}
      borderRadius="4px"
      _hover={hoverStyle}
      as={as}
      to={to}
    >
      {name}
    </Link>
  );
}

export default SubMenuLink;
