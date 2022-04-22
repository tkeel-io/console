import { Button, Flex } from '@chakra-ui/react';

import { conditions } from '@/tkeel-console-plugin-tenant-data-query/pages/Index/constants';

import Label from '../Label';

type Props = {
  disabled: boolean;
  filterConditionId: string;
  handleConditionClick: (condition: { id: string; label: string }) => unknown;
};

export default function FilterConditionSelect({
  disabled,
  filterConditionId,
  handleConditionClick,
}: Props) {
  return (
    <>
      <Label>过滤条件</Label>
      <Flex marginBottom="8px">
        {conditions.map((condition) => {
          const { id, label } = condition;
          const isSelected = filterConditionId === id;
          return (
            <Button
              marginRight="8px"
              variant="outline"
              key={id}
              borderRadius="4px"
              color={isSelected ? 'primary' : 'gray.400'}
              borderColor={isSelected ? 'primary' : 'gray.200'}
              bg={isSelected ? 'brand.50' : 'white'}
              height="28px"
              p="0 12px"
              fontSize="12px"
              onClick={() => {
                if (!isSelected) {
                  handleConditionClick(condition);
                }
              }}
              disabled={disabled}
            >
              {label}
            </Button>
          );
        })}
      </Flex>
    </>
  );
}
