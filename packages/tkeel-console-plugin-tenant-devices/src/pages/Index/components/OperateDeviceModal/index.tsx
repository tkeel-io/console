/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { isEmpty, values } from 'lodash';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Form, Modal } from '@tkeel/console-components';

import ProgressSchedule from '@/tkeel-console-plugin-tenant-devices/components/ProgressSchedule';
import { ApiData as GroupResData } from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceGroupMutation';
import { ApiData as DeviceResData } from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceMutation';
import useGroupTreeQuery, {
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';
import {
  ConnectInfoType,
  ConnectOption,
  DeviceDefaultInfoType,
  DeviceFormFields,
  GroupOptions,
  ModalMode,
  ModalType,
} from '@/tkeel-console-plugin-tenant-devices/pages/Index/types';

import BasicInfoPart from './BasicInfoPart';
import CompleteInfoPart from './CompleteInfoPart';
import ExtendInfoPart from './ExtendInfoPart';

const defaultFormInfo = {
  name: '',
  parentId: '',
  parentName: '',
  extendInfo: [],
  description: '',
};

interface Props {
  title: string; // 弹窗的title
  mode: ModalMode; // modalMode 编辑/新建
  type: ModalType; // modalType 设备/设备组
  isSuccess?: boolean;
  defaultFormValues?: DeviceDefaultInfoType; // 编辑模式下的原本数据或者初始默认数据
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: ({ formValues }: { formValues: DeviceFormFields }) => void; // 提交submit去请求接口
  isLoading?: boolean;
  responseData?: DeviceResData | GroupResData | null;
  groupTree?: TreeNodeType;
}
const BUTTON_TEXT = {
  NEXT: '下一步',
  SKIP: '跳过',
  COMPLETE: '完成',
};

function getTreeNodeData({ data }: { data: TreeNodeType }): GroupOptions[] {
  return values(data).map((item) => {
    const { nodeInfo, subNode } = item;
    const { id, properties } = nodeInfo;
    const name = properties?.group?.name ?? '';
    return {
      title: name,
      key: id,
      value: id,
      children: getTreeNodeData({ data: subNode }),
    };
  });
}

export default function OperateDeviceModal({
  title,
  type,
  isOpen,
  onClose,
  handleConfirm,
  defaultFormValues = defaultFormInfo,
  isLoading,
  responseData,
  mode,
  isSuccess = false,
  groupTree,
}: Props) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const formHandler = useForm<DeviceFormFields>({
    defaultValues: defaultFormInfo,
  });
  const { handleSubmit, trigger, watch, reset, control } = formHandler;
  const watchFields = watch();
  const fieldArrayHandler = useFieldArray({
    control,
    name: 'extendInfo',
  });
  const progressLabels =
    mode === ModalMode.EDIT
      ? ['基本信息', '扩展信息']
      : ['基本信息', '扩展信息', '创建完成'];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const groupTreeCopy = groupTree || useGroupTreeQuery().groupTree;
  const deviceGroupOptions = getTreeNodeData({
    data: groupTreeCopy,
  });
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
    } else if (defaultFormValues) {
      const {
        description,
        name,
        ext,
        selfLearn,
        parentId,
        templateId,
        directConnection,
      } = defaultFormValues;
      const connectInfo = [];
      if (selfLearn) {
        connectInfo.push(ConnectInfoType.selfLearn);
      }
      if (templateId) {
        connectInfo.push(ConnectInfoType.useTemplate);
      }
      const basicFormInfo = {
        description,
        name,
        extendInfo: Object.entries(ext || {}).map(([label, value]) => {
          return { label, value };
        }),
        parentId,
      };
      const deviceDefaultInfo = {
        connectInfo,
        connectType: directConnection ? ConnectOption.DIRECT : '',
      };
      const defaultFormInfoCopy =
        type === ModalType.DEVICE
          ? Object.assign(basicFormInfo, deviceDefaultInfo)
          : basicFormInfo;
      reset(defaultFormInfoCopy);
    } else {
      reset(defaultFormInfo);
    }
  }, [defaultFormValues, isOpen, mode, reset, type]);
  useEffect(() => {
    if (currentStep === 1 && isSuccess && !isLoading) {
      if (mode === ModalMode.EDIT) {
        onClose();
      } else {
        setCurrentStep(2);
      }
    }
  }, [currentStep, isLoading, isSuccess, mode, onClose]);
  const onSubmit: SubmitHandler<DeviceFormFields> = async (formValues) => {
    const id = (responseData as DeviceResData)?.deviceObject?.id;
    if (currentStep >= 2) {
      setCurrentStep(0);
      onClose();
      if (type === ModalType.DEVICE && id) {
        navigate(`/detail/?id=${id}`);
      }
    } else if (currentStep === 0) {
      // 第一步校验信息
      const result = await trigger([
        'name',
        'parentId',
        'connectType',
        'description',
      ]);
      if (result) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 1) {
      // 校验第二步的信息并提交
      const result = await trigger(['extendInfo']);
      if (result) {
        handleConfirm({ formValues });
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
      title={<Text fontSize="14px">{title}</Text>}
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
          <ProgressSchedule
            infos={progressLabels}
            currentStep={currentStep}
            mode={mode}
          />
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
                groupOptions={deviceGroupOptions}
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
