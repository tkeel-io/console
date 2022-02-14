import { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import { Box, Circle, Colors, useTheme } from '@chakra-ui/react';
import { MoreVerticalFilledIcon } from '@tkeel/console-icons';

type Props = {
  buttons: ReactNode[];
};

interface CustomColor extends Colors {
  primary: string;
}

function MoreAction({ buttons }: Props) {
  const [showActionList, setShowActionList] = useState(false);
  const { colors }: { colors: CustomColor } = useTheme();

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    setShowActionList(!showActionList);
  };

  const handleDocumentClick = () => {
    setShowActionList(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box position="relative" onClick={handleClick}>
      <Circle
        size="28px"
        backgroundColor={showActionList ? 'gray.100' : 'transparent'}
        _hover={{
          backgroundColor: 'gray.100',
          '& > svg': {
            fill: `${colors.primary} !important`,
          },
        }}
      >
        <MoreVerticalFilledIcon
          color={showActionList ? 'primary' : 'gray.700'}
        />
      </Circle>

      {showActionList && (
        <Box
          position="absolute"
          right="0"
          top="38px"
          padding="8px"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.300"
          width="144px"
          backgroundColor="white"
          borderRadius="4px"
        >
          {buttons}
        </Box>
      )}
    </Box>
  );
}

export default MoreAction;
