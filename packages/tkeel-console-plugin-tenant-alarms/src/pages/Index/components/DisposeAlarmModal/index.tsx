import { Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';

const { TextareaField } = FormField;

export interface DisposeAlarmModalForm {
  handOpinions: string;
}

export interface Props {
  isOpen: boolean;
  isConfirmButtonLoading?: boolean;
  handOpinions: string | null;
  onClose: () => unknown;
  onSubmit: (value: DisposeAlarmModalForm) => void;
}

function DisposeAlarmModal({
  isOpen,
  onClose,
  isConfirmButtonLoading,
  handOpinions,
  onSubmit,
}: Props) {
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<DisposeAlarmModalForm>({
    defaultValues: {
      handOpinions: handOpinions || '',
    },
  });

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      if (onSubmit) onSubmit(formValues);
    }
  };

  return (
    <Modal
      title="告警处理"
      isOpen={isOpen}
      onClose={onClose}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onConfirm={handleConfirm}
      isConfirmButtonDisabled={isConfirmButtonLoading}
      modalBodyStyle={{ padding: '30px 40px 24px' }}
      width="600px"
      footer={null}
    >
      <Text fontSize="14px" color="gray.700" lineHeight="24px" mb="8px">
        此告警已完成处理或已修复告警？请填写处理意见
      </Text>
      <TextareaField
        registerReturn={register('handOpinions', {
          required: { value: true, message: '请填写处理意见' },
        })}
        error={errors.handOpinions}
        placeholder="请输入"
        id="handOpinions"
        inputStyle={{ height: '160px' }}
        label=""
      />
    </Modal>
  );
}

export default DisposeAlarmModal;
