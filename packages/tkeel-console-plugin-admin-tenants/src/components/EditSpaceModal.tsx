import {
  Button,
  // Center,
  FormControl,
  // FormErrorMessage,
  // FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
} from '@chakra-ui/react';
import { Modal } from '@tkeel/console-components';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditSpaceModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      title={
        <Text color="gray.800" fontSize="14px">
          创建租户空间
        </Text>
      }
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <Button onClick={onClose}>取消</Button>
          <Button ml="12px" colorScheme="primary">
            确定
          </Button>
        </>
      }
    >
      <FormControl isRequired mb="16px">
        <FormLabel htmlFor="space-name">空间名称</FormLabel>
        <Input id="space-name" placeholder="请输入" />
      </FormControl>
      <FormControl>
        <FormLabel>平台选择</FormLabel>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {[1, 2].map((opt) => {
            const isSelected = opt === 1;
            return (
              <GridItem
                h="84px"
                cursor="pointer"
                colSpan={1}
                key={opt}
                border={isSelected ? '2px' : '1px'}
                bg={isSelected ? 'blue.50' : 'white'}
                borderRadius="4px"
                borderColor={isSelected ? 'primary' : 'gray.200'}
              >
                {opt}
              </GridItem>
            );
          })}
        </Grid>
      </FormControl>
    </Modal>
  );
}
