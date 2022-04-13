import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

const { SelectField } = FormField;

type FormValues = {
  ruleId: string;
};

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  data?: { label: string; value: string }[];
  defaultValue: string;
  onConfirm: (ruleId: string) => unknown;
};

export default function MoveRoutingRuleModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  data,
  defaultValue,
  onConfirm,
}: Props) {
  const {
    control,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormValues>();

  const handleConfirm = async () => {
    const result = await trigger('ruleId');
    if (result) {
      const ruleId = getValues('ruleId');
      onConfirm(ruleId);
    }
  };

  const options = data || [];

  return (
    <Modal
      title="移动路由"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={() => {
        onClose();
      }}
      onConfirm={handleConfirm}
      isConfirmButtonDisabled={options.length === 0}
    >
      <SelectField<FormValues>
        id="ruleId"
        name="ruleId"
        label="规则名称"
        defaultValue={defaultValue}
        options={options}
        control={control}
        error={errors.ruleId}
        rules={{
          required: { value: true, message: '规则名称为空' },
        }}
        formControlStyle={{ marginTop: '20px' }}
      />
    </Modal>
  );
}
