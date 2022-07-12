import { useQuery } from '@tkeel/console-hooks';

const url = '/rudder/v1/notifications';
const method = 'GET';

enum NotificationActionTypes {
  InternalJump = 'internal-jump',
}

export interface Notification {
  notification: {
    id: string;
    title?: string;
    content: string;
    create_timestamp?: number;
    action: {
      type: NotificationActionTypes;
      value?: string;
      extras?: {
        is_open_in_new_window?: boolean;
      };
    };
  };
  entry?: {
    id: string;
    name: string;
  };
}

export interface ApiData {
  '@type': string;
  notifications: Notification[];
}

interface Props {
  refetchInterval?: number;
}

export default function useNotificationsQuery(props?: Props) {
  const refetchInterval = props?.refetchInterval ?? 5000;
  const { data, ...rest } = useQuery<ApiData>({
    url,
    method,
    reactQueryOptions: {
      refetchInterval,
    },
  });
  const notifications = data?.notifications || [];

  return { notifications, data, ...rest };
}
