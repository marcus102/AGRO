import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { MessageSquare, Bell, Zap, Tag } from 'lucide-react-native';

const NotificationItem = ({ icon: Icon, title, isEnabled, onToggle }) => (
  <View style={styles.notificationItem}>
    <View style={styles.notificationInfo}>
      <Icon size={24} color="#166534" />
      <Text style={styles.notificationTitle}>{title}</Text>
    </View>
    <Switch
      value={isEnabled}
      onValueChange={onToggle}
      trackColor={{ false: '#e5e7eb', true: '#dcfce7' }}
      thumbColor={isEnabled ? '#166534' : '#9ca3af'}
    />
  </View>
);

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState({
    messages: true,
    news: true,
    updates: true,
    promotions: false,
    sounds: true,
    vibrations: true,
    push: true,
  });

  const [frequency, setFrequency] = useState('realtime');

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Types de notifications</Text>
        <NotificationItem
          icon={MessageSquare}
          title="Messages"
          isEnabled={notifications.messages}
          onToggle={() => toggleNotification('messages')}
        />
        <NotificationItem
          icon={Bell}
          title="Actualités"
          isEnabled={notifications.news}
          onToggle={() => toggleNotification('news')}
        />
        <NotificationItem
          icon={Zap}
          title="Mises à jour"
          isEnabled={notifications.updates}
          onToggle={() => toggleNotification('updates')}
        />
        <NotificationItem
          icon={Tag}
          title="Promotions"
          isEnabled={notifications.promotions}
          onToggle={() => toggleNotification('promotions')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Options de notification</Text>
        <NotificationItem
          icon={Bell}
          title="Sons"
          isEnabled={notifications.sounds}
          onToggle={() => toggleNotification('sounds')}
        />
        <NotificationItem
          icon={Bell}
          title="Vibrations"
          isEnabled={notifications.vibrations}
          onToggle={() => toggleNotification('vibrations')}
        />
        <NotificationItem
          icon={Bell}
          title="Notifications push"
          isEnabled={notifications.push}
          onToggle={() => toggleNotification('push')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fréquence des notifications</Text>
        <View style={styles.frequencyOptions}>
          {[
            { id: 'realtime', label: 'Temps réel' },
            { id: 'daily', label: 'Une fois par jour' },
            { id: 'weekly', label: 'Une fois par semaine' },
          ].map((option) => (
            <View
              key={option.id}
              style={[
                styles.frequencyOption,
                frequency === option.id && styles.frequencyOptionSelected,
              ]}
            >
              <Text
                style={[
                  styles.frequencyOptionText,
                  frequency === option.id && styles.frequencyOptionTextSelected,
                ]}
                onPress={() => setFrequency(option.id)}
              >
                {option.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  section: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  frequencyOptions: {
    flexDirection: 'row',
    padding: 16,
  },
  frequencyOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  frequencyOptionSelected: {
    backgroundColor: '#dcfce7',
  },
  frequencyOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6b7280',
  },
  frequencyOptionTextSelected: {
    color: '#166534',
  },
});