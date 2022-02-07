import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Modal } from '@tkeel/console-components';

import ProgressSchedule from '../../ProgressSchedule';
import BasicInfoPart from './BasicInfoPart';
import CompleteInfoPart from './CompleteInfoPart';
import ExtendInfoPart from './ExtendInfoPart';

import { RequestData as GroupInfo } from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceGroupMutation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const infos = ['基本信息', '扩展信息', '创建完成'];
const BUTTON_TEXT = {
  NEXT: '下一步',
  SKIP: '跳过',
  COMPLETE: '完成',
};
const defaultInfo = {
  name: '',
  parent: '',
  ext: {},
  desc: '',
};

export default function CreateDeviceGroupModal({ isOpen, onClose }: Props) {
  const [info, setInfo] = useState<GroupInfo>(defaultInfo);
  const [currentStep, setCurrentStep] = useState(0);
  const [extendInfo, setExtendInfo] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setExtendInfo([]);
      setInfo(defaultInfo);
    }
  }, [isOpen]);

  const setGroupInfo = useCallback(
    (params: { key: string; value: unknown }) => {
      const { key, value } = params;
      setInfo({ ...info, [key]: value });
      // eslint-disable-next-line no-console
      console.log(info);
    },
    [info]
  );

  const getButtonText = () => {
    if (currentStep >= infos.length - 1 || extendInfo.length > 0) {
      return BUTTON_TEXT.COMPLETE;
    }
    if (currentStep === infos.indexOf('扩展信息')) {
      return BUTTON_TEXT.SKIP;
    }
    return BUTTON_TEXT.NEXT;
  };

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
          <Box flex="1" h="540px" pb="16px">
            {currentStep === 0 && (
              <BasicInfoPart groupInfo={info} setGroupInfo={setGroupInfo} />
            )}
            {currentStep === 1 && <ExtendInfoPart />}
            {currentStep === 2 && <CompleteInfoPart />}
          </Box>
          <Button
            colorScheme={
              getButtonText() === BUTTON_TEXT.SKIP ? 'gray' : 'primary'
            }
            alignSelf="flex-end"
            fontSize="14px"
            px="30px"
            onClick={() => {
              if (currentStep < 2) {
                setCurrentStep(currentStep + 1);
              } else {
                onClose();
              }
            }}
          >
            {getButtonText()}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
}
