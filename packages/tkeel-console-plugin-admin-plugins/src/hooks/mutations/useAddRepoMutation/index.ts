import useMutation from '@/tkeel-console-plugin-admin-plugins/hooks/useMutation';

export interface ApiData {
  '@types': string;
}

const url = '/rudder/v1/repos';
const method = 'POST';

type Props = {
  repoName: string;
};

export default function useAddRepoMutation({ repoName }: Props) {
  return useMutation<ApiData>({
    url: `${url}/${repoName}`,
    method,
  });
}
