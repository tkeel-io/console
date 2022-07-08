import { ClusterTwoToneIcon } from '@tkeel/console-icons';

interface Props {
  active: boolean;
  isDarkTheme: boolean;
}

export default function MenuIconPreview({ active, isDarkTheme }: Props) {
  const iconColor = isDarkTheme ? 'whiteAlpha.700' : 'gray.600';
  const iconTwoToneColor = isDarkTheme ? 'whiteAlpha.500' : 'gray.300';
  return (
    <ClusterTwoToneIcon
      color={active ? 'white' : iconColor}
      twoToneColor={active ? 'whiteAlpha.700' : iconTwoToneColor}
    />
  );
}
