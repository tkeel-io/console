import React, { useRef } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { MagnifierFilledIcon } from '@tkeel/console-icons';

type Props = {
  width?: string;
  height?: string;
  iconSize?: number | string;
  placeholder?: string;
  onSearch: (keyword: string) => void;
};

function SearchInput({
  width,
  height,
  iconSize,
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
    <InputGroup width={width} height={height}>
      <InputLeftElement pointerEvents="none">
        <MagnifierFilledIcon size={iconSize} />
      </InputLeftElement>
      <Input
        ref={inputRef}
        borderColor="gray.200"
        borderRadius="20px"
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
  iconSize: 16,
  placeholder: '请输入...',
};

export default SearchInput;
