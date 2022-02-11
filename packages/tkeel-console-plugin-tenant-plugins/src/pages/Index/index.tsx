import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { PluginCard } from '@tkeel/console-business-components';
import { PageHeaderToolbar } from '@tkeel/console-components';

import Category from './Category';

function Index(): JSX.Element {
  const pluginInfos = [
    {
      name: 'plugins',
      version: '0.1.0',
      icon: '',
      repo: 'tkeel-default',
      installed: true,
    },
  ];
  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar name="插件管理" hasSearchInput />
      <Flex flex="1" overflow="hidden">
        <Category />
        <Flex flexDirection="column" flex="1" backgroundColor="gray.50">
          <Text>全部</Text>
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap="8px"
            overflowY="auto"
            padding="12px 20px"
            flex="1"
          >
            {pluginInfos.map((pluginInfo) => (
              <PluginCard
                key={`${pluginInfo.name}${pluginInfo.version}`}
                briefPluginInfo={pluginInfo}
                operatorButton={<Box>启用</Box>}
                bottomInfo={<Box>bottomInfo</Box>}
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log('click card');
                }}
              />
            ))}
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Index;
