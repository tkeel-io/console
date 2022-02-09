import { useNavigate } from 'react-router-dom';
import { Flex, Grid, Tag, Text } from '@chakra-ui/react';
import { PluginCard } from '@tkeel/console-business-components';
import { Pagination } from '@tkeel/console-components';

import InstallButton from '@/tkeel-console-plugin-admin-plugins/components/InstallButton';
import { PluginInfo } from '@/tkeel-console-plugin-admin-plugins/types/plugin-info';

type Props = {
  pluginInfos: PluginInfo[];
};

const handlePreviousPage = () => {};
const handleNextPage = () => {};
const handleSetPageSize = () => {};
function PluginList({ pluginInfos }: Props) {
  const navigate = useNavigate();
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      flex="1"
      overflow="hidden"
    >
      <Grid
        padding="20px 24px"
        templateColumns="repeat(4, 1fr)"
        gap="8px"
        overflowY="auto"
      >
        {pluginInfos.map((pluginInfo) => {
          const { repo, name, version, installed } = pluginInfo;
          return (
            <PluginCard
              key={`${name}${version}`}
              pluginName={name}
              onClick={() => {
                navigate(`/detail/${repo}/${name}/${version}`);
              }}
              operatorButton={
                installed ? '' : <InstallButton pluginInfo={pluginInfo} />
              }
              bottomInfo={
                <Flex justifyContent="space-between">
                  <Tag colorScheme="orange" size="sm">
                    用户
                  </Tag>
                  <Flex alignItems="center" color="gray.500" fontSize="12px">
                    <Text>Ver：{version}</Text>
                    <Text marginLeft="20px">Repo：{repo}</Text>
                  </Flex>
                </Flex>
              }
            />
          );
        })}
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
