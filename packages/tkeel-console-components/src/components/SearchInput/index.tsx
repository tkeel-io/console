import React, { useRef } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { MagnifierFilledIcon } from '@tkeel/console-icons';

type Props = {
  width?: string;
  height?: string;
  borderRadius?: string;
  placeholder?: string;
  onSearch: (keyword: string) => void;
};

function SearchInput({
  width,
  height,
  borderRadius,
  placeholder,
  onSearch,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const { keyCode } = event;
    if (keyCode === 13 && inputRef.current) {
      onSearch(inputRef.current.value.trim());
    }
  };

  return (
    <InputGroup width={width}>
      <InputLeftElement height={height} pointerEvents="none">
        <MagnifierFilledIcon />
      </InputLeftElement>
      <Input
        ref={inputRef}
        height={height}
        borderColor="gray.200"
        borderRadius={borderRadius}
        fontSize="12px"
        placeholder={placeholder}
        _focus={{ borderColor: 'gray.400' }}
        onKeyDown={onKeyDown}
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
