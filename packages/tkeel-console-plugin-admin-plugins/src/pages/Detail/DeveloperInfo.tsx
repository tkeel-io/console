import { Box } from '@chakra-ui/react';

import InfoCard from './InfoCard';

function DeveloperInfo() {
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
      <InfoCard data={developerInfo} />
    </Box>
  );
}

export default DeveloperInfo;
