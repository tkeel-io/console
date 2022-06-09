import { Center, Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Empty, Loading, SpreadButton } from '@tkeel/console-components';
import { BoxTwoToneIcon } from '@tkeel/console-icons';
import { TemplateItem } from '@tkeel/console-request-hooks';

type Props = {
  isLoading?: boolean;
  isShowSpreadButton?: boolean;
  emptyTitle?: ReactNode;
  templates: TemplateItem[];
  onClick: ({ id, name }: { id: string; name: string }) => unknown;
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
  };
};

export default function DeviceTemplateList({
  isLoading,
  isShowSpreadButton = true,
  emptyTitle = '暂无设备模板,请重新选择',
  templates,
  onClick,
  sx,
  styles,
}: Props) {
  return (
    <Flex width="100%" height="100%" {...styles?.root} {...sx}>
      {(() => {
        if (isLoading) {
          return (
            <Center flex="1">
              <Loading />
            </Center>
          );
        }

        if (templates.length === 0) {
          return (
            <Empty
              type="component"
              title={emptyTitle}
              styles={{
                wrapper: { flex: 1 },
              }}
            />
          );
        }

        return templates.map((template, i) => {
          const { id, properties } = template;
          const name = properties?.basicInfo?.name ?? '';
          return (
            <Flex
              key={id || i}
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              marginBottom={i === templates.length - 1 ? '0' : '4px'}
              paddingLeft="10px"
              paddingRight="6px"
              height="32px"
              cursor="pointer"
              _hover={{
                backgroundColor: 'grayAlternatives.50',
                '> div:last-child': {
                  display: 'flex',
                },
              }}
              onClick={() =>
                onClick({
                  id,
                  name,
                })
              }
            >
              <Flex alignItems="center">
                <BoxTwoToneIcon size={20} />
                <Text marginLeft="10px" color="gray.700" fontSize="14px">
                  {name}
                </Text>
              </Flex>
              {isShowSpreadButton && <SpreadButton sx={{ display: 'none' }} />}
            </Flex>
          );
        });
      })()}
    </Flex>
  );
}
