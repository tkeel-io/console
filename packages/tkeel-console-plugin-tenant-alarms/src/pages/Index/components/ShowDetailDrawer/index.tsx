import { Drawer } from '@tkeel/console-components';

export interface Props {
  isOpen: boolean;
  loading?: boolean;
  onClose: () => unknown;
}

function ShowDetailDrawer({ isOpen, onClose, loading }: Props) {
  return (
    <Drawer title="告警详情" width="700px" isOpen={isOpen} onClose={onClose}>
      告警详情 Drawer {loading}
    </Drawer>
  );
}

export default ShowDetailDrawer;
