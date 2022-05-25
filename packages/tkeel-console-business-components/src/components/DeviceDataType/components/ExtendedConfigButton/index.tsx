import { Box, Flex } from '@chakra-ui/react';
import { UseFieldArrayReturn } from 'react-hook-form';

import { AddFilledIcon } from '@tkeel/console-icons';

import { TelemetryFormField } from '../../types';

interface Props {
  supportExtendedConfig?: boolean;
  extendedArrayHandler?: UseFieldArrayReturn<TelemetryFormField, 'extendInfo'>;
}

export default function ExtendedConfigButton({
  supportExtendedConfig,
  extendedArrayHandler,
}: Props) {
  if (!supportExtendedConfig) {
    return null;
  }
  const { append: extendedAppend } =
    extendedArrayHandler as UseFieldArrayReturn<
      TelemetryFormField,
      'extendInfo'
    >;
  return (
    <Flex
      width="68px"
      alignItems="center"
      justifyContent="space-between"
      color="grayAlternatives.300"
      cursor="pointer"
      fontSize="12px"
      onClick={() => {
        extendedAppend({
          label: `请修改扩展属性标题`,
          value: '',
        });
      }}
    >
      <AddFilledIcon color="grayAlternatives.300" /> <Box>扩展配置</Box>
    </Flex>
  );
}
