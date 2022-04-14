import { useState } from 'react';

import { ClickHouseFilledIcon, MySqlFilledIcon } from '@tkeel/console-icons';

import useVerifyAddressMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useVerifyAddressMutation';
import useMappingQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useMappingQuery';
import StepModal from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/StepModal';

import AddressVerify, { AddressFormValues } from './AddressVerify';
import CreateFinished from './CreateFinished';
// import MappingRelation, { MapFormValues } from './MappingRelation';
import MappingRelation from './MappingRelation';

type Props = {
  republishType: number;
  onClose: () => unknown;
};

export default function RepublishToMysqlModal({
  republishType,
  onClose,
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
      interfaceType: 'clickHouse',
      icon: <ClickHouseFilledIcon size={28} />,
    },
  ];
  const republishTitle = `转发到 ${republishInfo[republishType].title}`;

  const [step, setStep] = useState(1);
  // const [timeCount, setTimeCount] = useState(false);
  const [verifyId, setVerifyId] = useState('');

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
  const onPrev = () => {
    setStep((p: number) => p - 1);
  };
  // const onNext = () => {
  //   e: MapFormValues
  //   console.log('jj', e);
  //   setStep((p: number) => p + 1);
  //   setTimeCount(true);
  // };

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
        // onNext={onNext}
        isLoading={isLoading}
        // verifyId={verifyId}
        mappingData={mappingData && mappingData[0]}
      />
      <CreateFinished onClose={onClose} />
      {/* <CreateFinished onClose={onClose} isTime={timeCount} /> */}
    </StepModal>
  );
}
