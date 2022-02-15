import { Box } from '@chakra-ui/react';

import usePluginDetailQuery from '@/tkeel-console-plugin-tenant-plugins/hooks/queries/usePluginDetailQuery';

type Props = {
  pluginName: string;
};

function Detail({ pluginName }: Props) {
  const { plugin } = usePluginDetailQuery({ pluginName });
  // eslint-disable-next-line no-console
  console.log('Detail ~ plugin', plugin);
  return <Box>pluginName</Box>;
}

export default Detail;
