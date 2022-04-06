import { Box } from '@chakra-ui/react';

import { Empty } from '@tkeel/console-components';

import CreateDeviceButton from '../CreateDeviceButton';

type Props = {
  title: string;
  refetchData: () => unknown;
};

export default function DeviceEmpty({ title, refetchData }: Props) {
  return (
    <Empty
      description={
        <Box>
          <Box display="inline" color="gray.600" fontWeight="500">
            [{title}]
          </Box>
          暂无设备,可手动添加
        </Box>
      }
      styles={{
        wrapper: { height: '100%' },
        content: { marginTop: '10px' },
      }}
      title=""
      content={
        <Box mt="20px">
          <CreateDeviceButton key="create" refetchData={refetchData} />
        </Box>
      }
    />
  );
}
