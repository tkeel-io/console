import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';

import ButtonStack from '@/tkeel-console-plugin-admin-custom-config/components/ButtonStack';

import CommonConfigItem from '../CommonConfigItem';
import UploadInput from '../UploadInput';

const { TextareaField } = FormField;

interface ConfigField {
  slogan: string;
}

const handleReset = () => {
  // eslint-disable-next-line no-console
  console.log('reset');
};

export interface Config {
  logoMark: string;
  slogan: string;
  backgroundImage: string;
}

interface Props {
  config: Config;
  updateConfig: (config: Config) => unknown;
}

export default function CommonConfig({ config, updateConfig }: Props) {
  const [logoMark, setLogoMark] = useState('');
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    setValue,
  } = useForm<ConfigField>();

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const { slogan } = getValues();
      updateConfig({
        logoMark,
        slogan,
        backgroundImage,
      });
    }
  };

  useEffect(() => {
    setLogoMark(config.logoMark);
    setBackgroundImage(config.backgroundImage);
    setValue('slogan', config.slogan);
  }, [config, setValue]);

  return (
    <Box>
      <CommonConfigItem
        title="Logo-品牌图标"
        desc="大小不能超过 100K，格式最佳为 png 同样支持 jpg/jpeg/gif/svg ，尺寸比例为正方形，最佳为 96px*96px 。"
        formField={
          <UploadInput
            src={logoMark}
            setSrc={(src) => setLogoMark(src)}
            styles={{ image: { width: '54px' } }}
          />
        }
      />
      <CommonConfigItem
        title="Slogan-品牌标语（非必填）"
        desc="Slogan 将用在一些登录欢迎页。"
        formField={
          <TextareaField
            id="slogan"
            error={errors.slogan}
            registerReturn={register('slogan', {
              required: { value: true, message: '请输入 Slogan' },
            })}
          />
        }
        styles={{ wrapper: { marginTop: '24px' } }}
      />
      <CommonConfigItem
        title="背景图片"
        desc="大小不能超过 1M，格式最佳为 JPG 同样支持 jpeg/gif/png/svg ，尺寸比例为长方形，最佳为 800px*900px。"
        formField={
          <UploadInput
            src={backgroundImage}
            setSrc={(src) => setBackgroundImage(src)}
          />
        }
      />
      <ButtonStack
        onConfirm={handleConfirm}
        onReset={handleReset}
        styles={{ wrapper: { marginTop: '26px' } }}
      />
    </Box>
  );
}
