// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FormField } from '@tkeel/console-components';
// import { KafkaFilledIcon } from '@tkeel/console-icons';
// import { plugin } from '@tkeel/console-utils';
// import useVerifyKafkaMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useVerifyKafkaMutation';
import StepModal from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/StepModal';

// import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';
import AddressVerify from './AddressVerify';
import CreateFinished from './CreateFinished';
import MappingRelation from './MappingRelation';

// const { TextField } = FormField;

export interface FormValues {
  address: string;
  topic: string;
}

type Props = {
  onClose: () => unknown;
};

const stepBarInfo = [
  { key: '1', name: '地址验证' },
  { key: '2', name: '映射关系' },
  { key: '3', name: '创建完成' },
];

// const onPrev = (e: number) => {
//   console.log(e);
// };
// const onNext = (e: number) => {
//   console.log(e);
// };

export default function RepublishToMysqlModal({ onClose }: Props) {
  return (
    <StepModal
      title="转发到MySQL"
      stepBarInfo={stepBarInfo}
      onClose={onClose}
      // onPrev={onPrev}
      // onNext={onNext}
      // onOk={() => {}}
      isOpen
      // isLoading={isLoading}
      // handleSubmit={handleSubmit}
    >
      <AddressVerify />
      <MappingRelation />
      <CreateFinished />
    </StepModal>
  );
}
