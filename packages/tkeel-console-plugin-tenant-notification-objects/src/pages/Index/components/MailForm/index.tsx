import { Circle, Flex, HStack, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Alert, Form, FormField, LinkButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import type { AlarmMail } from '@tkeel/console-request-hooks';
import { plugin, schemas } from '@tkeel/console-utils';

import useDeleteMailMutation from '@/tkeel-console-plugin-tenant-notification-objects/hooks/mutations/useDeleteMailMutation';
import useModifyMailMutation from '@/tkeel-console-plugin-tenant-notification-objects/hooks/mutations/useModifyMailMutation';
import useGetBindQuery from '@/tkeel-console-plugin-tenant-notification-objects/hooks/queries/useGetBindQuery';

const { TextField } = FormField;

type FormFieldValues = Omit<AlarmMail, 'id' | 'noticeId'>;

interface Props {
  data: AlarmMail;
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

  const { isLoading: isDeleteLoading, mutate: deleteMutate } =
    useDeleteMailMutation({
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

  const handleDelete = () => {
    if (isBind !== undefined && isBind > 0 && totalCount === 1) {
      toast('该对象组已绑定，请至少保留一个邮件地址', { status: 'warning' });
    } else {
      deleteMutate({ data: { id, deleted: 1 } });
    }
  };

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
          padding="20px"
          backgroundColor="white"
        >
          <HStack alignItems="center" spacing="8px">
            <TextField
              id="emailAddress"
              placeholder="请输入接收人邮箱"
              error={errors.emailAddress}
              isDisabled={isReadOnly}
              registerReturn={register(
                'emailAddress',
                schemas.singleMail.registerOptions
              )}
              formControlStyle={{ width: '300px', margin: '0' }}
              formErrorMessageStyle={{
                position: 'absolute',
                marginTop: '2px',
                fontSize: '12px',
              }}
            />
            <TextField
              id="userName"
              placeholder="请输入接收人名称"
              error={errors.userName}
              isDisabled={isReadOnly}
              registerReturn={register('userName', {
                required: { value: true, message: '请输入接收人名称' },
              })}
              formControlStyle={{ width: '160px', margin: '0' }}
              formErrorMessageStyle={{
                position: 'absolute',
                marginTop: '2px',
                fontSize: '12px',
              }}
            />
          </HStack>
          <HStack paddingLeft="32px" spacing="16px">
            {isReadOnly ? (
              <>
                <LinkButton onClick={() => setIsReadOnly(false)}>
                  编辑
                </LinkButton>
                <LinkButton onClick={onOpen}>删除</LinkButton>
              </>
            ) : (
              <>
                <LinkButton type="submit">确定</LinkButton>
                <LinkButton type="reset" onClick={handleReset}>
                  取消
                </LinkButton>
              </>
            )}
          </HStack>
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
          isConfirmButtonLoading={isDeleteLoading}
          onClose={onClose}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

export default EmailForm;
