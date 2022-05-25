import { Center, Flex, Progress, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { Modal, MoreActionButton } from '@tkeel/console-components';
import { LightningFilledIcon } from '@tkeel/console-icons';

import UploadButton from '../UploadButton';

interface Props {
  refetch: () => void;
}
function ImportButton({ refetch }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isUpload, setIsUpload] = useState(false);
  const [percent, setPercent] = useState(0);
  const closeModal = () => {
    onClose();
    setIsUpload(false);
    setPercent(0);
  };
  const getStartUpload = (e: boolean) => {
    setIsUpload(e);
  };
  const getProgressUpload = (e: number) => {
    setPercent(e);
  };
  const getSuccessUpload = (e: boolean) => {
    if (e) {
      refetch();
      closeModal();
    }
  };
  return (
    <>
      <MoreActionButton
        icon={<LightningFilledIcon color="grayAlternatives.300" />}
        title="导入模板"
        onClick={onOpen}
      />
      {isOpen && (
        <Modal
          height="252px"
          width="600px"
          modalBodyStyle={{ padding: '20px' }}
          title="批量导入"
          isOpen={isOpen}
          hasCancelButton={false}
          hasConfirmButton={false}
          onClose={() => {
            closeModal();
          }}
        >
          <UploadButton
            multiple
            accept=".csv"
            fileSize={500}
            action="/fluxswitch/v1/import"
            getStartUpload={getStartUpload}
            getProgressUpload={getProgressUpload}
            getSuccessUpload={getSuccessUpload}
          >
            <Center bgColor="gray.50" w="560px" h="140px">
              {!isUpload ? (
                <Flex
                  h="100px"
                  w="520px"
                  borderWidth="1px"
                  borderStyle="dashed"
                  borderColor="gray.300"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="12px">支持批量导入</Text>
                  <Text fontSize="12px" color="gray.500">
                    提示：可以点击或拖拽文件至此处,支持csv格式
                  </Text>
                </Flex>
              ) : (
                <Center flexDirection="column">
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    width="436px"
                  >
                    <Progress
                      hasStripe
                      colorScheme="brand"
                      width="380px"
                      height="8px"
                      borderRadius="4px"
                      value={percent}
                    />
                    <Text color="grayAlternatives.300" fontSize="12px">
                      {percent}%
                    </Text>
                  </Flex>
                  <Text color="gray.700" fontSize="12px" mt="22px">
                    数据导入中...
                  </Text>
                </Center>
              )}
            </Center>
          </UploadButton>
        </Modal>
      )}
    </>
  );
}

export default ImportButton;
