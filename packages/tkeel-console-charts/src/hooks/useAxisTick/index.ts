import { useColor } from '@tkeel/console-hooks';

import { tick } from '@/tkeel-console-charts/components/Axis';

export default function useAxisTick() {
  const fill = useColor('gray.500');

  return { fill, ...tick };
}
