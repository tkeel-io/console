import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@tkeel/console-components';

import SvgIcon from '@/components/SvgIcon';

type Props = {
  width?: string;
  height?: string;
  iconSize?: string;
  borderRadius?: string;
  placeholder?: string;
};

function SearchInput({
  width,
  height,
  iconSize,
  borderRadius,
  placeholder,
}: Props) {
  return (
    <InputGroup>
      <InputLeftElement h={height} pointerEvents="none">
        <SvgIcon width={iconSize} iconClass="search" />
      </InputLeftElement>
      <Input
        w={width}
        h={height}
        borderRadius={borderRadius}
        boxShadow="none!important"
        placeholder={placeholder}
      />
    </InputGroup>
  );
}

SearchInput.defaultProps = {
  width: '300px',
  height: '36px',
  iconSize: '30px',
  borderRadius: '20px',
  placeholder: '请输入...',
};

export default SearchInput;
