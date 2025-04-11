import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BaseModal } from './BaseModal';
import { Star, Award, MessageSquare, Bell, Check } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface NotificationsModalProps {
  visible: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: '1',
    type: 'application',
    title: 'Nouvelle candidature',
    message: 'Marie L. a postulé pour la mission de récolte',
    time: 'Il y a 5 min',
    unread: true,
  },
  {
    id: '2',
    type: 'mission',
    title: 'Mission terminée',
    message: 'La mission "Maintenance des Serres" est terminée',
    time: 'Il y a 2h',
    unread: true,
  },
  {
    id: '3',
    type: 'message',
    title: 'Nouveau message',
    message: 'Ferme Bio Durand vous a envoyé un message',
    time: 'Il y a 3h',
    unread: false,
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Nouvelle récompense',
    message: 'Vous avez obtenu le badge "Expert Agricole"',
    time: 'Hier',
    unread: false,
  },
];

export function NotificationsModal({ visible, onClose }: NotificationsModalProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'application':
        return Star;
      case 'mission':
        return Bell;
      case 'message':
        return MessageSquare;
      case 'achievement':
        return Award;
      default:
        return Bell;
    }
  };

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity style={styles.markAllButton}>
            <Check size={20} color="#166534" />
            <Text style={styles.markAllText}>Tout marquer comme lu</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {notifications.map((notification, index) => {
            const Icon = getIcon(notification.type);
            return (
              <Animated.View
                key={notification.id}
                entering={FadeInDown.delay(index * 100)}
              >
                <TouchableOpacity 
                  style={[
                    styles.notificationItem,
                    notification.unread && styles.unreadItem
                  ]}
                >
                  <View style={[
                    styles.iconContainer,
                    { backgroundColor: notification.unread ? '#f0fdf4' : '#f3f4f6' }
                  ]}>
                    <Icon 
                      size={24} 
                      color={notification.unread ? '#166534' : '#6b7280'} 
                    />
                  </View>
                  
                  <View style={styles.notificationContent}>
                    <Text style={[
                      styles.notificationTitle,
                      notification.unread && styles.unreadText
                    ]}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {notification.time}
                    </Text>
                  </View>

                  {notification.unread && <View style={styles.unreadDot} />}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  markAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#166534',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  unreadItem: {
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#374151',
    marginBottom:  4,
  },
  unreadText: {
    color: '#111827',
  },
  notificationMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  notificationTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9ca3af',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#166534',
    marginLeft: 12,
  },
});