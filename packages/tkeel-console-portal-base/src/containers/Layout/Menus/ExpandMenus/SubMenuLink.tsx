import { Link, Text } from '@chakra-ui/react';

import { getLinkStyle, getTextColor, useMenuLinkProps } from './MenuLink';
import Rectangle from './Rectangle';

type Props = {
  path: string;
  name: string;
};

function SubMenuLink({ path, name }: Props) {
  const { as, to, active } = useMenuLinkProps(path);
  const color = getTextColor(active);
  const linkStyle = getLinkStyle(active);

  return (
    <Link position="relative" {...linkStyle} as={as} to={to}>
      <Rectangle style={{ display: 'none' }} />
      <Text
        className="menu-name"
        paddingLeft="58px"
        color={color}
        fontWeight={active ? '600' : 'normal'}
      >
        {name}
      </Text>
    </Link>
  );
}

export default SubMenuLink;
