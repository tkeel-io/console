import { Box } from '@chakra-ui/react';
import { InfoCard } from '@tkeel/console-components';

type Props = {
  data: {
    name: string;
    email: string;
    url: string;
  }[];
};

function DeveloperInfo({ data }: Props) {
  const developers: string[] = [];
  const emails: string[] = [];
  data.forEach((item) => {
    developers.push(item.name);
    emails.push(item.email);
  });

  const developerInfo = [
    {
      label: '提供者',
      value: developers.join('、'),
    },
    {
      label: '联系方式',
      value: emails.join('、'),
      isTruncated: false,
    },
  ];

  return (
    <Box marginTop="8px" width="100%" backgroundColor="white">
      <InfoCard title="开发者信息" data={developerInfo} />
    </Box>
  );
}

export default DeveloperInfo;
