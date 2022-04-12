import { Flex, StyleProps, Text } from '@chakra-ui/react';

import { Loading } from '@tkeel/console-components';
import { BoxTwoToneIcon } from '@tkeel/console-icons';
import { TemplateItem } from '@tkeel/console-request-hooks';

import Empty from '../Empty';

type Props = {
  isLoading: boolean;
  templates: TemplateItem[];
  templateId: string;
  onTemplateClick: (templateId: string) => unknown;
  styles?: {
    wrapper?: StyleProps;
  };
};

export default function DeviceTemplates({
  isLoading,
  templates,
  templateId,
  onTemplateClick,
  styles,
}: Props) {
  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  if (templates.length === 0) {
    return <Empty styles={{ wrapper: { width: '100%', height: '100%' } }} />;
  }
  return (
    <Flex flexDirection="column" {...styles?.wrapper}>
      {templates.map((template) => {
        const { id, properties } = template;
        const name = properties?.basicInfo?.name ?? '';

        return (
          <Flex
            key={id}
            justifyContent="space-between"
            alignItems="center"
            flexShrink={0}
            marginBottom="1px"
            padding="0 12px"
            height="32px"
            backgroundColor={
              id === templateId ? 'grayAlternatives.50' : 'transparent'
            }
            cursor="pointer"
            _hover={{ backgroundColor: 'grayAlternatives.50' }}
            onClick={() => onTemplateClick(id)}
          >
            <Flex alignItems="center">
              <BoxTwoToneIcon />
              <Text
                marginLeft="4px"
                color="gray.800"
                fontSize="14px"
                lineHeight="24px"
                isTruncated
                title={name}
              >
                {name}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}
