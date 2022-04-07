import { Box, Flex, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Column } from 'react-table';

import { FormControl, FormField, Table } from '@tkeel/console-components';
import { SuccessFilledIcon, WarningCircleIcon } from '@tkeel/console-icons';

// import { KafkaFilledIcon } from '@tkeel/console-icons';
// import { plugin } from '@tkeel/console-utils';
// import useVerifyKafkaMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useVerifyKafkaMutation';
// import ModalContentTitle from '@/tkeel-console-plugin-tenant-routing-rules/pages/Detail/components/ModalContentTitle';
import Tip from './Tip';

const { SelectField } = FormField;

export interface FormValues {
  mapping: string;
  word: string;
}

// type Props = {
//   onClose: () => unknown;
// };

export default function MappingRelation() {
  const {
    control,
    // register,
    formState: { errors },
    // trigger,
    // getValues,
    // reset,
  } = useForm<FormValues>();
  const options = [
    { value: '1', label: 'iot_metrics' },
    { value: '2', label: 'iot_metrics2' },
  ];
  const columns: ReadonlyArray<Column> = [
    {
      Header: '数据表字段名称',
      accessor: 'name',
      Cell: ({ value }: { value: string }) => {
        const name = value || '-';
        return useMemo(
          () => (
            <Text
              borderRight="1px solid"
              width="100%"
              height="44px"
              lineHeight="44px"
              borderColor="gray.200"
              fontWeight={500}
              color="gray.700"
              // flex={1}
              // alignItems="center"
            >
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
            <Text
              borderRight="1px solid"
              width="100%"
              height="44px"
              lineHeight="44px"
              borderColor="gray.200"
              // flex={1}
              // alignItems="center"
            >
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
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Box bgColor="gray.50" position="absolute" right="0" height="44px">
              <SelectField<FormValues>
                id="word"
                name="word"
                defaultValue={value}
                options={options}
                control={control}
                formLabelStyle={{ mb: 0 }}
                formHelperStyle={{ mt: 0 }}
                formControlStyle={{ mb: 0, height: '42px' }}
                selectStyles={{ selector: 'border-width: 0' }}
              />
            </Box>
          ),
          [value]
        ),
    },
  ];
  const data = [
    {
      id: '2',
      name: '管理员',
      type: '1648802354',
    },
    {
      id: '1',
      name: '管理员',
      type: '1648802354',
    },
  ];
  return (
    <Box>
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
              styles={{ wrapper: { color: 'red.300' } }}
            />
          ) : (
            <SelectField<FormValues>
              id="mapping"
              name="mapping"
              // defaultValue={defaultValue}
              options={options}
              error={errors.mapping}
              rules={{
                required: { value: true, message: '请选择映射表' },
              }}
              control={control}
              help={
                <Tip title="如无法匹配合适映射表，请移步「MySQL」创建映射表" />
              }
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
              // scroll={{ y: '100%' }}
              // isLoading={isLoading}
              styles={{
                head: {
                  border: '1px solid ',
                  borderColor: 'gray.200',
                  backgroundColor: 'gray.100',
                  padding: '5px 0',
                },
                headTr: { border: 'none' },
                body: {
                  borderLeft: '1px solid ',
                  borderRight: '1px solid ',
                  borderColor: 'gray.200',
                },
                bodyTr: {
                  height: '44px',
                  position: 'relative',
                },
              }}
            />
          )}
        </FormControl>
      </Flex>
    </Box>
  );
}
