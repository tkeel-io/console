import { Box, Flex } from '@chakra-ui/react';
import { isEmpty } from 'lodash';

import { Empty, PageHeaderToolbar } from '@tkeel/console-components';
import { CommandItem } from '@tkeel/console-types';

import { BasicInfo } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';

import CreateCommandButton from '../CreateCommandButton';
import CommandCard from './CommandCard';

type Props = {
  deviceId: string;
  basicInfo: BasicInfo;
  commandFields: CommandItem[];
  refetch?: () => void;
};

export default function ServiceCommand({
  deviceId,
  basicInfo,
  commandFields,
  refetch: refetchDeviceDetail = () => {},
}: Props) {
  const deviceName = basicInfo?.name ?? '';
  // eslint-disable-next-line no-console
  console.log(commandFields);
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleSearch = () => {};
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
          <Box>
            {commandFields.map((item) => (
              <CommandCard data={item} key={item.id} />
            ))}
          </Box>
        </>
      )}
    </Flex>
  );
}
