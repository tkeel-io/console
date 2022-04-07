import { Box, Flex, Tooltip } from '@chakra-ui/react';

import {
  AutoFilledIcon,
  ReportFilledIcon,
  WarningFilledIcon,
} from '@tkeel/console-icons';

import IconCircle from '@/tkeel-console-plugin-tenant-routing-rules/components/IconCircle';

type CurrentStep = number[] | unknown[];

type Props = {
  currentStep: CurrentStep;
};

export default function Step({ currentStep }: Props) {
  const stepInfoArr = [
    {
      icon: ReportFilledIcon,
      key: '1',
      optional: false,
      tip: '尚未选择设备数据',
    },
    {
      icon: AutoFilledIcon,
      key: '2',
      optional: false,
      tip: '尚未设置数据转发',
    },
    {
      icon: WarningFilledIcon,
      key: '3',
      optional: true,
      tip: '尚未选择错误操作',
    },
  ];
  return (
    <Flex alignItems="center" flexShrink={0} ml="75px" flex={1}>
      {stepInfoArr.map((item, index) => {
        const Icon = item.icon;
        const isLastIndex = index === stepInfoArr.length - 1;
        const active = currentStep[index] !== 0;
        return (
          <Flex
            key={item.key}
            alignItems="center"
            flex={isLastIndex ? 'unset' : '1'}
          >
            <Tooltip
              key={item.key}
              label={active ? '' : item.tip}
              placement="top"
              hasArrow
              bgColor="white"
              color="gray.700"
              lineHeight="24px"
              fontSize="12px"
              p="4px 8px"
              borderRadius="4px"
              mb="8px"
              boxShadow="0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2);"
            >
              <Box>
                <IconCircle
                  defaultBorderWidth="1px"
                  defaultBorderColor={
                    active ? 'grayAlternatives.500' : 'grayAlternatives.200'
                  }
                  defaultIconColor={
                    active || item.optional
                      ? 'grayAlternatives.300'
                      : 'gray.200'
                  }
                  styles={{
                    wrapper: {
                      bgColor: 'gray.50',
                      // borderWidth: '1px',
                      borderStyle:
                        !active && item.optional ? 'dashed' : 'solid',
                    },
                  }}
                >
                  <Icon />
                </IconCircle>
              </Box>
            </Tooltip>

            {!isLastIndex && (
              <Box flex={1} margin="0 12px" height="1px" bgColor="gray.200" />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}
