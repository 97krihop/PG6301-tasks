import { fetchQuizzes } from '../../../src/client/utils/fetchQuizzes';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 201,
    json: () => Promise.resolve({ test: 'test' }),
  })
);

it('should return test', async () => {
  expect(await fetchQuizzes(3)).toEqual({ test: 'test' });
});

it('should return null', async () => {
  // @ts-ignore
  fetch.mockImplementationOnce(() => Promise.resolve({ status: 404 }));
  expect(await fetchQuizzes(3)).toEqual(null);
});
