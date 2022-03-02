/* eslint-disable sonarjs/cognitive-complexity */
import { Box, Flex, Input, InputGroup, StyleProps } from '@chakra-ui/react';
import {
  CSSProperties,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { BroomFilledIcon, RefreshFilledIcon } from '@tkeel/console-icons';

import FilterDropdown from '@/tkeel-console-plugin-tenant-data-query/pages/Index/components/FilterDropdown';
import {
  DEVICE_GROUP_ID,
  DEVICE_TEMPLATES_ID,
} from '@/tkeel-console-plugin-tenant-data-query/pages/Index/constants';

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
  const [deviceGroupId, setDeviceGroupId] = useState('');
  const [templateId, setTemplateId] = useState('');
  const initStatus = { label: '全部状态', value: 'all' };
  const [status, setStatus] = useState(initStatus);

  const handleRemoveCondition = (conditionId: string) => {
    const newFilterConditions = filterConditions.filter(
      (condition) => condition.id !== conditionId
    );
    setFilterConditions(newFilterConditions);
    if (conditionId === DEVICE_GROUP_ID) {
      setDeviceGroupId('');
    }
    setStatus(initStatus);
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
    setDeviceGroupId('');
    setStatus(initStatus);
  };

  const handleDocumentClick = () => {
    setShowFilterDropdown(false);
  };

  const handleConditionClick = ({
    id,
    label,
  }: {
    id: string;
    label: string;
  }) => {
    setFilterConditions([
      ...filterConditions.filter((condition) => condition.id === 'search'),
      {
        id,
        label,
        value: '',
      },
    ]);
  };

  const handleUpdateCondition = (condition: { id: string; value: string }) => {
    const newFilterConditions = filterConditions.map((filterCondition) => {
      if (filterCondition.id === condition.id) {
        return {
          ...filterCondition,
          value: condition.value,
        };
      }
      return filterCondition;
    });
    setFilterConditions(newFilterConditions);
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

  const iconStyle: CSSProperties = {
    position: 'absolute',
    right: '140px',
    top: '14px',
    cursor: 'pointer',
  };

  const groupCondition = filterConditions.find(
    (condition) => condition.id === DEVICE_GROUP_ID
  );
  const hasDeviceGroupCondition = !!groupCondition?.value;

  const templateCondition = filterConditions.find(
    (condition) => condition.id === DEVICE_TEMPLATES_ID
  );
  const hasTemplateCondition = !!templateCondition?.value;

  const keywordsCondition = filterConditions.find(
    (condition) => condition.id === 'keywords'
  );
  const hasKeywordsCondition = !!keywordsCondition;

  const disabled =
    (hasDeviceGroupCondition && !deviceGroupId) ||
    (hasTemplateCondition && !templateId) ||
    ((hasDeviceGroupCondition || hasTemplateCondition) && hasKeywordsCondition);

  const inputDisabled = disabled || !!hasKeywordsCondition;

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
          }}
          disabled={inputDisabled}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.trim())}
          onFocus={() => setShowFilterDropdown(true)}
          onKeyDown={handleKeyDown}
        />
        {type === 'searchResult' && hasKeywordsOrConditions && (
          <RefreshFilledIcon color="grayAlternatives.300" style={iconStyle} />
        )}
        {hasKeywordsOrConditions && (
          <BroomFilledIcon
            color="grayAlternatives.300"
            style={{
              ...iconStyle,
              right: '110px',
            }}
            onClick={handleClearCondition}
          />
        )}
        <SearchButton
          disabled={disabled}
          onClick={() => {
            if (type === 'index') {
              navigate(
                `/search-result?device-group-id=${deviceGroupId}&status=${status.value}`
              );
            }
          }}
        />
      </InputGroup>
      <FilterDropdown
        status={status}
        deviceGroupId={deviceGroupId}
        templateId={templateId}
        setStatus={setStatus}
        setDeviceGroupId={setDeviceGroupId}
        setTemplateId={setTemplateId}
        filterConditions={filterConditions}
        handleConditionClick={handleConditionClick}
        updateCondition={handleUpdateCondition}
        style={{
          display: showFilterDropdown ? 'flex' : 'none',
          left: '0',
          top: '56px',
        }}
      />
    </Box>
  );
}
