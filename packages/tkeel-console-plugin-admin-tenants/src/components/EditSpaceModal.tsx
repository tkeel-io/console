import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import { FormField, Modal } from '@tkeel/console-components';

import AuthConfigOption from './AuthConfigOption';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const { TextField } = FormField;
const AuthConfig = [
  {
    title: '平台默认',
    key: 'default',
    description:
      '用户的管理在平台侧，管理员可在 tkeel 租户平台注册、管理用户。',
  },
  {
    title: '第三方',
    key: 'third',
    description:
      '用户的管理在第三方，用户登录 tkeel 平台需要跳转至第三方登录。',
  },
];

export default function EditSpaceModal({ isOpen, onClose }: IProps) {
  const { register } = useForm();
  const [selectedAuth, setSelectedAuth] = useState<string>('default');
  const handleSelectAuth = (key: string) => () => {
    setSelectedAuth(key);
  };
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
      <Box h="530px" overflowY="scroll">
        <TextField
          id="space-name"
          label="空间名称"
          schemas={register('space-name', {
            required: { value: true, message: 'required' },
          })}
        />
        <FormControl mb="16px">
          <FormLabel fontSize="14px" lineHeight="24px" color="gray.600">
            平台选择
          </FormLabel>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {AuthConfig.map((opt) => {
              return (
                <GridItem
                  colSpan={1}
                  key={opt.key}
                  onClick={handleSelectAuth(opt.key)}
                >
                  <AuthConfigOption
                    {...opt}
                    isSelected={selectedAuth === opt.key}
                  />
                </GridItem>
              );
            })}
          </Grid>
        </FormControl>
        <TextField
          id="admin-account"
          label="管理员账号"
          schemas={register('admin-account', {
            required: { value: true, message: 'required' },
          })}
          help="6~18 位字符串, 只能包含英文字母、数字、下划线"
        />
        <TextField
          id="admin-name"
          label="管理员姓名"
          schemas={register('admin-name', {
            required: { value: true, message: 'required' },
          })}
        />
        <TextField id="tips" label="备注" />
      </Box>
    </Modal>
  );
}
