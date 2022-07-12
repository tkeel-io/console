import { Link, Text } from '@chakra-ui/react';

import { Badge } from '@tkeel/console-components';

import useMenuNotification from '@/tkeel-console-portal-base/hooks/useMenuNotification';

import { getLinkStyle, getTextColor, useMenuLinkProps } from './MenuLink';
import Rectangle from './Rectangle';

type Props = {
  id: string;
  path: string;
  name: string;
};

function SubMenuLink({ id, path, name }: Props) {
  const hasNotification = useMenuNotification(id);
  const { as, to, active } = useMenuLinkProps(path);
  const color = getTextColor(active);
  const linkStyle = getLinkStyle(active);

  return (
    <Link position="relative" {...linkStyle} as={as} to={to}>
      <Rectangle style={{ display: 'none' }} />
      <Badge dot count={hasNotification ? 1 : 0}>
        <Text
          className="menu-name"
          paddingLeft="60px"
          color={color}
          fontWeight={active ? '600' : 'normal'}
        >
          {name}
        </Text>
      </Badge>
    </Link>
  );
}

export default SubMenuLink;
