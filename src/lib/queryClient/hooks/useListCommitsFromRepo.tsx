import { useQuery } from 'react-query';
import { api } from '../../axios/api';

const githubCommitsFromRepositoryQueryKey = 'githubCommitsFromRepository';

type FetchGithubCommitsFromRepositoryResponse = {
  sha: string;
  commit: {
    author: {
      name: string;
    };
  };
};

export const fetchGithubCommitsFromRepository = async (
  url: string
): Promise<FetchGithubCommitsFromRepositoryResponse[]> => {
  const params = {
    per_page: 3,
  };
  const cleanUrl = url.replace('{/sha}', '');
  const resp = await api.get(cleanUrl, { params });
  return resp.data;
};

export const useListCommitsFromRepo = (url: string) => {
  return useQuery(
    [githubCommitsFromRepositoryQueryKey, url],
    () => fetchGithubCommitsFromRepository(url),
    {
      enabled: !!url,
      cacheTime: 1000 * 60 * 60 * 1, // 1 hour,
      keepPreviousData: true,
    }
  );
};
