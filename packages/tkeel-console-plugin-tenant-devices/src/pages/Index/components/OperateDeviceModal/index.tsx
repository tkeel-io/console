import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { isEmpty, values } from 'lodash';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Form, Modal } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { TemplateItem, useTemplatesQuery } from '@tkeel/console-request-hooks';

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

// import AttributeDataPart from './AttributeDataPart';
import BasicInfoPart from './BasicInfoPart';
import CompleteInfoPart from './CompleteInfoPart';
import ExtendInfoPart from './ExtendInfoPart';

const defaultFormInfo = {
  name: '',
  parentId: '',
  parentName: '',
  templateId: '',
  templateName: '',
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
const PROGRESS_LABELS = {
  BASIC_INFO: '基本信息',
  EXTEND_INFO: '扩展信息',
  // ATTRIBUTE_DATA: '属性数据',
  COMPLETE_INFO: '创建完成',
};

const BASIC_STEP = [PROGRESS_LABELS.BASIC_INFO, PROGRESS_LABELS.EXTEND_INFO];

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
  isOpen = true,
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
  // const [useTemplate, setUseTemplate] = useState(
  //   !!defaultFormValues.templateId
  // );
  const [progressLabels, setProgressLabels] = useState(BASIC_STEP);
  const formHandler = useForm<DeviceFormFields>({
    defaultValues: defaultFormInfo,
  });
  const { handleSubmit, trigger, watch, reset, control, setError } =
    formHandler;
  const watchFields = watch();
  const fieldArrayHandler = useFieldArray({
    control,
    name: 'extendInfo',
  });

  const { templates } = useTemplatesQuery({ enabled: isOpen });
  const templateOptions = templates.map((val: TemplateItem) => {
    return { id: val.id, label: val.properties.basicInfo.name };
  });
  // const templateItem = templates.find(
  //   (val) => val.id === watchFields.templateId
  // );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const attributeList = values(templateItem?.configs?.attributes ?? {});

  useEffect(() => {
    /* if (useTemplate && mode === ModalMode.CREATE) {
      setProgressLabels([
        ...BASIC_STEP,
        PROGRESS_LABELS.ATTRIBUTE_DATA,
        PROGRESS_LABELS.COMPLETE_INFO,
      ]);
    } else if (useTemplate && mode === ModalMode.EDIT) {
      setProgressLabels([...BASIC_STEP, PROGRESS_LABELS.ATTRIBUTE_DATA]);
    } else if (!useTemplate && mode === ModalMode.CREATE) {
      setProgressLabels([...BASIC_STEP, PROGRESS_LABELS.COMPLETE_INFO]);
    } else {
      setProgressLabels([...BASIC_STEP]);
    } */
    if (mode === ModalMode.CREATE) {
      setProgressLabels([...BASIC_STEP, PROGRESS_LABELS.COMPLETE_INFO]);
    } else {
      setProgressLabels([...BASIC_STEP]);
    }
  }, [mode]);
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
        parentName,
        templateId,
        templateName,
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
        parentName,
      };
      const deviceDefaultInfo = {
        connectInfo,
        connectType:
          // eslint-disable-next-line no-nested-ternary
          directConnection === true
            ? ConnectOption.DIRECT
            : directConnection === false
            ? ConnectOption.INDIRECT
            : '',
        templateId,
        templateName,
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
        navigate(`/detail/?id=${id}&menu-collapsed=true`);
      }
    } else if (progressLabels[currentStep] === PROGRESS_LABELS.BASIC_INFO) {
      // 第一步校验信息
      const result = await trigger([
        'name',
        'parentId',
        'connectType',
        'description',
      ]);

      if (result) {
        if (
          watchFields.connectInfo?.includes(ConnectInfoType.useTemplate) &&
          !watchFields.templateId
        ) {
          setError('templateId', {});
        } else if (mode === ModalMode.EDIT) {
          handleConfirm({ formValues });
        } else {
          setCurrentStep(currentStep + 1);
        }
      }
    } else if (
      progressLabels[currentStep] === PROGRESS_LABELS.EXTEND_INFO && // 校验第二步的信息并提交
      (await trigger(['extendInfo']))
    ) {
      handleConfirm({ formValues });
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

  // const handleSelectTemplate = (selected: boolean) => {
  //   setUseTemplate(selected);
  // };
  const primaryColor = useColor('brand.50');
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
            handleClick={(idx) => {
              setCurrentStep(idx);
            }}
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
            {progressLabels[currentStep] === PROGRESS_LABELS.BASIC_INFO && (
              <BasicInfoPart
                formHandler={formHandler}
                watchFields={watchFields}
                type={type}
                mode={mode}
                groupOptions={deviceGroupOptions}
                templateOptions={templateOptions}
                defaultFormValues={defaultFormValues}
                // handleSelectTemplate={handleSelectTemplate}
              />
            )}

            {progressLabels[currentStep] === PROGRESS_LABELS.EXTEND_INFO && (
              <ExtendInfoPart
                formHandler={formHandler}
                watchFields={watchFields}
                fieldArrayHandler={fieldArrayHandler}
              />
            )}
            {/* {progressLabels[currentStep] === PROGRESS_LABELS.ATTRIBUTE_DATA && (
              <AttributeDataPart
                attributeList={attributeList}
                watchFields={watchFields}
              />
            )} */}
            {progressLabels[currentStep] === PROGRESS_LABELS.COMPLETE_INFO && (
              <CompleteInfoPart type={type} responseData={responseData} />
            )}
            <Flex
              h="32px"
              position="absolute"
              bottom="0px"
              direction="row"
              w="100%"
            >
              <Spacer />
              {[
                PROGRESS_LABELS.EXTEND_INFO,
                // PROGRESS_LABELS.ATTRIBUTE_DATA,
              ].includes(progressLabels[currentStep]) &&
                mode !== ModalMode.EDIT && (
                  <Button
                    colorScheme="brand"
                    fontSize="14px"
                    mr="14px"
                    boxShadow={`0px 4px 12px ${primaryColor}`}
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                    }}
                  >
                    上一步
                  </Button>
                )}
              <Button
                colorScheme={
                  getButtonText() === BUTTON_TEXT.SKIP ? 'gray' : 'brand'
                }
                fontSize="14px"
                px="30px"
                type="submit"
                isLoading={isLoading}
                boxShadow={`0px 4px 12px ${useColor('brand.50')}`}
              >
                {mode === ModalMode.EDIT
                  ? BUTTON_TEXT.COMPLETE
                  : getButtonText()}
              </Button>
            </Flex>
          </Form>
        </Flex>
      </Flex>
    </Modal>
  );
}
