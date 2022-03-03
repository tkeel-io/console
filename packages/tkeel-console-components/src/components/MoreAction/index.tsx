import { Box, Circle, Colors, StyleProps, useTheme } from '@chakra-ui/react';
import {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { MoreVerticalFilledIcon } from '@tkeel/console-icons';

type Props = {
  element?: ReactNode;
  buttons: ReactElement[];
  buttonProps?: object;
  isActionListOpen?: boolean;
  onActionListOpen?: () => unknown;
  onActionListClose?: () => unknown;
  style?: StyleProps;
};

interface CustomColors extends Colors {
  primary: string;
}

function MoreAction({
  element,
  buttons,
  isActionListOpen = false,
  onActionListOpen,
  onActionListClose,
  buttonProps = {},
  style,
}: Props) {
  const [showActionList, setShowActionList] = useState(isActionListOpen);
  const { colors }: { colors: CustomColors } = useTheme();
  let timer: number | null = null;

  const handleSetShowActionList = (show: boolean) => {
    setShowActionList(show);

    if (show && onActionListOpen) {
      onActionListOpen();
    }

    if (!show && onActionListClose) {
      onActionListClose();
    }
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    handleSetShowActionList(!showActionList);
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = window.setTimeout(() => {
      handleSetShowActionList(false);
    }, 200);
  };

  const handleActionListMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };

  const handleDocumentClick = () => {
    handleSetShowActionList(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setShowActionList(isActionListOpen);
  }, [isActionListOpen]);

  const menus = buttons.map((button) => {
    return cloneElement(button, {
      ...buttonProps,
    });
  });

  return (
    <Box
      position="relative"
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      {...style}
    >
      {element || (
        <Circle
          size="28px"
          backgroundColor={showActionList ? 'gray.100' : 'transparent'}
          cursor="pointer"
          _hover={{
            backgroundColor: 'gray.100',
            '& > svg': {
              fill: `${colors.primary} !important`,
            },
          }}
        >
          <MoreVerticalFilledIcon
            color={showActionList ? 'primary' : 'grayAlternatives.300'}
          />
        </Circle>
      )}
      <Box
        display={showActionList ? 'block' : 'none'}
        position="absolute"
        right="0"
        top="38px"
        padding="8px"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="gray.300"
        width="107px"
        backgroundColor="white"
        borderRadius="4px"
        zIndex="9"
        boxShadow="0px 10px 15px rgba(113, 128, 150, 0.1), 0px 4px 6px rgba(113, 128, 150, 0.2)"
        onMouseEnter={handleActionListMouseEnter}
      >
        {menus}
      </Box>
    </Box>
  );
}

export default MoreAction;
