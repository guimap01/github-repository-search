import '@testing-library/jest-dom';
jest.mock('../src/lib/axios/api', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
});
