import {
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { Box, Flex, Input, InputGroup } from '@chakra-ui/react';
import { BroomFilledIcon } from '@tkeel/console-icons';

import FilterCondition, { FilterConditionInfo } from './FilterCondition';
import SearchButton from './SearchButton';

import FilterDropdown from '@/tkeel-console-plugin-tenant-data-query/pages/Index/components/FilterDropdown';

export default function SearchDeviceInput() {
  const [inputValue, setInputValue] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(true);
  const [filterConditions, setFilterConditions] = useState<
    FilterConditionInfo[]
  >([]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.keyCode === 13) {
      let newFilterConditions = [...filterConditions];
      const { length } = newFilterConditions;
      const lastCondition = newFilterConditions[length - 1];
      const keywordConditionInfo = {
        id: 'keywords',
        label: '关键字',
        value: inputValue,
      };
      if (length > 0) {
        const keywordCondition = newFilterConditions.find(
          (condition) => condition.id === 'keywords'
        );
        if (lastCondition.value === '') {
          lastCondition.value = inputValue;
        } else if (!keywordCondition) {
          newFilterConditions = [...newFilterConditions, keywordConditionInfo];
        }
      } else {
        newFilterConditions = [keywordConditionInfo];
      }
      setInputValue('');
      setFilterConditions(newFilterConditions);
    }
  };

  const handleClearCondition: MouseEventHandler<HTMLOrSVGElement> = (e) => {
    e.stopPropagation();
    setInputValue('');
    setFilterConditions([]);
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

  const hasFilterConditions = filterConditions.length > 0;
  return (
    <Box position="relative" onClick={(e) => e.stopPropagation()}>
      <InputGroup
        display="flex"
        alignItems="center"
        position="relative"
        width="600px"
        border="1px solid"
        borderColor={showFilterDropdown ? 'primary' : 'grayAlternatives.50'}
        borderRadius="24px"
        backgroundColor={showFilterDropdown ? 'primarySub' : 'white'}
      >
        {hasFilterConditions && (
          <Flex paddingLeft="20px">
            {filterConditions.map((condition) => (
              <FilterCondition
                key={condition.id}
                condition={condition}
                style={{ marginRight: '10px' }}
              />
            ))}
          </Flex>
        )}
        <Input
          marginRight="124px"
          flex="1"
          paddingRight="10px"
          paddingLeft={hasFilterConditions ? '1px' : '20px'}
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
          _focus={{ borderColor: 'none', backgroundColor: 'primarySub' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.trim())}
          onFocus={() => setShowFilterDropdown(true)}
          // onBlur={() => setShowFilterDropdown(false)}
          onKeyDown={handleKeyDown}
        />
        {(inputValue || filterConditions.length > 0) && (
          <BroomFilledIcon
            color="grayAlternatives.300"
            style={{
              position: 'absolute',
              right: '110px',
              top: '14px',
              cursor: 'pointer',
            }}
            onClick={handleClearCondition}
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
