import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Cell, Column } from 'react-table';

import {
  FormControl,
  FormField,
  Loading,
  Table,
} from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { SuccessFilledIcon, WarningCircleIcon } from '@tkeel/console-icons';

import Tip from '@/tkeel-console-plugin-tenant-routing-rules/components/Tip';
import useCreateRelationMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useCreateRelationMutation';
import useEditRelationMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useEditRelationMutation';
import useDeviceMsgQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useDeviceMsgQuery';
import { Tables } from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useMappingQuery';
import useRelationTableQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRelationTableQuery';
import { PublishedFields } from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleTargetsQuery';

const { SelectField } = FormField;

export interface MapFormValues {
  mapping: string;
  [name: string]: string;
}
type FormValues = {
  mapping: string;
};

type SelectVal = {
  value: string;
  name: string;
};

type SelectEle = {
  target: SelectVal;
  type: string;
};

type Fields = {
  id?: string;
  name: string;
  type: string;
};

export type FiledItem = { index: number; t_field: Fields; m_field: Fields };

type Props = {
  modalKey: string;
  ruleId: string;
  deviceTemplateId: string;
  verifyId: string;
  targetId?: string;
  reFields: FiledItem[];
  mappingData: Tables[] | undefined;
  interfaceType: string;
  isLoading: boolean;
  defaultValues?: FormValues;
  publishedFieldsData: PublishedFields[] | [];
  onPrev: (e: FiledItem[] | []) => unknown;
  onNext: () => unknown;
};

