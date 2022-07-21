import { Box, Button, Flex, StyleProps, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { AceEditor, ButtonsHStack, Modal } from '@tkeel/console-components';

import useEditSQLMutation from '@/tkeel-console-plugin-tenant-routing-rules/hooks/mutations/useEditSQLMutation';

interface Props {
  ruleId: string;
  isOpen: boolean;
  selectExpr: string;
  whereExpr: string;
  onClose: () => void;
  onSuccess: () => void;
}
export const DEFAULT_SELECT_EXPR = 'SELECT * ';
export const DEFAULT_WHERE_EXPR = 'WHERE ';
export default function EditSQLModal({
  ruleId,
  isOpen,
  selectExpr,
  whereExpr,
  onClose,
  onSuccess,
}: Props) {
  const [selectExpression, setSelectExpression] = useState(
    selectExpr || DEFAULT_SELECT_EXPR
  );

  const [whereExpression, setWhereExpression] = useState(
    whereExpr || DEFAULT_WHERE_EXPR
  );

  const { mutate, isLoading } = useEditSQLMutation({
    ruleId,
    onSuccess() {
      onClose();
      onSuccess();
    },
  });

  const baseStyle: StyleProps = {
    fontSize: '12px',
    lineHeight: '20px',
  };

  const labelStyle: StyleProps = {
    ...baseStyle,
    color: 'grayAlternatives.200',
  };

  const descStyle: StyleProps = {
    ...baseStyle,
    marginTop: '4px',
    color: 'gray.500',
  };

  const handleReset = () => {
    setSelectExpression(DEFAULT_SELECT_EXPR);
    setWhereExpression(DEFAULT_WHERE_EXPR);
  };

  const handleConfirm = () => {
    if (ruleId) {
      mutate({
        data: {
          id: Number(ruleId),
          select_expr: selectExpression,
          where_expr: whereExpression,
        },
      });
    }
  };

  return (
    <Modal
      title="生成 SQL"
      isOpen={isOpen}
      onClose={onClose}
      width="790px"
      footer={
        <ButtonsHStack>
          <Button onClick={handleReset}>重置</Button>
          <Button
            isDisabled={false}
            isLoading={isLoading}
            colorScheme="brand"
            onClick={handleConfirm}
          >
            确定
          </Button>
        </ButtonsHStack>
      }
    >
      <Box
        marginBottom="12px"
        height="310px"
        padding="20px 24px"
        borderRadius="2px"
        backgroundColor="grayAlternatives.700"
      >
        <Text {...labelStyle}>字段 Fields</Text>
        <AceEditor
          language="ruleql"
          readOnly={false}
          highlightActiveLine={false}
          enableLiveAutocompletion
          height="48px"
          value={selectExpression}
          onChange={(value) => setSelectExpression(value)}
        />
        <Text {...descStyle}>默认查询设备上报的全部数据。</Text>
        <Flex marginTop="20px" alignItems="center">
          <Text {...labelStyle}>条件 Conditions</Text>
          <Text {...descStyle} marginTop="0">
            （可选）
          </Text>
        </Flex>
        <AceEditor
          language="ruleql"
          readOnly={false}
          highlightActiveLine={false}
          enableLiveAutocompletion
          height="48px"
          value={whereExpression}
          onChange={(value) => setWhereExpression(value)}
        />
        <Text {...descStyle}>
          规则引擎提供多种函数，您可以在编写SQL时使用这些函数，实现多样化数据处理。
        </Text>
      </Box>
      {/* <Tip title="" /> */}
    </Modal>
  );
}
