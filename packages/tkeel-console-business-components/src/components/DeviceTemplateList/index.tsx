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
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function DeviceTemplateList({
  isLoading,
  isShowSpreadButton = true,
  emptyTitle = '暂无设备模板,请重新选择',
  templates,
  onClick,
  styles,
}: Props) {
  return (
    <Flex width="100%" height="100%" {...styles?.wrapper}>
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
                wrapper: { flex: '1' },
              }}
            />
          );
        }

        return templates.map((template, i) => {
          return (
            <Flex
              key={template.id || i}
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              marginBottom={i === templates.length - 1 ? '0' : '4px'}
              paddingLeft="10px"
              paddingRight="6px"
              height="32px"
              cursor="pointer"
              _hover={{
                backgroundColor: 'gray.100',
                '.spread-wrapper': {
                  display: 'flex',
                },
              }}
              onClick={() =>
                onClick({
                  id: template.id,
                  name: template?.properties?.basicInfo?.name,
                })
              }
            >
              <Flex alignItems="center">
                <BoxTwoToneIcon size={20} />
                <Text marginLeft="10px" color="gray.700" fontSize="14px">
                  {template.properties?.basicInfo?.name ?? ''}
                </Text>
              </Flex>
              {isShowSpreadButton && (
                <SpreadButton style={{ display: 'none' }} />
              )}
            </Flex>
          );
        });
      })()}
    </Flex>
  );
}
