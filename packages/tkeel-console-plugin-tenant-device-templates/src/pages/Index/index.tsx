import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TemplateCard } from '@tkeel/console-business-components';
import { PageHeaderToolbar } from '@tkeel/console-components';
import { BoxTwoToneIcon } from '@tkeel/console-icons';
import {
  KeyDataType,
  TemplateItem,
  useTemplateQuery,
} from '@tkeel/console-request-hooks';
import { formatDateTimeByTimestamp, plugin } from '@tkeel/console-utils';

import CreateTemplateButton from '@/tkeel-console-plugin-tenant-device-templates/pages/Index/components/CreateTemplateButton';
import DeleteTemplateButton from '@/tkeel-console-plugin-tenant-device-templates/pages/Index/components/DeleteTemplateButton';
import ModifyTemplateButton from '@/tkeel-console-plugin-tenant-device-templates/pages/Index/components/ModifyTemplateButton';

import SaveAsTemplateButton from './components/SaveAsTemplateButton';

function Index() {
  const navigate = useNavigate();
  const toast = plugin.getPortalToast();
  const [keyWord, setKeyWord] = useState('');

  const defaultParams = {
    page_num: 1,
    page_size: 1000,
    order_by: 'name',
    is_descending: false,
    query: '',
    condition: [
      {
        field: 'type',
        operator: '$eq',
        value: 'template',
      },
    ],
  };

  const { items, refetch } = useTemplateQuery({ params: defaultParams });

  const keyData: KeyDataType[] = items.map((val: TemplateItem) => {
    return {
      title: val.properties.basicInfo.name,
      description: val.properties.basicInfo.description,
      id: val.id,
      key: val.id,
      updatedAt: formatDateTimeByTimestamp({
        // eslint-disable-next-line no-underscore-dangle
        timestamp: val.properties.sysField._updatedAt as string,
      }),
    };
  });

  // eslint-disable-next-line no-console
  console.log(keyWord);

  const handleCreateSuccess = (id: string) => {
    toast('创建模板成功', { status: 'success' });
    navigate(`/detail/${id}`);
  };

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="设备模板"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setKeyWord(value.trim());
          },
        }}
        buttons={[
          <CreateTemplateButton
            key="create"
            templateData={keyData}
            onSuccess={handleCreateSuccess}
          />,
        ]}
      />
      <Box
        bg="gray.50"
        boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1)"
        borderRadius="4px"
        mt="20px"
        padding="20px 0"
      >
        <Flex flexWrap="wrap" paddingLeft="20px">
          {keyData.map((item: KeyDataType) => {
            return (
              <TemplateCard
                key={item.id}
                icon={
                  <BoxTwoToneIcon style={{ width: '24px', height: '22px' }} />
                }
                title={item.title}
                description={item.description}
                navigateUrl={`/detail/${item.id}`}
                buttons={[
                  <SaveAsTemplateButton
                    data={item}
                    key="modify"
                    onSuccess={() => {
                      refetch();
                    }}
                  />,
                  <ModifyTemplateButton
                    data={item}
                    key="modify"
                    onSuccess={() => {
                      refetch();
                    }}
                  />,
                  <DeleteTemplateButton
                    key="delete"
                    id={item.id}
                    name={item.title}
                    refetchData={() => {
                      refetch();
                    }}
                  />,
                ]}
                footer={[
                  // { name: '使用设备', value: item.id },
                  { name: '最新时间', value: item.updatedAt },
                ]}
              />
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
}

export default Index;
