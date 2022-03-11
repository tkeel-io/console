import { Flex, Text, useClipboard } from '@chakra-ui/react';

import { CopyFilledIcon } from '@tkeel/console-icons';

type Props = {
  text: string;
};

function Clipboard({ text }: Props) {
  const { hasCopied, onCopy } = useClipboard(text);
  return (
    <Flex>
      <Text cursor="pointer" onClick={onCopy} mt="2px">
        <CopyFilledIcon color="grayAlternatives.300" />
      </Text>
      {hasCopied && (
        <Text color="primary" ml="4px">
          已复制
        </Text>
      )}
    </Flex>
  );
}

export default Clipboard;
