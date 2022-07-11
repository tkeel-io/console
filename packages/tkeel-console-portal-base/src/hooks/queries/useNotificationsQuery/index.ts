import { useQuery } from '@tkeel/console-hooks';

const url = '/rudder/v1/notifications';
const method = 'GET';

enum NotificationActionTypes {
  InternalJump = 'internal-jump', // 或者 number，比如：0, 1, 2
  // ExternalJump = 'external-jump', // 举例 type，目前不需要
}

interface Notification {
  notification: {
    id: string;
    title?: string;
    content: string;
    create_timestamp?: number;
    action: {
      type: NotificationActionTypes;
      value?: string;
      // 不同 type 的额外扩展信息，比如 type 为 internal-jump 和 external-jump 时，可以添加 is_open_in_new_window 来标识是否用新窗口打开链接
      extras?: {
        is_open_in_new_window?: boolean;
        // 其他信息。。。
      };
    };
  };
  entry?: {
    id: string;
    name: string;
    // count: number;
  };
}

export interface ApiData {
  '@type': string;
  notifications: Notification[];
}

export default function useNotificationsQuery() {
  const { data, ...rest } = useQuery<ApiData>({
    url,
    method,
  });
  const notifications = data?.notifications || [];

  return { notifications, data, ...rest };
}
