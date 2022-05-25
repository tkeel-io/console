import { Box, Flex, Link, Text, useClipboard } from '@chakra-ui/react';
import { indexOf } from 'lodash';

import { Tooltip } from '@tkeel/console-components';
import {
  CodeFilledIcon,
  ProtocolHttpFilledIcon,
  ProtocolSshFilledIcon,
} from '@tkeel/console-icons';

import { FluxSwitchValue } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

interface Props {
  proxyItem: FluxSwitchValue;
}

function NetProxyItem({ proxyItem }: Props) {
  const { hasCopied, onCopy } = useClipboard(proxyItem.value);
  let icon;
  switch (proxyItem.type) {
    case 'HTTP':
    case 'HTTPS':
      icon = (
        <Box mr="8px" mt="3px">
          <Tooltip label="打开链接">
            <Link href={proxyItem.value} isExternal mr="5px">
              <ProtocolHttpFilledIcon color="grayAlternatives.300" />
            </Link>
          </Tooltip>
        </Box>
      );
      break;
    case 'SSH':
      icon = (
        <Box mr="8px" mt="3px">
          <Tooltip label="打开终端">
            <ProtocolSshFilledIcon />
          </Tooltip>
        </Box>
      );
      break;
    case 'TCP':
      icon = (
        <Box mr="8px" mt="3px">
          <Tooltip label="复制命令">
            <Text cursor="pointer" onClick={onCopy} mt="2px">
              <CodeFilledIcon color="grayAlternatives.300" />
            </Text>
          </Tooltip>
        </Box>
      );
      break;
    default:
      break;
  }

  const notSupportProtocol = ['SSH', 'TCP'];
  icon = indexOf(notSupportProtocol, proxyItem.type) > -1 ? '' : icon;

  return (
    <Flex key={proxyItem.title} ml="7px">
      {icon}
      <Text mr="8px">{proxyItem.type}</Text>
      <Text mr="4px">{proxyItem.description}</Text>
      {hasCopied && (
        <Text color="primary" mr="8px">
          复制成功
        </Text>
      )}
    </Flex>
  );
}

export default NetProxyItem;
