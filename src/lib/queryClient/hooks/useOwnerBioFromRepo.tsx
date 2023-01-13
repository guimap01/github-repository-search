import { useQuery } from 'react-query';
import { api } from '../../axios/api';

const githubOwnerBioFromRepoQueryKey = 'githubOwnerBioFromRepo';

type FetchOwnerBioFromRepoResponse = {
  bio: string;
};

export const fetchOwnerBioFromRepo = async (
  url: string
): Promise<FetchOwnerBioFromRepoResponse> => {
  const resp = await api.get(url);
  return resp.data;
};

export const useOwnerBioFromRepo = (url: string) => {
  return useQuery(
    [githubOwnerBioFromRepoQueryKey, url],
    () => fetchOwnerBioFromRepo(url),
    {
      enabled: !!url,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hour
      keepPreviousData: true,
    }
  );
};
