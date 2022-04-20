import { Box, ColorHues, Flex } from '@chakra-ui/react';
import { TinyColor } from '@ctrl/tinycolor';

type Props = {
  brand: ColorHues;
};

function getSaturationValue(hexColor: string) {
  const hsv = new TinyColor(hexColor).toHsv();
  return {
    s: hsv.s,
    v: hsv.v,
  };
}

export default function ColorsCoordinate({ brand }: Props) {
  return (
    <Flex
      position="relative"
      width="100px"
      height="100px"
      borderLeft="1px solid"
      borderLeftColor="gray.500"
      borderBottom="1px solid"
      borderBottomColor="gray.500"
    >
      {Object.entries(brand).map(([key, value]) => {
        return (
          <Box
            position="absolute"
            left={getSaturationValue(value as string).s * 100}
            bottom={getSaturationValue(value as string).v * 100}
            key={key}
            width="4px"
            height="4px"
            borderRadius="2px"
            backgroundColor={value as string}
          />
        );
      })}
    </Flex>
  );
}
