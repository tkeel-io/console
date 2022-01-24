import { Box, Flex, Text } from '@chakra-ui/react';

import Modal from '../../CustomModal';
import ProgressSchedule from '../../ProgressSchedule';

const infos = ['基本信息', '扩展信息', '创建完成'];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const currentStep = 0;

export default function CreateDeviceGroupModal({
  isOpen = true,
  onClose,
}: Props) {
  return (
    <Modal
      title={<Text fontSize="14px">创建设备组</Text>}
      isOpen={isOpen}
      onClose={onClose}
      footer={null}
    >
      <Flex
        bg="gray.50"
        p="12px 12px 12px 20px"
        borderRadius="4px"
        flexDirection="row"
        minH="600px"
      >
        <Box w="127px">
          <ProgressSchedule infos={infos} currentStep={currentStep} />
        </Box>
        <Box bg="white" flex="1" borderRadius="4px" p="10px 20px 20px">
          <Text fontWeight="600" fontSize="sm" mb="20px">
            {infos[currentStep]}
          </Text>
        </Box>
      </Flex>
    </Modal>
  );
}
