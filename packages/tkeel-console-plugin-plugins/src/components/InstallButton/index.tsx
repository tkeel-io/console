import React, { useRef, useState } from 'react';
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
  const timerRef = useRef<number | null>(null);

  const handleInstall = () => {
    if (!timerRef.current) {
      setLoading(true);
      setInterval(() => {});
      timerRef.current = window.setTimeout(() => {
        setLoading(false);
        timerRef.current = null;
      }, 500);
    }
  };

  return (
    <Button
      colorScheme="tKeel"
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
