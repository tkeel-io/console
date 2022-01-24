import { useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import Modal from '../../CustomModal';
import ProgressSchedule from '../../ProgressSchedule';
import BasicInfoPart from './BasicInfoPart';
import ExtendInfoPart from './ExtendInfoPart';

const infos = ['基本信息', '扩展信息', '创建完成'];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateDeviceGroupModal({
  isOpen = true,
  onClose,
}: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);
  return (
    <Modal
      title={<Text fontSize="14px">创建设备组</Text>}
      isOpen={isOpen}
      onClose={onClose}
      footer={null}
      width="800px"
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
        <Flex
          flexDirection="column"
          bg="white"
          flex="1"
          borderRadius="4px"
          p="10px 20px 20px"
        >
          <Text
            fontWeight="600"
            fontSize="sm"
            mb={currentStep === 0 ? '20px' : '8px'}
          >
            {infos[currentStep]}
          </Text>
          <Box flex="1">
            {currentStep === 0 && <BasicInfoPart />}
            {currentStep === 1 && <ExtendInfoPart />}
          </Box>
          <Button
            colorScheme="primary"
            alignSelf="flex-end"
            onClick={() => {
              setCurrentStep(currentStep + 1);
            }}
          >
            下一步
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
}
