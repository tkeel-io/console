import type { StyleProps } from '@chakra-ui/react';
import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Empty, Form, FormField, Loading } from '@tkeel/console-components';
import type { AlarmMail } from '@tkeel/console-request-hooks';
import { useAlarmMailsQuery } from '@tkeel/console-request-hooks';
import { plugin, schemas } from '@tkeel/console-utils';

import useCreateMailMutation from '@/tkeel-console-plugin-tenant-notification-objects/hooks/mutations/useCreateMailMutation';

import MailForm from '../MailForm';

const { TextField } = FormField;

const emptyStyles: { wrapper: StyleProps } = {
  wrapper: {
    height: '200px',
  },
};

type FormFieldValues = Omit<AlarmMail, 'id' | 'noticeId'>;

interface Props {
  noticeId: number;
  refetchCounts: () => void;
}

function MailTab({ noticeId, refetchCounts }: Props) {
  const toast = plugin.getPortalToast();

  const {
    isLoading: isQueryLoading,
    mails,
    refetch: refetchMails,
  } = useAlarmMailsQuery({
    params: { noticeId },
  });
  const totalCount = mails.length;
  const refetch = () => {
    refetchMails();
    refetchCounts();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFieldValues>();

  const renderEmails = () => {
    if (isQueryLoading) {
      return <Loading styles={emptyStyles} />;
    }

    if (totalCount === 0) {
      return <Empty styles={emptyStyles} />;
    }

    return (
      <VStack width="100%" spacing="8px">
        {mails.map((data) => (
          <MailForm
            key={data.id}
            data={data}
            totalCount={totalCount}
            refetch={refetch}
          />
        ))}
      </VStack>
    );
  };

  const { isLoading: isCreateLoading, mutate: createMutate } =
    useCreateMailMutation({
      onSuccess() {
        refetch();
        reset();
        toast.success('添加成功！');
      },
    });

  const onSubmit: SubmitHandler<FormFieldValues> = (formFieldValues) => {
    createMutate({ data: { noticeId, ...formFieldValues } });
  };

  return (
    <Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Flex alignItems="center" margin="16px 0 24px">
          <TextField
            id="emailAddress"
            placeholder="请输入接收人邮箱"
            error={errors.emailAddress}
            registerReturn={register(
              'emailAddress',
              schemas.singleMail.registerOptions
            )}
            formControlStyle={{ width: '300px', margin: '0' }}
            inputStyle={{ backgroundColor: 'white' }}
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
            registerReturn={register('userName', {
              required: { value: true, message: '请输入接收人名称' },
            })}
            formControlStyle={{
              width: '160px',
              margin: '0 12px 0 8px',
            }}
            inputStyle={{ backgroundColor: 'white' }}
            formErrorMessageStyle={{
              position: 'absolute',
              marginTop: '2px',
              fontSize: '12px',
            }}
          />
          <Button
            color="gray.700"
            backgroundColor="grayAlternatives.50"
            border="1px solid"
            borderColor="grayAlternatives.100"
            boxShadow="none"
            type="submit"
            colorScheme="gray"
            variant="outline"
            isLoading={isCreateLoading}
          >
            添加
          </Button>
        </Flex>
      </Form>
      {renderEmails()}
    </Box>
  );
}

export default MailTab;
