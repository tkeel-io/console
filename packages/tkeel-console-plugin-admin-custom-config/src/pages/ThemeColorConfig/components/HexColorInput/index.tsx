import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { TinyColor } from '@ctrl/tinycolor';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  setColors: Dispatch<SetStateAction<string[]>>;
}

export function getThemeColors(hexColor: string) {
  const hsv = new TinyColor(hexColor).toHsv();
  const hue = hsv.h;
  const { v } = hsv;
  let addValue = 0;
  if (v > 0.9) {
    addValue = 3;
  } else if (v < 0.78) {
    addValue = -3;
  }

  const r = 100;
  const length = 11;
  return Array.from({ length })
    .map((_, i) => {
      const saturation = Math.round((r / length) * i);
      let value = Math.round(Math.sqrt(10_000 - saturation ** 2));
      value += addValue * i;
      if (value > 100) {
        value = 100;
      }
      if (value < 0) {
        value = 0;
      }
      return new TinyColor({
        h: hue,
        s: saturation,
        v: value + addValue,
      }).toHexString();
    })
    .slice(1);
}

export default function HexColorInput({ color, setColor, setColors }: Props) {
  return (
    <Flex
      alignItems="center"
      height="40px"
      paddingLeft="12px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="grayAlternatives.50"
      borderRadius="4px"
    >
      <Box
        width="16px"
        height="16px"
        borderRadius="4px"
        backgroundColor={color}
      />
      <Text
        marginLeft="8px"
        marginRight="3px"
        paddingLeft="10px"
        height="16px"
        lineHeight="16px"
        borderLeftWidth="1px"
        borderLeftStyle="solid"
        borderLeftColor="grayAlternatives.50"
      >
        #
      </Text>
      <Input
        flex="1"
        padding="0"
        border="none"
        _focus={{ boxShadow: 'none !important' }}
        maxLength={6}
        value={color.slice(1)}
        onChange={(e) => {
          const value = `#${e.target.value}`;
          setColor(value);
          setColors(getThemeColors(value));
        }}
      />
    </Flex>
  );
}
