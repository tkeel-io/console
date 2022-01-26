import { WarningTwoToneIcon } from '@tkeel/console-icons';

import Icon from './Icon';

export default function WarningIcon() {
  return (
    <Icon wrapperBackgroundColor="orange.50">
      <WarningTwoToneIcon
        size={24}
        color="orange.50"
        twoToneColor="orange.300"
      />
    </Icon>
  );
}
