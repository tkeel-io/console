import React from 'react';
import { Box, Divider, Heading, Text } from '@chakra-ui/react';

function Introduce() {
  const data = [
    {
      title: '功能点',
      content:
        'NoSQL 面向文档的数据库，使用动态模式存储类似 JSON 的文档，简化了内容驱动应用程序中的数据集成',
    },
    {
      title: '拓展点',
      content:
        'NoSQL 面向文档的数据库，使用动态模式存储类似 JSON 的文档，简化了内容驱动应用程序中的数据集成',
    },
  ];

  return (
    <Box>
      {data.map((item) => (
        <Box key={item.title} marginBottom="30px">
          <Heading color="gray.800" fontSize="20px" lineHeight="24px">
            {item.title}
          </Heading>
          <Divider margin="20px 0" color="grayAlternatives.50" />
          <Text color="gray.500" fontSize="12px" lineHeight="17px">
            {item.content}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

export default Introduce;
