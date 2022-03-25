import { Box, Flex } from '@chakra-ui/react';

import {
  AutoFilledIcon,
  ReportFilledIcon,
  WarningFilledIcon,
} from '@tkeel/console-icons';

import IconCircle from '@/tkeel-console-plugin-tenant-routing-rules/components/IconCircle';

export type CurrentStep = 0 | 1 | 2 | 3;

type Props = {
  currentStep: CurrentStep;
};

export default function Step({ currentStep }: Props) {
  const stepInfoArr = [
    { icon: ReportFilledIcon, key: '1' },
    { icon: AutoFilledIcon, key: '2' },
    { icon: WarningFilledIcon, key: '3' },
  ];

  return (
    <Flex alignItems="center" flexShrink="0" ml="75px" flex={1}>
      {stepInfoArr.map((item, index) => {
        const Icon = item.icon;
        const isLastIndex = index === stepInfoArr.length - 1;
        const active = index < currentStep;
        return (
          <Flex
            key={item.key}
            alignItems="center"
            flex={isLastIndex ? 'unset' : '1'}
          >
            <IconCircle
              active={active}
              defaultIconColor={active ? 'primary' : 'grayAlternatives.300'}
              styles={{
                wrapper: { bgColor: active ? 'primarySub' : 'gray.50' },
              }}
            >
              <Icon />
            </IconCircle>
            {!isLastIndex && (
              <Box
                flex={1}
                margin="0 12px"
                height="1px"
                bgColor={active ? 'primary' : 'gray.800'}
              />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}
