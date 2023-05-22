import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  SaveAsOtherTemplateButton,
  TemplateCard,
} from '@tkeel/console-business-components';
import {
  Empty,
  PageHeader,
  PageHeaderToolbar,
  Pagination,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { BoxTwoToneIcon, PlateCreatedTwoToneIcon } from '@tkeel/console-icons';
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
    requestData: { query: keyWord, page_num: pageNum, page_size: pageSize },
    onSuccess(data) {
      const total = data?.data?.listDeviceObject?.total;
      setTotalSize(total);
    },
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

  const handleCreateSuccess = (id?: string) => {
    toast('创建模板成功', { status: 'success' });
    refetch();
    if (id) {
      navigate(`/detail/${id}?menu-collapsed=true`);
    }
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function Card() {
    return (
      <Flex
        boxShadow="0px 8px 8px rgba(152, 163, 180, 0.1)"
        height="100%"
        flexDir="column"
        borderBottomLeftRadius="4px"
        borderBottomRightRadius="4px"
      >
        <Box flex="1" overflowY="scroll">
          <SimpleGrid
            padding="20px"
            spacingX="20px"
            spacingY="12px"
            columns={2}
          >
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
                      key={`${item.id}_modify`}
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
                      key={`${item.id}_delete`}
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
          styles={{
            wrapper: { padding: '0 20px', backgroundColor: 'gray.50' },
          }}
        />
      </Flex>
    );
  }

  return (
    <Flex paddingTop="8px" flexDirection="column" height="100%">
      <PageHeader
        icon={<PlateCreatedTwoToneIcon />}
        name="设备模板"
        desc="设备模板是对接入设备数据做统一格式化的标准定义，主要包括属性、遥测及服务三种类型。"
        documentsPath={documents.config.paths.tenantGuide.deviceTemplate}
      />
      <PageHeaderToolbar
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setKeyWord(value.trim());
          },
          inputGroupStyle: { flex: 1 },
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
        styles={{
          wrapper: {
            marginTop: '16px',
            height: '56px',
            padding: '0 20px',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            backgroundColor: 'gray.50',
          },
        }}
      />
      <Box
        flex="1"
        overflowY="hidden"
        borderRadius="4px"
        backgroundColor="gray.100"
      >
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
