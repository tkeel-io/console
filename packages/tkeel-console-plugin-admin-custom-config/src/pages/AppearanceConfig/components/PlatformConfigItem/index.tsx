import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Tooltip } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { InformationFilledIcon } from '@tkeel/console-icons';

export interface Styles {
  wrapper?: StyleProps;
}

interface Props {
  title: string;
  showInformationIcon?: boolean;
  tooltipLabel?: string;
  formField: ReactNode;
  styles?: Styles;
}

export default function PlatformConfigItem({
  title,
  tooltipLabel = '大小不能超过 100K，格式最佳为 png 同样支持 jpg/jpeg/gif/svg ，尺寸比例为长方形，最佳为 200px*63px。',
  showInformationIcon = true,
  formField,
  styles,
}: Props) {
  const primaryColor = useColor('primary');

  return (
    <Flex flexDirection="column" {...styles?.wrapper}>
      <Flex marginBottom="8px" alignItems="center">
        <Text
          marginRight="4px"
          color="grayAlternatives.300"
          fontSize="12px"
          lineHeight="20px"
        >
          {title}
        </Text>
        {showInformationIcon && (
          <Box
            _hover={{
              svg: {
                fill: `${primaryColor} !important`,
              },
            }}
          >
            <Tooltip
              label={tooltipLabel}
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.100"
            >
              <InformationFilledIcon color="gray.300" />
            </Tooltip>
          </Box>
        )}
      </Flex>
      {formField}
    </Flex>
  );
}
