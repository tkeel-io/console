import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Form, Modal } from '@tkeel/console-components';
import { isEmpty } from 'lodash';

import ProgressSchedule from '../../ProgressSchedule';
import BasicInfoPart from './BasicInfoPart';
import CompleteInfoPart from './CompleteInfoPart';
import ExtendInfoPart from './ExtendInfoPart';
import { DeviceValueType } from './types';

import useCreateDeviceGroupMutation, {
  RequestData as GroupInfo,
} from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceGroupMutation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const progressLabels = ['基本信息', '扩展信息', '创建完成'];
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

  const formHandler = useForm<DeviceValueType>();

  const { handleSubmit, trigger } = formHandler;

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setInfo(defaultInfo);
    }
  }, [isOpen]);

  const setGroupInfo = (params: { key: string; value: unknown }) => {
    const { key, value } = params;
    setInfo({ ...info, [key]: value });
    // eslint-disable-next-line no-console
    console.log({ ...info, [key]: value });
  };

  const getButtonText = () => {
    const { ext } = info;
    if (currentStep >= progressLabels.length - 1) {
      return BUTTON_TEXT.COMPLETE;
    }
    if (currentStep === progressLabels.indexOf('扩展信息') && isEmpty(ext)) {
      return BUTTON_TEXT.SKIP;
    }
    return BUTTON_TEXT.NEXT;
  };
  const { data } = useCreateDeviceGroupMutation();
  // eslint-disable-next-line no-console
  console.log(data);
  // const handleCreateDeviceGroup = () => {
  //   // mutate({ data: info });
  //   // eslint-disable-next-line no-console
  //   console.log(info);
  //   window.setTimeout(() => {
  //     onClose();
  //   }, 5000);
  // };
  const handleVerifyValue = async (step: number) => {
    let verifyKeys;
    if (step === 0) {
      verifyKeys = [
        'name',
        'parent',
        'directConnection',
        'useTemplate',
        'selfLearn',
        'desc',
      ] as const;
    }
    const result = await trigger(verifyKeys);
    if (result) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onSubmit: SubmitHandler<DeviceValueType> = (formValues) => {
    // eslint-disable-next-line no-console
    console.log('提交', formValues);
  };

  return (
    <Modal
      title={<Text fontSize="14px">创建设备组</Text>}
      isOpen={isOpen}
      onClose={onClose}
      width="800px"
      hasCancelButton={false}
      hasConfirmButton={false}
    >
      <Flex
        bg="gray.50"
        p="12px 12px 12px 20px"
        borderRadius="4px"
        flexDirection="row"
        minH="600px"
      >
        <Box w="127px">
          <ProgressSchedule infos={progressLabels} currentStep={currentStep} />
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
            {progressLabels[currentStep]}
          </Text>
          <Form
            flex="1"
            h="556px"
            onSubmit={handleSubmit(onSubmit)}
            pos="relative"
            mb="0px"
            pb="40px"
          >
            {currentStep === 0 && <BasicInfoPart formHandler={formHandler} />}
            {currentStep === 1 && (
              <ExtendInfoPart setGroupInfo={setGroupInfo} />
            )}
            {currentStep === 2 && <CompleteInfoPart />}
            <Button
              pos="absolute"
              right="0px"
              bottom="0px"
              colorScheme={
                getButtonText() === BUTTON_TEXT.SKIP ? 'gray' : 'primary'
              }
              fontSize="14px"
              px="30px"
              type={currentStep === 1 ? 'submit' : 'button'}
              onClick={() => {
                if (currentStep < 2) {
                  handleVerifyValue(currentStep);
                } else {
                  onClose();
                }
              }}
            >
              {getButtonText()}
            </Button>
          </Form>
        </Flex>
      </Flex>
    </Modal>
  );
}
