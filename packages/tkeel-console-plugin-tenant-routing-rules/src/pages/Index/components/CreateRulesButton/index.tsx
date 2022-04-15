import { useDisclosure } from '@chakra-ui/react';

import {
  CreateButton,
  LinkButton,
  MoreActionButton,
} from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import useCreateRulesMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useCreateRulesMutation';
import useModifyRulesMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useModifyRulesMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/BaseRulesModal';
import CreateRulesModal from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/CreateRulesModal';

interface Props {
  cruxData?: {
    id: string;
    name: string;
    desc: string;
    status: number;
    type: number;
  };
  type: 'createButton' | 'createText' | 'editButton';
  onSuccess: () => void;
}

export default function CreateRulesButton({
  type,
  cruxData,
  onSuccess,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const useOperationMutation =
    type === 'editButton' ? useModifyRulesMutation : useCreateRulesMutation;
  const { isLoading, mutate } = useOperationMutation({
    id: cruxData?.id || '',
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    mutate({
      data: {
        name: formValues.name,
        type: formValues.type,
        desc: formValues?.desc ?? '',
        // desc: formValues?.deviceTemplate ?? '',
      },
    });
  };

  return (
    <>
      {type === 'createButton' && (
        <CreateButton onClick={onOpen}>创建规则</CreateButton>
      )}
      {type === 'createText' && (
        <LinkButton onClick={onOpen} fontSize="14px" lineHeight="24px">
          创建
        </LinkButton>
      )}
      {type === 'editButton' && (
        <MoreActionButton
          icon={<PencilFilledIcon />}
          title="编辑规则"
          onClick={onOpen}
        />
      )}
      {isOpen && (
        <CreateRulesModal
          type={type}
          cruxData={cruxData}
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
