import { Box, Center, Image, Input, Text } from '@chakra-ui/react';

import { AddFilledIcon } from '@tkeel/console-icons';

type Props = {
  src: string;
  setSrc: (src: string) => unknown;
};

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

export default function UploadInput({ src, setSrc }: Props) {
  return (
    <Center
      position="relative"
      width="96px"
      height="96px"
      borderRadius="4px"
      backgroundColor="gray.100"
      _hover={{
        '>div': {
          display: 'block',
        },
      }}
    >
      {src && <Image src={src} />}
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
          <Text marginTop="6px" color="white" fontSize="14px" fontWeight="500">
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
