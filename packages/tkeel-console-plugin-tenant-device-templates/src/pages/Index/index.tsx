import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  SaveAsOtherTemplateButton,
  TemplateCard,
} from '@tkeel/console-business-components';
import {
  Empty,
  PageHeaderToolbar,
  Pagination,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { BoxTwoToneIcon } from '@tkeel/console-icons';
import {
  KeyDataType,
  TemplateItem,
  useTemplatesQuery,
} from '@tkeel/console-request-hooks';
import { formatDateTimeByTimestamp, plugin } from '@tkeel/console-utils';

import CreateTemplateButton from '@/tkeel-console-plugin-tenant-device-templates/pages/Index/components/CreateTemplateButton';
import DeleteTemplateButton from '@/tkeel-console-plugin-tenant-device-templates/pages/Index/components/DeleteTemplateButton';
import ModifyTemplateButton from '@/tkeel-console-plugin-tenant-device-templates/pages/Index/components/ModifyTemplateButton';

function Index() {
  const navigate = useNavigate();
  const toast = plugin.getPortalToast();
  const [keyWord, setKeyWord] = useState('');
  const documents = plugin.getPortalDocuments();

  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize, ...rest } = pagination;

  const { templates, refetch } = useTemplatesQuery({
    requestData: { query: keyWord },
  });

  const keyData: KeyDataType[] = templates.map((val: TemplateItem) => {
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
  setTotalSize(keyData.length);

  const handleCreateSuccess = (id: string) => {
    toast('创建模板成功', { status: 'success' });
    navigate(`/detail/${id}?menu-collapsed=true`);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function Card() {
    return (
      <Flex
        bg="gray.50"
        boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1)"
        borderRadius="4px"
        py="20px"
        height="100%"
        flexDir="column"
      >
        <Box flex="1" overflowY="scroll" px="20px">
          <SimpleGrid spacingX="20px" spacingY="12px" columns={2}>
            {keyData.map((item: KeyDataType) => {
              return (
                <TemplateCard
                  key={item.id}
                  icon={
                    <BoxTwoToneIcon style={{ width: '24px', height: '22px' }} />
                  }
                  title={item.title}
                  description={item.description || '暂无描述'}
                  navigateUrl={`/detail/${item.id}?menu-collapsed=true`}
                  buttons={[
                    <SaveAsOtherTemplateButton
                      id={item.id}
                      key="modify"
                      refetch={refetch}
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
          </SimpleGrid>
        </Box>

        <Pagination
          pageNum={pageNum}
          pageSize={pageSize}
          {...rest}
          styles={{ wrapper: { padding: '0 20px' } }}
        />
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="设备模板"
        hasSearchInput
        documentsPath={documents.config.paths.tenantGuide.deviceTemplate}
        searchInputProps={{
          onSearch(value) {
            setKeyWord(value.trim());
          },
          inputStyle: {
            backgroundColor: 'gray.50',
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

      <Box flex="1" overflowY="hidden">
        {keyData.length > 0 ? (
          <Card />
        ) : (
          <Empty
            description={<Box>暂无数据</Box>}
            styles={{
              wrapper: { height: '100%' },
              content: { marginTop: '10px' },
            }}
            title=""
          />
        )}
      </Box>
    </Flex>
  );
}

export default Index;
