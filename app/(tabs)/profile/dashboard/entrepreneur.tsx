import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useThemeStore } from '@/stores/theme';
import { Users, Star, Clock, MapPin, ChevronRight, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

const mockData = {
  stats: {
    activeJobs: 12,
    totalApplications: 156,
    averageMatchRate: 85,
    totalHires: 48,
  },
  jobs: [
    {
      id: '1',
      title: 'Récolte de Pommes Bio',
      location: 'Normandie, France',
      duration: '2 semaines',
      status: 'active',
      applications: 24,
      topCandidates: [
        { id: '1', name: 'Marie L.', match: 95, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop' },
        { id: '2', name: 'Thomas D.', match: 92, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop' },
        { id: '3', name: 'Julie M.', match: 88, photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop' },
      ],
      image: 'https://images.unsplash.com/photo-1444392061186-9fc38f84f726?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: '2',
      title: 'Maintenance des Serres',
      location: 'Loire-Atlantique',
      duration: '5 jours',
      status: 'active',
      applications: 18,
      topCandidates: [
        { id: '4', name: 'Pierre R.', match: 94, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1200&auto=format&fit=crop' },
        { id: '5', name: 'Sophie B.', match: 91, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop' },
      ],
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1200&auto=format&fit=crop',
    },
  ],
};

export default function EntrepreneurDashboard() {
  const { colors } = useThemeStore();
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

  const JobCard = ({ job, index }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={[styles.jobCard, { backgroundColor: colors.card }]}
    >
      <Image source={{ uri: job.image }} style={styles.jobImage} />
      
      <View style={styles.jobContent}>
        <View style={styles.jobHeader}>
          <Text style={[styles.jobTitle, { color: colors.text }]}>{job.title}</Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: colors.primary + '20' }
          ]}>
            <Text style={[styles.statusText, { color: colors.primary }]}>
              {job.status === 'active' ? 'Active' : 'Terminée'}
            </Text>
          </View>
        </View>

        <View style={styles.jobDetails}>
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
            <Users size={16} color={colors.muted} />
            <Text style={[styles.detailText, { color: colors.muted }]}>
              {job.applications} candidatures
            </Text>
          </View>
        </View>

        <View style={styles.candidatesSection}>
          <Text style={[styles.candidatesTitle, { color: colors.text }]}>
            Meilleurs candidats
          </Text>
          <View style={styles.candidatesList}>
            {job.topCandidates.map((candidate, idx) => (
              <View key={candidate.id} style={styles.candidateItem}>
                <Image 
                  source={{ uri: candidate.photo }} 
                  style={styles.candidatePhoto}
                />
                <View style={styles.candidateInfo}>
                  <Text style={[styles.candidateName, { color: colors.text }]}>
                    {candidate.name}
                  </Text>
                  <View style={styles.matchContainer}>
                    <Star size={12} color={colors.warning} />
                    <Text style={[styles.matchText, { color: colors.warning }]}>
                      {candidate.match}% match
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.viewButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push(`/mission/${job.id}`)}
        >
          <Text style={[styles.viewButtonText, { color: colors.card }]}>
            Gérer les candidatures
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
        <Text style={[styles.title, { color: colors.text }]}>
          Tableau de bord
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Gérez vos offres d'emploi et suivez vos recrutements
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon={Users}
          title="Missions actives"
          value={mockData.stats.activeJobs}
          subtitle="12 en cours"
        />
        <StatCard
          icon={Star}
          title="Candidatures"
          value={mockData.stats.totalApplications}
          subtitle="24 aujourd'hui"
        />
        <StatCard
          icon={Users}
          title="Taux de match"
          value={`${mockData.stats.averageMatchRate}%`}
          subtitle="Moyenne"
        />
        <StatCard
          icon={Users}
          title="Recrutements"
          value={mockData.stats.totalHires}
          subtitle="Ce mois"
        />
      </View>

      <View style={styles.jobsHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Vos missions
        </Text>
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/new/create')}
        >
          <Plus size={20} color={colors.card} />
          <Text style={[styles.createButtonText, { color: colors.card }]}>
            Nouvelle mission
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filters}
      >
        {['active', 'pending', 'completed'].map((filter) => (
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
              {filter === 'active' ? 'Actives' :
               filter === 'pending' ? 'En attente' : 'Terminées'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.jobsList}>
        {mockData.jobs.map((job, index) => (
          <JobCard key={job.id} job={job} index={index} />
        ))}
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
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
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
    flex: 1,
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
  jobsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  createButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
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
  jobsList: {
    padding: 16,
  },
  jobCard: {
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  jobImage: {
    width: '100%',
    height: 200,
  },
  jobContent: {
    padding: 16,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    flex: 1,
    marginRight: 12,
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
  jobDetails: {
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
  candidatesSection: {
    marginBottom: 16,
  },
  candidatesTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 12,
  },
  candidatesList: {
    gap: 12,
  },
  candidateItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  candidatePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  candidateInfo: {
    flex: 1,
  },
  candidateName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 4,
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  matchText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
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
});