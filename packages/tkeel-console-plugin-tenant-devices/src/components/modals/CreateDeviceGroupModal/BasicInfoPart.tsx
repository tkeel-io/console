/* eslint-disable import/no-extraneous-dependencies */
import { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '@tkeel/console-components';

import { RequestData as GroupInfo } from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceGroupMutation';

interface Props {
  groupInfo: GroupInfo;
  setGroupInfo: (params: { key: string; value: unknown }) => void;
}

const { TextField, SelectField, TextareaField } = FormField;

export default function BasicInfoPart({ groupInfo, setGroupInfo }: Props) {
  const { name, desc, parent } = groupInfo;
  const { register } = useForm();
  return (
    <>
      <TextField
        id="name"
        value={name}
        label="设备组名称"
        schemas={register('name', {
          required: { value: true, message: 'required' },
        })}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setGroupInfo({ key: 'name', value: e.target.value });
        }}
      />
      <SelectField
        id="parent"
        label="父设备组"
        value={parent}
        options={[{ value: 1, label: '默认设备组' }]}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          setGroupInfo({ key: 'parent', value: e.target.value });
        }}
      />
      <TextareaField
        value={desc}
        id="desc"
        label="描述"
        placeholder="请输入"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setGroupInfo({ key: 'desc', value: e.target.value });
        }}
      />
    </>
  );
}
