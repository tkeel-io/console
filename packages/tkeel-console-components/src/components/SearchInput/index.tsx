import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { MagnifierFilledIcon } from '@tkeel/console-icons';

type Props = {
  width?: string;
  height?: string;
  borderRadius?: string;
  placeholder?: string;
};

function SearchInput({ width, height, borderRadius, placeholder }: Props) {
  return (
    <InputGroup width={width}>
      <InputLeftElement height={height} pointerEvents="none">
        <MagnifierFilledIcon />
      </InputLeftElement>
      <Input
        height={height}
        borderColor="gray.200"
        borderRadius={borderRadius}
        boxShadow="none!important"
        placeholder={placeholder}
        fontSize="12px"
        _focus={{ borderColor: 'gray.400' }}
      />
    </InputGroup>
  );
}

SearchInput.defaultProps = {
  width: '300px',
  height: '32px',
  borderRadius: '20px',
  placeholder: '请输入...',
};

export default SearchInput;
