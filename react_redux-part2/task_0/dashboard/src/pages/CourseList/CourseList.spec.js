import { screen } from '@testing-library/react';
import { renderWithProvider } from '../../tests/test-utils';
import CourseList from './CourseList';

jest.mock('../../components/HOC/WithLogging', () => (Component) => Component);

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('CourseList component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test('dispatches fetchCourses on mount', () => {
    renderWithProvider(<CourseList />, {
      preloadedState: {
        courses: { courses: [] },
      },
    });

    expect(mockDispatch).toHaveBeenCalled();
    expect(typeof mockDispatch.mock.calls[0][0]).toBe('function');
  });

  test('renders message when no courses are available', () => {
    renderWithProvider(<CourseList />, {
      preloadedState: {
        courses: { courses: [] },
      },
    });

    expect(screen.getByText(/no course available yet/i)).toBeInTheDocument();
  });

  test('renders course list when courses are available', () => {
    renderWithProvider(<CourseList />, {
      preloadedState: {
        courses: {
          courses: [
            { id: 1, name: 'ES6', credit: 60 },
            { id: 2, name: 'Webpack', credit: 20 },
          ],
        },
      },
    });

    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });
});
