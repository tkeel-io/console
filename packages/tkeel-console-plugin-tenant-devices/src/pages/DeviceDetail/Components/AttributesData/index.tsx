import { Box } from '@chakra-ui/react';

import { Empty } from '@tkeel/console-components';

// import { Attributes } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import AddAttributeButton from './components/AddAttributeButton';

type Props = {
  deviceName: string;
  refetch?: () => void;
};

function AttributesPanel({ deviceName, refetch }: Props) {
  return (
    <Box>
      <Empty
        description={
          <Box>
            <Box display="inline" color="gray.700" fontWeight="500">
              [{deviceName}]&nbsp;
            </Box>
            暂无属性数据,可手动添加
          </Box>
        }
        styles={{
          wrapper: { height: '60%' },
          title: { marginTop: '0' },
          content: { marginTop: '20px' },
        }}
        title=""
        content={<AddAttributeButton refetch={refetch} />}
      />
    </Box>
  );
}

export default AttributesPanel;
