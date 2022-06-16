import { Box, Button, Circle, StyleProps, useTheme } from '@chakra-ui/react';
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
import { Theme } from '@tkeel/console-themes';

type Placement = 'bottom' | 'top';
export type MoreActionStyles = {
  wrapper?: StyleProps;
  actionList?: StyleProps;
};

type Props = {
  type?: 'icon' | 'text';
  element?: ReactNode;
  buttons: ReactElement[];
  defaultPlacement?: Placement;
  buttonProps?: object;
  isActionListOpen?: boolean;
  onActionListOpen?: () => unknown;
  onActionListClose?: () => unknown;
  onActionListToggle?: (show: boolean) => unknown;
  styles?: MoreActionStyles;
};

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
  onActionListToggle,
  buttonProps = {},
  styles = {},
}: Props) {
  const [placement, setPlacement] = useState<Placement>(defaultPlacement);
  const [showActionList, setShowActionList] = useState(isActionListOpen);
  const { colors } = useTheme<Theme>();
  let timer: number | null = null;

  const handleSetShowActionList = (show: boolean) => {
    setShowActionList(show);

    if (show && onActionListOpen) {
      onActionListOpen();
    }

    if (!show && onActionListClose) {
      onActionListClose();
    }

    if (onActionListToggle) {
      onActionListToggle(show);
    }
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const { currentTarget } = event;
    const scrollParent = getScrollParent(currentTarget);
    event.stopPropagation();
    handleSetShowActionList(!showActionList);

    const top = currentTarget?.getBoundingClientRect().top;
    const parentTop = scrollParent?.getBoundingClientRect().top;
    const parentScrollHeight = scrollParent?.scrollHeight;
    if (parentTop && parentScrollHeight) {
      const actionListHeight = 60 + 32 * buttons.length;
      const scrolledBottom =
        top > parentTop + parentScrollHeight - actionListHeight;
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
      onMouseLeave={handleMouseLeave}
      {...styles.wrapper}
    >
      <Box onClick={handleClick}>
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
      </Box>
      <Box
        display={showActionList ? 'block' : 'none'}
        position="absolute"
        right="0"
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
