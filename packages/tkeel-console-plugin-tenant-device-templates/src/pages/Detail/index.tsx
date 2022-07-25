import { Box, Flex, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SaveAsOtherTemplateButton } from '@tkeel/console-business-components';
import {
  BackButton,
  CustomTab,
  CustomTabList,
  InfoCard,
  MoreAction,
} from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { BoxTwoToneIcon, OfficialFilledIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import useTemplateInfoQuery from '@/tkeel-console-plugin-tenant-device-templates/hooks/queries/useTemplateInfoQuery';
import TelemetryTable from '@/tkeel-console-plugin-tenant-device-templates/pages/Detail/components/TelemetryTable';

import DeleteTemplateButton from '../Index/components/DeleteTemplateButton';
import ModifyTemplateButton from '../Index/components/ModifyTemplateButton';
import AttributeTable from './components/AttributeTable';
import CommandTable from './components/CommandTable';

function Detail(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname }: { pathname: string } = location;
  const ID = pathname.split('/')[pathname.split('/').length - 1];
  const { data, isSuccess, refetch } = useTemplateInfoQuery(ID);

  const defaultValues = {
    description: data?.templateObject?.properties?.basicInfo?.description,
    id: data?.templateObject?.id,
    title: data?.templateObject?.properties?.basicInfo?.name,
    // eslint-disable-next-line  no-underscore-dangle
    updatedAt: String(data?.templateObject?.properties?.sysField?._updatedAt),
  };

  const tabs = [
    {
      label: '属性模板',
      key: 'attribute',
      component: <AttributeTable id={ID} title={defaultValues.title} />,
    },
    {
      label: '遥测模板',
      key: 'telemetry',
      component: <TelemetryTable id={ID} title={defaultValues.title} />,
    },
    {
      label: '服务命令',
      key: 'command',
      component: <CommandTable id={ID} title={defaultValues.title} />,
    },
  ];

  const whiteColor = useColor('white');
  const grayColor = useColor('gray.50');

  return (
    <Flex h="100%">
      <Box width="360px" mr="20px">
        <Box
          height="108px"
          background={`linear-gradient(180deg, ${whiteColor} 0%, ${grayColor} 100%)`}
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
                  <SaveAsOtherTemplateButton
                    // data={defaultValues}
                    id={defaultValues.id}
                    key="modify"
                  />,
                  <ModifyTemplateButton
                    data={defaultValues}
                    key="modify"
                    onSuccess={refetch}
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

          <Flex height="70px" align="center" padding="0 20px">
            <BoxTwoToneIcon style={{ width: '24px', height: '22px' }} />
            <Text
              lineHeight="50px"
              ml="12px"
              color="gray.700"
              fontWeight="600"
              fontSize="14px"
              noOfLines={1}
            >
              {defaultValues?.title}
            </Text>
          </Flex>
        </Box>
        <Box backgroundColor="white">
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
                label: '模板ID',
                value: defaultValues?.id,
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
      <Box flex="1" borderRadius="4px" backgroundColor="white">
        <Tabs display="flex" flexDirection="column" h="100%">
          <CustomTabList>
            {tabs.map((item) => (
              <CustomTab key={item.key}>{item.label}</CustomTab>
            ))}
          </CustomTabList>
          <TabPanels
            flex="1"
            overflow="hidden"
            borderBottomLeftRadius="4px"
            borderBottomRightRadius="4px"
            paddingX="8px"
          >
            {tabs.map((item) => (
              <TabPanel height="100%" key={item.key}>
                {item.component}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}

export default Detail;
