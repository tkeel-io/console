import { useStatusInfos } from '@tkeel/console-hooks';

import * as StatusIcon from '../StatusIcon';
import IconWrapper from './IconWrapper';

export default function WarningIcon() {
  const { warning } = useStatusInfos();

  return (
    <IconWrapper backgroundColor={warning.colors.secondary}>
      <StatusIcon.Warning size={24} />
    </IconWrapper>
  );
}
