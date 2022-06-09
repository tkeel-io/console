import { Box, Flex, Input, InputGroup, StyleProps } from '@chakra-ui/react';
import { Base64 } from 'js-base64';
import {
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  FilterConditionInfo,
  FilterConditionTag,
} from '@tkeel/console-components';
import { BroomFilledIcon, RefreshFilledIcon } from '@tkeel/console-icons';

import FilterDropdown, {
  HandleUpdateConditionProps,
} from '@/tkeel-console-plugin-tenant-data-query/pages/Index/components/FilterDropdown';
import { FilterConditionIds } from '@/tkeel-console-plugin-tenant-data-query/pages/Index/constants';

import SearchButton from '../SearchButton';

const { DEVICE_GROUP_ID, DEVICE_TEMPLATES_ID, KEYWORDS } = FilterConditionIds;

type Props = {
  type?: 'index' | 'searchResult';
  defaultFilterConditions?: FilterConditionInfo[];
  style?: StyleProps;
  refetchData?: () => unknown;
};

const encode = (value: string) => {
  return encodeURIComponent(Base64.encode(value));
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function SearchDeviceInput({
  type = 'index',
  defaultFilterConditions = [],
  style,
  refetchData,
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
  let inputMarginRight = '10px';
  if (hasKeywordsOrConditions) {
    inputMarginRight = type === 'index' ? '130px' : '160px';
  }

  const getConditionById = (id: string) => {
    return filterConditions.find((condition) => condition.id === id);
  };

  const groupCondition = getConditionById(DEVICE_GROUP_ID);

  const templateCondition = getConditionById(DEVICE_TEMPLATES_ID);

  const keywordsCondition = getConditionById(KEYWORDS);

  const inputDisabled = Boolean(
    (groupCondition?.value && !deviceGroupId) ||
      (templateCondition?.value && !templateId) ||
      keywordsCondition
  );

  const buttonDisabled = Boolean(
    (groupCondition && !deviceGroupId) ||
      (templateCondition && !templateId) ||
      (!groupCondition && !templateCondition && !keywordsCondition)
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.keyCode === 13 && inputValue) {
      let newFilterConditions = [...filterConditions];
      const { length } = newFilterConditions;
      const lastCondition = newFilterConditions[length - 1];
      const keywordConditionInfo = {
        id: KEYWORDS,
        label: '关键字',
        value: inputValue,
      };
      if (length > 0) {
        const keywordCondition = newFilterConditions.find(
          (condition) => condition.id === KEYWORDS
        );
        if (lastCondition.value === '') {
          lastCondition.value = inputValue;
        } else if (!keywordCondition) {
          newFilterConditions = [...newFilterConditions, keywordConditionInfo];
        }
      } else {
        newFilterConditions = [keywordConditionInfo];
        if (type === 'index') {
          setShowDeviceList(true);
        } else {
          setShowFilterDropdown(false);
        }
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
    setShowDeviceList(false);
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

  const handleRemoveCondition = (conditionId: string) => {
    if (conditionId === DEVICE_GROUP_ID) {
      setDeviceGroupId('');
      setSearchParams(searchParams);
    } else if (conditionId === DEVICE_TEMPLATES_ID) {
      setTemplateId('');
    } else if (!deviceGroupId && !templateId) {
      setShowDeviceList(false);
    }
    setStatus(initStatus);
  };

  const handleUpdateCondition = ({
    updateCondition,
    removeConditionId,
  }: HandleUpdateConditionProps) => {
    let newFilterConditions = [...filterConditions];
    if (updateCondition) {
      newFilterConditions = newFilterConditions.map((filterCondition) => {
        if (filterCondition.id === updateCondition.id) {
          return {
            ...filterCondition,
            value: updateCondition.value,
          };
        }
        return filterCondition;
      });
    }

    if (removeConditionId) {
      newFilterConditions = newFilterConditions.filter(
        (condition) => condition.id !== removeConditionId
      );
      handleRemoveCondition(removeConditionId);
      if (removeConditionId === DEVICE_GROUP_ID) {
        setDeviceGroupId('');
      }
      if (removeConditionId === DEVICE_TEMPLATES_ID) {
        setTemplateId('');
      }
      const hasKeywordsCondition = newFilterConditions.some(
        (condition) => condition.id === KEYWORDS
      );
      if (!hasKeywordsCondition) {
        setShowDeviceList(false);
      }
    }
    setFilterConditions(newFilterConditions);
  };

  const handleIndexSearch = () => {
    let search = '';
    if (deviceGroupId) {
      const groupName = encode(groupCondition?.value || '');
      search += `group-id=${deviceGroupId}&group-name=${groupName}&`;
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
  };

  const handleResultSearch = () => {
    if (!keywordsCondition) {
      searchParams.delete(KEYWORDS);
    }

    if (groupCondition) {
      searchParams.set(GROUP_ID, deviceGroupId);
      searchParams.set(GROUP_NAME, Base64.encode(groupCondition.value));
    } else {
      searchParams.delete(GROUP_ID);
      searchParams.delete(GROUP_NAME);
    }

    if (templateCondition) {
      searchParams.set(TEMPLATE_ID, templateId);
      searchParams.set(TEMPLATE_NAME, Base64.encode(templateCondition.value));
    } else {
      searchParams.delete(TEMPLATE_ID);
      searchParams.delete(TEMPLATE_NAME);
    }

    if (keywordsCondition) {
      searchParams.set(KEYWORDS, keywordsCondition.value);
    } else {
      searchParams.delete(KEYWORDS);
    }
    setSearchParams(searchParams);

    if (refetchData) {
      refetchData();
    }
  };

  const handleSearch = () => {
    if (type === 'index') {
      handleIndexSearch();
    } else {
      handleResultSearch();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const iconWrapperStyle: StyleProps = {
    position: 'absolute',
    right: '140px',
    top: '14px',
    justifyContent: 'center',
    width: '20px',
    cursor: 'pointer',
    zIndex: 1,
  };

  return (
    <Box
      position="relative"
      borderRadius="24px"
      onClick={(e) => e.stopPropagation()}
      backgroundColor={showFilterDropdown ? 'brand.50' : 'white'}
      {...style}
    >
      <InputGroup
        display="flex"
        alignItems="center"
        position="relative"
        width="600px"
        border="1px solid"
        borderColor={showFilterDropdown ? 'primary' : 'grayAlternatives.50'}
        borderRadius="24px"
      >
        {hasFilterConditions && (
          <Flex paddingLeft="20px">
            {filterConditions.map((condition) => (
              <FilterConditionTag
                key={condition.id}
                condition={condition}
                sx={{
                  marginRight: '10px',
                }}
                removeCondition={(conditionId) =>
                  handleUpdateCondition({ removeConditionId: conditionId })
                }
              />
            ))}
          </Flex>
        )}
        <Input
          flex="1"
          marginRight={inputMarginRight}
          paddingLeft={hasFilterConditions ? '1px' : '20px'}
          width="auto"
          height="44px"
          borderRadius="24px"
          fontSize="12px"
          border="none"
          boxShadow="none"
          focusBorderColor="none"
          placeholder={
            showFilterDropdown || hasFilterConditions
              ? ''
              : '支持关键字搜索，支持设备分组、设备模板搜索'
          }
          disabled={inputDisabled}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.trim())}
          onFocus={() => setShowFilterDropdown(true)}
          onKeyDown={handleKeyDown}
        />
        {type === 'searchResult' && hasKeywordsOrConditions && (
          <Flex {...iconWrapperStyle}>
            <RefreshFilledIcon
              color="grayAlternatives.300"
              onClick={() => {
                if (refetchData) {
                  refetchData();
                }
              }}
            />
          </Flex>
        )}
        {hasKeywordsOrConditions && (
          <Flex {...iconWrapperStyle} right="110px">
            <BroomFilledIcon
              color="grayAlternatives.300"
              onClick={handleClearCondition}
            />
          </Flex>
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
        handleUpdateCondition={handleUpdateCondition}
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
