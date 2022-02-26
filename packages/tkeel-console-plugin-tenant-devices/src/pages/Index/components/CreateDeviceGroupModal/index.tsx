/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { Form, Modal } from '@tkeel/console-components';

import ProgressSchedule from '@/tkeel-console-plugin-tenant-devices/components/ProgressSchedule';
import { ApiData as GroupResData } from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceGroupMutation';
import { ApiData as DeviceResData } from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceMutation';
import { DeviceApiItem } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceListQuery';

import BasicInfoPart from '../DeviceModalPart/BasicInfoPart';
import CompleteInfoPart from '../DeviceModalPart/CompleteInfoPart';
import ExtendInfoPart from '../DeviceModalPart/ExtendInfoPart';
import {
  ConnectInfoType,
  ConnectOption,
  CreateType,
  DeviceValueType,
  ModalMode,
} from '../DeviceModalPart/types';

const defaultFormInfo = {
  name: '',
  parentId: '',
  extendInfo: [],
  description: '',
};

interface Props {
  mode?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  defaultFormValues?: DeviceApiItem;
  isOpen: boolean;
  onClose: () => void;
  type: CreateType;
  handleConfirm: ({ formValues }: { formValues: DeviceValueType }) => void;
  isLoading?: boolean;
  responseData?: DeviceResData | GroupResData | null;
}
const progressLabels = ['基本信息', '扩展信息', '创建完成'];
const BUTTON_TEXT = {
  NEXT: '下一步',
  SKIP: '跳过',
  COMPLETE: '完成',
};

export default function CreateDeviceGroupModal({
  type,
  isOpen,
  onClose,
  handleConfirm,
  defaultFormValues,
  isLoading = false,
  responseData = null,
  mode,
}: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const formHandler = useForm<DeviceValueType>({
    defaultValues: defaultFormInfo,
  });
  const { handleSubmit, trigger, watch, reset, control } = formHandler;
  const watchFields = watch();

  const fieldArrayHandler = useFieldArray({
    control,
    name: 'extendInfo',
  });

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
    }
    if (mode === ModalMode.EDIT && defaultFormValues) {
      const {
        description,
        name,
        ext,
        selfLearn,
        parentId,
        templateId,
        directConnection,
      } = defaultFormValues?.properties?.basicInfo;
      const connectInfo = [];
      if (selfLearn) {
        connectInfo.push(ConnectInfoType.selfLearn);
      }
      if (templateId) {
        connectInfo.push(ConnectInfoType.useTemplate);
      }
      const defaultFormInfoCopy = {
        description,
        name,
        extendInfo: Object.entries(ext).map(([value, label]) => {
          return { label, value };
        }),
        connectInfo,
        parentId,
        directConnection: directConnection ? ConnectOption.DIRECT : '',
      };
      reset(defaultFormInfoCopy);
    } else {
      reset(defaultFormInfo);
    }
  }, [defaultFormValues, isOpen, mode, reset]);
  useEffect(() => {
    if (currentStep === 1 && responseData) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, responseData]);
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
      if (result && currentStep <= 1) {
        setCurrentStep(currentStep + 1);
        if (currentStep === 1) {
          handleConfirm({ formValues });
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
                type={type}
              />
            )}
            {currentStep === 1 && (
              <ExtendInfoPart
                formHandler={formHandler}
                watchFields={watchFields}
                fieldArrayHandler={fieldArrayHandler}
              />
            )}
            {currentStep === 2 && (
              <CompleteInfoPart type={type} responseData={responseData} />
            )}
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
