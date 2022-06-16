import { useDisclosure } from '@chakra-ui/react';

import { MoreActionButton } from '@tkeel/console-components';
import { EyeFilledIcon } from '@tkeel/console-icons';

import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

import PolicyDetailDrawer from '../PolicyDetailDrawer';

interface Props {
  policy: Policy;
  refetchData: () => unknown;
}

export default function ViewPolicyDetailButton({ policy, refetchData }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MoreActionButton
        icon={<EyeFilledIcon size="12px" color="grayAlternatives.300" />}
        title="查看策略详情"
        onClick={onOpen}
      />
      {isOpen && (
        <PolicyDetailDrawer
          policy={policy}
          isOpen={isOpen}
          onClose={onClose}
          refetchData={refetchData}
        />
      )}
    </>
  );
}
