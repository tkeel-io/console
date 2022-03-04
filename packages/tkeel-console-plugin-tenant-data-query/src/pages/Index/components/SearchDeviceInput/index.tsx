/* eslint-disable sonarjs/cognitive-complexity */
import { Box, Flex, Input, InputGroup, StyleProps } from '@chakra-ui/react';
import { Base64 } from 'js-base64';
import {
  CSSProperties,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  defaultFilterConditions?: FilterConditionInfo[];
  style?: StyleProps;
};

const encode = (value: string) => {
  return encodeURIComponent(Base64.encode(value));
};

export default function SearchDeviceInput({
  type = 'index',
  defaultFilterConditions = [],
  style,
}: Props) {
  const GROUP_ID = 'group-id';
  const GROUP_NAME = 'group-name';
  const TEMPLATE_ID = 'template-id';
  const TEMPLATE_NAME = 'template-name';
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showDeviceList, setShowDeviceList] = useState(false);
  const [filterConditions, setFilterConditions] = useState<
    FilterConditionInfo[]
  >(defaultFilterConditions);

  const [searchParams, setSearchParams] = useSearchParams();
  const groupIdParam = searchParams.get(GROUP_ID) || '';
  const [deviceGroupId, setDeviceGroupId] = useState(groupIdParam);
  const templateIdParam = searchParams.get(TEMPLATE_ID) || '';

  const [templateId, setTemplateId] = useState(templateIdParam);
  const initStatus = { label: '全部状态', value: 'all' };
  const [status, setStatus] = useState(initStatus);

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

  const templateCondition = filterConditions.find(
    (condition) => condition.id === DEVICE_TEMPLATES_ID
  );

  const keywordsCondition = filterConditions.find(
    (condition) => condition.id === 'keywords'
  );
  const hasKeywordsCondition = !!keywordsCondition;

  const disabled =
    (!!groupCondition && !deviceGroupId) ||
    (!!templateCondition && !templateId);

  const inputDisabled = disabled || !!hasKeywordsCondition;
  const buttonDisabled =
    disabled || (!groupCondition && !templateCondition && !keywordsCondition);

  const handleRemoveCondition = (conditionId: string) => {
    const newFilterConditions = filterConditions.filter(
      (condition) => condition.id !== conditionId
    );
    setFilterConditions(newFilterConditions);
    if (conditionId === DEVICE_GROUP_ID) {
      setDeviceGroupId('');
      // searchParams.delete(GROUP_ID);
      // searchParams.delete(GROUP_NAME);
      setSearchParams(searchParams);
    } else if (conditionId === DEVICE_TEMPLATES_ID) {
      setTemplateId('');
    } else {
      setShowDeviceList(false);
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
        setShowDeviceList(true);
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
    setTemplateId('');
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
    if (!filterConditions.some((condition) => condition.id === id)) {
      setShowDeviceList(false);
    }
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

  const handleSearch = () => {
    if (type === 'index') {
      let search = '';
      if (deviceGroupId) {
        const groupName = encode(groupCondition?.value || '');
        search += `group-id=${deviceGroupId}&${GROUP_NAME}=${groupName}&`;
      }

      if (templateId) {
        const templateName = encode(templateCondition?.value || '');
        search += `${TEMPLATE_ID}=${templateId}&template-name=${templateName}&`;
      }

      const keywords = keywordsCondition?.value;
      if (keywords) {
        search += `keywords=${keywords}&`;
      }

      const statusValue = status.value;
      if (['online', 'offline'].includes(statusValue)) {
        search += `status=${statusValue}`;
      }

      if (search.endsWith('&')) {
        search = search.slice(0, -1);
      }

      navigate(`/search-result?${search}`);
    } else {
      filterConditions.forEach((condition) => {
        if (condition.id === DEVICE_GROUP_ID) {
          searchParams.set(GROUP_ID, deviceGroupId);
          searchParams.set(GROUP_NAME, encode(condition.value));
          searchParams.delete(TEMPLATE_ID);
          searchParams.delete(TEMPLATE_NAME);
        } else if (condition.id === DEVICE_TEMPLATES_ID) {
          searchParams.set(TEMPLATE_ID, templateId);
          searchParams.set(TEMPLATE_NAME, encode(condition.value));
          searchParams.delete(GROUP_ID);
          searchParams.delete(GROUP_NAME);
        } else {
          searchParams.set('keywords', condition.value);
        }
        setSearchParams(searchParams);
      });
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <SearchButton disabled={buttonDisabled} onClick={handleSearch} />
      </InputGroup>
      <FilterDropdown
        type={type}
        status={status}
        showDeviceList={showDeviceList}
        setStatus={setStatus}
        setDeviceGroupId={setDeviceGroupId}
        setTemplateId={setTemplateId}
        filterConditions={filterConditions}
        handleConditionClick={handleConditionClick}
        updateCondition={handleUpdateCondition}
        setShowDeviceList={setShowDeviceList}
        hideFilterDropdown={() => setShowFilterDropdown(false)}
        style={{
          display: showFilterDropdown ? 'flex' : 'none',
          left: '0',
          top: '56px',
        }}
      />
    </Box>
  );
}
