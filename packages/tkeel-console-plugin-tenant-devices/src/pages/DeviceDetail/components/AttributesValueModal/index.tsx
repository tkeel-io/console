import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

const { TextField } = FormField;

interface Props {
  isOpen: boolean;
  onClose: () => unknown;
  defaultValue: string;
  onConfirm: (values: string, cb?: () => void) => void;
}

export default function AttributesValueModal({
  isOpen,
  onClose,
  defaultValue = '',
  onConfirm,
}: Props) {
  const {
    register,
    trigger,
    getValues,
    setError,
    formState: { errors },
  } = useForm<{
    value: string;
  }>();

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      if (formValues.value === defaultValue) {
        setError('value', {
          type: 'custom',
          message: '请修改属性值',
        });
      } else {
        onConfirm(formValues.value, onClose);
      }
    }
  };

  return (
    <Modal
      title="编辑属性值"
      isOpen={isOpen}
      onClose={onClose}
      modalBodyStyle={{ padding: '20px 40px' }}
      width="600px"
      onConfirm={handleConfirm}
      footer={null}
    >
      <TextField
        label="属性值"
        id="value"
        defaultValue={defaultValue}
        error={errors.value}
        registerReturn={register('value')}
      />
    </Modal>
  );
}
