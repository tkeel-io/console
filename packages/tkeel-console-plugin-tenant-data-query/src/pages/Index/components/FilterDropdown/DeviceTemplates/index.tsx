import { Box, Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { BoxTwoToneIcon } from '@tkeel/console-icons';

import { Template } from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceTemplatesQuery';

import NoData from '../NoData';
import SpreadButton from '../SpreadButton';

const TitleWrapper = styled(Flex)`
  &:hover .spread-wrapper {
    display: flex;
  }
`;

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
        <TitleWrapper
          key={template.id || i}
          justifyContent="space-between"
          alignItems="center"
          marginBottom={i === templates.length - 1 ? '0' : '4px'}
          paddingLeft="10px"
          paddingRight="4px"
          height="32px"
          cursor="pointer"
          borderRadius="4px"
          _hover={{ backgroundColor: 'brand.50' }}
          onClick={() =>
            onTemplateClick({
              templateId: template.id,
              templateName: template?.properties?.basicInfo?.name,
            })
          }
        >
          <Flex alignItems="center">
            <BoxTwoToneIcon size={20} />
            <Text marginLeft="10px" color="gray.700" fontSize="14px">
              {template.properties?.basicInfo?.name ?? ''}
            </Text>
          </Flex>
          <SpreadButton style={{ display: 'none' }} />
        </TitleWrapper>
      ))}
    </Box>
  );
}
