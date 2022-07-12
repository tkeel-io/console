import { Box, Center, Circle, Flex, useDisclosure } from '@chakra-ui/react';
import { memo, useCallback, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Alert, Form, FormField, LinkButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin, schemas } from '@tkeel/console-utils';

import useDeleteMailMutation from '@/tkeel-console-plugin-tenant-notification-objects/hooks/mutations/useDeleteMailMutation';
import useModifyMailMutation from '@/tkeel-console-plugin-tenant-notification-objects/hooks/mutations/useModifyMailMutation';
import useGetBindQuery from '@/tkeel-console-plugin-tenant-notification-objects/hooks/queries/useGetBindQuery';

const { TextField } = FormField;

interface FormFieldValues {
  // id: number;
  // noticeId: number;
  userName: string;
  emailAddress: string;
}

interface Props {
  data: {
    id: number;
    noticeId: number;
    userName: string;
    emailAddress: string;
  };
  totalCount: number;
  refetch: () => void;
}

function EmailForm({ data, totalCount, refetch }: Props) {
  const toast = plugin.getPortalToast();

  const { id, noticeId } = data;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isReadOnly, setIsReadOnly] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFieldValues>({
    defaultValues: data,
  });

  const { isBind } = useGetBindQuery({
    noticeId,
    sendRequest: isOpen,
  });

  const { mutate: deleteMutate } = useDeleteMailMutation({
    onSuccess() {
      refetch();
      toast.success('删除成功！');
      onClose();
    },
  });

  const { mutate: modifyMutate } = useModifyMailMutation({
    onSuccess() {
      refetch();
      toast.success('修改成功！');
    },
  });

  const handleDelete = useCallback(() => {
    if (isBind !== undefined && isBind > 0 && totalCount === 1) {
      toast('该对象组已绑定，请至少保留一个邮件地址', { status: 'warning' });
    } else {
      deleteMutate({ data: { id, deleted: 1 } });
    }
  }, [deleteMutate, id, isBind, toast, totalCount]);

  const onSubmit: SubmitHandler<FormFieldValues> = (formFieldValues) => {
    modifyMutate({ data: { id, ...formFieldValues } });
  };

  const handleReset = () => {
    reset(data);
    setIsReadOnly(true);
  };

  return (
    <>
      <Form width="100%" onSubmit={handleSubmit(onSubmit)}>
        <Flex
          justifyContent="space-between"
          border="1px solid"
          borderColor="grayAlternatives.50"
          borderRadius="4px"
          padding="10px 20px"
          backgroundColor="white"
        >
          <Flex alignItems="center">
            <TextField
              id="emailAddress"
              error={errors.emailAddress}
              isDisabled={isReadOnly}
              formControlStyle={{ width: '300px' }}
              registerReturn={register(
                'emailAddress',
                schemas.singleMail.registerOptions
              )}
            />
            <TextField
              id="userName"
              error={errors.userName}
              isDisabled={isReadOnly}
              formControlStyle={{ width: '300px' }}
              registerReturn={register('userName', {
                required: { value: true, message: '请输入接收人名称' },
              })}
            />
          </Flex>
          <Center>
            {isReadOnly ? (
              <Box>
                <LinkButton onClick={() => setIsReadOnly(false)}>
                  编辑
                </LinkButton>
                <LinkButton onClick={onOpen}>删除</LinkButton>
              </Box>
            ) : (
              <Box>
                <LinkButton type="submit">确定</LinkButton>
                <LinkButton type="reset" onClick={handleReset}>
                  取消
                </LinkButton>
              </Box>
            )}
          </Center>
        </Flex>
      </Form>
      {isOpen && (
        <Alert
          iconPosition="left"
          icon={
            <Circle size="44px" backgroundColor="red.50">
              <TrashFilledIcon size="24px" color="red.300" />
            </Circle>
          }
          title="确认删除邮件？"
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

export default memo(EmailForm);
