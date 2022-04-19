import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

const { TextareaField } = FormField;
export type UpstreamFormField = {
  upstream: string;
};
interface Props {
  onClose: () => void;
  isOpen: boolean;
  onSubmit: (value: UpstreamFormField) => void;
  isLoading: boolean;
}

export default function UpstreamDataModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: Props) {
  const { register, getValues, trigger } = useForm<UpstreamFormField>();
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      onSubmit(formValues);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="下行反控"
      onConfirm={onConfirm}
      isConfirmButtonLoading={isLoading}
    >
      <TextareaField
        registerReturn={register('upstream', {
          required: { value: true, message: '请填写上行数据' },
        })}
        id="upstream"
        label="请输入下行数据"
      />
    </Modal>
  );
}
