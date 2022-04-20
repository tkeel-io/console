import { useForm } from 'react-hook-form';

import { AceEditor, FormField, Modal } from '@tkeel/console-components';
import { AuthConfigType } from '@tkeel/console-types';

import { AUTH_CONFIG_TYPES } from '@/tkeel-console-plugin-admin-tenants/constants';

const { SelectField } = FormField;

type FormValues = {
  type: AuthConfigType;
  config: string;
};

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  defaultValues?: FormValues;
  onClose: () => void;
  onConfirm: (formValues: FormValues) => void;
};

export default function ConfigModal({
  isOpen,
  isConfirmButtonLoading,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const {
    control,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues,
  });

  /* const handleChange = () => {
    setConfig(v);
  }; */

  const handleConfirm = () => {
    const formValues = getValues();
    onConfirm(formValues);
  };

  return (
    <Modal
      isOpen={isOpen}
      title="设置配置"
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <SelectField<FormValues>
        id="type"
        name="type"
        options={AUTH_CONFIG_TYPES.map(({ key, name }) => ({
          value: key,
          label: name,
        }))}
        control={control}
        error={errors.type}
      />
      <AceEditor
        // value={config}
        language="yaml"
        height="584px"
        readOnly={false}
        // onChange={handleChange}
      />
    </Modal>
  );
}
