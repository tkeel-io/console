import {
  ColorHues,
  Colors,
  Flex,
  StyleProps,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useNavigate } from 'react-router-dom';

import { BasicInfoBg } from '@tkeel/console-business-components';
import {
  BackButton,
  Checkbox,
  CustomTab,
  CustomTabList,
} from '@tkeel/console-components';
import { AppsRhombusTwoToneIcon } from '@tkeel/console-icons';
import {
  useConfigThemeColorsQuery,
  useUpdatePortalConfigMutation,
} from '@tkeel/console-request-hooks';

import ButtonStack from '@/tkeel-console-plugin-admin-custom-config/components/ButtonStack';

import HexColorInput, { getThemeColors } from './components/HexColorInput';
import PreviewPanel from './components/PreviewPanel';

interface ExtraThemeColors {
  primary?: string;
  brand?: ColorHues;
}

interface CustomColor extends Colors {
  primary: string;
}

export default function ThemeColorConfig() {
  const { colors: themeColors }: { colors: CustomColor } = useTheme();
  const defaultColor = themeColors.primary;
  const [color, setColor] = useState(defaultColor);

  const defaultColors = getThemeColors(defaultColor);
  const [colors, setColors] = useState(defaultColors);

  const [enableColorCoordination, setEnableColorCoordination] = useState(false);

  useConfigThemeColorsQuery({
    onSuccess(data) {
      setEnableColorCoordination(data.data.value.enableColorCoordination);
    },
  });

  const { mutate: mutatePortalConfig } = useUpdatePortalConfigMutation({
    key: 'theme',
    path: 'colors',
    onSuccess() {
      window.location.reload();
    },
  });

  const handleUpdateThemeColors = ({
    extraThemeColors = {},
    enableCoordination,
  }: {
    extraThemeColors?: ExtraThemeColors;
    enableCoordination?: boolean;
  }) => {
    mutatePortalConfig({
      data: {
        ...extraThemeColors,
        enableColorCoordination: enableCoordination,
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

    if (!enableColorCoordination) {
      brand[500] = color;
    }

    const primary = brand[500] as string;
    const extraThemeColors: ExtraThemeColors = {
      primary,
      brand: brand as ColorHues,
    };
    handleUpdateThemeColors({
      extraThemeColors,
      enableCoordination: enableColorCoordination,
    });
  };

  const navigate = useNavigate();
  const labelStyle: StyleProps = {
    color: 'gray.800',
    fontSize: '14px',
    fontWeight: '600',
  };

  const descStyle: StyleProps = {
    marginTop: '4px',
    marginBottom: '7px',
    color: 'gray.500',
    fontSize: '12px',
  };

  return (
    <Flex flex="1">
      <Flex
        flexDirection="column"
        width="360px"
        flexShrink={0}
        backgroundColor="white"
      >
        <Flex
          position="relative"
          flexDirection="column"
          justifyContent="space-between"
          height="108px"
          padding="16px 20px 20px"
          backgroundColor="gray.50"
        >
          <BackButton marginLeft="-6px" onClick={() => navigate('/')} />
          <Flex alignItems="center">
            <AppsRhombusTwoToneIcon size={22} />
            <Text
              marginLeft="6px"
              color="gray.700"
              fontSize="16px"
              fontWeight="600"
            >
              主题色配置
            </Text>
          </Flex>
          <BasicInfoBg />
        </Flex>
        <Flex flex="1" flexDirection="column" padding="20px 24px">
          <Text {...labelStyle}>颜色编号</Text>
          <Text {...descStyle}>
            如果您有固定的品牌色，可直接输入对应的十六进制颜色编号，默认为系统主题色
          </Text>
          <HexColorInput
            color={color}
            setColor={setColor}
            setColors={setColors}
          />
          <Text marginTop="24px" {...labelStyle}>
            自定义颜色
          </Text>
          <Text {...descStyle} marginBottom="14px">
            或者您可以调整下方工具滑块，挑选您的目标颜色
          </Text>
          <HexColorPicker
            color={color}
            onChange={(value) => {
              setColor(value);
              setColors(getThemeColors(value));
            }}
          />
          <Checkbox
            marginTop="16px"
            isChecked={enableColorCoordination}
            onChange={(e) => {
              setEnableColorCoordination(e.target.checked);
            }}
          >
            <Text color="gray.500" fontSize="12px">
              开启颜色协调
            </Text>
          </Checkbox>
          <ButtonStack
            sx={{ marginTop: '24px' }}
            onConfirm={onConfirm}
            onReset={() => handleUpdateThemeColors({})}
          />
        </Flex>
      </Flex>
      <Tabs
        display="flex"
        flexDirection="column"
        marginLeft="20px"
        flex="1"
        borderTopLeftRadius="4px"
        borderTopRightRadius="4px"
        boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05);"
        backgroundColor="white"
      >
        <CustomTabList>
          <CustomTab borderTopLeftRadius="4px" width="110px">
            效果预览
          </CustomTab>
          <CustomTab width="110px">颜色声明</CustomTab>
        </CustomTabList>
        <TabPanels
          flex="1"
          overflow="hidden"
          borderBottomLeftRadius="4px"
          borderBottomRightRadius="4px"
        >
          <TabPanel height="100%">
            <PreviewPanel />
          </TabPanel>
          <TabPanel>颜色声明</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
