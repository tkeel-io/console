import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import {
  // Checkbox,
  // CheckboxGroup,
  // FormControl,
  // FormField,
  // Loading,
  Modal,
  SearchInput,
  Tree,
} from '@tkeel/console-components';
// import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import { FileBoxTwoToneIcon } from '@tkeel/console-icons';

// import useTenantPluginsQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useTenantPluginsQuery';

// const { TextField } = FormField;

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: <span style={{ color: '#1890ff' }}>sss</span>,
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

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

type Props = {
  title: ReactNode;
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  formFields?: FormFields;
  defaultValues?: FormValues;
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
}: Props) {
  const [keywords, setKeywords] = useState('');
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
          <Tabs isFitted>
            <TabList>
              <Tab _selected={{ color: 'green.300' }}>设备组</Tab>
              <Tab _selected={{ color: 'green.300' }}>设备模板</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <SearchInput
                  width="100%"
                  placeholder="搜索"
                  onSearch={(value) => setKeywords(value)}
                />
                <Tree icon={FileBoxTwoToneIcon} checkable treeData={treeData} />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box flex="1">123</Box>
      </Flex>
    </Modal>
  );
}
