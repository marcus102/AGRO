import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Switch,
  Share,
  Linking,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import {
  Bell,
  Moon,
  Globe,
  KeyRound,
  Shield,
  Info,
  ChevronRight,
  LogOut,
  Share as ShareIcon,
  User,
  Settings as SettingsIcon,
  HelpCircle,
  Heart,
} from 'lucide-react-native';
import { useAuthStore } from '@/stores/auth';
import { useThemeStore } from '@/stores/theme';
import { useLanguageStore } from '@/stores/language';
import { LANGUAGES } from '@/types/language';
import { LanguageModal } from '@/components/modals/LanguageModal';
import { PasswordModal } from '@/components/modals/PasswordModal';
import { EmailUpdateModal } from '@/components/modals/EmailSettingsModal';
import NotificationSettingsModal from '@/components/modals/NotificationSettingsModal';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

type MenuItemProps = {
  icon: React.ComponentType<{ size: number; color: string }>;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showToggle?: boolean;
  isToggled?: boolean;
  showChevron?: boolean;
  iconColor?: string;
  backgroundColor?: string;
};

const MenuItem = ({
  icon: Icon,
  title,
  subtitle,
  onPress,
  showToggle,
  isToggled,
  showChevron = true,
  iconColor,
  backgroundColor,
}: MenuItemProps) => {
  const { colors } = useThemeStore();

  return (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.menuItemIcon,
        { backgroundColor: backgroundColor || colors.primary + '15' }
      ]}>
        <Icon size={22} color={iconColor || colors.primary} />
      </View>
      <View style={styles.menuItemContent}>
        <Text style={[styles.menuItemTitle, { color: colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.menuItemSubtitle, { color: colors.muted }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {showToggle ? (
        <Switch
          value={isToggled}
          onValueChange={onPress}
          trackColor={{ false: colors.border, true: colors.primary + '40' }}
          thumbColor={isToggled ? colors.primary : colors.muted}
          ios_backgroundColor={colors.border}
        />
      ) : showChevron ? (
        <ChevronRight size={20} color={colors.muted} />
      ) : null}
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const { theme, colors, toggleTheme } = useThemeStore();
  const { language } = useLanguageStore();
  const { signOut } = useAuthStore();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const selectedLanguage = LANGUAGES.find((lang) => lang.code === language);

  const handleSignOut = () => {
    signOut();
    router.replace('/(auth)/login');
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message:
          'Découvrez AGRO, la plateforme qui connecte les talents agricoles : https://agro-app.com',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing the app:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Gradient */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={[colors.primary, colors.primary + 'CC']}
          style={styles.gradientHeader}
        >
          <Animated.View entering={FadeInUp.delay(200)} style={styles.headerContent}>
            <View style={styles.headerIcon}>
              <SettingsIcon size={28} color="#fff" />
            </View>
            <Text style={styles.headerTitle}>Paramètres</Text>
            <Text style={styles.headerSubtitle}>
              Personnalisez votre expérience
            </Text>
          </Animated.View>
        </LinearGradient>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* General Section */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Général
          </Text>
          <View style={styles.sectionContent}>
            <MenuItem
              icon={Globe}
              title="Langue"
              subtitle={
                selectedLanguage?.code === 'en'
                  ? ` ${selectedLanguage?.nativeName}  (Disponible bientôt)`
                  : ` ${selectedLanguage?.nativeName}`
              }
              onPress={() => setShowLanguageModal(true)}
              iconColor="#3b82f6"
              backgroundColor={"#3b82f6" + '15'}
            />
            <MenuItem
              icon={Moon}
              title="Mode sombre"
              subtitle="Basculer entre les thèmes clair et sombre"
              showToggle
              isToggled={theme === 'dark'}
              onPress={handleThemeToggle}
              iconColor="#6366f1"
              backgroundColor={"#6366f1" + '15'}
            />
          </View>
        </Animated.View>

        {/* Notifications Section */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Notifications
          </Text>
          <View style={styles.sectionContent}>
            <MenuItem
              icon={Bell}
              title="Paramètres des notifications"
              subtitle="Gérer vos préférences de notification"
              onPress={() => setShowNotificationsModal(true)}
              iconColor="#f59e0b"
              backgroundColor={"#f59e0b" + '15'}
            />
          </View>
        </Animated.View>

        {/* Security Section */}
        <Animated.View entering={FadeInDown.delay(500)} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Sécurité
          </Text>
          <View style={styles.sectionContent}>
            <MenuItem
              icon={KeyRound}
              title="Modifier le mot de passe"
              subtitle="Changer votre mot de passe de connexion"
              onPress={() => setShowPasswordModal(true)}
              iconColor="#ef4444"
              backgroundColor={"#ef4444" + '15'}
            />
            <MenuItem
              icon={Shield}
              title="Modifier l'email"
              subtitle="Mettre à jour votre adresse email"
              onPress={() => setShowEmailModal(true)}
              iconColor="#10b981"
              backgroundColor={"#10b981" + '15'}
            />
          </View>
        </Animated.View>

        {/* Share Section */}
        <Animated.View entering={FadeInDown.delay(600)} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Partager l'application
          </Text>
          <View style={styles.sectionContent}>
            <MenuItem
              icon={ShareIcon}
              title="Partager AGRO"
              subtitle="Inviter vos amis à rejoindre la plateforme"
              onPress={handleShareApp}
              iconColor="#8b5cf6"
              backgroundColor={"#8b5cf6" + '15'}
            />
          </View>
        </Animated.View>

        {/* About Section */}
        <Animated.View entering={FadeInDown.delay(700)} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            À propos
          </Text>
          <View style={styles.sectionContent}>
            <MenuItem
              icon={Info}
              title="Mentions légales"
              subtitle="Conditions d'utilisation et mentions"
              onPress={() =>
                Linking.openURL('http://localhost:5173/terms-of-service')
              }
              iconColor="#6b7280"
              backgroundColor={"#6b7280" + '15'}
            />
            <MenuItem
              icon={Shield}
              title="Politique de confidentialité"
              subtitle="Comment nous protégeons vos données"
              onPress={() =>
                Linking.openURL('http://localhost:5173/privacy-policy')
              }
              iconColor="#6b7280"
              backgroundColor={"#6b7280" + '15'}
            />
            <MenuItem
              icon={HelpCircle}
              title="Support"
              subtitle="Obtenir de l'aide et du support"
              onPress={() => Linking.openURL('mailto:support@agro.com')}
              iconColor="#06b6d4"
              backgroundColor={"#06b6d4" + '15'}
            />
            <MenuItem
              icon={Heart}
              title="Version"
              subtitle="1.0.0"
              showChevron={false}
              onPress={() => {}}
              iconColor="#ec4899"
              backgroundColor={"#ec4899" + '15'}
            />
          </View>
        </Animated.View>

        {/* Logout Button */}
        <Animated.View entering={FadeInDown.delay(800)} style={styles.logoutSection}>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.error + '15' }]}
            onPress={handleSignOut}
            activeOpacity={0.7}
          >
            <View style={[styles.logoutIcon, { backgroundColor: colors.error + '20' }]}>
              <LogOut size={24} color={colors.error} />
            </View>
            <Text style={[styles.logoutText, { color: colors.error }]}>
              Déconnexion
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Modals */}
      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />

      <PasswordModal
        visible={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />

      <NotificationSettingsModal
        visible={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
      />

      <EmailUpdateModal
        visible={showEmailModal}
        onClose={() => setShowEmailModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 20,
  },
  gradientHeader: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 16,
  },
  sectionContent: {
    gap: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  logoutSection: {
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
  },
  logoutIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  logoutText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
});