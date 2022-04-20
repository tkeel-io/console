import { Box, Flex } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useState } from 'react';

import { CreateCommandButton } from '@tkeel/console-business-components';
import { Empty, PageHeaderToolbar } from '@tkeel/console-components';
import { CommandItem, CommandValue } from '@tkeel/console-types';

import { BasicInfo } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

import CommandCard from './CommandCard';

type Props = {
  deviceId: string;
  basicInfo: BasicInfo;
  commandFields: CommandItem[];
  commandValues: CommandValue;
  refetch?: () => void;
  online: boolean;
};
const FILTER_COLUMNS = ['name', 'id'];

function getFilterList({
  list,
  keywords,
}: {
  list: CommandItem[];
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

export default function ServiceCommand({
  deviceId,
  basicInfo,
  commandFields,
  commandValues,
  online,
  refetch: refetchDeviceDetail = () => {},
}: Props) {
  const deviceName = basicInfo?.name ?? '';

  const [keywords, setKeywords] = useState('');

  const handleSearch = (value: string) => {
    setKeywords(value.trim());
  };
  return (
    <Flex flex="1" direction="column" height="100%">
      {isEmpty(commandFields) ? (
        <Empty
          description={
            <Box>
              <Box display="inline" color="gray.700" fontWeight="500">
                [{deviceName}]&nbsp;
              </Box>
              暂无服务命令,可手动添加
            </Box>
          }
          styles={{
            wrapper: { height: '60%' },
            title: { marginTop: '0' },
            content: { marginTop: '20px' },
          }}
          title=""
          content={
            <CreateCommandButton uid={deviceId} refetch={refetchDeviceDetail} />
          }
        />
      ) : (
        <>
          <PageHeaderToolbar
            styles={{
              wrapper: { height: '32px', marginBottom: '12px' },
              title: { fontSize: '14px' },
            }}
            name="服务命令"
            hasSearchInput
            searchInputProps={{
              onSearch: handleSearch,
            }}
            buttons={[
              <CreateCommandButton
                key="create"
                uid={deviceId}
                refetch={refetchDeviceDetail}
              />,
            ]}
          />
          <Box overflow="auto">
            {getFilterList({ list: commandFields, keywords }).map((item) => (
              <CommandCard
                data={item}
                key={item.id}
                uid={deviceId}
                refetch={refetchDeviceDetail}
                online={online}
                commandValues={commandValues}
              />
            ))}
          </Box>
        </>
      )}
    </Flex>
  );
}
