import {
  Box,
  Button,
  Circle,
  Colors,
  StyleProps,
  useTheme,
} from '@chakra-ui/react';
import {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import {
  CaretDownFilledIcon,
  CaretUpFilledIcon,
  MoreVerticalFilledIcon,
} from '@tkeel/console-icons';

type Placement = 'bottom' | 'top';
type Props = {
  type?: 'icon' | 'text';
  element?: ReactNode;
  buttons: ReactElement[];
  defaultPlacement?: Placement;
  buttonProps?: object;
  isActionListOpen?: boolean;
  onActionListOpen?: () => unknown;
  onActionListClose?: () => unknown;
  styles?: {
    wrapper?: StyleProps;
    actionList?: StyleProps;
  };
};

interface CustomColors extends Colors {
  primary: string;
}

function getScrollParent(node: Element | null): Element | null {
  if (node == null) return null;

  const { parentNode } = node;

  const overflowRegex = /(auto|scroll|overlay)/;
  const { overflow, overflowX, overflowY } = window.getComputedStyle(node);
  if (overflowRegex.test(overflow + overflowY + overflowX)) {
    return node;
  }
  return getScrollParent(parentNode as Element);
}

export default function MoreAction({
  type = 'icon',
  element,
  buttons,
  defaultPlacement = 'bottom',
  isActionListOpen = false,
  onActionListOpen,
  onActionListClose,
  buttonProps = {},
  styles = {},
}: Props) {
  const [placement, setPlacement] = useState<Placement>(defaultPlacement);
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
    const scrollParent = getScrollParent(event.currentTarget);
    event.stopPropagation();
    handleSetShowActionList(!showActionList);
    const top = event.currentTarget?.getBoundingClientRect().top;
    const { top: parentTop, height: parentHeight } =
      scrollParent?.getBoundingClientRect() || {};
    if (parentTop && parentHeight) {
      const scrolledBottom =
        top > parentTop + parentHeight - (60 + 32 * buttons.length);
      setPlacement(scrolledBottom ? 'top' : 'bottom');
    }
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

  const actionListPositionStyle =
    placement === 'top'
      ? {
          bottom: '38px',
        }
      : {
          top: '38px',
        };

  return (
    <Box
      position="relative"
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      {...styles.wrapper}
    >
      {element ||
        (type === 'icon' ? (
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
        ) : (
          <Button
            rightIcon={
              isActionListOpen ? (
                <CaretUpFilledIcon color="white" />
              ) : (
                <CaretDownFilledIcon color="white" />
              )
            }
            width="92px"
            paddingRight="18px"
            css={`
              > span {
                margin-left: 1px;
              }
            `}
          >
            更多操作
          </Button>
        ))}
      <Box
        display={showActionList ? 'block' : 'none'}
        position="absolute"
        right="0"
        // top="38px"
        {...actionListPositionStyle}
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
        {...styles.actionList}
      >
        {menus}
      </Box>
    </Box>
  );
}
