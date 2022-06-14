import { Box, Button, Center, Flex, Input, Text } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormField, LinkButton, Tooltip } from '@tkeel/console-components';
import { InformationFilledIcon } from '@tkeel/console-icons';
import { plugin, schemas } from '@tkeel/console-utils';

import useModifyNotificationMutation from '@/tkeel-console-plugin-tenant-notification-objects/hooks/mutations/useModifyNotificationMutation';

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
  const [mailKey, setMailKey] = useState('');
  const [editKey, setEditKey] = useState('');
  const [deleteOperation, setDeleteOperation] = useState(false);
  const [editBtnShow, setEditBtnShow] = useState(true);
  const [mails, setMails] = useState<MailItem[]>([]);
  const toast = plugin.getPortalToast();
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
    const newMails = [...mails];
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
        newMails?.splice(index ?? 0, 1);
        newMails.forEach((r, i) => {
          values += `${i > 0 ? ',' : ''}${r.mail}`;
        });
        setDeleteOperation(true);
        setMails(newMails);
        sendRequest(values);
        break;
      }
      default:
        setMails(mails);
    }
  };

  return (
    <Box>
      <Flex alignItems="center" mb="16px">
        <TextField
          formControlStyle={{ width: '450px', mb: '0' }}
          placeholder="请输入接收人邮箱"
          id="name"
          error={errors.name}
          registerReturn={register('name', schemas.multiMail.registerOptions)}
          formHelperStyle={{ fontSize: '12px', position: 'absolute' }}
        />
        <Button
          type="button"
          variant="outline"
          color="gray.700"
          bgColor="grayAlternatives.50"
          m="0 10px 0 20px"
          borderWidth="1px"
          borderColor="grayAlternatives.100"
          boxShadow="none"
          _hover={{ bgColor: 'grayAlternatives.50' }}
          _focus={{ bgColor: 'grayAlternatives.50' }}
          onClick={() => onMail('create')}
        >
          添加联系邮箱
        </Button>
        <Tooltip
          label="支持多个联系邮箱添加，中间请用【,】英文逗号隔开"
          boxShadow=" 0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2)"
          borderRadius="4px"
          color="gray.700"
          mb="10px"
          h="60px"
          w="204px"
        >
          <InformationFilledIcon color="primary" />
        </Tooltip>
      </Flex>
      {mails.map(({ key, mail }, index) => {
        return (
          <Flex
            key={key}
            justifyContent="space-between"
            borderWidth="1px"
            borderColor="grayAlternatives.50"
            borderRadius="4px"
            p="10px 20px"
            mb="8px"
          >
            <Flex alignItems="center">
              <Input
                color="gray.700"
                border="none"
                w="450px"
                m="1px"
                size="xs"
                fontSize="14px"
                defaultValue={mail}
                isReadOnly={mailKey !== key}
                {...register(key, schemas.singleMail.registerOptions)}
                focusBorderColor={editKey === key ? 'red.500' : 'primary'}
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
                    disabled={mailKey !== key && !editBtnShow}
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
    </Box>
  );
}

export default memo(MailTab);
