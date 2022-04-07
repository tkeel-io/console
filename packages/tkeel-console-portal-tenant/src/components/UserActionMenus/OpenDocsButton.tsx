import { MoreActionButton } from '@tkeel/console-components';
import { useDocuments } from '@tkeel/console-hooks';
import { ShutdownFilledIcon } from '@tkeel/console-icons';

export default function OpenDocsButton() {
  const documents = useDocuments();

  return (
    <MoreActionButton
      title="OpenDocs"
      icon={<ShutdownFilledIcon />}
      onClick={() => {
        documents.onOen(documents.config.paths.roles);
      }}
    />
  );
}
