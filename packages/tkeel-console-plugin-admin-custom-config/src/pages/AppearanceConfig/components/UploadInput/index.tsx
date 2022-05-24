import { Box, Center, Image, Input, StyleProps, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

import { AddFilledIcon } from '@tkeel/console-icons';
import { plugin } from '@tkeel/console-utils';

import { fileToBase64 } from '@/tkeel-console-plugin-admin-custom-config/utils';

export interface Styles {
  wrapper?: StyleProps;
  image?: StyleProps;
}

interface Props {
  type?: 'square' | 'rectangle';
  src: string;
  setSrc: (src: string) => unknown;
  maxSize?: number;
  styles?: Styles;
}

export default function UploadInput({
  type = 'square',
  src,
  setSrc,
  maxSize = 100,
  styles,
}: Props) {
  const toast = plugin.getPortalToast();
  let width = '96px';
  let height = width;
  let uploadTextMarginTop = '6px';

  if (type === 'rectangle') {
    width = '200px';
    height = '56px';
    uploadTextMarginTop = '0';
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      const { size } = files[0];
      if (size / 1024 > maxSize) {
        const newMaxSize =
          maxSize >= 1024
            ? `${Number.parseInt(String(maxSize / 1024), 10)}M`
            : `${maxSize}K`;
        toast.error(`上传图片大小超过${newMaxSize}`);
      } else {
        fileToBase64(files[0])
          .then((res: string) => setSrc(res))
          .catch((error) => console.error(error));
      }
    }
  };

  return (
    <Center
      position="relative"
      width={width}
      height={height}
      borderRadius="4px"
      backgroundColor="gray.100"
      _hover={{
        '>div': {
          display: 'block',
        },
      }}
      {...styles?.wrapper}
    >
      {src && (
        <Image
          src={src}
          width="100%"
          height="100%"
          borderRadius="4px"
          {...styles?.image}
        />
      )}
      <Box
        display="none"
        position="absolute"
        left="0"
        top="0"
        width="100%"
        height="100%"
      >
        <Center
          position="absolute"
          flexDirection="column"
          width="100%"
          height="100%"
          backgroundColor="grayAlternatives.700"
          opacity="0.7"
          borderRadius="4px"
        >
          <AddFilledIcon color="white" size={18} />
          <Text
            marginTop={uploadTextMarginTop}
            color="white"
            fontSize="14px"
            fontWeight="500"
          >
            上传图片
          </Text>
        </Center>
        <Input
          height="100%"
          opacity="0"
          type="file"
          accept="image/*"
          cursor="pointer"
          onChange={handleInputChange}
        />
      </Box>
    </Center>
  );
}
