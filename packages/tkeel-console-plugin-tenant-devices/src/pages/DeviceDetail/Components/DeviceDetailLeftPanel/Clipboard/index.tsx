import { Flex, Text, useClipboard } from '@chakra-ui/react';

import { CopyFilledIcon } from '@tkeel/console-icons';

type Props = {
  text: string;
};

function Clipboard({ text }: Props) {
  const { hasCopied, onCopy } = useClipboard(text);
  return (
    <Flex>
      {hasCopied && (
        <Text color="primary" mr="8px">
          已复制
        </Text>
      )}
      <Text cursor="pointer" onClick={onCopy} mt="2px">
        <CopyFilledIcon color="grayAlternatives.300" />
      </Text>
    </Flex>
  );
}

export default Clipboard;
