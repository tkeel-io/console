import { Box, Button, Flex, HStack, Input, Text } from '@chakra-ui/react';
import { TinyColor } from '@ctrl/tinycolor';
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

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

function Index(): JSX.Element {
  const defaultColor = '#55BC8A';
  const [color, setColor] = useState(defaultColor);

  const [isShowColorPicker, setIsShowColorPicker] = useState(false);

  const hue = getHue(defaultColor);
  const defaultColors = getThemeColors(hue);
  const [colors, setColors] = useState(defaultColors);

  const handleDocumentClick = () => {
    setIsShowColorPicker(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="20px 28px 20px 24px"
      borderRadius="2px"
      backgroundColor="white"
    >
      <Box lineHeight="20px">
        <Text color="gray.800" fontSize="14px" fontWeight="500">
          主题色配置
        </Text>
        <Text color="gray.500" fontSize="12px">
          设定系统主题色，根据颜色插件化配置功能实现一件换肤
        </Text>
      </Box>
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
          onChange={(e) => setColor(`#${e.target.value}`)}
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
        <Button colorScheme="primary" borderRadius="6px" boxShadow="none">
          确定
        </Button>
        <Button borderRadius="6px" boxShadow="none">
          重置
        </Button>
      </HStack>
      <Flex>
        {colors.map((item) => (
          <Box key={item} width="30px" height="30px" backgroundColor={item} />
        ))}
      </Flex>
    </Flex>
  );
}

export default Index;
