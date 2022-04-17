import { useState } from 'react';

import { ClickHouseFilledIcon, MySqlFilledIcon } from '@tkeel/console-icons';

import useVerifyAddressMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useVerifyAddressMutation';
import useMappingQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useMappingQuery';
import StepModal from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/StepModal';

import AddressVerify, { AddressFormValues } from './AddressVerify';
import CreateFinished from './CreateFinished';
import MappingRelation, { FiledItem } from './MappingRelation';

type Props = {
  republishType: number;
  ruleId: string;
  deviceTemplateId: string;
  onClose: () => unknown;
  refetch: () => void;
};

export default function RepublishToMysqlModal({
  republishType,
  ruleId,
  deviceTemplateId,
  onClose,
  refetch,
}: Props) {
  const stepBarInfo = [
    { key: '1', name: '地址验证' },
    { key: '2', name: '映射关系' },
    { key: '3', name: '创建完成' },
  ];

  const republishInfo = [
    {
      title: 'MySQL',
      interfaceType: 'mysql',
      icon: <MySqlFilledIcon size={44} />,
    },
    {
      title: 'ClickHouse',
      interfaceType: 'clickhouse',
      icon: <ClickHouseFilledIcon size={28} />,
    },
  ];
  const republishTitle = `转发到 ${republishInfo[republishType].title}`;

  const [step, setStep] = useState(1);
  const [verifyId, setVerifyId] = useState('');
  const [reFields, setReFields] = useState<FiledItem[]>([]);

  const { mappingData, isLoading } = useMappingQuery(verifyId);

  const { mutate } = useVerifyAddressMutation({
    interfaceType: republishInfo[republishType].interfaceType,
    onSuccess(data) {
      const dataId = data?.data.id;
      setVerifyId(dataId);
      setStep((p: number) => p + 1);
    },
  });

  const onVerify = (e: AddressFormValues) => {
    mutate({
      data: {
        urls: e.address,
        meta: {
          user: e.userName,
          password: e.passWord,
          db_name: e.name,
        },
      },
    });
  };
  const onPrev = (e: FiledItem[] | []) => {
    setReFields(e);
    setStep((p: number) => p - 1);
  };
  const onNext = () => {
    setStep((p: number) => p + 1);
    setTimeout(() => onClose(), 5000);
    refetch();
  };

  return (
    <StepModal
      title={republishTitle}
      stepBarInfo={stepBarInfo}
      step={step}
      onClose={onClose}
      isOpen
    >
      <AddressVerify
        onVerify={onVerify}
        title={republishInfo[republishType].title}
        icon={republishInfo[republishType].icon}
      />
      <MappingRelation
        onPrev={onPrev}
        onNext={onNext}
        isLoading={isLoading}
        ruleId={ruleId}
        deviceTemplateId={deviceTemplateId}
        verifyId={verifyId}
        reFields={reFields}
        mappingData={mappingData}
        interfaceType={republishInfo[republishType].interfaceType}
      />
      <CreateFinished onClose={onClose} />
    </StepModal>
  );
}
