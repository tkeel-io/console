import { Box, Flex, Input, InputGroup, StyleProps } from '@chakra-ui/react';
import {
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { BroomFilledIcon, RefreshFilledIcon } from '@tkeel/console-icons';

import FilterDropdown from '@/tkeel-console-plugin-tenant-data-query/pages/Index/components/FilterDropdown';

import FilterCondition, { FilterConditionInfo } from './FilterCondition';
import SearchButton from './SearchButton';

type Props = {
  type?: 'index' | 'searchResult';
  style?: StyleProps;
};

export default function SearchDeviceInput({ type = 'index', style }: Props) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(true);
  const [filterConditions, setFilterConditions] = useState<
    FilterConditionInfo[]
  >([]);

  const handleRemoveCondition = (conditionId: string) => {
    const newFilterConditions = filterConditions.filter(
      (condition) => condition.id !== conditionId
    );
    setFilterConditions(newFilterConditions);
  };

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
  const hasKeywordsOrConditions = inputValue || filterConditions.length > 0;
  let inputPaddingRight = '10px';
  if (hasKeywordsOrConditions) {
    inputPaddingRight = type === 'index' ? '124px' : '160px';
  }
  return (
    <Box position="relative" onClick={(e) => e.stopPropagation()} {...style}>
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
                removeCondition={handleRemoveCondition}
              />
            ))}
          </Flex>
        )}
        <Input
          flex="1"
          paddingRight={inputPaddingRight}
          paddingLeft={hasFilterConditions ? '1px' : '20px'}
          width="auto"
          height="44px"
          borderRadius="24px"
          fontSize="12px"
          border="none"
          boxShadow="none"
          focusBorderColor="none"
          placeholder={
            showFilterDropdown
              ? ''
              : '支持关键字搜索，支持设备分组、设备模版搜索'
          }
          _focus={{
            border: 'none!important',
            boxShadow: 'none!important',
            backgroundColor: 'primarySub',
            // backgroundColor: showFilterDropdown ? 'primarySub' : 'transparent',
          }}
          // _hover={{ backgroundColor: 'transparent' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.trim())}
          onFocus={() => setShowFilterDropdown(true)}
          onKeyDown={handleKeyDown}
        />
        {type === 'searchResult' && hasKeywordsOrConditions && (
          <RefreshFilledIcon
            color="grayAlternatives.300"
            style={{
              position: 'absolute',
              right: '140px',
              top: '14px',
              cursor: 'pointer',
            }}
          />
        )}
        {hasKeywordsOrConditions && (
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
        <SearchButton
          onClick={() => {
            if (type === 'index') {
              navigate('/search-result');
            }
          }}
        />
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
