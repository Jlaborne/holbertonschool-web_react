import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLatestNotification } from '../../utils/utils';
import axios from 'axios';
import notificationsData from '../../../public/notifications.json';

const initialState = {
  notifications: [],
  //displayDrawer: true,
  loading: false,
};

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    try {
      const response = await axios.get(ENDPOINTS.notifications);
      const rawData = response.data;

      const transformed = rawData
        .filter((notif) => notif.context && notif.context.isRead === false)
        .map((notif) => ({
          id: notif.id,
          type: notif.context.type,
          value: notif.context.value,
          isRead: notif.context.isRead,
        }));

      return transformed;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }
);

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      const id = action.payload || null;

      if (!id) return;

      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );

      console.log(`Notification ${id} has been marked as read`);
    },
    /*hideDrawer: (state) => {
      state.displayDrawer = false;
    },
    showDrawer: (state) => {
      state.displayDrawer = true;
    },*/
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  markNotificationAsRead,
  //hideDrawer,
  showDrawer,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
