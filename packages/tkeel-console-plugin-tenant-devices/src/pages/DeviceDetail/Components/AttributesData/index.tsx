import {
  Box,
  Center,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Spacer,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  // DeviceAttributeFormFields,
  ReadWriteType,
  RW_LABELS,
} from '@tkeel/console-business-components/src/components/DeviceAttributeModal';
import {
  Empty,
  FormControl,
  // FormField,
  MoreAction,
  PageHeaderToolbar,
} from '@tkeel/console-components';
import { getFocusStyle } from '@tkeel/console-components/src/components/FormField/utils';
import {
  MoreVerticalFilledIcon,
  QuestionFilledIcon,
} from '@tkeel/console-icons';
import { AttributeItem } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import useSetAttributeMutation from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useSetAttributeValueMutation';
import { Attributes } from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useDeviceDetailQuery/types';
import AddAttributeButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/AddAttributeButton';
import DeleteAttributeButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/DeleteAttributeButton';
import EditAttributeButton from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/components/EditAttributeButton';

const TOOLTIP_OPTIONS = [
  { label: '数据类型', key: 'type' },
  { label: '读写类型', key: 'rw' },
];
type Props = {
  attributeDefines: AttributeItem[];
  attributeValues: Attributes;
  deviceName: string;
  deviceId: string;
  refetch?: () => void;
};

function renderTooltip(info: { type: string; rw: ReadWriteType }) {
  return (
    <SimpleGrid columns={1} spacingY="4px">
      {TOOLTIP_OPTIONS.map((val) => (
        <HStack fontSize="12px" lineHeight="24px" key={val.key}>
          <Text color="gray.500">{val.label}</Text>
          <Text color="gray.700">
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              val.key === 'rw' ? RW_LABELS[info[val.key]] : info[val.key]
            }
          </Text>
        </HStack>
      ))}
    </SimpleGrid>
  );
}
function AttributesPanel({
  deviceId,
  deviceName,
  attributeDefines,
  attributeValues,
  refetch: refetchDeviceDetail = () => {},
}: Props) {
  const [currentId, setCurrentId] = useState('');
  const toast = plugin.getPortalToast();
  const {
    register,
    // getValues,
    setValue,
    formState: { errors },
    // trigger,
    reset,
  } = useForm<{ [propName: string]: any }>({});
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('attributeValues', attributeValues);
    reset(attributeValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributeValues]);
  const params = {
    id: deviceId,
    onSuccess: () => {
      toast.success('保存成功');
      refetchDeviceDetail();
    },
  };
  const { mutate: setAttributeMutate, isLoading } =
    useSetAttributeMutation(params);
  const setAttributeData = ({ id, value }: { id: string; value: string }) => {
    const reqData = { id, value };
    // eslint-disable-next-line no-console
    console.log(value, isLoading, reqData);
    setAttributeMutate({ data: reqData });
  };

  return (
    <Flex flex="1" direction="column" height="100%">
      {isEmpty(attributeDefines) ? (
        <Empty
          description={
            <Box>
              <Box display="inline" color="gray.700" fontWeight="500">
                [{deviceName}]&nbsp;
              </Box>
              暂无属性数据,可手动添加
            </Box>
          }
          styles={{
            wrapper: { height: '60%' },
            title: { marginTop: '0' },
            content: { marginTop: '20px' },
          }}
          title=""
          content={
            <AddAttributeButton id={deviceId} refetch={refetchDeviceDetail} />
          }
        />
      ) : (
        <>
          <PageHeaderToolbar
            styles={{
              wrapper: { height: '32px', marginBottom: '12px' },
              title: { fontSize: '14px' },
            }}
            name="属性数据"
            hasSearchInput
            searchInputProps={{
              onSearch() {},
            }}
            buttons={[
              <AddAttributeButton
                key="add"
                id={deviceId}
                refetch={refetchDeviceDetail}
              />,
            ]}
          />
          <Box flex="1" overflowY="scroll" pb="30px">
            <SimpleGrid columns={2} spacingX="20px" spacingY="12px">
              {attributeDefines.length > 0 &&
                attributeDefines.map((item: AttributeItem) => {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  const defaultValue = attributeValues[item.id] as string;
                  const define = item?.define ?? '';
                  const name = item?.name ?? '';
                  const type = item?.type ?? '';
                  const id = item?.id ?? '';
                  const rw = define?.rw ?? 'rw';
                  const editFormValues = {
                    name,
                    id,
                    type,
                    define,
                  };
                  return (
                    <Box
                      w="100%"
                      borderRadius="4px"
                      border="1px solid"
                      borderColor="gray.100"
                      bg="gray.50"
                      key={item.id}
                      p="4px 20px"
                    >
                      <FormControl id={item.id}>
                        <Box mr="0px" mb="8px">
                          <Flex alignItems="center">
                            <HStack h="24px" lineHeight="24px">
                              <Text
                                color="gray.700"
                                fontSize="14px"
                                fontWeight={500}
                              >
                                {name}
                              </Text>
                              <Text
                                color="grayAlternatives.300"
                                fontSize="12px"
                              >
                                {id}
                              </Text>
                            </HStack>
                            <Spacer />
                            <Tooltip
                              bg="white"
                              hasArrow
                              p="8px 12px"
                              label={renderTooltip({ type, rw })}
                              boxShadow="base"
                            >
                              <Center h="24px" w="24px">
                                <QuestionFilledIcon
                                  size="16px"
                                  color="grayAlternatives.300"
                                />
                              </Center>
                            </Tooltip>
                            <MoreAction
                              styles={{
                                wrapper: {
                                  marginLeft: '4px',
                                  cursor: 'pointer',
                                },
                              }}
                              element={
                                <Center h="100%">
                                  <MoreVerticalFilledIcon
                                    size="16px"
                                    color="grayAlternatives.300"
                                  />
                                </Center>
                              }
                              buttons={[
                                <DeleteAttributeButton
                                  key="delete"
                                  attributeInfo={{ name, id }}
                                  handleSubmit={(formValues) => {
                                    // eslint-disable-next-line no-console
                                    console.log('delete:', formValues);
                                  }}
                                />,
                                <EditAttributeButton
                                  key="edit"
                                  id={deviceId}
                                  defaultValues={editFormValues}
                                />,
                              ]}
                            />
                          </Flex>
                        </Box>
                        <Input
                          id={item.id}
                          defaultValue={defaultValue}
                          bg="white"
                          placeholder={`默认值 ${
                            item?.define?.default_value as string
                          }`}
                          borderColor="gray.200"
                          fontSize="14px"
                          boxShadow="none!important"
                          _placeholder={{ color: 'blackAlpha.500' }}
                          _focus={getFocusStyle(!!errors[item.id])}
                          {...register(
                            currentId === item.id ? 'default_edit' : item.id,
                            {}
                          )}
                          onFocus={() => {
                            setCurrentId(item.id);
                            setValue('default_edit', defaultValue);
                          }}
                          onBlur={(e) => {
                            const { value } = e.target;
                            if (value !== defaultValue) {
                              setAttributeData({ id: item.id, value });
                            }
                          }}
                        />
                      </FormControl>
                    </Box>
                  );
                })}
            </SimpleGrid>
          </Box>
        </>
      )}
    </Flex>
  );
}

export default AttributesPanel;
