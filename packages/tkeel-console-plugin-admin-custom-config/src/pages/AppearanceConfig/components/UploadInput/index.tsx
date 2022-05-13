import { Box, Center, Image, Input, StyleProps, Text } from '@chakra-ui/react';

import { AddFilledIcon } from '@tkeel/console-icons';

export interface Styles {
  wrapper?: StyleProps;
  image?: StyleProps;
}

interface Props {
  type?: 'square' | 'rectangle';
  src: string;
  setSrc: (src: string) => unknown;
  styles?: Styles;
}

function transformFileToBase64(file: File | null) {
  return new Promise<string>((resolve) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result as string;
        resolve(resultStr);
      };
      reader.readAsDataURL(file);
    } else {
      resolve('');
    }
  });
}

export default function UploadInput({
  type = 'square',
  src,
  setSrc,
  styles,
}: Props) {
  let width = '96px';
  let height = width;
  let uploadTextMarginTop = '6px';

  if (type === 'rectangle') {
    width = '200px';
    height = '56px';
    uploadTextMarginTop = '0';
  }

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
          cursor="pointer"
          onChange={(e) => {
            const { files } = e.target;
            if (files && files[0]) {
              transformFileToBase64(files[0])
                .then((res: string) => setSrc(res))
                .catch((error) => console.error(error));
            }
          }}
        />
      </Box>
    </Center>
  );
}
