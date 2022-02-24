import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
// import {DataNode} from "rc-tree"
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import {
  // Checkbox,
  // CheckboxGroup,
  // FormControl,
  // FormField,
  Loading,
  Modal,
  SearchInput,
  Tree,
} from '@tkeel/console-components';
// import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import { BroomFilledIcon, FileBoxTwoToneIcon } from '@tkeel/console-icons';
import { DataNode, Key } from 'node_modules/rc-tree/es/interface';

import { TreeNodeData } from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useDeviceGroupQuery';
import { TemplateTreeNodeDataType } from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useDeviceTemplateQuery';

// import useTenantPluginsQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useTenantPluginsQuery';

// const { TextField } = FormField;

export interface FormFields {
  role?: {
    disabled?: boolean;
  };

  plugins?: {
    disabled?: boolean;
  };
}

export interface FormValues {
  role: string;
  plugins: string[];
}

type SelectedKeyCheck =
  | Key[]
  | {
      checked: Key[];
      halfChecked: Key[];
    };

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  formFields?: FormFields;
  defaultValues?: FormValues;
  treeNodeData: TreeNodeData[];
  templateTreeNodeData: TemplateTreeNodeDataType[];

  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};
export default function BaseDeviceModal({
  title,
  isOpen,
  isConfirmButtonLoading,
  formFields,
  defaultValues,
  onClose,
  onConfirm,
  treeNodeData,
  templateTreeNodeData,
}: Props) {
  // console.log('treeNodeData', treeNodeData);

  const [keywords, setKeywords] = useState('');
  const [selectNode, setSelectNode] = useState<DataNode[]>();
  const [selectedKeys, setSelectedKeys] = useState<SelectedKeyCheck>([]);

  let params = {};

  if (keywords) {
    params = { ...params, key_words: keywords };
    if (formFields && params) {
      setKeywords('123');
    }
  }

  // const { plugins, isLoading } = useTenantPluginsQuery({ params });

  const {
    // register,
    // formState: { errors },
    trigger,
    getValues,
    // setValue,
  } = useForm<FormValues>({ defaultValues });

  const handleConfirm = async () => {
    const result = await trigger();
    if (result) {
      const formValues = getValues();
      onConfirm(formValues);
    }
  };

  const getSelectNode = (data: DataNode[]) => {
    const arr: DataNode[] = [];
    data.forEach((el) => {
      const { children } = el;
      if (Array.isArray(children) && children.length > 0) {
        getSelectNode(children);
        return;
      }
      arr.push(el);
    });
    return arr;
  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={handleConfirm}
      width="900px"
    >
      <Flex>
        <Box flex="1">
          <Tabs
            isFitted
            variant="unstyled"
            onChange={(index) => {
              if (index) {
                setSelectNode([]);
                setSelectedKeys([]);
              }
              // console.log('index', index);
            }}
          >
            <TabList>
              <Tab _selected={{ color: 'green.300', boxShadow: 'none' }}>
                设备组
              </Tab>
              <Tab _selected={{ color: 'green.300', boxShadow: 'none' }}>
                设备模板
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <SearchInput
                  width="100%"
                  placeholder="搜索"
                  onSearch={(value) => setKeywords(value)}
                />

                {treeNodeData.length > 0 ? (
                  <Tree
                    style={{ marginTop: '16px' }}
                    icon={FileBoxTwoToneIcon}
                    checkable
                    treeData={treeNodeData}
                    checkedKeys={selectedKeys}
                    onCheck={(keys, el) => {
                      const { checkedNodes } = el;
                      setSelectNode(getSelectNode(checkedNodes));
                      setSelectedKeys(keys);
                    }}
                  />
                ) : (
                  <Loading styles={{ wrapper: { height: '100%' } }} />
                )}
              </TabPanel>
              <TabPanel>
                <SearchInput
                  width="100%"
                  placeholder="搜索"
                  onSearch={(value) => setKeywords(value)}
                />
                <Tree
                  style={{ marginTop: '16px' }}
                  icon={FileBoxTwoToneIcon}
                  checkable
                  treeData={templateTreeNodeData}
                  checkedKeys={selectedKeys}
                  onCheck={(keys, el) => {
                    const { checkedNodes } = el;
                    setSelectNode(checkedNodes);
                    setSelectedKeys(keys);
                  }}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Flex flex="1" flexDirection="column">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mt="12px"
            mb="19px"
          >
            <Text>已选中</Text>
            <Flex alignItems="center">
              <BroomFilledIcon />
              清空
            </Flex>
          </Flex>

          <SearchInput
            width="100%"
            placeholder="搜索"
            onSearch={(value) => setKeywords(value)}
          />

          <Tree
            style={{ marginTop: '16px' }}
            icon={FileBoxTwoToneIcon}
            checkable
            treeData={selectNode}
            checkedKeys={selectedKeys}
            onCheck={(keys) => {
              setSelectedKeys(keys);
            }}
          />
        </Flex>
      </Flex>
    </Modal>
  );
}
