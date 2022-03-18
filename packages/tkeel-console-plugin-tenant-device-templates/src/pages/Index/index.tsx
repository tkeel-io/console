import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TemplateCard } from '@tkeel/console-business-components';
import { PageHeaderToolbar } from '@tkeel/console-components';
import { BoxTwoToneIcon } from '@tkeel/console-icons';
import { useTemplateQuery } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import CreateTemplateButton from '@/tkeel-console-plugin-tenant-device-templates/pages/Index/components/CreateTemplateButton';
import DeleteTemplateButton from '@/tkeel-console-plugin-tenant-device-templates/pages/Index/components/DeleteTemplateButton';
import ModifyTemplateButton from '@/tkeel-console-plugin-tenant-device-templates/pages/Index/components/ModifyTemplateButton';

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

  const { keyData, refetch } = useTemplateQuery(defaultParams);

  // eslint-disable-next-line no-console

  console.log(keyWord);
  // console.log(keyWord, result);

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
          {keyData.map((item) => {
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
                  { name: '最新时间', value: item.updatedAt as string },
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
