import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import {
  DingDingFilledIcon,
  MailFilledIcon,
  PeopleTwoToneIcon,
  WechatFilledIcon,
} from '@tkeel/console-icons';

import Brief from '../Brief';
import NotificationTabs from '../NotificationTabs';

interface Props {
  briefInfo: {
    name: string;
    desc: string;
    emailAddress: string;
    noticeId: number;
  };
  refetch: () => void;
  operatorButton: ReactNode;
}

function NotificationSelectCard({ briefInfo, operatorButton, refetch }: Props) {
  const mailNum =
    briefInfo.emailAddress === ''
      ? 0
      : briefInfo.emailAddress.split(',').length;
  const message = [
    { id: 'email', name: '邮件', icon: MailFilledIcon, num: mailNum },
    { id: 'ding', name: '钉钉', icon: DingDingFilledIcon, num: 0 },
    { id: 'wechat', name: '企业微信', icon: WechatFilledIcon, num: 0 },
  ];
  return (
    <AccordionItem borderWidth="0" bg="white" mb="12px">
      <AccordionButton
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="4px"
        boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05)"
        _focus={{ boxShadow: 'none' }}
        _hover={{ bgColor: 'none' }}
      >
        <Flex flex="1" alignItems="center">
          <PeopleTwoToneIcon size="29px" />
          <Brief
            title={briefInfo.name}
            subTitle="通知对象组名"
            styles={{
              wrapper: { width: '40%' },
              title: { fontWeight: 600 },
            }}
          />
          <Brief title={briefInfo.desc} subTitle="描述" />
        </Flex>
        <Flex
          justifyContent="space-between"
          borderRadius="4px"
          bgColor="gray.50"
          h="48px"
          w="40%"
          p="0 16px"
        >
          {message.map((item) => {
            const { id, name, num, icon: Icon } = item;

            return (
              <Flex key={id} alignItems="center">
                <Icon size="32px" color={num > 0 ? 'gray.700' : 'gray.400'} />
                <Brief
                  title={num}
                  subTitle={name}
                  styles={{
                    title: { color: num > 0 ? 'gray.800' : 'gray.400' },
                    subTitle: {
                      color: num > 0 ? 'grayAlternatives.300' : 'gray.400',
                    },
                  }}
                />
              </Flex>
            );
          })}
        </Flex>
        {operatorButton}
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel bgColor="gray.100" p="12px 0 0">
        <NotificationTabs
          refetch={refetch}
          noticeId={briefInfo.noticeId}
          emailAddress={briefInfo.emailAddress}
        />
      </AccordionPanel>
    </AccordionItem>
  );
}

export default NotificationSelectCard;
