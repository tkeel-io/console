import { useEffect } from 'react';

import useCreateMailMutation from '@/tkeel-console-plugin-tenant-notification-objects/hooks/mutations/useCreateMailMutation';

export default function useCreateMails(noticeId: number) {
  const { mutate } = useCreateMailMutation({ onSuccess: () => {} });

  useEffect(() => {
    const max = 100;
    const maxLength = `${max}`.length;
    let index = 0;
    while (index < max) {
      let sn = `${index}`;

      while (sn.length < maxLength) {
        sn = `0${sn}`;
      }

      const data = {
        noticeId,
        emailAddress: `email-${sn}`,
        userName: `name-${sn}`,
      };
      mutate({ data });
      index += 1;
    }
  }, [noticeId, mutate]);
}
