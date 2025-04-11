import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { useThemeStore } from '@/stores/theme';
import { Briefcase, Star, Clock, MapPin, ChevronRight, CheckCircle2, Award, Bell } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

const mockData = {
  stats: {
    appliedJobs: 24,
    completedJobs: 48,
    averageRating: 4.8,
    totalHours: 960,
  },
  skills: [
    { name: 'Récolte de fruits', level: 'Expert', verified: true },
    { name: 'Taille des arbres', level: 'Avancé', verified: true },
    { name: 'Conduite de tracteur', level: 'Intermédiaire', verified: true },
    { name: 'Agriculture biologique', level: 'Expert', verified: false },
  ],
  certifications: [
    { 
      name: 'Certificat d\'Agriculture Biologique',
      issuer: 'BioFrance',
      date: '2024',
      verified: true,
      image: 'https://images.unsplash.com/photo-1580974928064-f0aeef70895a?q=80&w=1200&auto=format&fit=crop',
    },
    {
      name: 'Permis de conduire agricole',
      issuer: 'MinAgri',
      date: '2023',
      verified: true,
      image: 'https://images.unsplash.com/photo-1592982537447-7440770faae9?q=80&w=1200&auto=format&fit=crop',
    },
  ],
  applications: [
    {
      id: '1',
      title: 'Récolte de Pommes Bio',
      employer: 'Ferme Bio Durand',
      location: 'Normandie, France',
      duration: '2 semaines',
      status: 'pending',
      matchScore: 95,
      appliedDate: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1444392061186-9fc38f84f726?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: '2',
      title: 'Taille des Vignes',
      employer: 'Vignobles Martin',
      location: 'Loire-Atlantique',
      duration: '1 mois',
      status: 'accepted',
      matchScore: 92,
      appliedDate: '2024-02-10',
      image: 'https://images.unsplash.com/photo-1463123081488-789f998ac9c4?q=80&w=1200&auto=format&fit=crop',
    },
  ],
  completedJobs: [
    {
      id: '3',
      title: 'Récolte de Lavande',
      employer: 'Lavandes de Provence',
      location: 'Provence-Alpes',
      duration: '3 semaines',
      rating: 5,
      completedDate: '2024-01-20',
      earnings: '3600€',
      image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: '4',
      title: 'Entretien Verger',
      employer: 'Pommes du Val',
      location: 'Val de Loire',
      duration: '2 mois',
      rating: 4.8,
      completedDate: '2023-12-15',
      earnings: '5200€',
      image: 'https://images.unsplash.com/photo-1444392061186-9fc38f84f726?q=80&w=1200&auto=format&fit=crop',
    },
  ],
};

