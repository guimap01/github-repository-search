import { Container } from '@mui/material';
import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const LayoutHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  background: #282a36;
  margin-bottom: 2rem;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  gap: 2rem;
  h1 {
    color: #fff;
  }
`;

export const Logo = styled.img`
  height: 2rem;
  margin-right: 1rem;
`;
