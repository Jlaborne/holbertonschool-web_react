import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLatestNotification } from "../../utils/utils";
import axios from "axios";

const initialState = {
  notifications: [],
  displayDrawer: true,
};

const API_BASE_URL = "http://localhost:5173";

const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await axios.get(ENDPOINTS.notifications);
    const notifications = response.data.notifications;

    const updatedNotification = {
      id: 3,
      type: "urgent",
      html: { __html: getLatestNotification() },
    };

    const index = notifications.findIndex((notif) => notif.id === 3);
    if (index !== -1) {
      notifications[index] = updatedNotification;
    } else {
      notifications.push(updatedNotification);
    }

    return notifications;
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
