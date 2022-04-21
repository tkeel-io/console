import { useForm } from 'react-hook-form';

import { AceEditor, FormField, Modal } from '@tkeel/console-components';
import { IdProviderType } from '@tkeel/console-types';

import { ID_PROVIDER_TYPES } from '@/tkeel-console-plugin-admin-tenants/constants';

const { SelectField } = FormField;

type FormValues = {
  type: IdProviderType;
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
        options={ID_PROVIDER_TYPES}
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
