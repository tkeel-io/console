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
  help: '请输入租户空间名称',
  registerOptions: {
    required: { value: true, message: '请输入租户空间名称' },
  },
};

export const multiMail = {
  registerOptions: {
    required: { value: true, message: '' },
    pattern: {
      value:
        /^((([\d._a-z-]+)@([\d.a-z-]+)\.([.a-z]{2,6},))*(([\d._a-z-]+)@([\d.a-z-]+)\.([.a-z]{2,6})))$/,
      message: '',
    },
  },
};

export const singleMail = {
  registerOptions: {
    required: { value: true, message: '请输入邮箱' },
    pattern: {
      value: /^([\d._a-z-]+)@([\d.a-z-]+)\.([.a-z]{2,6})$/,
      message: '请输入正确的邮箱格式',
    },
  },
};

export const idPattern = {
  value: /^[A-Z_a-z]\w{1,32}$/,
  message: '以字母或下划线开头，长度最多32，只能包含字母、数字和下划线',
};

export const emailPattern = {
  value:
    /^[\da-z]+([.\\_-]*[\da-z])*@([\da-z]+[\da-z-]*[\da-z]+.){1,63}[\da-z]+$/,
  message: '请输入正确邮箱',
};
