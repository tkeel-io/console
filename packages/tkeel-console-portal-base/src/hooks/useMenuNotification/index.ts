import useNotificationsQuery from '@/tkeel-console-portal-base/hooks/queries/useNotificationsQuery';

export default function useMenuNotification(menuId: string) {
  const { notifications } = useNotificationsQuery();
  return notifications.some(({ entry }) => entry?.id === menuId);
}
