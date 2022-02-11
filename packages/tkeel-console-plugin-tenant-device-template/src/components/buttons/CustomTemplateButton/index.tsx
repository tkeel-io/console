import { Flex, Text } from '@chakra-ui/react';
import { ChevronRightFilledIcon } from '@tkeel/console-icons';

import DocumentPencilTowToneIcon from '@/tkeel-console-plugin-tenant-device-template/assets/images/document-pencil.svg?svgr';

type Props = {
  onSuccess: () => void;
};

export default function CustomTemplateButton({ onSuccess }: Props) {
  onSuccess();

  return (
    <Flex
      minHeight="70px"
      alignItems="center"
      flexBasis="420px"
      p="0 20px 0 16px"
      border="1px"
      borderColor="grayAlternatives.50"
      borderRadius="4px"
    >
      <DocumentPencilTowToneIcon />
      <Flex flexDirection="column" ml="16px" flexBasis="316px">
        <Text color="black" fontSize="14px">
          创建自定义模版
        </Text>
        <Text color="gray.500" isTruncated maxWidth="284px" fontSize="12px">
          模型说明一句话描述模型说明一句话描述模型说句得到我的为打算
        </Text>
      </Flex>
      <ChevronRightFilledIcon size="24px" />
    </Flex>
  );
}
