import {
  Box,
  ColorHues,
  Colors,
  Flex,
  Input,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { TinyColor } from '@ctrl/tinycolor';
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { useUpdatePortalConfigMutation } from '@tkeel/console-request-hooks';

import ButtonStack from '@/tkeel-console-plugin-admin-custom-config/components/ButtonStack';

// import ColorsBlock from './ColorsBlock';
// import ColorsCoordinate from './ColorsCoordinate';

function getThemeColors(hexColor: string) {
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

type ExtraThemeColors = {
  primary?: string;
  brand?: ColorHues;
};

interface CustomColor extends Colors {
  primary: string;
}

export default function ThemeColorConfig(): JSX.Element {
  const { colors: themeColors }: { colors: CustomColor } = useTheme();
  const defaultColor = themeColors.primary;
  const [color, setColor] = useState(defaultColor);

  const [isShowColorPicker, setIsShowColorPicker] = useState(false);

  const defaultColors = getThemeColors(defaultColor);
  const [colors, setColors] = useState(defaultColors);

  const { mutate: mutatePortalConfig } = useUpdatePortalConfigMutation({
    key: 'theme',
    path: 'colors',
    onSuccess() {
      window.location.reload();
    },
  });

  const handleDocumentClick = () => {
    setIsShowColorPicker(false);
  };

  const handleUpdateThemeColors = (extraThemeColors: ExtraThemeColors) => {
    mutatePortalConfig({
      data: {
        ...extraThemeColors,
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
            setColors(getThemeColors(value));
          }}
        />
        {isShowColorPicker && (
          <HexColorPicker
            color={color}
            onChange={(value) => {
              setColor(value);
              setColors(getThemeColors(value));
            }}
            style={{ position: 'absolute', left: '0', bottom: '45px' }}
          />
        )}
      </Flex>
      <ButtonStack
        onConfirm={onConfirm}
        onReset={() => handleUpdateThemeColors({})}
        styles={{ wrapper: { marginLeft: '10px' } }}
      />
      {/* {brand && <ColorsBlock brand={brand} primary={colors[5]} />}
      {brand && <ColorsCoordinate brand={brand} />} */}
    </Flex>
  );
}
