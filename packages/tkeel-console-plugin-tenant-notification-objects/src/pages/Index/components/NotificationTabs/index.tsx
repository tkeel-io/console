import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { useColor } from '@tkeel/console-hooks';

import MailTab from '../MailTab';

interface Props {
  noticeId: number;
  refetchMailCounts: () => void;
}

function NotificationTabs({ noticeId, refetchMailCounts }: Props) {
  const primaryColor = useColor('primary');
  const styles = {
    padding: '0 0 4px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    mr: '28px',
    _focus: { boxShadow: 'none', outline: 'none' },
    _selected: {
      borderBottom: '2px solid',
      borderBottomColor: 'primary',
      '&>p': {
        color: `${primaryColor} !important`,
      },
    },
  };
  return (
    <Tabs
      bgColor="gray.50"
      borderWidth="1px"
      borderColor="grayAlternatives.100"
      borderRadius="4px"
      p="12px 20px"
    >
      <TabList borderBottom="none">
        <Tab {...styles}>邮件</Tab>
        <Tab {...styles} isDisabled>
          钉钉
        </Tab>
        <Tab {...styles} isDisabled>
          企业微信
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel p="16px 0 0">
          <MailTab
            key={noticeId}
            noticeId={noticeId}
            refetchCounts={refetchMailCounts}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default NotificationTabs;
