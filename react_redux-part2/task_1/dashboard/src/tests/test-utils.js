import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../app/rootReducer'; // update if needed

const renderWithProvider = (
  ui,
  {
    preloadedState = {},
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
};

export * from '@testing-library/react';
export { renderWithProvider };
