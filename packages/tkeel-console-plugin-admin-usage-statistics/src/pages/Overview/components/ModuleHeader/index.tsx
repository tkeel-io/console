import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { ChevronRightFilledIcon } from '@tkeel/console-icons';

interface Props {
  title: string;
  description: string;
  link: string;
}

export default function ModuleHeader({ title, description, link }: Props) {
  return (
    <Flex alignItems="center" paddingBottom="12px">
      <Flex flex="1" alignItems="center">
        <Text
          fontWeight="600"
          fontSize="14px"
          lineHeight="24px"
          color="gray.500"
        >
          {title}
        </Text>
        <Text
          paddingLeft="8px"
          fontSize="12px"
          lineHeight="20px"
          color="gray.500"
        >
          {description}
        </Text>
      </Flex>
      <Link
        to={link}
        style={{ display: 'flex', alignItems: 'center', paddingLeft: '24px' }}
      >
        <Text fontSize="12px" lineHeight="20px" color="gray.500">
          查看详情
        </Text>
        <ChevronRightFilledIcon size="16px" color="gray.500" />
      </Link>
    </Flex>
  );
}
