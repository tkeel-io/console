import { Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { LinkButton, Modal } from '@tkeel/console-components';
import { CreateFinishedIcon } from '@tkeel/console-icons';

import CopyInstallCommand from '@/tkeel-console-plugin-tenant-networks/components/CopyInstallCommand';

export interface FormValues {
  networkName: string;
}

interface Props {
  title: string;
  id: string;
  copyData: string;
  token: string;
  isOpen: boolean;
  onClose: () => unknown;
}

export default function CopyCommandModal({
  title,
  id,
  copyData,
  token,
  isOpen,
  onClose,
}: Props) {
  const navigate = useNavigate();

  return (
    <Modal
      height="496px"
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onClose}
      modalBodyStyle={{ padding: '12px 80px' }}
    >
      <Flex flexDirection="column" alignItems="center">
        <CreateFinishedIcon size={96} />
        <Flex m="20px 0 48px" alignItems="center">
          <Text fontSize="14px">已成功创建代理网关,可继续为其</Text>
          <LinkButton
            onClick={() => navigate(`/detail/${id}?menu-collapsed=true`)}
            fontSize="14px"
          >
            添加代理服务
          </LinkButton>
        </Flex>
      </Flex>
      <CopyInstallCommand copyData={copyData} token={token} />
    </Modal>
  );
}
