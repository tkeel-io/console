import {
  Input,
  InputGroup,
  InputLeftElement,
  StyleProps,
} from '@chakra-ui/react';
import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactNode,
  useRef,
} from 'react';

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
  value?: string;
  onChange?: (value: string) => unknown | undefined;
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
  value = '',
  onChange,
  onSearch,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const controlInputValue = !!onChange;

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    const { keyCode } = event;
    if (keyCode === 13 && inputRef.current) {
      const keywords = controlInputValue
        ? value
        : inputRef.current.value.trim();
      onSearch(keywords);
    }
  };

  let valueProps:
    | { defaultValue: string }
    | { value: string; onChange: ChangeEventHandler } = {
    defaultValue,
  };

  if (controlInputValue) {
    valueProps = {
      value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
    };
  }

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
        color="gray.600"
        fontSize="12px"
        backgroundColor="gray.50"
        {...inputStyle}
        _focus={{ borderColor: 'gray.400' }}
        _placeholder={{ fontWeight: 500 }}
        placeholder={placeholder}
        {...valueProps}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
}

export default SearchInput;
