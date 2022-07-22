import {
  Box,
  Button,
  Flex,
  StyleProps,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { AceEditor, Tooltip } from '@tkeel/console-components';
import { LoadingCircleFilledIcon } from '@tkeel/console-icons';

import useRuleDetailQuery, {
  RuleStatus,
} from '@/tkeel-console-plugin-tenant-routing-rules/hooks/queries/useRuleDetailQuery';

import EditSQLModal from '../EditSQLModal';

interface Props {
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
  };
}

export default function RuleSQL({ sx, styles }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const ruleId = id || '';
  const { data, refetch } = useRuleDetailQuery(ruleId);
  const selectExpr = data?.select_expr ?? '';
  const whereExpr = data?.where_expr ?? '';
  const sql = `${selectExpr}
${whereExpr}`;

  const editSqlButtonDisabled = data?.status === RuleStatus.Start;

  return (
    <Box
      padding="20px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="grayAlternatives.50"
      borderRadius="4px"
      backgroundColor="white"
      {...styles?.root}
      {...sx}
    >
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <LoadingCircleFilledIcon size={22} color="grayAlternatives.300" />
          <Text
            marginLeft="4px"
            color="gray.800"
            fontSize="18px"
            fontWeight="600"
          >
            规则转换
          </Text>
        </Flex>
        <Tooltip
          label={
            editSqlButtonDisabled
              ? '规则启动状态下无法编写 SQL ，如需编写 SQL 请先停用规则。'
              : ''
          }
        >
          <Button
            leftIcon={<LoadingCircleFilledIcon color="white" />}
            disabled={editSqlButtonDisabled}
            padding="0 10px"
            backgroundColor="gray.700"
            boxShadow="none"
            fontWeight={600}
            fontSize="12px"
            lineHeight="24px"
            _hover={{ backgroundColor: 'gray.700' }}
            onClick={() => {
              if (!editSqlButtonDisabled) {
                onOpen();
              }
            }}
          >
            编写 SQL
          </Button>
        </Tooltip>
        <EditSQLModal
          ruleId={ruleId}
          isOpen={isOpen}
          selectExpr={selectExpr}
          whereExpr={whereExpr}
          onClose={onClose}
          onSuccess={() => refetch()}
        />
      </Flex>
      {selectExpr && (
        <AceEditor
          language="ruleql"
          highlightActiveLine={false}
          height="48px"
          value={sql}
          style={{ marginTop: '20px' }}
        />
      )}
    </Box>
  );
}
