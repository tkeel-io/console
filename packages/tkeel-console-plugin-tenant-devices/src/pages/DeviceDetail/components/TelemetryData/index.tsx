import { Box, Flex } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

import {
  CreateTelemetryButton,
  SaveAsOtherTemplateButton,
} from '@tkeel/console-business-components';
import {
  Empty,
  IconButton,
  MoreAction,
  PageHeaderToolbar,
} from '@tkeel/console-components';
import { SmcFilledIcon } from '@tkeel/console-icons';
import { TelemetryItem, TelemetryValue } from '@tkeel/console-types';

import { BasicInfo } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import SaveAsSelfTemplateButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/SaveAsSelfTemplateButton';

import TelemetryDataTable from './TelemetryDataTable';

type Props = {
  deviceId: string;
  basicInfo: BasicInfo;
  refetch?: () => void;
  telemetryFields: TelemetryItem[];
  telemetryValues: TelemetryValue;
  telemetryDefaultValues: TelemetryValue;
  wsReadyState: number;
};
const FILTER_COLUMNS = ['name', 'id', 'type'];
function getFilterList({
  list,
  keywords,
}: {
  list: TelemetryItem[];
  keywords: string;
}) {
  if (keywords) {
    return list.filter((item) => {
      return FILTER_COLUMNS.find((key) =>
        (item[key] as string).includes(keywords)
      );
    });
  }
  return list;
}
export default function TelemetryData({
  deviceId,
  basicInfo,
  refetch: refetchDeviceDetail = () => {},
  telemetryFields,
  telemetryValues,
  telemetryDefaultValues,
  wsReadyState,
}: Props) {
  const [keywords, setKeywords] = useState('');
  const deviceName = basicInfo?.name ?? '';
  const templateId = basicInfo?.templateId ?? '';
  const handleSearch = (value: string) => {
    setKeywords(value.trim());
  };
  const [renderTelemetryValue, setRenderTelemetryValue] = useState(
    telemetryDefaultValues
  );

  useEffect(() => {
    if (wsReadyState === 1 && !isEmpty(telemetryValues)) {
      setRenderTelemetryValue(telemetryValues);
    }
  }, [wsReadyState, telemetryValues]);
  return (
    <Box h="100%">
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
            <CreateTelemetryButton
              uid={deviceId}
              refetch={refetchDeviceDetail}
            />
          }
        />
      ) : (
        <Flex flexDir="column" h="100%">
          <PageHeaderToolbar
            styles={{
              wrapper: { height: '32px', marginBottom: '12px' },
              title: { fontSize: '14px' },
            }}
            name="遥测数据"
            hasSearchInput
            searchInputProps={{
              onSearch: handleSearch,
            }}
            buttons={[
              <CreateTelemetryButton
                key="add"
                uid={deviceId}
                refetch={refetchDeviceDetail}
              />,
              templateId ? (
                <MoreAction
                  styles={{ actionList: { width: '110px' } }}
                  element={
                    <IconButton
                      colorScheme="gray"
                      icon={<SmcFilledIcon size="14px" color="white" />}
                    >
                      同步模版
                    </IconButton>
                  }
                  key="more"
                  buttons={[
                    <SaveAsSelfTemplateButton key="sync" id={deviceId} />,
                    <SaveAsOtherTemplateButton key="save" id={deviceId} />,
                  ]}
                />
              ) : (
                <SaveAsOtherTemplateButton
                  variant="iconButton"
                  key="save"
                  id={deviceId}
                />
              ),
            ]}
          />
          <TelemetryDataTable
            telemetryFields={getFilterList({ list: telemetryFields, keywords })}
            telemetryValues={renderTelemetryValue}
            deviceId={deviceId}
            refetch={refetchDeviceDetail}
          />
        </Flex>
      )}
    </Box>
  );
}
