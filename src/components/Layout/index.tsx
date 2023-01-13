import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import * as S from './styles';

export default function AppLayout() {
  return (
    <S.LayoutWrapper>
      <S.LayoutHeader>
        <S.StyledContainer>
          <S.Logo src="/images/github-mark.svg" alt="Logo" />
          <h1>Github Repository List</h1>
        </S.StyledContainer>
      </S.LayoutHeader>
      <Container>
        <Outlet />
      </Container>
    </S.LayoutWrapper>
  );
}
