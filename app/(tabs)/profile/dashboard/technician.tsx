import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useThemeStore } from '@/stores/theme';
import { Wrench, Clock, MapPin, Users, ChevronRight, Star, CheckCircle2 } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

const mockData = {
  stats: {
    activeProjects: 3,
    completedProjects: 48,
    averageRating: 4.8,
    totalHours: 960,
  },
  expertise: [
    { name: 'Maintenance agricole', level: 'Expert', verified: true },
    { name: 'Systèmes d\'irrigation', level: 'Expert', verified: true },
    { name: 'Équipement de récolte', level: 'Avancé', verified: true },
    { name: 'Agriculture de précision', level: 'Intermédiaire', verified: false },
  ],
  projects: [
    {
      id: '1',
      title: 'Maintenance des Serres Automatisées',
      client: 'Ferme Bio Durand',
      location: 'Normandie, France',
      duration: '2 semaines',
      status: 'active',
      progress: 65,
      team: [
        { id: '1', name: 'Marie L.', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop', role: 'Assistant' },
        { id: '2', name: 'Thomas D.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop', role: 'Technicien' },
      ],
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1200&auto=format&fit=crop',
      milestones: [
        { title: 'Inspection initiale', completed: true },
        { title: 'Réparation des systèmes', completed: true },
        { title: 'Tests de performance', completed: false },
        { title: 'Formation du personnel', completed: false },
      ],
    },
    {
      id: '2',
      title: 'Installation Système d\'Irrigation',
      client: 'Vignobles Martin',
      location: 'Loire-Atlantique',
      duration: '1 mois',
      status: 'active',
      progress: 30,
      team: [
        { id: '3', name: 'Julie M.', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop', role: 'Ingénieur' },
      ],
      image: 'https://images.unsplash.com/photo-1463123081488-789f998ac9c4?q=80&w=1200&auto=format&fit=crop',
      milestones: [
        { title: 'Étude du terrain', completed: true },
        { title: 'Installation des conduites', completed: false },
        { title: 'Configuration du système', completed: false },
        { title: 'Tests et calibration', completed: false },
      ],
    },
  ],
};

export default function TechnicianDashboard() {
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

  const ExpertiseCard = () => (
    <View style={[styles.section, { backgroundColor: colors.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Expertise technique
      </Text>
      <View style={styles.expertiseGrid}>
        {mockData.expertise.map((skill, index) => (
          <Animated.View
            key={skill.name}
            entering={FadeInDown.delay(index * 100)}
            style={[
              styles.expertiseItem,
              { backgroundColor: colors.background }
            ]}
          >
            <View style={styles.expertiseHeader}>
              <Text style={[styles.expertiseName, { color: colors.text }]}>
                {skill.name}
              </Text>
              {skill.verified && (
                <CheckCircle2 size={16} color={colors.success} />
              )}
            </View>
            <Text style={[styles.expertiseLevel, { color: colors.primary }]}>
              {skill.level}
            </Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );

  const ProjectCard = ({ project, index }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={[styles.projectCard, { backgroundColor: colors.card }]}
    >
      <Image source={{ uri: project.image }} style={styles.projectImage} />
      
      <View style={styles.projectContent}>
        <View style={styles.projectHeader}>
          <Text style={[styles.projectTitle, { color: colors.text }]}>
            {project.title}
          </Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: colors.primary + '20' }
          ]}>
            <Text style={[styles.statusText, { color: colors.primary }]}>
              {project.status === 'active' ? 'En cours' : 'Terminé'}
            </Text>
          </View>
        </View>

        <Text style={[styles.clientName, { color: colors.muted }]}>
          {project.client}
        </Text>

        <View style={styles.projectDetails}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={colors.muted} />
            <Text style={[styles.detailText, { color: colors.muted }]}>
              {project.location}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={colors.muted} />
            <Text style={[styles.detailText, { color: colors.muted }]}>
              {project.duration}
            </Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { color: colors.text }]}>
              Progression
            </Text>
            <Text style={[styles.progressPercent, { color: colors.primary }]}>
              {project.progress}%
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View 
              style={[
                styles.progressFill,
                { 
                  backgroundColor: colors.primary,
                  width: `${project.progress}%`,
                },
              ]} 
            />
          </View>
        </View>

        <View style={styles.milestonesSection}>
          <Text style={[styles.milestonesTitle, { color: colors.text }]}>
            Étapes clés
          </Text>
          <View style={styles.milestonesList}>
            {project.milestones.map((milestone, idx) => (
              <View key={idx} style={styles.milestoneItem}>
                <CheckCircle2 
                  size={16} 
                  color={milestone.completed ? colors.success : colors.muted} 
                />
                <Text 
                  style={[
                    styles.milestoneText,
                    { 
                      color: milestone.completed ? colors.text : colors.muted,
                      textDecorationLine: milestone.completed ? 'line-through' : 'none',
                    },
                  ]}
                >
                  {milestone.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.teamSection}>
          <Text style={[styles.teamTitle, { color: colors.text }]}>
            Équipe
          </Text>
          <View style={styles.teamList}>
            {project.team.map((member) => (
              <View key={member.id} style={styles.teamMember}>
                <Image 
                  source={{ uri: member.photo }} 
                  style={styles.memberPhoto}
                />
                <View style={styles.memberInfo}>
                  <Text style={[styles.memberName, { color: colors.text }]}>
                    {member.name}
                  </Text>
                  <Text style={[styles.memberRole, { color: colors.muted }]}>
                    {member.role}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.viewButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push(`/project/${project.id}`)}
        >
          <Text style={[styles.viewButtonText, { color: colors.card }]}>
            Voir les détails
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
          Gérez vos projets techniques
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon={Wrench}
          title="Projets actifs"
          value={mockData.stats.activeProjects}
          subtitle="En cours"
        />
        <StatCard
          icon={CheckCircle2}
          title="Projets terminés"
          value={mockData.stats.completedProjects}
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

      <ExpertiseCard />

      <View style={styles.projectsHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Vos projets
        </Text>
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
              {filter === 'active' ? 'En cours' :
               filter === 'pending' ? 'En attente' : 'Terminés'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.projectsList}>
        {mockData.projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
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
  expertiseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  expertiseItem: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
  },
  expertiseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  expertiseName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  expertiseLevel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  projectsHeader: {
    paddingHorizontal: 24,
    marginTop: 24,
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
  projectsList: {
    padding: 16,
  },
  projectCard: {
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: 200,
  },
  projectContent: {
    padding: 16,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    flex: 1,
    marginRight: 12,
  },
  clientName: {
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
  projectDetails: {
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
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  progressPercent: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  milestonesSection: {
    marginBottom: 16,
  },
  milestonesTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 12,
  },
  milestonesList: {
    gap: 8,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  milestoneText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  teamSection: {
    marginBottom: 16,
  },
  teamTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 12,
  },
  teamList: {
    gap: 12,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberPhoto: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 2,
  },
  memberRole: {
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