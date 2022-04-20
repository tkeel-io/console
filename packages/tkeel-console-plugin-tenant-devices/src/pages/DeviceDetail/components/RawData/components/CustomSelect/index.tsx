import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Select } from '@tkeel/console-components';

const selectOptions = [
  {
    value: 'text',
    label: '文本',
  },
  {
    value: '十六进制',
    label: '十六进制',
  },
];

type Props = {
  color: string;
  selected: string;
  onChange: (value: string) => void;
};

export default function CustomSelect({ onChange, color, selected }: Props) {
  const Wrapper = styled(Flex)`
    flex: 1;
    justify-content: flex-end;

    .rc-select {
      .rc-select-selector {
        background-color: ${color};
        border-radius: 70px;

        .rc-select-selection-search {
          padding: 4px 10px;

          .rc-select-selection-search-input {
            width: ${selected === 'text' ? '44px' : '60px'};
          }
        }

        .rc-select-selection-item {
          top: 4px;
          left: ${selected === 'text' ? '14px' : '9px'};
          font-size: 12px;
        }
      }

      .rc-select-arrow {
        top: 9px;
        right: ${selected === 'text' ? '10px' : '7px'};
      }
    }
  `;
  return (
    <Wrapper mr="10px">
      <Select
        defaultValue="text"
        value={selected}
        showArrow
        showSearch={false}
        options={selectOptions}
        onChange={onChange}
        direction="rtl"
        dropdownMatchSelectWidth={100}
        dropdownStyle={{ minWidth: '100px' }}
      />
    </Wrapper>
  );
}
