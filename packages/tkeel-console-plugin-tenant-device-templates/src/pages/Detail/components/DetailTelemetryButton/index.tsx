import { useDisclosure } from '@chakra-ui/react';

import { TelemetryDrawer } from '@tkeel/console-business-components';
import { MoreActionButton } from '@tkeel/console-components';
import { EyeFilledIcon } from '@tkeel/console-icons';

import useTelemetryDetailQuery, {
  UsefulData,
} from '@/tkeel-console-plugin-tenant-device-templates/hooks/queries/useTelemetryDetailQuery';

type Props = {
  uid: string;
  id: string;
};

export default function DetailTelemetryButton({ uid, id }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { usefulData } = useTelemetryDetailQuery(uid, id);

  return (
    <>
      <MoreActionButton
        icon={<EyeFilledIcon size="12px" color="grayAlternatives.300" />}
        title="查看详情"
        onClick={() => {
          onOpen();
          // mutate({});
        }}
      />
      <TelemetryDrawer
        isOpen={isOpen}
        onClose={onClose}
        usefulData={usefulData as UsefulData}
      />
    </>
  );
}
