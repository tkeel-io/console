import {
  DingDingFilledIcon,
  MailFilledIcon,
  WechatFilledIcon,
} from '@tkeel/console-icons';

export const notificationTypeArr = [
  {
    label: '邮件',
    value: 'mail',
    icon: MailFilledIcon,
    disabled: false,
  },
  {
    label: '钉钉',
    value: 'dingding',
    icon: DingDingFilledIcon,
    disabled: true,
  },
  {
    label: '企业邮箱',
    value: 'wechat',
    icon: WechatFilledIcon,
    disabled: true,
  },
];
