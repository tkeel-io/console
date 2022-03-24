import { useClipboard } from '@chakra-ui/react';

import { LinkButton } from '@tkeel/console-components';

type Props = {
  text: string;
};

function Clipboard({ text }: Props) {
  const { hasCopied, onCopy } = useClipboard(text);
  return (
    <LinkButton onClick={onCopy} mr="8px" w="24px" minWidth="unset">
      {hasCopied ? '已复制' : '复制'}
    </LinkButton>
  );
}

export default Clipboard;
