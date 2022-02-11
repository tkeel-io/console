import { ReactNode } from 'react';
import { RegisterOptions } from 'react-hook-form';

interface Schema {
  help: ReactNode;
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
}

interface Schemas {
  username: Schema;
  password: Schema;
}

const usernameHelp = '支持 5 ~ 18 位字符串, 只能包含英文字母、数字、下划线和 @';

const schemas: Schemas = {
  username: {
    help: usernameHelp,
    registerOptions: {
      required: { value: true, message: usernameHelp },
      pattern: {
        value: /^[\w@]{5,18}$/,
        message: usernameHelp,
      },
    },
  },
  password: {
    help: usernameHelp,
    registerOptions: {
      required: { value: true, message: usernameHelp },
      pattern: {
        value: /^[\w@]{6,18}$/,
        message: usernameHelp,
      },
    },
  },
};

export default schemas;
