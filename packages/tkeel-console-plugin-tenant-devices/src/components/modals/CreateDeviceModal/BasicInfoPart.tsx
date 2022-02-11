// eslint-disable-next-line import/no-extraneous-dependencies
import { UseFormReturn } from 'react-hook-form';
import { Checkbox, Text } from '@chakra-ui/react';
import { FormControl, FormField } from '@tkeel/console-components';

import { DeviceValueType } from './types';

const { TextField, SelectField } = FormField;

interface Props {
  formHandler: UseFormReturn<DeviceValueType, object>;
}
export default function BasicInfoPart({ formHandler }: Props) {
  const { register, watch, formState } = formHandler;
  const { errors } = formState;
  const watchFields = watch();
  // eslint-disable-next-line no-console
  console.log('watchFields', watchFields);
  return (
    <>
      <TextField
        id="name"
        label="设备组名称"
        registerReturn={register('name', {
          required: { value: true, message: 'required' },
        })}
        error={errors.name}
      />
      <SelectField
        id="parent"
        label="父设备组"
        options={[{ value: 1, label: '默认设备组' }]}
        registerReturn={register('parent', {
          required: { value: true, message: 'required' },
        })}
        error={errors.parent}
      />
      <SelectField
        label="设备连接方式"
        id="directConnection"
        options={[
          { value: 1, label: '直连' },
          { value: 0, label: '非直连' },
        ]}
        registerReturn={register('directConnection', {
          required: { value: true, message: 'required' },
        })}
        error={errors.directConnection}
      />
      <FormControl id="useTemplate">
        <Checkbox
          colorScheme="primary"
          registerReturn={register('useTemplate')}
        >
          <Text color="gray.600" fontSize="14px">
            使用设备模版
          </Text>
        </Checkbox>
      </FormControl>
      <FormControl id="selfLearn">
        <Checkbox
          colorScheme="primary"
          color="gray.600"
          registerReturn={register('selfLearn', {})}
        >
          <Text color="gray.600" fontSize="14px">
            自学习模式
          </Text>
        </Checkbox>
      </FormControl>
      {/* <TextareaField
        name="desc"
        id="desc"
        label="描述"
        placeholder="请输入"
        registerReturn={register('desc')}
        error={errors.desc}
      /> */}
    </>
  );
}
