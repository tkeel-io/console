/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import { FormField } from '@tkeel/console-components/';

import { RwOptions } from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

type AttributeItem = {
  id: string;
  name: string;
  type: string;
  define: {
    default_value: string;
    rw: RwOptions;
  };
};
type Props = {
  attributeList: AttributeItem[];
};
const { TextField } = FormField;
const TOOLTIP_OPTIONS = [
  { label: '数据类型', key: 'type' },
  { label: '默认值', key: 'default_value' },
  { label: '读写类型', key: 'rw' },
];

function renderTooltip(info: {
  type: string;
  rw: string;
  default_value: string;
}) {
  return (
    <SimpleGrid columns={1} spacingY="4px">
      {TOOLTIP_OPTIONS.map((val) => (
        <HStack fontSize="12px" lineHeight="24px" key={val.key}>
          <Text color="gray.500">{val.label}</Text>
          <Text color="gray.700">{info[val.key]}</Text>
        </HStack>
      ))}
    </SimpleGrid>
  );
}
function renderLabel(item: AttributeItem) {
  const { id, name, define, type } = item;
  const { rw, default_value } = define;
  return (
    <Flex>
      <HStack>
        <Text>{name}</Text>
        <Text>{id}</Text>
      </HStack>
      <Spacer />
      <Tooltip label={renderTooltip({ type, rw, default_value })}>?</Tooltip>
    </Flex>
  );
}
function renderAttributeItem({ item }: { item: AttributeItem }) {
  const { id } = item;
  return (
    <Box w="100%" borderRadius="4px" border="1px solid gray.100">
      <TextField key={id} id={id} label={renderLabel(item)} />
    </Box>
  );
}
function AttributeDataPart({ attributeList }: Props) {
  return (
    <Box>
      <Text>属性数据</Text>
      {attributeList.map((item) => renderAttributeItem({ item }))}
    </Box>
  );
}

export default AttributeDataPart;
