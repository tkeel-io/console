import { useDisclosure } from '@chakra-ui/react';

import { Alert, MoreActionButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';

interface Props {
  attributeInfo: {
    name: string;
    id: string;
  };
  handleSubmit: ({ id }: { id: string }) => void;
}
function DeleteAttributeButton({ attributeInfo, handleSubmit }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, id } = attributeInfo;
  return (
    <>
      <MoreActionButton
        icon={<TrashFilledIcon size="12px" color="grayAlternatives.300" />}
        title="删除属性"
        onClick={onOpen}
      />
      <Alert
        icon="warning"
        iconPosition="left"
        isOpen={isOpen}
        description={`属性ID: ${id}`}
        title={`确定要删除属性「${name}」吗？`}
        onClose={onClose}
        onConfirm={() => {
          handleSubmit({ id });
        }}
      />
    </>
  );
}
export default DeleteAttributeButton;
