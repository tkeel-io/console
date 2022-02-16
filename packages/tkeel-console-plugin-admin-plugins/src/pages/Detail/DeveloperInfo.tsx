import { Box } from '@chakra-ui/react';

import InfoCard from './InfoCard';

type Props = {
  data: {
    name: string;
    email: string;
    url: string;
  }[];
};

function DeveloperInfo({ data }: Props) {
  // eslint-disable-next-line no-console
  console.log('DeveloperInfo ~ data', data);
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
    <Box
      marginTop="8px"
      width="100%"
      backgroundColor="white"
      boxShadow="0px 10px 15px -3px rgba(113, 128, 150, 0.1), 0px 4px 6px -2px rgba(113, 128, 150, 0.05);"
    >
      <InfoCard title="开发者信息" data={developerInfo} />
    </Box>
  );
}

export default DeveloperInfo;
