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
import {
  AddFilledIcon,
  PencilFilledIcon,
  TrashFilledIcon,
} from '@tkeel/console-icons';

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

export default function ExtendInfoPart() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const handleSelectKey = (item: string) => {
    if (!selectedKeys.includes(item)) {
      setSelectedKeys([...selectedKeys, item]);
    }
  };
  const deleteExtendItem = (item: string) => {
    setSelectedKeys(selectedKeys.filter((val) => val !== item));
  };
  const renderLabel = (item: string) => {
    const fontColor = 'grayAlternatives.300';
    return (
      <Flex justify="space-between">
        <Text color="gray.700">{item}</Text>
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
              deleteExtendItem(item);
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
        top="-30px"
        right="14px"
        variant="link"
        size="xs"
        color="grayAlternatives.300"
        _hover={{
          color: 'primary',
        }}
      >
        <AddFilledIcon />
        添加
      </Button>
      <Text fontSize="12px" color="grayAlternatives.300" mb="12px">
        支持用户自定义扩展信息
      </Text>
      <Wrap spacing="8px" mb="20px">
        {BASIC_EXTEND_ITEMS.map((item) => {
          const isSelected = selectedKeys.includes(item);
          return (
            <Button
              variant="outline"
              key={item}
              borderRadius="4px"
              color={isSelected ? 'primary' : 'gray.400'}
              borderColor={isSelected ? 'primary' : 'gray.200'}
              bg={isSelected ? 'blue.50' : 'white'}
              height="24px"
              p="0 12px"
              fontSize="12px"
              onClick={() => {
                handleSelectKey(item);
              }}
            >
              {item}
            </Button>
          );
        })}
      </Wrap>
      <Box overflowY="scroll" flex="1">
        {selectedKeys.map((item) => {
          return <TextField key={item} label={renderLabel(item)} id="item" />;
        })}
      </Box>
    </Flex>
  );
}
