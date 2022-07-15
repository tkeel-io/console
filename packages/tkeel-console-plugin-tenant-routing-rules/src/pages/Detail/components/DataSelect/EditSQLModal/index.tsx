import { Box, Button, Flex, StyleProps, Text } from '@chakra-ui/react';

import {
  AceEditor,
  ButtonsHStack,
  Modal,
  // Tip,
} from '@tkeel/console-components';

interface Props {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditSQLModal({
  title = '生成SQL',
  isOpen,
  onClose,
}: Props) {
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

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      width="790px"
      footer={
        <ButtonsHStack>
          <Button onClick={() => {}}>重置</Button>
          <Button
            isDisabled={false}
            isLoading={false}
            colorScheme="brand"
            onClick={() => {}}
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
          value="SELECT *"
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
          height="48px"
          value="WHERE"
        />
        <Text {...descStyle}>
          规则引擎提供多种函数，您可以在编写SQL时使用这些函数，实现多样化数据处理。
        </Text>
      </Box>
      {/* <Tip title="" /> */}
    </Modal>
  );
}
