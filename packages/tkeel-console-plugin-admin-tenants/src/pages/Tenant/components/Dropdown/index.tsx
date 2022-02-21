/* eslint-disable @typescript-eslint/ban-types */
import { ReactNode, useState } from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { CaretDownFilledIcon, CaretUpFilledIcon } from '@tkeel/console-icons';

type TMenuItem = {
  key: string;
  label: string;
  icon: Function;
  [propName: string]: unknown;
};
type DropdownProps = {
  children: ReactNode;
  menu: TMenuItem[];
};

export default function Dropdown(props: DropdownProps) {
  const { children, menu } = props;
  const [showActionList, setShowActionList] = useState(false);
  const handleDropdownListShow = () => {
    setShowActionList(!showActionList);
  };
  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme={showActionList ? 'primary' : 'gray'}
        fontSize="12px"
        fontWeight="400"
        size="sm"
        rightIcon={
          showActionList ? (
            <CaretUpFilledIcon color="white" />
          ) : (
            <CaretDownFilledIcon color="white" />
          )
        }
        onClick={handleDropdownListShow}
      >
        {children}
      </MenuButton>
      <MenuList minW="144px" bg="gray.800" fontSize="12px" color="white">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <MenuItem
              bg="inherit"
              _hover={{ bg: 'gray.700' }}
              _focus={{ bg: 'gray.700' }}
              key={item.key}
              lineHeight="18px"
            >
              <Text mr="4px">
                <Icon size="14" color="white" />
              </Text>
              <Text>{item.label}</Text>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
