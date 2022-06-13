import { useColor } from '@tkeel/console-hooks';

export function useTooltipProps() {
  const contentBackgroundColor = useColor('gray.700');
  const itemColor = useColor('white');
  const labelColor = useColor('white');

  return {
    contentStyle: {
      borderRadius: '4px',
      boxShadow:
        '0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2)',
      padding: '4px 12px',
      backgroundColor: contentBackgroundColor,
      opacity: ' 0.9',
    },
    itemStyle: {
      paddingTop: '0',
      paddingBottom: '0',
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '20px',
      color: itemColor,
    },
    labelStyle: { fontSize: '12px', lineHeight: '20px', color: labelColor },
  };
}
