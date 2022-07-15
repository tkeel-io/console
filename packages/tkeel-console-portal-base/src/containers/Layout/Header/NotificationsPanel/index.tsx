import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import { useNavigate } from 'react-router-dom';

import { Empty } from '@tkeel/console-components';
import { BellLightningFilledIcon } from '@tkeel/console-icons';

import type { Notification } from '@/tkeel-console-portal-base/hooks/queries/useNotificationsQuery';

dayjs.extend(relativeTime);

interface Props {
  notifications: Notification[];
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
  };
}

export default function NotificationsPanel({
  notifications,
  sx,
  styles,
}: Props) {
  const navigate = useNavigate();
  return (
    <Flex
      flexDirection="column"
      width="400px"
      minHeight="266px"
      maxHeight="622px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius="4px"
      boxShadow="0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2)"
      backgroundColor="white"
      {...styles?.root}
      {...sx}
    >
      <Box width="100%" padding="0 20px">
        <Text
          height="52px"
          color="grayAlternatives.700"
          fontSize="14px"
          fontWeight="600"
          lineHeight="52px"
          borderBottomWidth="1px"
          borderBottomStyle="solid"
          borderBottomColor="gray.200"
        >
          通知
        </Text>
      </Box>
      <Flex flex="1" overflowY="auto" flexDirection="column">
        {notifications.length > 0 ? (
          notifications.map(({ notification }, i) => {
            const {
              action,
              title,
              content,
              // create_timestamp: createTimestamp,
            } = notification;
            const url = action.value;

            return (
              <Flex
                key={String(i + 1)}
                flexDirection="column"
                flexShrink={0}
                padding="10px 20px"
                cursor="pointer"
                _hover={{ backgroundColor: 'gray.100' }}
                onClick={() => {
                  if (!url) {
                    return;
                  }

                  if (action.extras?.is_open_in_new_window) {
                    window.open(url);
                  } else {
                    navigate(url);
                  }
                }}
              >
                <Flex alignItems="center">
                  <BellLightningFilledIcon color="grayAlternatives.300" />
                  <Text
                    marginLeft="2px"
                    color="grayAlternatives.700"
                    fontSize="12px"
                    fontWeight="600"
                  >
                    {title}
                  </Text>
                </Flex>
                <Text
                  marginTop="4px"
                  color="grayAlternatives.700"
                  fontSize="12px"
                  lineHeight="22px"
                >
                  {content}
                </Text>
                {/* <Text
                  color="grayAlternatives.500"
                  fontSize="12px"
                  lineHeight="24px"
                >
                  {createTimestamp ? dayjs(createTimestamp).fromNow() : ''}
                </Text> */}
              </Flex>
            );
          })
        ) : (
          <Empty type="component" title="暂无通知" sx={{ flex: '1' }} />
        )}
      </Flex>
      <Box
        flexShrink={0}
        width="360px"
        marginLeft="20px"
        height="20px"
        borderTopWidth="1px"
        borderTopStyle="solid"
        borderTopColor="gray.200"
      />
    </Flex>
  );
}