export default function WorkerDashboard() {
  const { colors } = useThemeStore();
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('active');

  const StatCard = ({ icon: Icon, title, value, subtitle }) => (
    <Animated.View
      entering={FadeInDown}
      style={[styles.statCard, { backgroundColor: colors.card }]}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
        <Icon size={24} color={colors.primary} />
      </View>
      <View style={styles.statContent}>
        <Text style={[styles.statTitle, { color: colors.muted }]}>{title}</Text>
        <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
        {subtitle && (
          <Text style={[styles.statSubtitle, { color: colors.muted }]}>{subtitle}</Text>
        )}
      </View>
    </Animated.View>
  );

  const SkillsCard = () => (
    <View style={[styles.section, { backgroundColor: colors.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Compétences
      </Text>
      <View style={styles.skillsGrid}>
        {mockData.skills.map((skill, index) => (
          <Animated.View
            key={skill.name}
            entering={FadeInDown.delay(index * 100)}
            style={[
              styles.skillItem,
              { backgroundColor: colors.background }
            ]}
          >
            <View style={styles.skillHeader}>
              <Text style={[styles.skillName, { color: colors.text }]}>
                {skill.name}
              </Text>
              {skill.verified && (
                <CheckCircle2 size={16} color={colors.success} />
              )}
            </View>
            <Text style={[styles.skillLevel, { color: colors.primary }]}>
              {skill.level}
            </Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );

  const CertificationsCard = () => (
    <View style={[styles.section, { backgroundColor: colors.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Certifications
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.certificationsContainer}
      >
        {mockData.certifications.map((cert, index) => (
          <Animated.View
            key={cert.name}
            entering={FadeInDown.delay(index * 100)}
            style={[styles.certCard, { backgroundColor: colors.background }]}
          >
            <Image source={{ uri: cert.image }} style={styles.certImage} />
            <View style={styles.certContent}>
              <View style={styles.certHeader}>
                <Text style={[styles.certName, { color: colors.text }]}>
                  {cert.name}
                </Text>
                {cert.verified && (
                  <CheckCircle2 size={16} color={colors.success} />
                )}
              </View>
              <Text style={[styles.certIssuer, { color: colors.muted }]}>
                {cert.issuer}
              </Text>
              <Text style={[styles.certDate, { color: colors.primary }]}>
                {cert.date}
              </Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );

  const ApplicationCard = ({ application, index }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={[styles.applicationCard, { backgroundColor: colors.card }]}
    >
      <Image source={{ uri: application.image }} style={styles.applicationImage} />
      
      <View style={styles.applicationContent}>
        <View style={styles.applicationHeader}>
          <Text style={[styles.applicationTitle, { color: colors.text }]}>
            {application.title}
          </Text>
          <View style={[
            styles.statusBadge,
            { 
              backgroundColor: application.status === 'accepted' 
                ? colors.success + '20' 
                : colors.warning + '20'
            }
          ]}>
            <Text style={[
              styles.statusText,
              { 
                color: application.status === 'accepted' 
                  ? colors.success 
                  : colors.warning
              }
            ]}>
              {application.status === 'accepted' ? 'Acceptée' : 'En attente'}
            </Text>
          </View>
        </View>

        <Text style={[styles.employerName, { color: colors.muted }]}>
          {application.employer}
        </Text>

        <View style={styles.applicationDetails}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={colors.muted} />
            <Text style={[styles.detailText, { color: colors.muted }]}>
              {application.location}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={colors.muted} />
            <Text style={[styles.detailText, { color: colors.muted }]}>
              {application.duration}
            </Text>
          </View>
        </View>

        <View style={styles.matchScore}>
          <Star size={16} color={colors.warning} />
          <Text style={[styles.matchText, { color: colors.warning }]}>
            {application.matchScore}% de compatibilité
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.viewButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push(`/application/${application.id}`)}
        >
          <Text style={[styles.viewButtonText, { color: colors.card }]}>
            Voir les détails
          </Text>
          <ChevronRight size={20} color={colors.card} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const CompletedJobCard = ({ job, index }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={[styles.completedCard, { backgroundColor: colors.card }]}
    >
      <Image source={{ uri: job.image }} style={styles.completedImage} />
      
      <View style={styles.completedContent}>
        <View style={styles.completedHeader}>
          <Text style={[styles.completedTitle, { color: colors.text }]}>
            {job.title}
          </Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.warning} />
            <Text style={[styles.ratingText, { color: colors.warning }]}>
              {job.rating}
            </Text>
          </View>
        </View>

        <Text style={[styles.employerName, { color: colors.muted }]}>
          {job.employer}
        </Text>

        <View style={styles.completedDetails}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={colors.muted} />
            <Text style={[styles.detailText, { color: colors.muted }]}>
              {job.location}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={colors.muted} />
            <Text style={[styles.detailText, { color: colors.muted }]}>
              {job.duration}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Award size={16} color={colors.success} />
            <Text style={[styles.earningsText, { color: colors.success }]}>
              {job.earnings}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.viewButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push(`/job/${job.id}`)}
        >
          <Text style={[styles.viewButtonText, { color: colors.card }]}>
            Voir le certificat
          </Text>
          <ChevronRight size={20} color={colors.card} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: colors.text }]}>
            Tableau de bord
          </Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Gérez vos candidatures et missions
          </Text>
        </View>

        <View style={styles.availabilityContainer}>
          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: colors.border, true: colors.primary + '40' }}
            thumbColor={isAvailable ? colors.primary : colors.muted}
          />
          <Text style={[
            styles.availabilityText,
            { color: isAvailable ? colors.success : colors.muted }
          ]}>
            {isAvailable ? 'Disponible' : 'Indisponible'}
          </Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon={Briefcase}
          title="Candidatures"
          value={mockData.stats.appliedJobs}
          subtitle="Ce mois"
        />
        <StatCard
          icon={CheckCircle2}
          title="Missions terminées"
          value={mockData.stats.completedJobs}
          subtitle="Total"
        />
        <StatCard
          icon={Star}
          title="Note moyenne"
          value={mockData.stats.averageRating}
          subtitle="Sur 5.0"
        />
        <StatCard
          icon={Clock}
          title="Heures de travail"
          value={mockData.stats.totalHours}
          subtitle="Cette année"
        />
      </View>

      {/* <SkillsCard /> */}
      {/* <CertificationsCard /> */}

      <View style={styles.applicationsHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Vos candidatures
        </Text>
        <TouchableOpacity
          style={[styles.notificationButton, { backgroundColor: colors.primary + '20' }]}
        >
          <Bell size={20} color={colors.primary} />
          <View style={[styles.notificationBadge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.notificationCount, { color: colors.card }]}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filters}
      >
        {['active', 'accepted', 'completed'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              { 
                backgroundColor: selectedFilter === filter ? colors.primary : colors.card,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                { 
                  color: selectedFilter === filter ? colors.card : colors.muted,
                },
              ]}
            >
              {filter === 'active' ? 'En cours' :
               filter === 'accepted' ? 'Acceptées' : 'Terminées'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.applicationsList}>
        {selectedFilter !== 'completed' ? (
          mockData.applications.map((application, index) => (
            <ApplicationCard 
              key={application.id} 
              application={application} 
              index={index} 
            />
          ))
        ) : (
          mockData.completedJobs.map((job, index) => (
            <CompletedJobCard 
              key={job.id} 
              job={job} 
              index={index} 
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
  },
  headerContent: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  availabilityText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statContent: {
    // flex: 1,
  },
  statTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  statSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  section: {
    margin: 12,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillItem: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  skillLevel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  certificationsContainer: {
    paddingVertical: 8,
    gap: 16,
  },
  certCard: {
    width: 280,
    borderRadius: 12,
    overflow: 'hidden',
  },
  certImage: {
    width: '100%',
    height: 160,
  },
  certContent: {
    padding: 16,
  },
  certHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  certName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  certIssuer: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  certDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  applicationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  notificationCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  filtersContainer: {
    marginTop: 16,
  },
  filters: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  applicationsList: {
    padding: 16,
  },
  applicationCard: {
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  applicationImage: {
    width: '100%',
    height: 200,
  },
  applicationContent: {
    padding: 16,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  applicationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    flex: 1,
    marginRight: 12,
  },
  employerName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 12,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  applicationDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  matchScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  matchText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  viewButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  completedCard: {
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  completedImage: {
    width: '100%',
    height: 200,
  },
  completedContent: {
    padding: 16,
  },
  completedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  completedTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  completedDetails: {
    marginBottom: 16,
    gap: 8,
  },
  earningsText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});