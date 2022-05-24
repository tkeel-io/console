import { ChangeEvent } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { FormField } from '@tkeel/console-components';

import PlatformConfigItem from '../PlatformConfigItem';

const { TextField } = FormField;

export interface PlatformConfigField {
  tenantPlatformName: string;
  adminPlatformName: string;
}

type Platform = 'admin' | 'tenant';
interface Props {
  platform: Platform;
  title: string;
  id: keyof PlatformConfigField;
  error: FieldError;
  register: UseFormRegister<PlatformConfigField>;
  updatePlatformConfig: ({
    platform,
    key,
    value,
  }: {
    platform: Platform;
    key: string;
    value: string;
  }) => unknown;
}

export default function PlatformNameConfigItem({
  title,
  id,
  error,
  register,
  updatePlatformConfig,
  platform,
}: Props) {
  return (
    <PlatformConfigItem
      title={title}
      showInformationIcon={false}
      formField={
        <TextField
          id={id}
          error={error}
          registerReturn={register(id, {
            required: { value: true, message: `请输入${title}` },
            onChange(e: ChangeEvent<HTMLInputElement>) {
              updatePlatformConfig({
                platform,
                key: 'platformName',
                value: e.target.value,
              });
            },
          })}
        />
      }
    />
  );
}
