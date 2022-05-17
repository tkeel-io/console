import { Box } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';
import type { CommonConfig as CommonConfigType } from '@tkeel/console-constants';
import { useDeletePortalConfigMutation } from '@tkeel/console-request-hooks';

import ButtonStack from '@/tkeel-console-plugin-admin-custom-config/components/ButtonStack';

import CommonConfigItem from '../CommonConfigItem';
import UploadInput from '../UploadInput';

const { TextareaField } = FormField;

interface ConfigField {
  slogan: string;
}

export interface Config {
  logoMark: string;
  slogan: string;
  backgroundImage: string;
}

interface Props {
  config: Config;
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
        desc="大小不能超过 100K，格式最佳为 png 同样支持 jpg/jpeg/gif/svg ，尺寸比例为正方形，最佳为 96px*96px 。"
        formField={
          <UploadInput
            src={config.logoMark}
            setSrc={(src) => setConfig({ ...config, logoMark: src })}
          />
        }
      />
      <CommonConfigItem
        title="Slogan-品牌标语（非必填）"
        desc="Slogan 将用在一些登录欢迎页。"
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
        desc="大小不能超过 1M，格式最佳为 jpg 同样支持 jpeg/gif/png/svg ，尺寸比例为正方形，最佳为 900px*900px。"
        formField={
          <UploadInput
            src={config.backgroundImage}
            setSrc={(src) => setConfig({ ...config, backgroundImage: src })}
            maxSize={1024}
          />
        }
      />
      <ButtonStack
        onConfirm={handleConfirm}
        onReset={() => mutate({})}
        styles={{ wrapper: { marginTop: '26px' } }}
      />
    </Box>
  );
}
