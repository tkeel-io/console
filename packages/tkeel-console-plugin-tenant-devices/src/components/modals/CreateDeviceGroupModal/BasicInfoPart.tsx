import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { FormField } from '@tkeel/console-components';

const { TextField, SelectField, TextareaField } = FormField;

export default function BasicInfoPart() {
  const [groupName, setGroupName] = useState('');
  const [groupParent, setGroupParent] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const handleGroupNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };
  const handleGroupParentChange: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setGroupParent(e.target.value);
  };
  const handleDescChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setGroupDesc(e.target.value);
  };
  return (
    <>
      <TextField
        id="groupName"
        value={groupName}
        label="设备组名称"
        onChange={handleGroupNameChange}
      />
      <SelectField
        id="parent"
        label="父设备组"
        value={groupParent}
        options={[{ value: 1, label: '默认设备组' }]}
        onChange={handleGroupParentChange}
      />
      <TextareaField
        value={groupDesc}
        id="desc"
        label="描述"
        placeholder="请输入"
        onChange={handleDescChange}
      />
    </>
  );
}
