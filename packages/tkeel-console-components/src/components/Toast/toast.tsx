import { isPlainObject, merge, omit } from 'lodash';
import { ReactText } from 'react';
import { toast as toastifyToast, ToastContent } from 'react-toastify';

// import { STATUS_INFOS } from '@tkeel/console-hooks';
import { ToastOptions } from '@tkeel/console-types';

import * as StatusIcon from '../StatusIcon';
import { DEFAULT_STATUS } from './constants';

const statusInfos = {
  default: {
    icon: null,
  },
  info: {
    icon: StatusIcon.Info,
  },
  success: {
    icon: StatusIcon.Success,
  },
  warning: {
    icon: StatusIcon.Warning,
  },
  error: {
    icon: StatusIcon.Error,
  },
};

function isToastOptions(value: unknown): value is ToastOptions {
  return isPlainObject(value);
}

function toast(options: ToastOptions): ReactText;
function toast(
  content: Exclude<ToastContent, Record<string, never>>,
  options?: Omit<ToastOptions, 'title' | 'description'>
): ReactText;
function toast(
  arg1: ToastOptions | ToastContent,
  arg2?: Omit<ToastOptions, 'title' | 'description'>
): ReactText {
  const arg1IsToastOptions = isToastOptions(arg1);

  let content = null;
  let options = null;

  if (arg1IsToastOptions) {
    const { title, description, ...rest } = arg1;

    content = (
      <div>
        {title}/{description}
      </div>
    );
    options = { ...rest };
  } else {
    content = arg1;
    options = arg2;
  }

  const status = options?.status;
  const statusInfo = statusInfos[status ?? DEFAULT_STATUS];
  const { icon: Icon } = statusInfo;
  const toastOptions = merge(
    {},
    { type: status, icon: !!Icon && <Icon size="20px" /> },
    omit(options, ['status'])
  );

  return toastifyToast(content, toastOptions);
}

export default toast;
