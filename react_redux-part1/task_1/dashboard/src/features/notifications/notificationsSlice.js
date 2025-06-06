import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLatestNotification } from "../../utils/utils";

const initialState = {
  notifications: [],
  displayDrawer: true,
};

const API_BASE_URL = "http://localhost:5173";

const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    try {
      const res = await fetch(ENDPOINTS.notifications);

      const data = await res.json();
      const notifications = [...data.notifications];

      const index = notifications.findIndex((notif) => notif.id === 3);
      if (index !== -1) {
        notifications[index] = {
          id: 3,
          type: "urgent",
          html: { __html: getLatestNotification() },
        };
      }

      return notifications;
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      throw error;
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const idToRemove = action.payload;
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== idToRemove
      );
      console.log(`Notification ${idToRemove} has been marked as read`);
    },
    showDrawer: (state) => {
      state.displayDrawer = true;
    },
    hideDrawer: (state) => {
      state.displayDrawer = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
  },
});

export const { markNotificationAsRead, showDrawer, hideDrawer } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
