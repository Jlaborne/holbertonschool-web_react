import authReducer, { login, logout } from "../auth/authSlice";

describe("authSlice", () => {
  const initialState = {
    user: {
      email: "",
      password: "",
    },
    isLoggedIn: false,
  };

  it("should return the initial state by default", () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle login action", () => {
    const mockPayload = {
      email: "test@example.com",
      password: "password123",
    };

    const expectedState = {
      user: {
        email: "test@example.com",
        password: "password123",
      },
      isLoggedIn: true,
    };

    const newState = authReducer(initialState, login(mockPayload));
    expect(newState).toEqual(expectedState);
  });

  it("should handle logout action", () => {
    const loggedInState = {
      user: {
        email: "test@example.com",
        password: "password123",
      },
      isLoggedIn: false,
    };

    const expectedState = {
      user: {
        email: "",
        password: "",
      },
      isLoggedIn: false,
    };

    const newState = authReducer(loggedInState, logout());
    expect(newState).toEqual(expectedState);
  });
});
