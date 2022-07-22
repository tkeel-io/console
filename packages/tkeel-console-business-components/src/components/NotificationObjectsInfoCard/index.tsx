import { Accordion, Flex, StyleProps } from '@chakra-ui/react';

import { Empty } from '@tkeel/console-components';
import { useAlarmNoticeGroupsQuery } from '@tkeel/console-request-hooks';

import NoticeGroupItem from './NoticeGroupItem';

interface Props {
  noticeId: string;
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function NotificationObjectsInfoCard({
  noticeId,
  styles,
}: Props) {
  const { alarmNoticeGroups, isFetched } = useAlarmNoticeGroupsQuery({
    noticeId,
  });

  return (
    <Flex
      flexDirection="column"
      padding="20px 20px 8px"
      backgroundColor="gray.100"
      {...styles?.wrapper}
    >
      {(() => {
        if (noticeId && !isFetched) {
          return null;
        }

        if (alarmNoticeGroups.length === 0) {
          return <Empty type="component" />;
        }

        return (
          <Accordion allowToggle defaultIndex={0}>
            {alarmNoticeGroups.map((group, i) => (
              <NoticeGroupItem key={String(i + 1)} group={group} />
            ))}
          </Accordion>
        );
      })()}
    </Flex>
  );
}
