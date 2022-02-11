import { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { FormField } from '@tkeel/console-components/';
import { PencilFilledIcon, TrashFilledIcon } from '@tkeel/console-icons';
import { keyBy, mapValues } from 'lodash';

interface Props {
  setGroupInfo: (params: { key: string; value: unknown }) => void;
}

const { TextField } = FormField;

const BASIC_EXTEND_ITEMS = [
  '厂商',
  '版本',
  '所属单位',
  '所属部分',
  '负责人',
  '入场时间',
  '安装时间',
];

export default function ExtendInfoPart({ setGroupInfo }: Props) {
  const [extendInfo, setExtendInfo] = useState<
    { key: string; value: string }[]
  >([]);
  const handleSelectKey = (key: string) => {
    if (extendInfo.findIndex((item) => item.key === key) === -1) {
      setExtendInfo([...extendInfo, { key, value: '' }]);
      setGroupInfo({
        key: 'ext',
        value: mapValues(
          keyBy([...extendInfo, { key, value: '' }], 'key'),
          'value'
        ),
      });
    }
  };
  const deleteExtendItem = (key: string) => {
    setExtendInfo(extendInfo.filter((item) => item.key !== key));
    setGroupInfo({
      key: 'ext',
      value: mapValues(
        keyBy(
          extendInfo.filter((item) => item.key !== key),
          'key'
        ),
        'value'
      ),
    });
  };

  const renderLabel = (key: string) => {
    const fontColor = 'grayAlternatives.300';
    return (
      <Flex justify="space-between">
        <Text color="gray.700">{key}</Text>
        <Center>
          <IconButton
            variant="link"
            size="sm"
            aria-label="edit"
            icon={<PencilFilledIcon color={fontColor} />}
          />
          <IconButton
            lineHeight="24px"
            variant="link"
            size="sm"
            aria-label="delete"
            icon={<TrashFilledIcon color={fontColor} />}
            onClick={() => {
              deleteExtendItem(key);
            }}
          />
        </Center>
      </Flex>
    );
  };
  return (
    <Flex pos="relative" flexDirection="column" h="100%">
      <Button
        pos="absolute"
        top="-24px"
        right="0"
        variant="link"
        size="xs"
        color="grayAlternatives.300"
        _hover={{
          color: 'primary',
        }}
      >
        添加
      </Button>
      <Text fontSize="12px" color="grayAlternatives.300" mb="12px">
        支持用户自定义扩展信息
      </Text>
      <Wrap spacing="8px" mb="20px">
        {BASIC_EXTEND_ITEMS.map((key) => {
          const isSelected =
            extendInfo.findIndex((item) => item.key === key) !== -1;
          return (
            <Button
              variant="outline"
              key={key}
              borderRadius="4px"
              color={isSelected ? 'primary' : 'gray.400'}
              borderColor={isSelected ? 'primary' : 'gray.200'}
              bg={isSelected ? 'blue.50' : 'white'}
              height="24px"
              p="0 12px"
              fontSize="12px"
              onClick={() => {
                handleSelectKey(key);
              }}
            >
              {key}
            </Button>
          );
        })}
      </Wrap>
      <Box overflowY="scroll" h="390px">
        {extendInfo.map((item) => {
          return (
            <TextField
              key={item.key}
              value={item.value}
              label={renderLabel(item.key)}
              id="item"
            />
          );
        })}
      </Box>
    </Flex>
  );
}
