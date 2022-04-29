import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import {
  ChevronDownFilledIcon,
  ChevronUpFilledIcon,
} from '@tkeel/console-icons';

import { MoreActionButton } from '../Button';
import MoreAction, { MoreActionStyles } from '../MoreAction';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => unknown;
  styles?: MoreActionStyles;
};

export default function MoreActionSelect({
  options,
  value,
  onChange,
  styles,
}: Props) {
  const [isActionListOpen, setIsActionListOpen] = useState(false);

  const buttons = options.map((option) => (
    <MoreActionButton
      key={option.value}
      title={option.label}
      onClick={() => onChange(option.value)}
    />
  ));

  const selectedOption = options.find((option) => option.value === value);

  return (
    <MoreAction
      element={
        <Flex
          alignItems="center"
          width="max-content"
          height="32px"
          padding="0 10px"
          borderRadius="16px"
          backgroundColor="gray.100"
          cursor="pointer"
        >
          <Text marginRight="3px" fontSize="12px" color="grayAlternatives.700">
            {selectedOption?.label ?? ''}
          </Text>
          {isActionListOpen ? (
            <ChevronUpFilledIcon color="gray.700" />
          ) : (
            <ChevronDownFilledIcon color="gray.700" />
          )}
        </Flex>
      }
      onActionListToggle={(show) => setIsActionListOpen(show)}
      type="text"
      buttons={buttons}
      styles={{ actionList: { width: '86px' }, ...styles }}
    />
  );
}
