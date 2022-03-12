import { isPlainObject, merge, omit } from 'lodash';
import { ReactText } from 'react';
import { toast as toastifyToast, TypeOptions } from 'react-toastify';

import {
  ToastArg1,
  ToastArg2,
  ToastContent,
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

function parseArgs(arg1: ToastArg1, arg2?: ToastArg2) {
  const arg1IsToastOptions = isToastOptions(arg1);

  let content = null;
  let toastOptions = null;

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
    toastOptions = { ...rest };
  } else {
    content = <StyledToastContent>{arg1}</StyledToastContent>;
    toastOptions = arg2;
  }

  const statusInfos = getStatusInfos();
  const status = toastOptions?.status;
  const statusInfo = statusInfos[status ?? DEFAULT_STATUS];
  const { icon: Icon } = statusInfo;
  const options = merge(
    {},
    { type: status, icon: !!Icon && <Icon size="20px" /> },
    omit(toastOptions, ['status'])
  );

  return { content, options };
}

function createToastByStatus(status: Exclude<TypeOptions, 'default'>) {
  return function toastByStatus(
    arg1: ToastArg1,
    arg2?: Omit<ToastArg2, 'status'>
  ) {
    const { content, options } = parseArgs(arg1, arg2);
    const opts = merge({}, { type: status }, options);
    return toastifyToast(content, opts);
  };
}

function toast(options: ToastOptions): ReactText;
function toast(content: ToastContent, options?: ToastArg2): ReactText;
function toast(arg1: ToastArg1, arg2?: ToastArg2): ReactText {
  const { content, options } = parseArgs(arg1, arg2);
  return toastifyToast(content, options);
}

toast.info = createToastByStatus('info');

toast.success = createToastByStatus('success');

toast.warning = createToastByStatus('warning');

toast.error = createToastByStatus('error');

export default toast;
