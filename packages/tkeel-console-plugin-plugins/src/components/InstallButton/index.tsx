import React, { MouseEventHandler, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { DownloadFilledIcon, LoadingFilledIcon } from '@tkeel/console-icons';

type Props = {
  size?: string;
};

const defaultProps = {
  size: 'xs',
};

function InstallButton({ size }: Props) {
  const [loading, setLoading] = useState(false);
  let timer: number | null = null;

  const handleInstall: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (!timer) {
      setLoading(true);
      setInterval(() => {});
      timer = window.setTimeout(() => {
        setLoading(false);
        timer = null;
      }, 500);
    }
  };

  return (
    <Button
      colorScheme="primary"
      size={size}
      leftIcon={
        loading ? (
          <LoadingFilledIcon color="white" size={12} />
        ) : (
          <DownloadFilledIcon size={12} />
        )
      }
      onClick={handleInstall}
    >
      安装
    </Button>
  );
}

InstallButton.defaultProps = defaultProps;

export default InstallButton;
