import {
  Center,
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
  useEffect,
  useRef,
  useState,
} from 'react';

import { CloseFilledIcon, MagnifierFilledIcon } from '@tkeel/console-icons';

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
  width = '220px',
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
  const [showCloseButton, setShowCloseButton] = useState(false);
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
      setShowCloseButton(!!keywords);
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

  const timer: number | null = null;

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        paddingInlineEnd="30px"
        borderColor="grayAlternatives.100"
        borderRadius="20px"
        color="gray.500"
        fontSize="12px"
        {...inputStyle}
        _focus={{ borderColor: 'gray.400' }}
        _placeholder={{ fontWeight: 500 }}
        placeholder={placeholder}
        {...valueProps}
        onKeyDown={handleKeyDown}
      />
      {showCloseButton && (
        <Center position="absolute" right="10px" top="0" height={height}>
          <CloseFilledIcon
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setShowCloseButton(false);
              if (!controlInputValue && inputRef.current) {
                inputRef.current.value = '';
              }
              onSearch('');
            }}
          />
        </Center>
      )}
    </InputGroup>
  );
}

export default SearchInput;
