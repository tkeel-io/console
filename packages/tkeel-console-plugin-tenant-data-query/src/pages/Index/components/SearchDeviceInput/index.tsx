import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Input, InputGroup } from '@chakra-ui/react';
import { BroomFilledIcon } from '@tkeel/console-icons';

import FilterCondition, { FilterConditionInfo } from './FilterCondition';
import SearchButton from './SearchButton';

import FilterDropdown from '@/tkeel-console-plugin-tenant-data-query/pages/Index/components/FilterDropdown';

export default function SearchDeviceInput() {
  const [focus, setFocus] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(true);
  const [filterConditions, setFilterConditions] = useState<
    FilterConditionInfo[]
  >([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    setFocus(true);
    setShowFilterDropdown(true);
  };

  const handleInputKeyPress = () => {
    if (inputRef.current) {
      const value = inputRef.current.value.trim();
      // eslint-disable-next-line no-console
      console.log('value', value);
    }
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
        borderColor={showFilterDropdown ? 'primary' : 'grayAlternatives.50'}
        borderRadius="24px"
        backgroundColor={showFilterDropdown ? 'primarySub' : 'white'}
      >
        <Flex>
          {filterConditions.map((condition) => (
            <FilterCondition
              key={condition.id}
              condition={condition}
              style={{ marginRight: '12px' }}
            />
          ))}
        </Flex>
        <Input
          ref={inputRef}
          marginRight="124px"
          flex="1"
          padding="0 10px 0 1px"
          width="auto"
          height="44px"
          borderRadius="24px"
          fontSize="12px"
          border="none"
          placeholder={
            showFilterDropdown
              ? ''
              : '支持关键字搜索，支持设备分组、设备模版搜索'
          }
          _focus={{ borderColor: 'transparent' }}
          onFocus={handleInputFocus}
          onBlur={() => setFocus(false)}
          onKeyPress={handleInputKeyPress}
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
        <SearchButton />
      </InputGroup>
      <FilterDropdown
        filterCondition={filterConditions.find(
          (condition) => condition.id !== 'search'
        )}
        handleConditionClick={({ id, label }) => {
          setFilterConditions([
            ...filterConditions.filter(
              (condition) => condition.id === 'search'
            ),
            {
              id,
              label,
              value: '',
            },
          ]);
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
