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
import useDeviceMsgQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useDeviceMsgQuery';
import { Tables } from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useMappingQuery';
// import useRelationTableQuery from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRelationTableQuery';

const { SelectField } = FormField;

export interface MapFormValues {
  mapping: string;
  [name: string]: string;
}

type Props = {
  // verifyId: string;
  mappingData: Tables | undefined;
  isLoading: boolean;
  onPrev: () => unknown;
  // onNext: (e: MapFormValues) => unknown;
};

// type SelectVal = {
//   value: string;
//   name: string;
// };

// type SelectEle = {
//   target: SelectVal;
//   type: string;
// };

type Fields = {
  name: string;
  type: string;
};

export default function MappingRelation({
  // verifyId,
  mappingData,
  isLoading,
  onPrev,
}: // onNext,
Props) {
  const tdBorderColor = useColor('gray.200');
  const [isGetDeviceMsg, setIsGetDeviceMsg] = useState(false);
  // const [selName, setSelName] = useState('');
  const [data, setData] = useState<Fields[]>([]);

  const templateId = 'iotd-228a5510-d640-417b-a4b6-095e5970d82b';
  const { deviceMsgList } = useDeviceMsgQuery(templateId, isGetDeviceMsg);
  // const { fieldsData } = useRelationTableQuery(verifyId, selName);
  // console.log(fieldsData);
  const options =
    mappingData?.fields.map((i) => ({
      value: i.name,
      label: i.name,
    })) || [];

  const deviceMsgOption =
    deviceMsgList.map((i) => ({
      value: i.id,
      label: i.name,
    })) || [];

  const {
    control,
    // register,
    formState: { errors },
    // trigger,
    // getValues,
    // reset,
  } = useForm<MapFormValues>();

  const handlePrev = () => {
    onPrev();
  };
  // const handleNext = async () => {
  //   const result = await trigger();
  //   if (result) {
  //     const formValues = getValues();
  //     onNext(formValues);
  //     reset();
  //   }
  // };

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
                // defaultValue={value}
                options={deviceMsgOption}
                control={control}
                formLabelStyle={{ mb: 0 }}
                formHelperStyle={{ mt: 0 }}
                formControlStyle={{ mb: 0, height: '42px', width: '100%' }}
                selectStyles={{ selector: 'border-width: 0' }}
                // rules={{
                //   onChange(e: SelectEle) {
                //     console.log(e);
                //     console.log(original);
                //     // const val = e?.target?.value;
                //     //     const field = mappingData.find(
                //     //       (i) => i.IndexGranularity === val
                //     //     );
                //     //     const fields: Fields[] = field?.fields || [];
                //     //     setData(fields);
                //   },
                // }}
              />
            </Box>
          );
        }, [row]),
    },
  ];
  return (
    <Box>
      {' '}
      {isLoading ? (
        <Loading styles={{ wrapper: { height: '100%' } }} />
      ) : (
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
                    title="当前地址无法检测出有效数据表，请移步「MySQL」创建映射表"
                    styles={{ text: { color: 'red.300' } }}
                  />
                ) : (
                  <SelectField<MapFormValues>
                    id="mapping"
                    name="mapping"
                    // defaultValue={defaultValue}
                    options={options}
                    error={errors.mapping}
                    rules={{
                      required: { value: true, message: '请选择映射表' },
                      onChange() {
                        // e: SelectEle
                        // console.log(e);
                        // const val = e?.target?.value;
                        // setSelName(() => val);
                        setIsGetDeviceMsg(() => true);
                        const fields = [
                          { name: 'test1', type: 'string' },
                          { name: 'test2', type: 'number' },
                          { name: 'test3', type: 'number' },
                        ];
                        setData(fields);
                        // const val = e?.target?.value;
                        // const field = mappingData.find(
                        //   (i) => i.IndexGranularity === val
                        // );
                        // const fields: Fields[] = field?.fields || [];
                        // setData(fields);
                      },
                    }}
                    control={control}
                    help={
                      <Tip title="如无法匹配合适映射表，请移步「MySQL」创建映射表" />
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
                {data.length === 0 ? (
                  <Tip title="请优先选择映射表，进行映射" />
                ) : (
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
                )}
              </FormControl>
            </Flex>
          </Box>
          <Flex justifyContent="end" mt="20px">
            <Button onClick={handlePrev} colorScheme="primary" mr="8px">
              上一步
            </Button>
            {/* <Button onClick={handleNext} colorScheme="primary">
             */}
            <Button colorScheme="primary">下一步</Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
