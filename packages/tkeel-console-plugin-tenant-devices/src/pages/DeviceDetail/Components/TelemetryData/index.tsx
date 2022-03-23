import { Box } from '@chakra-ui/react';
import { isEmpty } from 'lodash';

import { Empty, PageHeaderToolbar } from '@tkeel/console-components';

import {
  Telemetry,
  TelemetryItem,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import AddTelemetryButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/AddTelemetryButton';

import TelemetryDataTable from './TelemetryDataTable';

type Props = {
  deviceId: string;
  deviceName: string;
  refetch?: () => void;
  telemetryFields: TelemetryItem[];
  telemetryValues: Telemetry;
};
export default function TelemetryData({
  deviceId,
  deviceName,
  refetch: refetchDeviceDetail = () => {},
  telemetryFields,
  telemetryValues,
}: Props) {
  return (
    <Box>
      {isEmpty(telemetryFields) ? (
        <Empty
          description={
            <Box>
              <Box display="inline" color="gray.700" fontWeight="500">
                [{deviceName}]&nbsp;
              </Box>
              暂无遥测数据,可手动添加
            </Box>
          }
          styles={{
            wrapper: { height: '60%' },
            title: { marginTop: '0' },
            content: { marginTop: '20px' },
          }}
          title=""
          content={
            <AddTelemetryButton id={deviceId} refetch={refetchDeviceDetail} />
          }
        />
      ) : (
        <>
          <PageHeaderToolbar
            styles={{
              wrapper: { height: '32px', marginBottom: '12px' },
              title: { fontSize: '14px' },
            }}
            name="遥测数据"
            hasSearchInput
            searchInputProps={{
              onSearch() {},
            }}
            buttons={[
              <AddTelemetryButton
                key="add"
                id={deviceId}
                refetch={refetchDeviceDetail}
              />,
            ]}
          />
          <TelemetryDataTable
            telemetryFields={telemetryFields}
            telemetryValues={telemetryValues}
            deviceId={deviceId}
            refetch={refetchDeviceDetail}
          />
        </>
      )}
    </Box>
  );
}
