import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {
  MapPin,
  Calendar,
  Euro,
  Users,
  Clock,
  Award,
  Shield,
  FileText,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';
import { useThemeStore } from '@/stores/theme';

const mission = {
  id: '1',
  title: 'Récolte de Pommes Bio',
  description:
    "Nous recherchons une équipe dynamique pour la récolte de pommes biologiques dans notre verger de 5 hectares. L'expérience inclut la cueillette manuelle, le tri des fruits et la préparation pour le transport.",
  location: 'Normandie, France',
  coordinates: {
    latitude: 49.1829,
    longitude: -0.3707,
  },
  duration: '2 semaines',
  dates: {
    start: '2025-09-01',
    end: '2025-09-15',
  },
  payment: {
    amount: 2500,
    type: 'fixed',
    details: 'Paiement à la fin de la mission',
  },
  workers: {
    required: 8,
    applied: 3,
  },
  requirements: [
    'Expérience en récolte de fruits',
    'Bonne condition physique',
    'Disponible pour toute la durée',
  ],
  equipment: [
    'Chaussures de sécurité',
    'Vêtements adaptés',
    'Gants de protection',
  ],
  benefits: [
    'Hébergement fourni',
    'Repas du midi inclus',
    'Transport local organisé',
  ],
  owner: {
    name: 'Ferme Bio Durand',
    rating: 4.8,
    missions: 24,
  },
  image:
    'https://images.unsplash.com/photo-1444392061186-9fc38f84f726?q=80&w=1200&auto=format&fit=crop',
  status: 'published',
};

function MissionDetailScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useThemeStore();

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      {children}
    </View>
  );

  const ListItem: React.FC<{ icon: React.ComponentType<{ size: number; color: string }>; text: string }> = ({ icon: Icon, text }) => (
    <View style={[styles.listItem, { backgroundColor: colors.card }]}>
      <Icon size={20} color={colors.primary} />
      <Text style={[styles.listItemText, { color: colors.text }]}>{text}</Text>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        style={[styles.backButton, { backgroundColor: colors.card }]}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={colors.primary} />
      </Pressable>

      <Image source={{ uri: mission.image }} style={styles.coverImage} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {mission.title}
          </Text>
          <View
            style={[
              styles.paymentContainer,
              { backgroundColor: colors.primary + '20' },
            ]}
          >
            <Euro size={24} color={colors.primary} />
            <Text style={[styles.paymentText, { color: colors.primary }]}>
              {mission.payment.amount}€
            </Text>
          </View>
        </View>

        <View style={styles.quickInfo}>
          <View style={styles.infoItem}>
            <MapPin size={20} color={colors.muted} />
            <Text style={[styles.infoText, { color: colors.muted }]}>
              {mission.location}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Calendar size={20} color={colors.muted} />
            <Text style={[styles.infoText, { color: colors.muted }]}>
              {mission.duration}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Users size={20} color={colors.muted} />
            <Text style={[styles.infoText, { color: colors.muted }]}>
              {mission.workers.required} personnes
            </Text>
          </View>
        </View>

        <Section title="Description">
          <Text style={[styles.description, { color: colors.text }]}>
            {mission.description}
          </Text>
        </Section>

        <Section title="Dates importantes">
          <View
            style={[
              styles.dateCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.dateItem}>
              <Text style={[styles.dateLabel, { color: colors.muted }]}>
                Début
              </Text>
              <Text style={[styles.dateValue, { color: colors.text }]}>
                1 Sept 2025
              </Text>
            </View>
            <View
              style={[styles.dateDivider, { backgroundColor: colors.border }]}
            />
            <View style={styles.dateItem}>
              <Text style={[styles.dateLabel, { color: colors.muted }]}>
                Fin
              </Text>
              <Text style={[styles.dateValue, { color: colors.text }]}>
                15 Sept 2025
              </Text>
            </View>
          </View>
        </Section>

        <Section title="Prérequis">
          {mission.requirements.map((req, index) => (
            <Animated.View key={index} entering={FadeInDown.delay(index * 100)}>
              <ListItem icon={Shield as React.ComponentType<{ size: number; color: string }>} text={req} />
            </Animated.View>
          ))}
        </Section>

        <Section title="Équipement nécessaire">
          {mission.equipment.map((eq, index) => (
            <Animated.View key={index} entering={FadeInDown.delay(index * 100)}>
              <ListItem icon={({ size, color }) => <FileText size={size} color={color} />} text={eq} />
            </Animated.View>
          ))}
        </Section>

        <Section title="Avantages">
          {mission.benefits.map((benefit, index) => (
            <Animated.View key={index} entering={FadeInDown.delay(index * 100)}>
              <ListItem icon={({ size, color }) => <Award size={size} color={color} />} text={benefit} />
            </Animated.View>
          ))}
        </Section>

        <TouchableOpacity
          style={[
            styles.employerCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.employerInfo}>
            <View
              style={[
                styles.employerAvatar,
                { backgroundColor: colors.primary + '20' },
              ]}
            >
              <Text
                style={[styles.employerInitials, { color: colors.primary }]}
              >
                {mission.owner.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </Text>
            </View>
            <View>
              <Text style={[styles.employerName, { color: colors.text }]}>
                {mission.owner.name}
              </Text>
              <Text style={[styles.employerStats, { color: colors.muted }]}>
                ⭐️ {mission.owner.rating} · {mission.owner.missions} missions
              </Text>
            </View>
          </View>
          <ChevronRight size={24} color={colors.muted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.applyButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.applyButtonText, { color: colors.card }]}>
            Postuler à la mission
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  coverImage: {
    width: '100%',
    height: 250,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
    flex: 1,
    marginRight: 16,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    padding: 12,
    borderRadius: 12,
  },
  paymentText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#166534',
    marginLeft: 4,
  },
  quickInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  dateCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      default: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
    }),
  },
  dateItem: {
    flex: 1,
    alignItems: 'center',
  },
  dateDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  dateLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  dateValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    ...Platform.select({
      web: {
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      default: {
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
      },
    }),
  },
  listItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  employerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      default: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
    }),
  },
  employerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  employerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  employerInitials: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#166534',
  },
  employerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  employerStats: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6b7280',
  },
  applyButton: {
    backgroundColor: '#166534',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
});

export default MissionDetailScreen;
