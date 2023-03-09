import { Flex, useDisclosure } from '@chakra-ui/react';
import { merge } from 'lodash';
import qs from 'qs';
import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { TelemetryDetailDrawer } from '@tkeel/console-business-components';

import useDeviceDetailQuery from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery';
import {
  BasicInfo,
  // RawData as RawDataType,
  SysField,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import useDeviceDetailSocket from '@/tkeel-console-plugin-tenant-devices/hooks/websockets/useDeviceDetailSocket';

import DeviceDetailLeftPanel from './components/DeviceDetailLeftPanel';
import DeviceDetailRightPanel from './components/DeviceDetailRightPanel';
import { useTelemetryTableRowDataStore } from './stores';

function DeviceDetail(): JSX.Element {
  const telemetryTableRowData = useTelemetryTableRowDataStore(
    (state) => state.rowData
  );
  const setTelemetryTableRowData = useTelemetryTableRowDataStore(
    (state) => state.setRowData
  );
  const {
    isOpen: isTelemetryDetailDrawerOpen,
    onOpen: onTelemetryDetailDrawerOpen,
    onClose: onTelemetryDetailDrawerClose,
  } = useDisclosure();

  const location = useLocation();
  const didUnmount = useRef(false);
  const { search } = location;
  const { id } = qs.parse(search, { ignoreQueryPrefix: true });

  const { deviceObject, refetch } = useDeviceDetailQuery({
    id: id as string,
  });
  const properties = deviceObject?.properties;
  const originConnectInfo = properties?.connectInfo;
  const { sysField, basicInfo } = properties ?? {};
  const { rawData, connectInfo, attributes, telemetry, readyState, commands } =
    useDeviceDetailSocket({
      id: id as string,
    });
  const connectData = connectInfo || originConnectInfo;

  // TODO: DEVICES 优化数据结构
  const deviceInfo = useMemo(() => {
    const configs = deviceObject?.configs ?? {};

    return {
      id: id as string,
      configs,
      properties: {
        sysField: sysField as SysField,
        basicInfo: basicInfo as BasicInfo,
        rawData,
        attributeDefaultValues: properties?.attributes ?? {},
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        attributes,
        telemetryDefaultValues: properties?.telemetry ?? {},
        telemetry,
        commands,
        connectInfo: connectData,
      },
    };
  }, [
    attributes,
    basicInfo,
    commands,
    connectData,
    deviceObject?.configs,
    id,
    properties?.attributes,
    properties?.telemetry,
    rawData,
    sysField,
    telemetry,
  ]);

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  const telemetryInfo = useMemo(() => {
    const telemetryTableRowId = telemetryTableRowData?.id;

    if (!telemetryTableRowId) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const info = telemetry[telemetryTableRowId];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const newInfo = { value: info?.value, last_time: info?.ts };

    return merge({}, telemetryTableRowData, newInfo);
  }, [telemetry, telemetryTableRowData]);

  return (
    <Flex h="100%">
      <DeviceDetailLeftPanel refetch={refetch} deviceObject={deviceInfo} />
      <DeviceDetailRightPanel
        deviceObject={deviceInfo}
        refetch={refetch}
        wsReadyState={readyState}
        openTelemetryDetailDrawer={onTelemetryDetailDrawerOpen}
      />
      {telemetryInfo && isTelemetryDetailDrawerOpen && (
        <TelemetryDetailDrawer
          isOpen={isTelemetryDetailDrawerOpen}
          onClose={() => {
            setTelemetryTableRowData(null);
            onTelemetryDetailDrawerClose();
          }}
          telemetryInfo={telemetryInfo}
        />
      )}
    </Flex>
  );
}

export default DeviceDetail;
