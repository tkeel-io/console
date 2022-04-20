import { Switch, Text } from '@chakra-ui/react';

import { plugin } from '@tkeel/console-utils';

import useUpdateDeviceMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useUpdateDeviceMutation';
import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
import { BasicInfo } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

interface Props {
  deviceId: string;
}

export default function SetSelfLearnButton({ deviceId }: Props) {
  const { deviceObject, refetch } = useDeviceDetailQuery({ id: deviceId });
  const properties = deviceObject?.properties;
  const basicInfo = properties?.basicInfo;
  const toast = plugin.getPortalToast();

  const { mutate, isLoading } = useUpdateDeviceMutation({
    id: deviceId,
    onSuccess: () => {
      toast.success('操作成功');
      refetch();
    },
  });

  const onSubmit = (checked: boolean) => {
    if (deviceObject) {
      const data = {
        ...basicInfo,
        selfLearn: checked,
      };
      mutate({ data: data as BasicInfo });
    }
  };
  return (
    <>
      <Switch
        colorScheme="primary"
        id="selfLearn"
        size="sm"
        isChecked={basicInfo?.selfLearn ?? false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { checked } = e.target;

          onSubmit(checked);
        }}
        isDisabled={isLoading}
      />
      <Text color="gray.700" fontSize="12px" ml="8px">
        自学习
      </Text>
    </>
  );
}
