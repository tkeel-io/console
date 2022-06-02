import { Flex, StyleProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ChevronDownFilledIcon } from '@tkeel/console-icons';
// import { useTemplatesQuery } from '@tkeel/console-request-hooks';

interface Props {
  styles?: {
    wrapper?: StyleProps;
  };
}

export default function DeviceSelectField({ styles }: Props) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  // const { templates, isLoading } = useTemplatesQuery();

  const handleDocumentClick = () => {
    setIsShowDropdown(false);
  };

  useEffect(() => {
    const modalContainer = document.querySelector(
      '.chakra-modal__content-container'
    );
    if (modalContainer) {
      modalContainer.addEventListener('click', handleDocumentClick);
    }

    return () => {
      if (modalContainer) {
        modalContainer.removeEventListener('click', handleDocumentClick);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      height="40px"
      position="relative"
      alignItems="flex-end"
      {...styles?.wrapper}
    >
      <Flex
        width="100%"
        paddingRight="16px"
        justifyContent="flex-end"
        alignItems="center"
        height="40px"
        borderWidth="1px"
        borderStyle="solid"
        borderColor={isShowDropdown ? 'primary' : 'grayAlternatives.50'}
        borderRadius="4px"
        cursor="pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowDropdown(!isShowDropdown);
        }}
      >
        <ChevronDownFilledIcon />
      </Flex>
      {isShowDropdown && (
        <Flex
          position="absolute"
          left="0"
          top="48px"
          width="100%"
          padding="16px"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.200"
          borderRadius="4px"
          backgroundColor="white"
        >
          下拉框
        </Flex>
      )}
    </Flex>
  );
}
