import { Box, Flex, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  BackButton,
  CustomTab,
  CustomTabList,
  InfoCard,
  MoreAction,
} from '@tkeel/console-components';
import { BoxTwoToneIcon, OfficialFilledIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp, plugin } from '@tkeel/console-utils';

import useTemplateInfoQuery from '@/tkeel-console-plugin-tenant-device-templates/hooks/queries/useTemplateInfoQuery';
import TelemetryTable from '@/tkeel-console-plugin-tenant-device-templates/pages/Detail/components/TelemetryTable';

import DeleteTemplateButton from '../Index/components/DeleteTemplateButton';
import ModifyTemplateButton from '../Index/components/ModifyTemplateButton';
import SaveAsTemplateButton from '../Index/components/SaveAsTemplateButton';
import AttributeTable from './components/AttributeTable';

function Detail(): JSX.Element {
  const toast = plugin.getPortalToast();

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname }: { pathname: string } = location;
  const ID = pathname.split('/')[pathname.split('/').length - 1];
  // const { data, isSuccess, refetch } = useTemplateInfoQuery(ID);
  const { data, isSuccess, refetch } = useTemplateInfoQuery(ID);

  const defaultValues = {
    description: data?.templateObject?.properties?.basicInfo?.description,
    id: data?.templateObject?.id,
    title: data?.templateObject?.properties?.basicInfo?.name,
    // eslint-disable-next-line  no-underscore-dangle
    updatedAt: String(data?.templateObject?.properties?.sysField?._updatedAt),
  };

  return (
    <Flex>
      <Box width="360px" mr="20px">
        <Box
          height="108px"
          background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)"
          borderRadius="4px"
          position="relative"
        >
          <OfficialFilledIcon
            style={{
              width: '197px',
              height: '108px',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          />
          <Flex
            alignItems="center"
            justifyContent="space-between"
            padding="0 10px"
            paddingTop="10px"
          >
            <BackButton
              onClick={() => {
                navigate('/');
              }}
            />
            {isSuccess && (
              <MoreAction
                styles={{ actionList: { width: '140px' } }}
                buttons={[
                  <SaveAsTemplateButton
                    data={defaultValues}
                    key="modify"
                    onSuccess={() => {
                      toast('另存为模板成功', { status: 'success' });
                    }}
                  />,
                  <ModifyTemplateButton
                    data={defaultValues}
                    key="modify"
                    onSuccess={() => {
                      toast('修改成功', { status: 'success' });
                      refetch();
                    }}
                  />,
                  <DeleteTemplateButton
                    key="delete"
                    id={defaultValues.id}
                    name={defaultValues.title}
                    refetchData={() => {
                      navigate('/');
                    }}
                  />,
                ]}
              />
            )}
          </Flex>

          <Flex
            height="70px"
            align="center"
            padding="0 20px"
            position="relative"
            zIndex="2"
          >
            <BoxTwoToneIcon style={{ width: '24px', height: '22px' }} />
            <Text
              lineHeight="50px"
              ml="12px"
              color="gray.700"
              fontWeight="600"
              fontSize="14px"
              isTruncated
            >
              {defaultValues?.title}
            </Text>
          </Flex>
        </Box>
        <Box background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)">
          <InfoCard
            title=" "
            data={[
              {
                label: '更新时间',
                value: formatDateTimeByTimestamp({
                  timestamp: defaultValues?.updatedAt,
                }),
              },
              {
                label: '描述',
                value: defaultValues?.description,
              },
            ]}
          />
        </Box>

        {/* <Box background="#FFFFFF" mt="12px" padding="0 20px">
          <Box style={{ fontSize: '14px', fontWeight: 600, color: 'gray.700' }}>
            批量入口
          </Box>
          <Box>
            <DownloadFilledIcon size={20} color="#000" />
          </Box>

          <Box display="inline">批量导入</Box>
        </Box> */}
      </Box>
      <Box
        flex="1"
        borderRadius="4px"
        background="linear-gradient(180deg, #FFFFFF 0%, #F9FBFD 100%)"
      >
        <Tabs display="flex" flexDirection="column" flex="1">
          <CustomTabList>
            <CustomTab>属性模板</CustomTab>
            <CustomTab>遥测模板</CustomTab>
            {/* <CustomTab>服务指令</CustomTab> */}
          </CustomTabList>

          <TabPanels
            flex="1"
            overflow="hidden"
            borderBottomLeftRadius="4px"
            borderBottomRightRadius="4px"
          >
            <TabPanel padding="0" height="100%">
              <AttributeTable id={ID} title={defaultValues.title} />
            </TabPanel>
            <TabPanel padding="0" height="100%">
              <TelemetryTable id={ID} title={defaultValues.title} />
            </TabPanel>
            {/* <TabPanel padding="0" height="100%" backgroundColor="white">
              3
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}

export default Detail;