export default function MappingRelation({
  modalKey,
  ruleId,
  deviceTemplateId,
  verifyId,
  targetId,
  reFields,
  mappingData,
  interfaceType,
  isLoading,
  defaultValues,
  publishedFieldsData,
  onPrev,
  onNext,
}: Props) {
  const databaseNameMap = {
    clickhouse: 'ClickHouse',
    mysql: 'MySQL',
  };
  const databaseName = (databaseNameMap[interfaceType] || '') as string;
  const tdBorderColor = useColor('gray.200');
  const [isGetDeviceMsg, setIsGetDeviceMsg] = useState(false);
  // const [isShowTip, setIsShowTip] = useState(false);
  const [isShowTip] = useState(false);
  const [selName, setSelName] = useState(defaultValues?.mapping ?? '');
  const isRequest = !!defaultValues?.mapping || isGetDeviceMsg;
  const { deviceMsgList } = useDeviceMsgQuery(deviceTemplateId, isRequest);
  const { fieldsData } = useRelationTableQuery(verifyId, selName);
  const { mutate: createMutate } = useCreateRelationMutation({
    ruleId,
    onSuccess() {
      onNext();
    },
  });
  const { mutate: editMutate } = useEditRelationMutation({
    verifyId,
    onSuccess() {
      onNext();
    },
  });

  const options =
    mappingData?.map((i) => ({
      value: i.Name,
      label: i.Name,
    })) || [];

  const deviceMsgOption =
    deviceMsgList.map((i) => ({
      value: i.id,
      label: i.name,
      type: i.type,
    })) || [];

  const backFieldsData = publishedFieldsData.map((item, index) => {
    return {
      ...item,
      name: item.t_field.name,
      type: item.t_field.type,
      id: item.m_field.name,
      index,
    };
  });

  const [editFields, setEditFields] = useState<FiledItem[]>(backFieldsData);
  let fields: FiledItem[] = reFields;
  const data = modalKey === 'edit' ? backFieldsData : fieldsData;
  const {
    control,
    formState: { errors },
    // trigger,
    // getValues,
  } = useForm<MapFormValues>({
    defaultValues,
  });

  const handlePrev = () => {
    fields = modalKey === 'edit' ? editFields : fields;
    onPrev(fields);
  };
  const handleNext = async () => {
    // const result = await trigger();
    // const formValues = getValues();
    // const isShow = !result && formValues?.mapping !== undefined;
    // setIsShowTip(isShow);
    // if (result) {
    // }
    if (modalKey === 'edit') {
      editMutate({
        data: {
          target_id: targetId ?? '',
          sink_type: interfaceType,
          sink_id: verifyId,
          table_name: selName,
          fields: editFields,
        },
      });
    } else {
      createMutate({
        data: {
          sink_type: interfaceType,
          sink_id: verifyId,
          table_name: selName,
          fields,
        },
      });
    }
  };

  const columns: ReadonlyArray<Column> = [
    {
      Header: '数据表字段名称',
      accessor: 'name',
      Cell: ({ value }: { value: string }) => {
        const name = value || '-';
        return useMemo(
          () => (
            <Text paddingLeft="20px" color="gray.700">
              {name}
            </Text>
          ),
          [name]
        );
      },
    },
    {
      Header: '类型',
      accessor: 'type',
      Cell: ({ value }: { value: string }) => {
        const type = value || '-';
        return useMemo(
          () => (
            <Text paddingLeft="20px" color="gray.500">
              {type}
            </Text>
          ),
          [type]
        );
      },
    },
    {
      Header: '设备消息字段',
      accessor: 'id',
      Cell: ({ row }: Cell<Fields>) =>
        useMemo(() => {
          const { original, index } = row;
          return (
            <Box bgColor="gray.50" padding="0 4px">
              <SelectField<MapFormValues>
                id={original.name}
                name={`word${index}`}
                placeholder="请选择"
                options={deviceMsgOption}
                control={control}
                defaultValue={original?.id}
                formLabelStyle={{ mb: 0 }}
                formHelperStyle={{ mt: 0 }}
                formControlStyle={{ mb: 0, height: '42px', width: '100%' }}
                selectStyles={{ selector: 'border-width: 0' }}
                rules={{
                  required: { value: true, message: '' },
                  onChange(e: SelectEle) {
                    const val = e.target.value;
                    const templateObj = deviceMsgOption.find(
                      (i) => i.value === val
                    );
                    const fieldsItem = {
                      index,
                      t_field: { name: original.name, type: original.type },
                      m_field: {
                        type: templateObj?.type || '',
                        name: templateObj?.value || '',
                      },
                    };
                    if (modalKey === 'edit') {
                      setEditFields([
                        ...editFields.filter(
                          (i) => i.index !== fieldsItem.index
                        ),
                        fieldsItem,
                      ]);
                      // editFields = [
                      //   ...editFields.filter(
                      //     (i) => i.index !== fieldsItem.index
                      //   ),
                      //   fieldsItem,
                      // ];
                    } else {
                      fields = [
                        ...fields.filter((i) => i.index !== fieldsItem.index),
                        fieldsItem,
                      ];
                    }
                  },
                }}
              />
            </Box>
          );
        }, [row]),
    },
  ];

  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  return (
    <Box>
      <Box h="calc(100% - 50px)" overflowY="auto">
        <Flex
          height="32px"
          lineHeight="32px"
          paddingLeft="12px"
          border="1px"
          borderColor="success.300"
          color="success.300"
          fontSize="12px"
          fontWeight="500"
          borderRadius="4px"
          backgroundColor="success.50"
          alignItems="center"
        >
          <SuccessFilledIcon color="green.300" size={18} />
          <Text ml="10px">数据库地址验证成功</Text>
        </Flex>
        <Flex flexDirection="column">
          <FormControl
            label="映射表"
            id="mappingSelect"
            formControlStyle={{ m: '20px 0 24px' }}
          >
            {options.length === 0 ? (
              <Tip
                icon={<WarningCircleIcon size={14} />}
                title={`当前地址无法检测出有效数据表，请移步「${databaseName}」创建映射表`}
                styles={{ text: { color: 'red.300' } }}
              />
            ) : (
              <SelectField<MapFormValues>
                id="mapping"
                name="mapping"
                placeholder="请选择"
                options={options}
                defaultValue={defaultValues?.mapping}
                error={errors.mapping}
                disabled={modalKey === 'edit'}
                rules={{
                  required: { value: true, message: '请选择映射表' },
                  onChange(e: SelectEle) {
                    const val = e?.target?.value;
                    setSelName(() => val);
                    setIsGetDeviceMsg(() => true);
                  },
                }}
                control={control}
                help={
                  <Tip
                    title={`如无法匹配合适映射表，请移步「${databaseName}」创建映射表`}
                  />
                }
                formLabelStyle={{ mb: 0 }}
                formControlStyle={{
                  height: '44px',
                  borderWidth: data?.length > 0 ? '1px' : '0',
                  borderRadius: '4px',
                }}
              />
            )}
          </FormControl>
          <FormControl label="映射关系" id="mappingTable">
            {backFieldsData.length === 0 && data.length === 0 ? (
              <Tip title="请优先选择映射表，进行映射" />
            ) : (
              <Box>
                <Table
                  columns={columns}
                  data={data}
                  hasPagination={false}
                  styles={{
                    head: {
                      border: '1px solid ',
                      borderColor: 'gray.200',
                      backgroundColor: 'gray.100',
                      padding: '5px 0',
                    },
                    headTr: { border: 'none' },
                    body: {
                      borderRight: '1px solid ',
                      borderColor: 'gray.200',
                    },
                    bodyTd: {
                      height: '42px',
                      borderLeft: '1px solid',
                      borderColor: `${tdBorderColor} !important`,
                      padding: 0,
                    },
                  }}
                />
                {isShowTip && (
                  <Text color="red.500" fontSize="14px" mt="4px">
                    设备消息字段为空
                  </Text>
                )}
              </Box>
            )}
          </FormControl>
        </Flex>
      </Box>
      <Flex justifyContent="end" mt="20px">
        <Button onClick={handlePrev} colorScheme="brand" mr="8px">
          上一步
        </Button>
        <Button onClick={handleNext} colorScheme="brand">
          下一步
        </Button>
      </Flex>
    </Box>
  );
}
