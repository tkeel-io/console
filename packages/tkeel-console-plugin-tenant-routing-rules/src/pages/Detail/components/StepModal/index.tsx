import { Box, Flex, StyleProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Modal } from '@tkeel/console-components';

import StepBar from './StepBar';

type StepBarInfo = {
  key: string;
  name: string;
};

type Props = {
  title: string;
  stepBarInfo?: StepBarInfo[];
  children: ReactNode[];
  step: number;
  isOpen: boolean;
  onClose: () => unknown;

  styles?: {
    wrapper?: StyleProps;
  };
};

export default function StepModal({
  title,
  stepBarInfo,
  children,
  step,
  onClose,
  isOpen,
  styles,
}: Props) {
  return (
    <Modal
      height="696px"
      width="800px"
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      hasCancelButton={false}
      hasConfirmButton={false}
      modalBodyStyle={{ padding: '12px 20px 20px' }}
    >
      <Flex bg="gray.50" h="614px" p="12px" flexDirection="row">
        {stepBarInfo && (
          <StepBar stepBarInfo={stepBarInfo} currentStep={step} />
        )}
        <Box
          flex="1"
          bg="white"
          p="20px"
          position="relative"
          {...styles?.wrapper}
        >
          {children.map((child, index) => {
            const active = step === index + 1;
            return (
              <Box key={String(index + 1)} display={active ? 'block' : 'none'}>
                {child}
              </Box>
            );
          })}
        </Box>
      </Flex>
    </Modal>
  );
}
