import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { BackButton, InfoCard } from '@tkeel/console-components';
import * as icons from '@tkeel/console-icons';

import basicInfoBg from '@/tkeel-console-business-components/assets/images/basic-info-bg.svg';

export function BasicInfoBg() {
  return (
    <Image
      position="absolute"
      right="0"
      top="0"
      height="100%"
      src={basicInfoBg}
    />
  );
}

type Props = {
  backUrl?: string;
  rightTopButton: ReactNode;
  icon?: string;
  name: string;
  desc: string;
  basicInfoList: {
    label: string;
    value: ReactNode;
  }[];
};

export default function BasicInfo({
  backUrl = '/',
  rightTopButton,
  icon = '',
  name,
  desc,
  basicInfoList,
}: Props) {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Icon = icons[icon];

  return (
    <Box
      width="100%"
      backgroundColor="white"
      boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05);"
      borderRadius="4px"
    >
      <Box
        position="relative"
        height="124px"
        padding="16px 20px"
        backgroundColor="gray.50"
      >
        <Flex
          position="relative"
          zIndex="2"
          height="28px"
          justifyContent="space-between"
        >
          <BackButton
            onClick={() => {
              navigate(backUrl);
            }}
          />
          {rightTopButton}
        </Flex>
        <Flex
          position="relative"
          zIndex="1"
          marginTop="16px"
          alignItems="center"
        >
          <Center
            width="48px"
            height="48px"
            borderRadius="16px"
            backgroundColor="gray.100"
          >
            {Icon && <Icon size={22} />}
          </Center>
          <Box marginLeft="16px">
            <Text color="gray.800" fontSize="14px" lineHeight="20px">
              {name}
            </Text>
            <Text color="gray.500" fontSize="12px" lineHeight="17px">
              {desc}
            </Text>
          </Box>
        </Flex>
        <BasicInfoBg />
      </Box>
      <InfoCard
        data={basicInfoList}
        styles={{ wrapper: { boxShadow: 'none' } }}
      />
    </Box>
  );
}
