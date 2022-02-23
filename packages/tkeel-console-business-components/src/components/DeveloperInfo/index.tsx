import { Box, StyleProps } from '@chakra-ui/react';
import { InfoCard } from '@tkeel/console-components';

type Props = {
  data: {
    name: string;
    email: string;
    url: string;
  }[];
  styles?: {
    wrapper?: StyleProps;
    infoCard: {
      wrapper?: StyleProps;
      content?: StyleProps;
      title?: StyleProps;
      label?: StyleProps;
      value?: StyleProps;
    };
  };
};

function DeveloperInfo({ data, styles }: Props) {
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
    <Box
      marginTop="8px"
      width="100%"
      backgroundColor="white"
      {...styles?.wrapper}
    >
      <InfoCard
        title="开发者信息"
        data={developerInfo}
        styles={styles?.infoCard}
      />
    </Box>
  );
}

export default DeveloperInfo;
