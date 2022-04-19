import {
  Box,
  Button,
  ColorHues,
  Colors,
  Flex,
  HStack,
  Input,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { TinyColor } from '@ctrl/tinycolor';
import { Base64 } from 'js-base64';
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { useConfigQuery } from '@tkeel/console-request-hooks';

import useUpdateConfigMutation from '@/tkeel-console-plugin-admin-custom-config/hooks/mutations/useUpdateConfigMutation';

function getThemeColors(hue: number) {
  const r = 100;
  const length = 11;
  return Array.from({ length })
    .map((_, i) => {
      const saturation = Math.round((r / length) * i);
      const value = Math.round(Math.sqrt(10_000 - saturation ** 2));
      return new TinyColor({
        h: hue,
        s: saturation,
        v: value,
      }).toHexString();
    })
    .slice(1);
}

function getHue(hexColor: string) {
  return new TinyColor(hexColor).toHsv().h;
}

type ExtraThemeColors = {
  primary?: string;
  'primary.500'?: string;
  primarySub?: string;
  primarySub2?: string;
  primarySub3?: string;
  brand?: ColorHues;
};

interface CustomColor extends Colors {
  primary: string;
}

function Index(): JSX.Element {
  const { colors: themeColors }: { colors: CustomColor } = useTheme();
  const defaultColor = themeColors.primary;
  const [color, setColor] = useState(defaultColor);

  const [isShowColorPicker, setIsShowColorPicker] = useState(false);

  const hue = getHue(defaultColor);
  const defaultColors = getThemeColors(hue);
  const [colors, setColors] = useState(defaultColors);

  const { extra } = useConfigQuery();

  const { mutate } = useUpdateConfigMutation({
    onSuccess() {
      window.location.reload();
    },
  });

  const handleDocumentClick = () => {
    setIsShowColorPicker(false);
  };

  const handleUpdateThemeColors = (extraThemeColors: ExtraThemeColors) => {
    const extraData = {
      ...extra,
      theme: {
        colors: extraThemeColors,
      },
    };
    mutate({
      data: {
        extra: Base64.encode(JSON.stringify(extraData)),
      },
    });
  };

  const onConfirm = () => {
    if (color.length < 7) {
      handleUpdateThemeColors({});
      return;
    }

    const brand = {};
    colors.forEach((item, i) => {
      if (i === 0) {
        brand[50] = item;
      } else {
        brand[i * 100] = item;
      }
    });
    brand[500] = color;

    const primary = brand[500] as string;
    const extraThemeColors: ExtraThemeColors = {
      primary,
      'primary.500': primary,
      primarySub: brand[50] as string,
      primarySub2: brand[200] as string,
      primarySub3: brand[700] as string,
      brand: brand as ColorHues,
    };
    handleUpdateThemeColors(extraThemeColors);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex alignItems="center">
      <Flex
        position="relative"
        alignItems="center"
        paddingLeft="12px"
        width="140px"
        height="36px"
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
          cursor="pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsShowColorPicker(true);
          }}
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
          width="70px"
          padding="0"
          border="none"
          _focus={{ outline: 'none !important' }}
          maxLength={6}
          value={color.slice(1)}
          onChange={(e) => {
            const value = `#${e.target.value}`;
            setColor(value);
            setColors(getThemeColors(getHue(value)));
          }}
        />
        {isShowColorPicker && (
          <HexColorPicker
            color={color}
            onChange={(value) => {
              setColor(value);
              setColors(getThemeColors(getHue(value)));
            }}
            style={{ position: 'absolute', left: '0', bottom: '45px' }}
          />
        )}
      </Flex>
      <HStack marginLeft="10px" spacing="8px">
        <Button
          colorScheme="primary"
          borderRadius="6px"
          boxShadow="none"
          onClick={onConfirm}
        >
          确定
        </Button>
        <Button
          borderRadius="6px"
          boxShadow="none"
          onClick={() => handleUpdateThemeColors({})}
        >
          重置
        </Button>
      </HStack>
      {/* <Flex flexDirection="column">
        <Flex>
          {Object.entries(extra?.theme?.colors?.brand ?? {}).map(
            ([key, value], i) => (
              <Box key={key} width="80px" height="80px" backgroundColor={value}>
                {i === 0 ? 50 : 100 * i}
              </Box>
            )
          )}
        </Flex>
        <Box
          marginLeft="400px"
          width="80px"
          height="80px"
          backgroundColor={colors[5]}
        >
          primary
        </Box>
      </Flex> */}
    </Flex>
  );
}

export default Index;
