import { Flex, StyleProps, Text, useClipboard } from '@chakra-ui/react';

import { CopyFilledIcon } from '@tkeel/console-icons';

type Props = {
  text: string;
  styles?: {
    wrapper?: StyleProps;
  };
};

function Clipboard({ text, styles }: Props) {
  const { hasCopied, onCopy } = useClipboard(text);
  return (
    <Flex {...styles?.wrapper}>
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
