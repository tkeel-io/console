import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { CaretDownFilledIcon, CaretUpFilledIcon } from '@tkeel/console-icons';

type DropdownProps = {
  children: React.ReactNode;
};

export default function Dropdown(props: DropdownProps) {
  const { children } = props;
  const [showActionList, setShowActionList] = useState(false);
  const handleDropdownListShow = () => {
    setShowActionList(!showActionList);
  };
  return (
    <div>
      <Button
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
      </Button>
    </div>
  );
}
