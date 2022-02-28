import { Box, Flex, Text } from '@chakra-ui/react';
import { CustomTemplateButton } from 'packages/tkeel-console-plugin-tenant-device-templates/src/components/buttons';

import Modal from '@tkeel/console-components/src/components/Modal';
import { BoxTwoToneIcon } from '@tkeel/console-icons';

export interface FormValues {
  role: string;
  plugins: string[];
}

const templates = [
  {
    templateName: '颠簸智能模板',
    desc: '模型说明一句话描述模型说明一句话描述模型一句',
    key: 1,
  },
  {
    templateName: 'IDC设备模板',
    desc: '模型说明一句话描述模型说明一话描述模型一句',
    key: 2,
  },
  {
    templateName: '大智能模板',
    desc: '模型说明一句话描述模型明一句话描述模型一句',
    key: 3,
  },
  {
    templateName: '簸智能模板',
    desc: '模型说明一句描述模型说明一句话描述模型一句你就是不放多少啊顶级阿卡呢',
    key: 4,
  },
  {
    templateName: '颠智能模板',
    desc: '模型说明一句话描模型说明一句话描述模型一句',
    key: 5,
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => unknown;
  handleCreateSuccess: () => void;
};

export default function CreateTemplateModal({
  isOpen,
  onClose,
  handleCreateSuccess,
}: Props) {
  return (
    <Modal
      title={<Text fontSize="14px">创建模板</Text>}
      isOpen={isOpen}
      hasCancelButton={false}
      hasConfirmButton={false}
      onClose={onClose}
      modalBodyStyle={{ padding: '20px 20px', minWidth: '900px' }}
      width="900px"
      footer={null}
    >
      <Flex w="100%" justifyContent="space-between">
        <CustomTemplateButton onSuccess={handleCreateSuccess} />
        <CustomTemplateButton onSuccess={handleCreateSuccess} />
      </Flex>
      <Text fontSize="14px" m="20px 0 12px 0" fontWeight="600">
        使用已有模板
      </Text>
      <Flex
        w="100%"
        minHeight="100px"
        p="20px 20px"
        bg="gray.50"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        {templates.map((r) => {
          return (
            <Flex
              key={r.key}
              flexBasis="400px"
              alignItems="center"
              p="12px 0 13px 16px"
              mb="20px"
              bg="white"
              border="1px"
              borderColor="grayAlternatives.50"
              borderRadius="4px"
            >
              <BoxTwoToneIcon size="28px" />
              <Box ml="16px">
                <Text fontSize="14px" fontWeight="600" lineHeight="24px">
                  {r.templateName}
                </Text>
                <Text
                  fontSize="12px"
                  isTruncated
                  maxWidth="280px"
                  lineHeight="1.4"
                >
                  {r.desc}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Modal>
  );
}
