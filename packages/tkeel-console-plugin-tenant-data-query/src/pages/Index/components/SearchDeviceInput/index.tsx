import { useEffect, useState } from 'react';
import { Box, Button, Flex, Input, InputGroup, Text } from '@chakra-ui/react';
import {
  BroomFilledIcon,
  CloseFilledIcon,
  MagnifierFilledIcon,
} from '@tkeel/console-icons';

import FilterDropdown from '@/tkeel-console-plugin-tenant-data-query/pages/Index/components/FilterDropdown';

export default function SearchDeviceInput() {
  const [focus, setFocus] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(true);
  const [filterCondition, setFilterCondition] = useState({
    label: '',
    value: '',
  });

  const handleInputFocus = () => {
    setFocus(true);
    setShowFilterDropdown(true);
  };

  const handleDocumentClick = () => {
    setShowFilterDropdown(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box position="relative" onClick={(e) => e.stopPropagation()}>
      <InputGroup
        display="flex"
        alignItems="center"
        position="relative"
        width="600px"
        paddingLeft="20px"
        border="1px solid"
        borderColor={focus ? 'primary' : 'grayAlternatives.50'}
        borderRadius="24px"
        backgroundColor={focus ? 'white' : 'primarySub'}
      >
        {filterCondition.label && (
          <Flex
            marginRight="10px"
            flexShrink="0"
            position="relative"
            padding="0 6px 0 4px"
            height="24px"
            borderRadius="4px"
            alignItems="center"
            fontSize="12px"
            lineHeight="24px"
          >
            <Box
              position="absolute"
              left="0"
              top="0"
              width="100%"
              height="100%"
              borderRadius="4px"
              backgroundColor="primary"
              opacity="0.15"
            />
            <Text color="primary" fontWeight="500">
              {filterCondition.label}：
            </Text>
            {filterCondition.value && (
              <>
                <Text margin="0 8px 0 3px" color="gray.600">
                  {filterCondition.value}
                </Text>
                <CloseFilledIcon />
              </>
            )}
          </Flex>
        )}
        <Input
          marginRight="124px"
          flex="1"
          padding="0 10px 0 1px"
          width="auto"
          height="44px"
          borderRadius="24px"
          fontSize="12px"
          border="none"
          placeholder={
            focus ? '' : '支持关键字搜索，支持设备分组、设备模版搜索'
          }
          _focus={{ borderColor: 'transparent' }}
          onFocus={handleInputFocus}
          onBlur={() => setFocus(false)}
        />
        {focus && (
          <BroomFilledIcon
            color="grayAlternatives.300"
            style={{
              position: 'absolute',
              right: '110px',
              top: '14px',
              cursor: 'pointer',
            }}
          />
        )}
        <Button
          leftIcon={<MagnifierFilledIcon color="white" size={20} />}
          colorScheme="primary"
          position="absolute"
          right="0"
          top="0"
          height="100%"
          fontSize="14px"
          boxShadow="none"
        >
          搜索
        </Button>
      </InputGroup>
      <FilterDropdown
        filterCondition={filterCondition}
        handleConditionClick={(condition) => {
          setFilterCondition({
            label: condition,
            value: '',
          });
        }}
        style={{
          display: showFilterDropdown ? 'flex' : 'none',
          left: '0',
          top: '56px',
        }}
      />
    </Box>
  );
}
