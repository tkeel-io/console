import { useDisclosure } from '@chakra-ui/react';

import {
  CreateButton,
  LinkButton,
  MoreActionButton,
} from '@tkeel/console-components';
import { PencilFilledIcon } from '@tkeel/console-icons';

import useCreateRulesMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useCreateRulesMutation';
import { FormValues } from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/BaseRulesModal';
import CreateRulesModal from '@/tkeel-console-plugin-tenant-routing-rules/pages/Index/components/CreateRulesModal';

interface Props {
  type: 'createButton' | 'createText' | 'editButton';
  onSuccess: () => void;
}

export default function CreateRulesButton({ type, onSuccess }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, mutate: createMutate } = useCreateRulesMutation({
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  const handleConfirm = (formValues: FormValues) => {
    createMutate({
      data: {
        name: formValues.title,
        type: formValues.type,
        desc: formValues?.description ?? '',
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
          isOpen={isOpen}
          isConfirmButtonLoading={isLoading}
          onClose={onClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
