import { Box, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';

import ConfigItem from '../ConfigItem';
import UploadInput from '../UploadInput';

const { TextareaField } = FormField;

type ConfigField = {
  companyName: string;
  slogan: string;
};

export default function CommonConfig() {
  const [logo, setLogo] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
  } = useForm<ConfigField>();
  return (
    <Box>
      <ConfigItem
        title="Logo-品牌图标"
        desc="大小不能超过 100K，格式最佳为 png 同样支持 jpg/jpeg/gif/svg ，尺寸比例为正方形，最佳为 96px*96px 。"
        formField={
          <UploadInput src={logo || ''} setSrc={(src) => setLogo(src)} />
        }
      />
      <ConfigItem
        title="Slogan"
        desc="Slogan 将用在一些登录欢迎页。"
        formField={
          <TextareaField
            id="companyName"
            error={errors.slogan}
            registerReturn={register('companyName', {
              required: { value: true, message: '请输入 Slogan' },
            })}
          />
        }
        styles={{ wrapper: { marginTop: '24px' } }}
      />
      <ConfigItem
        title="Logo"
        desc="建议上传 1M 以内的 jpg/jpeg/gif/png/svg 作为您公司的Logo ，图片大小建议为 96px*96px 。"
        formField={<Input type="file" />}
      />
    </Box>
  );
}
