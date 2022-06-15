import { Icon, IconProps } from '@chakra-ui/react';

export interface DotProps extends IconProps {
  color?: string;
  size?: string;
}
export default function DotIcon({
  color = 'red.300',
  size = '12px',
}: DotProps) {
  return (
    <Icon viewBox="0 0 24 24" color={color} w={size} h={size}>
      <circle cx="12" cy="12" r="12" fill="currentColor" />
    </Icon>
  );
}
