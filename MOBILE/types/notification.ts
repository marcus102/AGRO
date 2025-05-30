import { create } from 'zustand';
export type NotificationType = 'update' | 'news' | 'message' | 'ads';
export type NotificationStatus = 'draft' | 'online' | 'deleted';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  context: string;
  status: NotificationStatus;
  read: boolean;
  action_url: string;
  image: string;
  created_at: string;
}

export interface NotificationRead {
  id: string;
  user_id: string;
  notification_id: string;
  created_at: string;
}
