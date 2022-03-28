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
  const { control, getValues } = useForm<FormValues>();

  const handleConfirm = async () => {
    const ruleId = getValues('ruleId');
    onConfirm(ruleId);
  };

  return (
    <Modal
      title="移动订阅"
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={() => {
        onClose();
      }}
      onConfirm={handleConfirm}
    >
      <SelectField<FormValues>
        id="ruleId"
        name="ruleId"
        label="规则名称"
        defaultValue={defaultValue}
        options={data || []}
        control={control}
        formControlStyle={{ marginTop: '20px' }}
      />
    </Modal>
  );
}
