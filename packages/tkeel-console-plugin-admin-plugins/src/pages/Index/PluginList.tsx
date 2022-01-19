import { Flex, Grid } from '@chakra-ui/react';
import { Pagination } from '@tkeel/console-components';

import Card from './Card';

import { PluginInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

type Props = {
  pluginInfos: PluginInfo[];
};

const handlePreviousPage = () => {};
const handleNextPage = () => {};
const handleSetPageSize = () => {};
function PluginList({ pluginInfos }: Props) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      flex="1"
      overflow="hidden"
    >
      <Grid
        margin="20px 24px"
        templateColumns="repeat(4, 1fr)"
        gap="8px"
        overflowY="auto"
      >
        {pluginInfos.map((pluginInfo) => (
          <Card key={pluginInfo.name} pluginInfo={pluginInfo} />
        ))}
      </Grid>
      <Pagination
        pageIndex={0}
        pageSize={40}
        totalSize={40}
        canPreviousPage={false}
        canNextPage={false}
        previousPage={handlePreviousPage}
        nextPage={handleNextPage}
        setPageSize={handleSetPageSize}
      />
    </Flex>
  );
}

export default PluginList;
