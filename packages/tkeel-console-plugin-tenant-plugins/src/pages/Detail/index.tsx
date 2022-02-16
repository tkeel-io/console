import { Box, Circle, Flex, Text } from '@chakra-ui/react';
import { RectangleButton } from '@tkeel/console-components';
import {
  BoxTwoToneIcon,
  CaretRightFilledIcon,
  PauseFilledIcon,
} from '@tkeel/console-icons';

import InfoCard from './InfoCard';

import usePluginDetailQuery from '@/tkeel-console-plugin-tenant-plugins/hooks/queries/usePluginDetailQuery';

type Props = {
  pluginName: string;
};

function Detail({ pluginName }: Props) {
  const { plugin } = usePluginDetailQuery({ pluginName });
  // eslint-disable-next-line no-console
  console.log('Detail ~ plugin', plugin);
  const basicInfo = [
    {
      label: 'Repo',
      value: 'repo',
    },
    {
      label: 'Tag',
      value: 'tag',
    },
    {
      label: 'Ver',
      value: 'ver',
    },
    {
      label: '更新时间',
      value: '',
    },
  ];

  const developerInfo = [
    {
      label: '提供者',
      value: 'developer',
    },
    {
      label: '联系方式',
      value: 'developer@yunify.com',
    },
  ];

  return (
    <Box>
      <Flex
        padding="20px 0 20px 24px"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="grayAlternatives.50"
      >
        <Circle size="76px" backgroundColor="gray.50">
          {/* <Image width="28px" height="28px" src={icon} /> */}
          <BoxTwoToneIcon size={32} />
        </Circle>
        <Box marginLeft="20px">
          <Text
            color="gray.800"
            fontSize="16px"
            fontWeight="500"
            lineHeight="22px"
          >
            数据路由
          </Text>
          <Text
            margin="4px 0"
            color="grayAlternatives.300"
            fontSize="12px"
            lineHeight="24px"
          >
            描述
          </Text>
          <RectangleButton leftIcon={<CaretRightFilledIcon color="white" />}>
            启用
          </RectangleButton>
          <RectangleButton
            leftIcon={<PauseFilledIcon color="white" />}
            backgroundColor="gray.800"
          >
            停用
          </RectangleButton>
        </Box>
      </Flex>
      <Box padding="24px 24px">
        <InfoCard data={basicInfo} />
        <InfoCard data={developerInfo} marginTop="24px" />
      </Box>
    </Box>
  );
}

export default Detail;
