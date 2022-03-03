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
  onChange: (...args: any) => void;
};

export default function CustomSelect({ onChange, color }: Props) {
  const Wrapper = styled(Flex)`
    flex: 1;
    justify-content: flex-end;

    .rc-select {
      .rc-select-selector {
        background-color: ${color};
        border-radius: 70px;

        .rc-select-selection-search-input {
          width: 64px;
          min-width: 64px;
        }
      }

      .rc-select-selection-item {
        font-size: 12px;
      }
    }
  `;
  return (
    <Wrapper>
      <Select
        defaultValue="text"
        dropdownMatchSelectWidth={false}
        options={selectOptions}
        onChange={onChange}
      />
    </Wrapper>
  );
}
