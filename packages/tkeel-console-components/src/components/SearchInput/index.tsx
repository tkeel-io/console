import React from 'react';

import Input from '../Input';
import InputGroup from '../InputGroup';
import InputLeftElement from '../InputLeftElement';

type Props = {
  width?: string;
  height?: string;
  // iconSize?: string;
  borderRadius?: string;
  placeholder?: string;
};

function SearchInput({
  width,
  height,
  // iconSize,
  borderRadius,
  placeholder,
}: Props) {
  return (
    <InputGroup w={width}>
      <InputLeftElement h={height} pointerEvents="none">
        {/* TODO 添加搜索 icon */}
      </InputLeftElement>
      <Input
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
  // iconSize: '30px',
  borderRadius: '20px',
  placeholder: '请输入...',
};

export default SearchInput;
