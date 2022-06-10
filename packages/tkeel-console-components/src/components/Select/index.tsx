import { Box, Flex, StyleProps, Text } from '@chakra-ui/react';
import Downshift from 'downshift';
import { ReactNode } from 'react';

import { CaretDownFilledIcon, CaretUpFilledIcon } from '@tkeel/console-icons';

interface Option {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  variant?: 'solid' | 'outline';
  options: Option[];
  labelPrefix?: ReactNode;
  showDefaultOption?: boolean;
  defaultOption?: Option;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => unknown;
  sx?: StyleProps;
  styles?: {
    wrapper?: StyleProps;
    selector?: StyleProps;
    labelPrefix?: StyleProps;
    label?: StyleProps;
    selectDropdown?: StyleProps;
    selectItem?: StyleProps;
  };
}

function isText(value: ReactNode) {
  return ['string', 'number'].includes(typeof value);
}

export default function Select({
  variant = 'outline',
  options,
  labelPrefix,
  showDefaultOption = true,
  defaultOption = {
    label: '全部',
    value: '',
  },
  defaultValue = '',
  value,
  onChange,
  sx,
  styles,
}: SelectProps) {
  const newOptions = [...options];
  if (showDefaultOption) {
    newOptions.unshift(defaultOption);
  }

  const getSelectedLabelByValue = (selectedValue: string) => {
    const selectedOption = newOptions.find(
      (option) => option.value === selectedValue
    );
    return selectedOption?.label ?? '';
  };

  return (
    <Downshift<Option>
      onChange={(selection) => {
        if (selection && onChange) {
          onChange(selection.value);
        }
      }}
      itemToString={(item) => String(item?.value ?? '')}
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

        let selectedLabel: ReactNode = selectedItem?.label ?? '';
        if (value !== undefined) {
          selectedLabel = getSelectedLabelByValue(value);
        } else if (selectedItem === null) {
          selectedLabel = getSelectedLabelByValue(defaultValue);
        }

        return (
          <Box
            width="118px"
            position="relative"
            backgroundColor="white"
            {...styles?.wrapper}
            {...sx}
          >
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
                {isText(labelPrefix) ? (
                  <Text fontWeight="500" {...styles?.labelPrefix}>
                    {labelPrefix}
                  </Text>
                ) : (
                  labelPrefix
                )}
                {isText(selectedLabel) ? (
                  <Text fontWeight="normal" {...styles?.label}>
                    {selectedLabel}
                  </Text>
                ) : (
                  selectedLabel
                )}
              </Flex>
              {isOpen ? <CaretUpFilledIcon /> : <CaretDownFilledIcon />}
            </Flex>
            {isOpen && (
              <Box
                {...getMenuProps()}
                position="absolute"
                zIndex="10"
                left="0"
                top="38px"
                width="100%"
                maxHeight="178"
                overflowY="auto"
                padding="8px"
                borderWidth="1px"
                borderStyle="solid"
                borderColor="gray.300"
                borderRadius="4px"
                backgroundColor="white"
                boxShadow="0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2)"
                {...styles?.selectDropdown}
              >
                {newOptions.map((item, index) => {
                  const { label, value: key, disabled } = item;
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Box
                      {...getItemProps({
                        key,
                        index,
                        item,
                        disabled,
                      })}
                      /* eslint-enable */
                      display="flex"
                      alignItems="center"
                      height="32px"
                      paddingLeft="10px"
                      color="gray.700"
                      fontSize="12px"
                      opacity={disabled ? 0.5 : 1}
                      cursor={disabled ? 'not-allowed' : 'pointer'}
                      _hover={{
                        fontWeight: '600',
                        backgroundColor: 'grayAlternatives.50',
                      }}
                      {...styles?.selectItem}
                    >
                      {label}
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        );
      }}
    </Downshift>
  );
}
