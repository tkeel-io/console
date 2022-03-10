import { isPlainObject, merge, omit } from 'lodash';
import { ReactText } from 'react';
import { toast as toastifyToast, ToastContent } from 'react-toastify';

import { ToastOptions } from '@tkeel/console-types';

import { DEFAULT_STATUS, STATUS_ICONS } from './constants';

function isToastOptions(value: unknown): value is ToastOptions {
  return isPlainObject(value);
}

function toast(options: ToastOptions): ReactText;
function toast(
  content: ToastContent,
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
  const typeInfo = STATUS_ICONS[status ?? DEFAULT_STATUS];
  const { icon } = typeInfo;
  const toastOptions = merge({}, { icon }, omit(options, ['status']));

  return toastifyToast(content, toastOptions);
}

export default toast;
