import { useQuery } from 'react-query';
import { api } from '../../axios/api';

export const githubRepositoryQueryKey = 'github_repositories';
type GithubRepository = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
  };
  stargazers_count: number;
  url: string;
};
type GithubRepositoryResponse = {
  incomplete_results: boolean;
  items: GithubRepository[];
  total_count: number;
};
export const fetchGithubRepositories = async (
  search: string,
  page: number
): Promise<GithubRepositoryResponse> => {
  const queryOptions = {
    q: search,
    per_page: 10,
    page,
  };
  const resp = await api.get('', { params: queryOptions });
  return resp.data;
};

export const useListGithub = (search: string, page: number) => {
  return useQuery(
    [githubRepositoryQueryKey, search, page],
    () => fetchGithubRepositories(search, page + 1),
    {
      enabled: !!search,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours,
      keepPreviousData: true,
    }
  );
};
