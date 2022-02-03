import { KeyboardEvent, KeyboardEventHandler, ReactNode, useRef } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  StyleProps,
} from '@chakra-ui/react';
import { MagnifierFilledIcon } from '@tkeel/console-icons';

export interface Props {
  width?: string;
  height?: string;
  inputGroupStyle?: StyleProps;
  inputStyle?: StyleProps;
  icon?: ReactNode;
  iconSize?: number | string;
  placeholder?: string;
  defaultValue?: string;
  onSearch: (value: string) => unknown;
}

function SearchInput({
  width = '300px',
  height = '32px',
  inputGroupStyle = {},
  inputStyle = {},
  icon = null,
  iconSize = 16,
  placeholder = '请输入...',
  defaultValue = '',
  onSearch,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    const { keyCode } = event;
    if (keyCode === 13 && inputRef.current) {
      onSearch(inputRef.current.value.trim());
    }
  };

  return (
    <InputGroup width={width} height={height} {...inputGroupStyle}>
      <InputLeftElement height="100%" pointerEvents="none">
        {icon || (
          <MagnifierFilledIcon size={iconSize} color="grayAlternatives.300" />
        )}
      </InputLeftElement>
      <Input
        ref={inputRef}
        height="100%"
        borderColor="gray.200"
        borderRadius="20px"
        color="gray.400"
        fontSize="12px"
        {...inputStyle}
        _focus={{ borderColor: 'gray.400' }}
        _placeholder={{ fontWeight: 500 }}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onKeyDown={onKeyDown}
      />
    </InputGroup>
  );
}

export default SearchInput;
