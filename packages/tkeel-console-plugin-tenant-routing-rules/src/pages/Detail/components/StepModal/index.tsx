import { Box, Button, Flex } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';

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
  cancelText?: string;
  verifyText?: string;
  prevText?: string;
  nextText?: string;
  onClose: () => unknown;
  // onOk: () => unknown;
  onNext?: (e: number) => unknown;
  onPrev?: (e: number) => unknown;
  otherButtons?: ReactNode;
  isOpen: boolean;
  // isLoading: boolean;
  // onClose: () => unknown;
  // handleSubmit: (values: FormValues) => unknown;
};

export default function StepModal({
  title,
  stepBarInfo,
  children,
  // okText = '确认',
  cancelText = '完成',
  verifyText = '验证',
  prevText = '上一步',
  nextText = '下一步',
  onClose,
  // onOk,
  onNext,
  onPrev,
  otherButtons,
  // info,
  isOpen,
}: // isLoading,
// handleSubmit,
Props) {
  const [step, setStep] = useState(1);
  const stepLen = children.length;

  const onStepPrev = () => {
    setStep((p: number) => {
      if (onPrev) onPrev(p - 1);
      return p - 1;
    });
  };
  const onStepNext = () => {
    setStep((p: number) => {
      if (onNext) onNext(p + 1);
      return p + 1;
    });
  };
  const onVerify = () => {
    onStepNext();
  };
  // const onCancel = () => {};
  // const onOk = () => {};
  return (
    <Modal
      height="696px"
      width="800px"
      title={title}
      isOpen={isOpen}
      // isConfirmButtonLoading={isLoading}
      onClose={onClose}
      // onConfirm={handleConfirm}
      hasCancelButton={false}
      hasConfirmButton={false}
    >
      <Flex bg="gray.50" h="100%" p="12px" flexDirection="row">
        {stepBarInfo && (
          <StepBar stepBarInfo={stepBarInfo} currentStep={step} />
        )}
        <Box flex="1" bg="white" p="20px">
          {children.map((child, index) => {
            const active = step === index + 1;
            return (
              <Box key={String(index + 1)} display={active ? 'block' : 'none'}>
                {child}
              </Box>
            );
          })}
          <Box>
            {step === 1 && (
              <Button colorScheme="primary" onClick={onVerify}>
                {verifyText}
              </Button>
            )}
            {step > 1 && step !== stepLen && (
              <Button colorScheme="primary" onClick={onStepPrev}>
                {prevText}
              </Button>
            )}
            {step > 1 && step < stepLen && stepLen > 1 && (
              <Button colorScheme="primary" onClick={onStepNext}>
                {nextText}
              </Button>
            )}
            {otherButtons}
            {step === stepLen && (
              <Button colorScheme="primary" onClick={onClose}>
                {cancelText}
              </Button>
            )}
          </Box>
        </Box>
      </Flex>
    </Modal>
  );
}
