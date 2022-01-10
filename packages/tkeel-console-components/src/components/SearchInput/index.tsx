import React, { useRef } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { MagnifierFilledIcon } from '@tkeel/console-icons';

type Props = {
  width?: string;
  height?: string;
  borderRadius?: string;
  backgroundColor?: string;
  icon?: React.ReactNode;
  iconSize?: number | string;
  placeholder?: string;
  onSearch: (keyword: string) => void;
};

function SearchInput({
  width,
  height,
  borderRadius,
  backgroundColor,
  icon,
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
    <InputGroup width={width} height={height} backgroundColor={backgroundColor}>
      <InputLeftElement pointerEvents="none">
        {icon || <MagnifierFilledIcon size={iconSize} />}
      </InputLeftElement>
      <Input
        ref={inputRef}
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
  backgroundColor: 'white',
  icon: null,
  iconSize: 16,
  placeholder: '请输入...',
};

export default SearchInput;
