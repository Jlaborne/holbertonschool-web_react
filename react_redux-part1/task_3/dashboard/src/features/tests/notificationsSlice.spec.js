import notificationsReducer, {
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from "../notifications/notificationsSlice";

describe("notificationsSlice", () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  it("should return the initial state by default", () => {
    expect(notificationsReducer(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should handle markNotificationAsRead and remove notification by ID", () => {
    const prevState = {
      notifications: [
        { id: 1, type: "default", value: "Test 1" },
        { id: 2, type: "urgent", value: "Test 2" },
      ],
      displayDrawer: true,
    };

    const newState = notificationsReducer(prevState, markNotificationAsRead(2));

    expect(newState.notifications).toHaveLength(1);
    expect(newState.notifications[0].id).toBe(1);
  });

  it("should handle showDrawer and set displayDrawer to true", () => {
    const prevState = {
      notifications: [],
      displayDrawer: false,
    };

    const newState = notificationsReducer(prevState, showDrawer());
    expect(newState.displayDrawer).toBe(true);
  });

  it("should handle hideDrawer and set displayDrawer to false", () => {
    const prevState = {
      notifications: [],
      displayDrawer: true,
    };

    const newState = notificationsReducer(prevState, hideDrawer());
    expect(newState.displayDrawer).toBe(false);
  });
});
