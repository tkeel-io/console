import React, { useRef } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  StyleProps,
} from '@chakra-ui/react';
import { MagnifierFilledIcon } from '@tkeel/console-icons';

type Props = {
  width?: string;
  height?: string;
  inputGroupStyle?: StyleProps;
  inputStyle?: StyleProps;
  icon?: React.ReactNode;
  iconSize?: number | string;
  placeholder?: string;
  onSearch: (keyword: string) => void;
};

function SearchInput({
  width,
  height,
  inputGroupStyle,
  inputStyle,
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
    <InputGroup width={width} height={height} {...inputGroupStyle}>
      <InputLeftElement pointerEvents="none">
        {icon || <MagnifierFilledIcon size={iconSize} />}
      </InputLeftElement>
      <Input
        ref={inputRef}
        borderColor="gray.200"
        borderRadius="20px"
        color="gray.400"
        fontSize="12px"
        {...inputStyle}
        _focus={{ borderColor: 'gray.400' }}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
    </InputGroup>
  );
}

SearchInput.defaultProps = {
  width: '300px',
  height: '32px',
  inputGroupStyle: {},
  inputStyle: {},
  icon: null,
  iconSize: 16,
  placeholder: '请输入...',
};

export default SearchInput;
