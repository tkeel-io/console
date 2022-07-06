import { Box, Flex, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { CellProps, Column } from 'react-table';

import { Table } from '@tkeel/console-components';
import { useColors } from '@tkeel/console-hooks';

interface ColorsData {
  variable: string;
  default: string;
  remark: string;
}

function Cell({ value }: { value: string }) {
  return (
    <Text color="grayAlternatives.400" fontSize="14px">
      {value}
    </Text>
  );
}

export default function ColorsPanel() {
  const colors = useColors();

  const columns: ReadonlyArray<Column<ColorsData>> = [
    {
      Header: '变量',
      accessor: 'variable',
      Cell: useCallback(
        ({ value, row }: CellProps<ColorsData, ColorsData['variable']>) => (
          <Flex alignItems="center">
            <Box
              width="16px"
              height="16px"
              borderRadius="4px"
              backgroundColor={colors.brand[row.original.default] as string}
            />
            <Text
              marginLeft="16px"
              color="gray.800"
              fontSize="14px"
              fontWeight="500"
            >
              {value}
            </Text>
          </Flex>
        ),
        [colors.brand]
      ),
    },
    {
      Header: '默认值',
      accessor: 'default',
      Cell: useCallback(
        ({ value }: CellProps<ColorsData, ColorsData['default']>) => (
          <Cell value={value} />
        ),
        []
      ),
    },
    {
      Header: '备注',
      accessor: 'remark',
      Cell: useCallback(
        ({ value }: CellProps<ColorsData, ColorsData['remark']>) => (
          <Cell value={value} />
        ),
        []
      ),
    },
  ];

  const data: ColorsData[] = [
    {
      variable: 'brand-main',
      default: '500',
      remark: '主色，多用于强调',
    },
    {
      variable: 'brand-hover',
      default: '700',
      remark: '主色悬浮，用在一些悬浮态势',
    },
    {
      variable: 'brand-active',
      default: '600',
      remark: '主色激活，用在一些激活态势',
    },
    {
      variable: 'brand-disable',
      default: '300',
      remark: '主色禁用，用在一些禁用态势',
    },
    {
      variable: 'brand-weak',
      default: '200',
      remark: '浅版主色，多用于对比',
    },
    {
      variable: 'brand-weaker',
      default: '50',
      remark: '浅版次级主色，多用于背景',
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      hasPagination={false}
      styles={{
        wrapper: { marginTop: '10px' },
        headTr: {
          height: '38px',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: 'grayAlternatives.50',
        },
        headTh: { fontSize: '14px', fontWeight: 'normal' },
        body: { backgroundColor: 'gray.50' },
        bodyTr: { borderBottom: 'none' },
      }}
    />
  );
}
