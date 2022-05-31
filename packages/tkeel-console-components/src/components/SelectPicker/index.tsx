import { Box, Flex, StyleProps } from '@chakra-ui/react';
import Downshift from 'downshift';
import { ReactNode } from 'react';

import { CaretDownFilledIcon, CaretUpFilledIcon } from '@tkeel/console-icons';

interface Option {
  label: ReactNode;
  value: string | number;
}

interface Props {
  variant?: 'solid' | 'outline';
  options: Option[];
  labelPrefix?: ReactNode;
  onChange?(value: string | number): void;
  styles?: {
    wrapper?: StyleProps;
    selector?: StyleProps;
    selectDropdown?: StyleProps;
    selectItem?: StyleProps;
  };
}

export default function SelectPicker({
  variant = 'outline',
  options,
  labelPrefix,
  onChange,
  styles,
}: Props) {
  return (
    <Downshift<Option>
      onChange={(selection) => {
        if (selection && onChange) {
          onChange(selection.value);
        }
      }}
    >
      {({
        getItemProps,
        getToggleButtonProps,
        getMenuProps,
        isOpen,
        selectedItem,
        getRootProps,
      }) => {
        const selectorStyle: StyleProps =
          variant === 'solid'
            ? {
                padding: '0 10px',
                height: '32px',
                borderRadius: '20px',
                backgroundColor: 'gray.100',
              }
            : {
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'grayAlternatives.100',
                borderRadius: '4px',
              };

        return (
          <Box width="120px" position="relative" {...styles?.wrapper}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              height="32px"
              padding="0 8px"
              color="gray.800"
              fontSize="12px"
              cursor="pointer"
              {...selectorStyle}
              {...styles?.selector}
              /* eslint-disable @typescript-eslint/no-unsafe-call */
              {...getRootProps(undefined, { suppressRefError: true })}
              {...getToggleButtonProps()}
            >
              <Flex alignItems="center">
                {labelPrefix}
                {selectedItem?.label ?? ''}
              </Flex>
              {isOpen ? <CaretUpFilledIcon /> : <CaretDownFilledIcon />}
            </Flex>
            {isOpen && (
              <Box
                {...getMenuProps()}
                position="absolute"
                left="0"
                top="38px"
                width="100%"
                padding="8px"
                borderWidth="1px"
                borderStyle="solid"
                borderColor="gray.300"
                borderRadius="4px"
                backgroundColor="white"
                boxShadow="0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2)"
                {...styles?.selectDropdown}
              >
                {options.map((item, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <Box
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                    })}
                    /* eslint-enable */
                    display="flex"
                    alignItems="center"
                    height="32px"
                    paddingLeft="10px"
                    cursor="pointer"
                    color="gray.700"
                    fontSize="12px"
                    _hover={{
                      fontWeight: '600',
                      backgroundColor: 'grayAlternatives.50',
                    }}
                    {...styles?.selectItem}
                  >
                    {item.label}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        );
      }}
    </Downshift>
  );
}
