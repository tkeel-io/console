import { Flex, StyleProps, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { DeviceTemplateList } from '@tkeel/console-business-components';
import { ChevronDownFilledIcon } from '@tkeel/console-icons';
import {
  useDeviceListQuery,
  useTemplatesQuery,
} from '@tkeel/console-request-hooks';

import TemplateDeviceList from '../TemplateDeviceList';

interface Props {
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function DeviceSelectField({ styles }: Props) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [templateId, setTemplateId] = useState('');
  const { templates, isLoading: isTemplatesLoading } = useTemplatesQuery();
  const { deviceList, isLoading: isDeviceListLoading } = useDeviceListQuery({
    requestData: {
      condition: [
        {
          field: 'basicInfo.templateId',
          operator: '$wildcard',
          value: templateId,
        },
      ],
    },
    enabled: !!templateId,
  });

  // const handleDocumentClick = () => {
  //   setIsShowDropdown(false);
  // };

  // useEffect(() => {
  //   window.addEventListener('click', handleDocumentClick);

  //   return () => {
  //     window.removeEventListener('click', handleDocumentClick);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Flex
      height="40px"
      position="relative"
      alignItems="flex-end"
      {...styles?.wrapper}
    >
      <Flex
        width="100%"
        paddingRight="16px"
        justifyContent="flex-end"
        alignItems="center"
        height="40px"
        borderWidth="1px"
        borderStyle="solid"
        borderColor={isShowDropdown ? 'primary' : 'grayAlternatives.50'}
        borderRadius="4px"
        cursor="pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowDropdown(!isShowDropdown);
        }}
      >
        <ChevronDownFilledIcon />
      </Flex>
      {isShowDropdown && (
        <Flex
          position="absolute"
          left="0"
          top="48px"
          zIndex="1"
          width="100%"
          height="200px"
          overflowY="auto"
          padding="16px"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.200"
          borderRadius="4px"
          backgroundColor="white"
          onClick={(e) => e.stopPropagation()}
        >
          {templateId ? (
            <TemplateDeviceList
              isLoading={isDeviceListLoading}
              devices={deviceList}
              onBackBtnClick={() => setTemplateId('')}
              onClick={({ id }) => {
                // eslint-disable-next-line no-console
                console.log('device id', id);
              }}
            />
          ) : (
            <DeviceTemplateList
              isLoading={isTemplatesLoading}
              templates={templates}
              emptyTitle={
                <Flex flexDirection="column" alignItems="center">
                  <Text>暂无模板，请前往</Text>
                  <Text>设备模板添加</Text>
                </Flex>
              }
              onClick={({ id }) => {
                setTemplateId(id);
              }}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
}
