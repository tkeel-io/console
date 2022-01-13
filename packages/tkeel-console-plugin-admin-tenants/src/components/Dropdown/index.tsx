import { ReactNode, useState } from 'react';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { CaretDownFilledIcon, CaretUpFilledIcon } from '@tkeel/console-icons';

type TMenu = {
  key: string;
  label: string;
  [propName: string]: any;
};
type DropdownProps = {
  children: ReactNode;
  menu: TMenu[];
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
        colorScheme="primary"
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
      <MenuList>
        {menu.map((item) => (
          <MenuItem key={item.key}>{item.label}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
