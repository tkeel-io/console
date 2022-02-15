import { Box, Colors, Flex, Text, useTheme } from '@chakra-ui/react';
import {
  AppsTwoToneIcon,
  EqualizerTwoToneIcon,
  FileBoxTwoToneIcon,
  TagsTwoToneIcon,
} from '@tkeel/console-icons';

interface CustomColor extends Colors {
  primary: string;
}

function Category() {
  const { colors }: { colors: CustomColor } = useTheme();

  const categories = [
    {
      title: '发现',
      children: [
        {
          icon: <FileBoxTwoToneIcon />,
          name: '已启用',
        },
      ],
    },
    {
      title: '分类',
      children: [
        {
          icon: <AppsTwoToneIcon />,
          name: '全部',
        },
        {
          icon: <TagsTwoToneIcon />,
          name: '用户',
        },
        {
          icon: <TagsTwoToneIcon />,
          name: '系统',
        },
        {
          icon: <EqualizerTwoToneIcon />,
          name: '未分类',
        },
      ],
    },
  ];

  return (
    <Box padding="12px 16px" width="200px" backgroundColor="white">
      {categories.map((category) => (
        <Box key={category.title} lineHeight="24px">
          <Text
            marginBottom="12px"
            color="grayAlternatives.300"
            fontSize="12px"
          >
            {category.title}
          </Text>
          <Box paddingLeft="18px">
            {category.children.map((item) => (
              <Flex
                key={item.name}
                alignItems="center"
                marginBottom="16px"
                cursor="pointer"
                _hover={{
                  '& > svg': {
                    fill: `${colors.primary} !important`,
                  },
                  '& > p': {
                    color: colors.primary,
                  },
                }}
              >
                {item.icon}
                <Text marginLeft="12px" color="gray.600" fontSize="12px">
                  {item.name}
                </Text>
              </Flex>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Category;
