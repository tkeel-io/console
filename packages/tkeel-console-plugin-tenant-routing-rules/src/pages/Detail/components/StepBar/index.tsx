import { Box, Flex, StyleProps } from '@chakra-ui/react';

import * as icons from '@tkeel/console-icons';

import StepTitle from '../StepTitle';

export type CurrentStep = 0 | 1 | 2 | 3;

type Props = {
  styles?: {
    wrapper?: StyleProps;
  };
  ruleStatus: {
    devicesStatus: number;
    targetStatus: number;
    subId: number;
  };
};

export default function StepBar({ styles, ruleStatus }: Props) {
  const stepInfoArr = [
    {
      id: 'devicesStatus',
      icon: 'ReportFilledIcon',
      title: '选择数据',
    },
    {
      id: 'targetStatus',
      icon: 'AutoFilledIcon',
      title: '选择转发',
    },
    {
      id: 'subId',
      icon: 'WarningFilledIcon',
      title: '错误操作（可选）',
    },
  ];

  return (
    <Flex
      padding="0 126px"
      alignItems="center"
      height="88px"
      flexShrink={0}
      backgroundColor="gray.600"
      borderRadius="4px"
      {...styles?.wrapper}
    >
      {stepInfoArr.map((info, i) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const Icon = icons[info.icon];
        const isLastIndex = i === stepInfoArr.length - 1;
        const active = ruleStatus[info.id] !== 0;
        return (
          <Flex
            key={info.icon}
            flex={isLastIndex ? 'unset' : '1'}
            alignItems="center"
          >
            <StepTitle icon={<Icon />} title={info.title} active={active} />
            {!isLastIndex && (
              <Box
                margin="0 40px"
                flex="1"
                height="2px"
                backgroundColor={active ? 'primary' : 'gray.800'}
              />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}
