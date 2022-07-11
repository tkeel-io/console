import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Alert, FormField, LinkButton } from '@tkeel/console-components';
import { TrashFilledIcon } from '@tkeel/console-icons';
import { plugin, schemas } from '@tkeel/console-utils';

import useModifyNotificationMutation from '@/tkeel-console-plugin-tenant-notification-objects/hooks/mutations/useModifyNotificationMutation';
import useGetBindQuery from '@/tkeel-console-plugin-tenant-notification-objects/hooks/queries/useGetBindQuery';

const { TextField } = FormField;

interface Props {
  noticeId: number;
  emailAddress: string;
  refetch?: () => void;
}

interface MailItem {
  key: string;
  mail: string;
}

interface MailFormFields {
  name: string;
  [mailName: string]: string;
}

function MailTab({ noticeId, emailAddress, refetch }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [delIndex, setDelIndex] = useState(0);
  const [mailKey, setMailKey] = useState('');
  const [editKey, setEditKey] = useState('');
  const [deleteOperation, setDeleteOperation] = useState(false);
  const [editBtnShow, setEditBtnShow] = useState(true);
  const [mails, setMails] = useState<MailItem[]>([]);
  const toast = plugin.getPortalToast();
  const { isBind } = useGetBindQuery({
    noticeId,
    sendRequest: isOpen,
  });
  useEffect(() => {
    if (mails.length === 0 && emailAddress !== '' && !deleteOperation) {
      const mailArr = emailAddress.split(',').map((item) => ({
        mail: item,
        key: Math.random().toString(16).slice(2),
      }));
      setMails(mailArr);
    }
  }, [setMails, mails, emailAddress, deleteOperation]);

  const defaultValues = mails?.reduce((p, c) => {
    return { ...p, [c.key]: c.mail };
  }, {});
  const {
    register,
    getValues,
    setFocus,
    setError,
    reset,
    trigger,
    formState: { errors },
  } = useForm<MailFormFields>({
    defaultValues,
  });

  const { mutate } = useModifyNotificationMutation({
    onSuccess() {
      if (refetch) refetch();
      toast.success('操作成功！');
    },
  });
  const sendRequest = (values: string) => {
    mutate({
      data: {
        noticeId,
        emailAddress: values,
      },
    });
  };

  const onMail = async (type: string, index?: number, key = '') => {
    let values = '';
    const { name, ...forms } = getValues();
    switch (type) {
      case 'create': {
        const resultAdd = await trigger('name');
        if (!resultAdd) {
          setError('name', {
            type: 'manual',
            message: '请输入正确的邮箱格式',
          });
          return;
        }
        values = emailAddress === '' ? name : `${emailAddress},${name}`;
        const add: MailItem[] = name
          .replaceAll(' ', '')
          .split(',')
          .map((r) => ({
            mail: r,
            key: Math.random().toString(16).slice(2),
          }));
        setMails([...mails, ...add]);
        reset({ ...defaultValues, name: '' });
        sendRequest(values);
        break;
      }
      case 'edit': {
        const resultEdit = await trigger(Object.keys(forms));
        if (!resultEdit) {
          setEditKey(key);
          setFocus(key);
          return;
        }
        const mailNameArr = Object.values(forms);
        values = mailNameArr.join(',');
        setMails((m) => {
          return m.map<MailItem>((r, i) => {
            if (i === index) {
              return { key: r.key, mail: getValues(r.key) };
            }
            return r;
          });
        });
        setEditBtnShow(true);
        setMailKey('');
        sendRequest(values);
        setEditKey('');
        break;
      }
      case 'delete': {
        setDelIndex(index ?? 0);
        onOpen();
        break;
      }
      default:
        setMails(mails);
    }
  };
  const handleConfirm = () => {
    let values = '';
    const newMails = [...mails];
    if (isBind !== undefined && isBind > 0 && newMails.length === 1) {
      toast('该对象组已绑定，请至少保留一个邮件地址', { status: 'warning' });
    } else {
      newMails?.splice(delIndex ?? 0, 1);
      newMails.forEach((r, i) => {
        values += `${i > 0 ? ',' : ''}${r.mail}`;
      });
      setDeleteOperation(true);
      setMails(newMails);
      sendRequest(values);
    }
    onClose();
  };

  return (
    <Box>
      <Flex alignItems="center" mb="16px">
        <TextField
          placeholder="请输入接收人邮箱"
          id="emailAddress"
          error={errors.emailAddress}
          registerReturn={register(
            'emailAddress',
            schemas.singleMail.registerOptions
          )}
          formHelperStyle={{ fontSize: '12px', position: 'absolute' }}
          formControlStyle={{ width: '450px', mb: '0' }}
          inputStyle={{ backgroundColor: 'white' }}
        />
        <TextField
          placeholder="请输入接收人名称"
          id="userName"
          error={errors.userName}
          registerReturn={register('userName')}
          formHelperStyle={{ fontSize: '12px', position: 'absolute' }}
          formControlStyle={{
            width: '160px',
            margin: '0 12px 0 8px',
          }}
          inputStyle={{ backgroundColor: 'white' }}
        />
        <Button
          type="button"
          variant="outline"
          color="gray.700"
          bgColor="grayAlternatives.50"
          borderWidth="1px"
          borderColor="grayAlternatives.100"
          boxShadow="none"
          _hover={{ bgColor: 'grayAlternatives.50' }}
          _focus={{ bgColor: 'grayAlternatives.50' }}
          onClick={() => onMail('create')}
        >
          添加联系邮箱
        </Button>
      </Flex>
      {mails.map(({ key, mail }, index) => {
        const isReadOnly = mailKey !== key;
        const focusBorderColor = editKey === key ? 'red.500' : 'primary';

        return (
          <Flex
            key={key}
            justifyContent="space-between"
            borderWidth="1px"
            borderColor="grayAlternatives.50"
            borderRadius="4px"
            p="10px 20px"
            mb="8px"
            backgroundColor="white"
          >
            <Flex alignItems="center">
              <Input
                color="gray.700"
                w="450px"
                m="1px"
                boxShadow="none"
                outline="none"
                border="1px solid"
                // borderColor={isReadOnly ? 'transparent' : 'gray.200'}
                borderColor="transparent"
                // focusBorderColor={editKey === key ? 'red.500' : 'primary'}
                size="xs"
                fontSize="14px"
                _hover={{ borderColor: 'transparent' }}
                _focus={{
                  boxShadow: 'none',
                  outline: 'none',
                  borderColor: isReadOnly ? 'transparent' : focusBorderColor,
                }}
                defaultValue={mail}
                isReadOnly={isReadOnly}
                {...register(key, schemas.singleMail.registerOptions)}
              />
              {editKey === key && (
                <Text fontSize="12px" color="red.500" ml="10px">
                  请输入正确的邮箱格式
                </Text>
              )}
            </Flex>
            <Center>
              {mailKey !== key ? (
                <Box>
                  <LinkButton
                    disabled={mailKey !== key && !editBtnShow}
                    onClick={() => {
                      setMailKey(key);
                      setEditKey('');
                      setFocus(key);
                      setEditBtnShow(false);
                    }}
                  >
                    编辑
                  </LinkButton>
                  <LinkButton
                    disabled={
                      mailKey !== key && !editBtnShow
                      // (mails.length === 1 && isBind !== undefined && isBind > 0)
                    }
                    onClick={() => onMail('delete', index)}
                  >
                    删除
                  </LinkButton>
                </Box>
              ) : (
                <Box>
                  <LinkButton onClick={() => onMail('edit', index, key)}>
                    确定
                  </LinkButton>
                  <LinkButton
                    onClick={() => {
                      setEditBtnShow(true);
                      setMailKey('');
                      setEditKey('');
                      reset(defaultValues);
                    }}
                  >
                    取消
                  </LinkButton>
                </Box>
              )}
            </Center>
          </Flex>
        );
      })}
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
          onConfirm={handleConfirm}
        />
      )}
    </Box>
  );
}

export default memo(MailTab);
