import { useState } from 'react';

import { ClickHouseFilledIcon, MySqlFilledIcon } from '@tkeel/console-icons';

import useVerifyAddressMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useVerifyAddressMutation';
import useMappingQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useMappingQuery';
import { PublishedFields } from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleTargetsQuery';
import StepModal from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/StepModal';

import AddressVerify, { AddressFormValues } from './AddressVerify';
import CreateFinished from './CreateFinished';
import MappingRelation, { FiledItem } from './MappingRelation';

type PublishedInfo = {
  targetId: string;
  fields: PublishedFields[] | [];
  address: string;
  name: string;
  mapping: string;
};
type Props = {
  modalKey: string;
  republishType: number;
  ruleId: string;
  deviceTemplateId: string;
  isOpen: boolean;
  publishedInfo?: PublishedInfo;
  onClose: () => unknown;
  refetchData?: () => void;
  refetch?: () => void;
};

let timer = 0;
export default function RepublishToMysqlModal({
  modalKey,
  republishType,
  ruleId,
  deviceTemplateId,
  publishedInfo,
  isOpen,
  onClose: onMClose,
  refetch,
  refetchData,
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
  const onClose = () => {
    onMClose();
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
  };

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
    timer = window.setTimeout(() => {
      setStep(1);
      if (step !== 1) onClose();
    }, 5000);
    if (refetch) refetch();
    if (refetchData) refetchData();
  };
  return (
    <StepModal
      title={republishTitle}
      stepBarInfo={stepBarInfo}
      step={step}
      onClose={() => {
        setStep(1);
        onClose();
      }}
      isOpen={isOpen}
    >
      <AddressVerify
        modalKey={modalKey}
        onVerify={onVerify}
        title={republishInfo[republishType].title}
        icon={republishInfo[republishType].icon}
        defaultValues={{
          address: publishedInfo?.address ?? '',
          name: publishedInfo?.name ?? '',
        }}
      />
      <MappingRelation
        modalKey={modalKey}
        onPrev={onPrev}
        onNext={onNext}
        isLoading={isLoading}
        ruleId={ruleId}
        deviceTemplateId={deviceTemplateId}
        verifyId={verifyId}
        targetId={publishedInfo?.targetId}
        reFields={reFields}
        mappingData={mappingData}
        defaultValues={{
          mapping: publishedInfo?.mapping ?? '',
        }}
        publishedFieldsData={publishedInfo?.fields ?? []}
        interfaceType={republishInfo[republishType].interfaceType}
      />
      <CreateFinished
        databaseName={republishInfo[republishType].title}
        onClose={() => {
          setStep(1);
          onClose();
        }}
      />
    </StepModal>
  );
}
