import { isPlainObject, merge, omit } from 'lodash';
import { toast as toastifyToast, TypeOptions } from 'react-toastify';

import {
  ToastContent,
  ToastFunction,
  ToastFunctionArg1,
  ToastFunctionArg2,
  ToastOptions,
} from '@tkeel/console-types';
import { getStatusInfos } from '@tkeel/console-utils';

import { DEFAULT_STATUS } from './constants';
import {
  StyledToastContent,
  StyledToastContentDescription,
  StyledToastContentTitle,
} from './styled';

function isToastOptions(value: unknown): value is ToastOptions {
  return isPlainObject(value);
}

function parseArgs(arg1: ToastFunctionArg1, arg2?: ToastFunctionArg2) {
  const arg1IsToastOptions = isToastOptions(arg1);

  let content = null;
  let options = null;

  if (arg1IsToastOptions) {
    const { title, description, ...rest } = arg1;
    content = (
      <>
        <StyledToastContentTitle> {title}</StyledToastContentTitle>
        <StyledToastContentDescription>
          {description}
        </StyledToastContentDescription>
      </>
    );
    options = { ...rest };
  } else {
    content = <StyledToastContent>{arg1}</StyledToastContent>;
    options = arg2;
  }

  return { content, options };
}

function getToastifyToastArgs({
  content,
  options,
}: {
  content: ToastContent;
  options?: ToastFunctionArg2;
}) {
  const statusInfos = getStatusInfos();
  const status = options?.status;
  const statusInfo = statusInfos[status ?? DEFAULT_STATUS];
  const { icon: Icon } = statusInfo;
  const opts = merge(
    {},
    { type: status, icon: !!Icon && <Icon size="20px" /> },
    omit(options, ['status'])
  );

  return { content, options: opts };
}

function createToastByStatus(status: Exclude<TypeOptions, 'default'>) {
  return function toastByStatus(
    arg1: ToastFunctionArg1,
    arg2?: Omit<ToastFunctionArg2, 'status'>
  ) {
    const args = parseArgs(arg1, arg2);
    const newArgs = merge({}, { options: { status } }, args);
    const { content, options } = getToastifyToastArgs(newArgs);
    return toastifyToast(content, options);
  };
}

const toast: ToastFunction = function toast(
  arg1: ToastFunctionArg1,
  arg2?: ToastFunctionArg2
) {
  const args = parseArgs(arg1, arg2);
  const { content, options } = getToastifyToastArgs(args);
  return toastifyToast(content, options);
};

toast.info = createToastByStatus('info');

toast.success = createToastByStatus('success');

toast.warning = createToastByStatus('warning');

toast.error = createToastByStatus('error');

export default toast;
