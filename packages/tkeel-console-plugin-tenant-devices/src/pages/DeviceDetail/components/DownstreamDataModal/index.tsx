import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

const { TextareaField } = FormField;
export type DownstreamFormField = {
  downstream: string;
};
interface Props {
  onClose: () => void;
  isOpen: boolean;
  onSubmit: (value: DownstreamFormField) => void;
  isLoading: boolean;
}

export default function DownstreamDataModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: Props) {
  const { register, getValues, trigger } = useForm<DownstreamFormField>();
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
        registerReturn={register('downstream', {
          required: { value: true, message: '请填写下行数据' },
        })}
        id="downstream"
        label="请输入下行数据"
      />
    </Modal>
  );
}
