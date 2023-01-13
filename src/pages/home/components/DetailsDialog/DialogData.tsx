import { CircularProgress } from '@mui/material';
import { useTableDetails } from '../../../../context/TableDetailsContext';
import { useListCommitsFromRepo } from '../../../../lib/queryClient/hooks/useListCommitsFromRepo';
import { useListForksFromRepo } from '../../../../lib/queryClient/hooks/useListForksFromRepo';
import { useOwnerBioFromRepo } from '../../../../lib/queryClient/hooks/useOwnerBioFromRepo';
import * as S from './styles';

export const DialogData = () => {
  const { data } = useTableDetails();
  const {
    data: commitsData,
    isFetching,
    error,
  } = useListCommitsFromRepo(data.commits_url ?? '');
  const {
    data: forkData,
    isFetching: isFetchingForks,
    error: forkError,
  } = useListForksFromRepo(data.forks_url ?? '');
  const {
    data: ownerData,
    isFetching: isFetchingOwner,
    error: ownerError,
  } = useOwnerBioFromRepo(data.owner?.url ?? '');

  if (error || forkError || ownerError) {
    return <p>Error</p>;
  }

  if (isFetching || isFetchingForks || isFetchingOwner) {
    return (
      <S.loadingContainer>
        <CircularProgress data-testid="loading" />
      </S.loadingContainer>
    );
  }

  return (
    <>
      <p>
        Last 3 commits by{' '}
        <strong>
          {commitsData?.map((commit) => commit.commit.author.name).join(', ')}
        </strong>
        .
      </p>
      <p>
        The last fork was created by{' '}
        <strong>{forkData?.map((fork) => fork.owner.login)}</strong>
      </p>
      <p>
        The owner has this in their biography:{' '}
        <strong>{ownerData?.bio ?? 'No bio available for this user'}</strong>
      </p>
    </>
  );
};
