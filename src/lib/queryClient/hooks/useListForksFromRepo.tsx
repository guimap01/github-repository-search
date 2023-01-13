import { useQuery } from 'react-query';
import { api } from '../../axios/api';

const githubForksFromRepositoryKey = 'githubForksFromRepository';

type FetchGitHubForksFromRepositoryResponse = {
  id: number;
  owner: {
    login: string;
  };
};

export const fetchGitHubForksFromRepository = async (
  url: string
): Promise<FetchGitHubForksFromRepositoryResponse[]> => {
  const params = {
    per_page: 1,
  };
  const cleanUrl = url.replace('{/sha}', '');
  const resp = await api.get(cleanUrl, { params });
  return resp.data;
};

export const useListForksFromRepo = (url: string) => {
  return useQuery(
    [githubForksFromRepositoryKey, url],
    () => fetchGitHubForksFromRepository(url),
    {
      enabled: !!url,
      cacheTime: 1000 * 60 * 60 * 1, // 1 hour
      keepPreviousData: true,
    }
  );
};
