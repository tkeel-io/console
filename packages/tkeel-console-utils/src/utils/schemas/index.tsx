/* import { ReactNode } from 'react';
import { RegisterOptions } from 'react-hook-form';

interface Schema {
  help?: ReactNode;
  registerOptions: Pick<
    RegisterOptions,
    | 'required'
    | 'maxLength'
    | 'minLength'
    | 'max'
    | 'min'
    | 'pattern'
    | 'validate'
    | 'valueAsNumber'
    | 'valueAsDate'
    | 'setValueAs'
    | 'disabled'
  >;
} */

const usernameHelp = '只能包含英文字母、数字、下划线和 @';
const passwordHelp = '支持 6 ~ 18 位字符串, 只能包含英文字母、数字、下划线和 @';

export const username = {
  help: usernameHelp,
  registerOptions: {
    required: { value: true, message: usernameHelp },
    pattern: {
      value: /^[\w@]+$/,
      message: usernameHelp,
    },
  },
};

export const password = {
  help: passwordHelp,
  registerOptions: {
    required: { value: true, message: passwordHelp },
    pattern: {
      value: /^[\w@]{6,18}$/,
      message: passwordHelp,
    },
  },
};

export const tenantTitle = {
  registerOptions: {
    required: { value: true, message: '请输入租户空间' },
  },
};
