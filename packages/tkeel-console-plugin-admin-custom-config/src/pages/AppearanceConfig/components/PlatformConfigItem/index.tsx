import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Tips } from '@tkeel/console-components';

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
  tooltipLabel = '格式支持 png/jpg/jpeg/gif/svg/webp，大小不能超过 100K，尺寸比例为长方形，最佳为 200px*56px。',
  showInformationIcon = true,
  formField,
  styles,
}: Props) {
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
        {showInformationIcon && <Tips tooltipLabel={tooltipLabel} />}
      </Flex>
      {formField}
    </Flex>
  );
}
