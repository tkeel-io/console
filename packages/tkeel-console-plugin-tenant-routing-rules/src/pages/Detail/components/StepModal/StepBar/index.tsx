import { Box, Flex, Text } from '@chakra-ui/react';

type StepBarInfo = {
  key: string;
  name: string;
};

type Props = {
  stepBarInfo: StepBarInfo[];
  currentStep: number;
};

export default function StepBar({ stepBarInfo, currentStep }: Props) {
  return (
    <Flex flexDirection="column">
      {stepBarInfo.map((item, index) => {
        const isLastIndex = index === stepBarInfo.length - 1;
        const stepIndex = `0${index + 1}`;
        const active = currentStep > index;
        return (
          <Flex
            key={item.key}
            w="139px"
            p="10px 20px"
            flexDirection="column"
            flex={isLastIndex ? 'unset' : '1'}
          >
            <Flex alignItems="center">
              <Flex
                w="24px"
                h="24px"
                justifyContent="center"
                alignItems="center"
                fontSize="14px"
                borderRadius="50%"
                borderWidth="1px"
                borderColor={active ? 'green.300' : 'gray.200'}
                bgColor={active ? 'green.300' : 'transparent'}
                color={active ? 'white' : 'gray.400'}
                fontWeight={active ? 700 : 400}
              >
                {stepIndex}
              </Flex>
              <Text fontSize="12px" color="gray.700" fontWeight={600} ml="8px">
                {item.name}
              </Text>
            </Flex>

            {!isLastIndex && (
              <Box
                flex={1}
                margin="12px 10px"
                width="4px"
                borderRadius="17px"
                bgColor={active ? 'green.100' : 'gray.100'}
              />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}
