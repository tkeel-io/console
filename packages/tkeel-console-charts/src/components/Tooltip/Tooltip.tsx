import { useTheme } from '@chakra-ui/react';
import type { TooltipProps } from 'recharts';
import { Tooltip as RechartsTooltip } from 'recharts';

import type { Theme } from '@tkeel/console-themes';

type ValueType = number | string | Array<number | string>;

type NameType = number | string;

export function Tooltip<TValue extends ValueType, TName extends NameType>(
  props: TooltipProps<TValue, TName>
) {
  const { colors }: Theme = useTheme();

  return (
    <RechartsTooltip
      contentStyle={{
        borderRadius: '4px',
        boxShadow:
          '0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2)',
        padding: '4px 12px',
        backgroundColor: colors.gray[700],
        opacity: ' 0.9',
      }}
      itemStyle={{
        paddingTop: '0',
        paddingBottom: '0',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '20px',
        color: colors.white,
      }}
      labelStyle={{ fontSize: '12px', lineHeight: '20px', color: colors.white }}
      {...props}
    />
  );
}
