import {
  Box,
  Center,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react';

// import { UseFormReturn } from 'react-hook-form';
import { FormField } from '@tkeel/console-components/';
import { QuestionFilledIcon } from '@tkeel/console-icons';
import { AttributeItem } from '@tkeel/console-request-hooks';

import { DeviceFormFields } from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

type Props = {
  attributeList?: AttributeItem[];
  watchFields: DeviceFormFields;
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
  default_value: unknown;
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
  const { rw, default_value: defaultValue } = define;
  return (
    <Flex alignItems="center">
      <HStack h="24px" lineHeight="24px">
        <Text color="gray.700" size="14px" fontWeight={500}>
          {name}
        </Text>
        <Text color="grayAlternatives.300" fontSize="12px">
          {id}
        </Text>
      </HStack>
      <Spacer />
      <Tooltip
        bg="white"
        hasArrow
        p="8px 12px"
        label={renderTooltip({ type, rw, default_value: defaultValue })}
      >
        <Center h="24px" w="24px">
          <QuestionFilledIcon size="14px" color="grayAlternatives.300" />
        </Center>
      </Tooltip>
    </Flex>
  );
}
function AttributeDataPart({ attributeList = [], watchFields }: Props) {
  return (
    <Flex flexDirection="column" h="100%">
      <Text color="gray.500" fontSize="12px" mb="12px">
        使用「{watchFields.templateName}」模版的属性数据
      </Text>
      <Box overflowY="scroll" h="390px">
        {attributeList.length > 0 &&
          attributeList.map((item: AttributeItem) => {
            return (
              <Box
                w="100%"
                borderRadius="4px"
                border="1px solid"
                borderColor="gray.100"
                bg="gray.50"
                key={item.id}
                mb="12px"
                p="12px 20px 4px"
              >
                <TextField
                  key={item.id}
                  id={item.id}
                  label={renderLabel(item)}
                />
              </Box>
            );
          })}
      </Box>
    </Flex>
  );
}

export default AttributeDataPart;
