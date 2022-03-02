import { Box, Flex, Text } from '@chakra-ui/react';

import { BoxTwoToneIcon } from '@tkeel/console-icons';

import { Template } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceTemplatesQuery';

import NoData from '../NoData';

export interface OnTemplateClick {
  ({
    templateId,
    templateName,
  }: {
    templateId: string;
    templateName: string;
  }): unknown;
}

type Props = {
  templates: Template[];
  onTemplateClick: OnTemplateClick;
};

export default function DeviceTemplates({ templates, onTemplateClick }: Props) {
  if (templates.length === 0) {
    return <NoData title="暂无设备模板,请重新选择" />;
  }
  return (
    <Box>
      {templates.map((template, i) => (
        <Flex
          key={template.id || i}
          marginBottom="18px"
          cursor="pointer"
          onClick={() =>
            onTemplateClick({
              templateId: template.id,
              templateName: template?.properties?.basicInfo?.name,
            })
          }
        >
          <BoxTwoToneIcon size={18} />
          <Text
            marginLeft="10px"
            lineHeight="18px"
            color="gray.700"
            fontSize="14px"
            fontWeight="600"
          >
            {template.properties?.basicInfo?.name ?? ''}
          </Text>
        </Flex>
      ))}
    </Box>
  );
}
