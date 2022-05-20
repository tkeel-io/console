import { Box, Flex, RadioGroup, Text } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, Radio } from '@tkeel/console-components';
import type { CommonConfig as CommonConfigType } from '@tkeel/console-constants';
import { useDeletePortalConfigMutation } from '@tkeel/console-request-hooks';

import ButtonStack from '@/tkeel-console-plugin-admin-custom-config/components/ButtonStack';

import CommonConfigItem from '../CommonConfigItem';
import UploadInput from '../UploadInput';

const { TextareaField } = FormField;

interface ConfigField {
  slogan: string;
}

interface Props {
  config: CommonConfigType;
  setConfig: Dispatch<SetStateAction<CommonConfigType>>;
  onConfirm: () => unknown;
}

export default function CommonConfig({ config, setConfig, onConfirm }: Props) {
  const { mutate } = useDeletePortalConfigMutation({
    path: 'config.common',
    onSuccess() {
      window.location.reload();
    },
  });

  const { register, trigger, setValue } = useForm<ConfigField>();

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      onConfirm();
    }
  };

  useEffect(() => {
    setValue('slogan', config.slogan);
  }, [config, setValue]);

  return (
    <Box>
      <CommonConfigItem
        title="Logo-品牌图标"
        desc="格式支持 png/jpg/jpeg/gif/svg/webp，大小不能超过 100K，尺寸比例为正方形，最佳为 96px*96px。"
        formField={
          <UploadInput
            src={config.logoMark}
            setSrc={(src) => setConfig({ ...config, logoMark: src })}
          />
        }
      />
      <CommonConfigItem
        title="Slogan-品牌标语（非必填）"
        desc="Slogan 用于平台登录页面。"
        formField={
          <TextareaField
            id="slogan"
            registerReturn={register('slogan', {
              onChange(e: ChangeEvent<HTMLTextAreaElement>) {
                setConfig({ ...config, slogan: e.target.value });
              },
            })}
          />
        }
        styles={{ wrapper: { marginTop: '24px' } }}
      />
      <CommonConfigItem
        title="背景图片"
        desc="格式支持 png/jpg/jpeg/gif/svg/webp，大小不能超过 1M，尺寸比例为正方形，最佳为 900px*900px。"
        formField={
          <UploadInput
            src={config.backgroundImage}
            setSrc={(src) => setConfig({ ...config, backgroundImage: src })}
            maxSize={1024}
          />
        }
      />
      <Text marginTop="16px" color="gray.700" fontSize="12px" lineHeight="20px">
        选择背景 Logo
      </Text>
      <RadioGroup
        marginTop="6px"
        onChange={(value: 'logoTypeLight' | 'logoTypeDark' | 'noLogo') => {
          setConfig({
            ...config,
            backgroundImageLogo: value,
          });
        }}
        value={config.backgroundImageLogo}
      >
        <Flex justifyContent="space-between">
          <Radio value="logoTypeLight">浅色版 Logo</Radio>
          <Radio value="logoTypeDark">深色版 Logo</Radio>
          <Radio value="noLogo">不启用 Logo</Radio>
        </Flex>
      </RadioGroup>
      <ButtonStack
        onConfirm={handleConfirm}
        onReset={() => mutate({})}
        styles={{ wrapper: { marginTop: '26px' } }}
      />
    </Box>
  );
}
