/* eslint-disable no-console */
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Form, Modal } from '@tkeel/console-components';
import { has, isEmpty, keyBy, mapValues } from 'lodash';

import ProgressSchedule from '../../ProgressSchedule';
import BasicInfoPart from './BasicInfoPart';
import CompleteInfoPart from './CompleteInfoPart';
import ExtendInfoPart from './ExtendInfoPart';
import { ConnectInfoType, ConnectOption, DeviceValueType } from './types';

import useCreateDeviceGroupMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceGroupMutation';

const defaultFormInfo = {
  name: '',
  parentId: '',
  extendInfo: [],
  description: '',
};

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

export default function CreateDeviceGroupModal({ isOpen, onClose }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const formHandler = useForm<DeviceValueType>({
    defaultValues: defaultFormInfo,
  });
  const fieldArrayHandler = useFieldArray({
    control: formHandler.control,
    name: 'extendInfo',
  });

  const { handleSubmit, trigger, watch, reset } = formHandler;
  const watchFields = watch();

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      reset(defaultFormInfo);
    }
  }, [isOpen, reset]);

  const { data, isLoading, mutate } = useCreateDeviceGroupMutation();
  console.log(data, mutate, isLoading);

  const onSubmit: SubmitHandler<DeviceValueType> = async (formValues) => {
    if (currentStep >= 2) {
      onClose();
    } else {
      let verifyKeys;
      if (currentStep === 0) {
        verifyKeys = [
          'name',
          'parentId',
          'directConnection',
          'description',
        ] as const;
      } else if (currentStep === 1) {
        verifyKeys = ['extendInfo'] as const;
      }
      const result = await trigger(verifyKeys);
      if (result) {
        setCurrentStep(currentStep + 1);
        if (currentStep === 1) {
          const {
            description,
            name,
            directConnection,
            connectInfo,
            extendInfo,
          } = formValues;
          const params = {
            description,
            name,
            directConnection: directConnection === ConnectOption.DIRECT,
            selfLearn: has(connectInfo, ConnectInfoType.selfLearn),
            templateId: has(connectInfo, ConnectInfoType.useTemplate)
              ? '123'
              : '',
            ext: mapValues(keyBy(extendInfo, 'label'), 'value'),
            parentId: '',
          };

          console.log(params);
          // mutate({ data: params });
        }
      }
    }
  };

  const getButtonText = () => {
    if (currentStep >= progressLabels.length - 1) {
      return BUTTON_TEXT.COMPLETE;
    }
    if (
      currentStep === progressLabels.indexOf('扩展信息') &&
      isEmpty(watchFields.extendInfo)
    ) {
      return BUTTON_TEXT.SKIP;
    }
    return BUTTON_TEXT.NEXT;
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
            {currentStep === 0 && (
              <BasicInfoPart
                formHandler={formHandler}
                watchFields={watchFields}
              />
            )}
            {currentStep === 1 && (
              <ExtendInfoPart
                formHandler={formHandler}
                watchFields={watchFields}
                fieldArrayHandler={fieldArrayHandler}
              />
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
              type="submit"
              isLoading={isLoading}
            >
              {getButtonText()}
            </Button>
          </Form>
        </Flex>
      </Flex>
    </Modal>
  );
}
