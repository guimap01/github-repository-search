import { faker } from '@faker-js/faker';
import { useListGithub } from '../../lib/queryClient/hooks/useListGithub';
import { renderWithClient } from '../../test/renderWithClient';
import Home from '.';
import { screen, fireEvent, waitFor } from '@testing-library/react';
const mockedUseListGithub = useListGithub as jest.Mock;

jest.mock('../../lib/queryClient/hooks/useListGithub');

const generateItem = () => {
  return {
    id: faker.datatype.number(),
    name: faker.name.firstName(),
    description: faker.name.lastName(),
    stargazers_count: faker.datatype.number(),
    owner: {
      login: faker.name.firstName(),
    },
  };
};

describe('Home', () => {
  it('should render correctly', () => {
    mockedUseListGithub.mockReturnValue({
      data: {
        items: [],
        total_count: 0,
      },
    });
    renderWithClient(<Home />);
    const noResultsText = screen.getByText(/no results found/i);
    expect(noResultsText).toBeDefined();
  });
  it('should render teh home page with results', async () => {
    const item = generateItem();
    mockedUseListGithub.mockReturnValue({
      data: {
        items: [item],
        total_count: 1,
      },
    });

    renderWithClient(<Home />);
    const name = await screen.findByText(item.owner.login);
    expect(name).toBeDefined();
  });
  it('should call onSubmit when search icon is clicked', async () => {
    const item = generateItem();
    mockedUseListGithub.mockReturnValue({
      data: {
        items: [item],
        total_count: 1,
      },
    });
    const mockedSearchValue = faker.animal.bird();
    renderWithClient(<Home />);
    const input = screen.getByRole('textbox', {
      name: /search repository/i,
    });
    fireEvent.change(input, { target: { value: mockedSearchValue } });
    const searchIconButton = screen.getByRole('button', {
      name: /submit search/i,
    });
    fireEvent.click(searchIconButton);

    expect(mockedUseListGithub).toHaveBeenCalledWith(mockedSearchValue, 0);
  });
  it('should call useListGithub when page is changed', async () => {
    const item = generateItem();
    mockedUseListGithub.mockReturnValue({
      data: {
        items: [item],
        total_count: 15,
      },
    });
    renderWithClient(<Home />);

    const nextButton = screen.getByRole('button', {
      name: /go to next page/i,
    });
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(mockedUseListGithub).toHaveBeenCalledWith('', 1);
    });
  });
});
