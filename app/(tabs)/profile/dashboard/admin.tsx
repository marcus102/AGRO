import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useThemeStore } from '@/stores/theme';
import { Users, Briefcase, CheckCircle, TrendingUp, ChevronRight } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import Animated, { FadeInDown } from 'react-native-reanimated';

const mockData = {
  users: {
    total: 1250,
    breakdown: {
      entrepreneurs: 320,
      technicians: 480,
      workers: 450,
    },
  },
  jobs: {
    active: 85,
    completed: 342,
    successRate: 94.5,
  },
  engagement: {
    dailyActiveUsers: 780,
    averageSessionTime: '24m',
    retentionRate: '76%',
  },
  chartData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [20, 45, 28, 80, 99, 120],
    }],
  },
};

export default function AdminDashboardScreen() {
  const { colors } = useThemeStore();

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

  const RoleBreakdown = () => (
    <View style={[styles.section, { backgroundColor: colors.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Répartition des utilisateurs
      </Text>
      {Object.entries(mockData.users.breakdown).map(([role, count], index) => (
        <View key={role} style={styles.roleItem}>
          <View style={styles.roleInfo}>
            <Text style={[styles.roleName, { color: colors.text }]}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Text>
            <Text style={[styles.roleCount, { color: colors.primary }]}>
              {count} utilisateurs
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar,
                { 
                  backgroundColor: colors.primary,
                  width: `${(count / mockData.users.total) * 100}%`,
                },
              ]} 
            />
          </View>
        </View>
      ))}
    </View>
  );

  const EngagementMetrics = () => (
    <View style={[styles.section, { backgroundColor: colors.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Métriques d'engagement
      </Text>
      <View style={styles.engagementGrid}>
        <View style={styles.engagementItem}>
          <Text style={[styles.engagementValue, { color: colors.text }]}>
            {mockData.engagement.dailyActiveUsers}
          </Text>
          <Text style={[styles.engagementLabel, { color: colors.muted }]}>
            Utilisateurs actifs / jour
          </Text>
        </View>
        <View style={styles.engagementItem}>
          <Text style={[styles.engagementValue, { color: colors.text }]}>
            {mockData.engagement.averageSessionTime}
          </Text>
          <Text style={[styles.engagementLabel, { color: colors.muted }]}>
            Temps moyen / session
          </Text>
        </View>
        <View style={styles.engagementItem}>
          <Text style={[styles.engagementValue, { color: colors.text }]}>
            {mockData.engagement.retentionRate}
          </Text>
          <Text style={[styles.engagementLabel, { color: colors.muted }]}>
            Taux de rétention
          </Text>
        </View>
      </View>
    </View>
  );

  const ActivityChart = () => (
    <View style={[styles.section, { backgroundColor: colors.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Activité des utilisateurs
      </Text>
      <LineChart
        data={mockData.chartData}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: colors.card,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,
          decimalPlaces: 0,
          color: (opacity = 1) => colors.primary,
          labelColor: () => colors.text,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );

  const QuickActions = () => (
    <View style={[styles.section, { backgroundColor: colors.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Actions rapides
      </Text>
      {[
        'Gérer les utilisateurs',
        'Configurer les permissions',
        'Voir les rapports',
        'Paramètres système',
      ].map((action, index) => (
        <TouchableOpacity 
          key={index}
          style={[styles.actionItem, { borderBottomColor: colors.border }]}
        >
          <Text style={[styles.actionText, { color: colors.text }]}>{action}</Text>
          <ChevronRight size={20} color={colors.muted} />
        </TouchableOpacity>
      ))}
    </View>
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
          Vue d'ensemble du système
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon={Users}
          title="Utilisateurs totaux"
          value={mockData.users.total}
          subtitle="+12% ce mois"
        />
        <StatCard
          icon={Briefcase}
          title="Missions actives"
          value={mockData.jobs.active}
          subtitle="85 en cours"
        />
        <StatCard
          icon={CheckCircle}
          title="Missions terminées"
          value={mockData.jobs.completed}
          subtitle="94.5% de succès"
        />
        <StatCard
          icon={TrendingUp}
          title="Taux d'engagement"
          value={mockData.engagement.retentionRate}
          subtitle="76% de rétention"
        />
      </View>

      <RoleBreakdown />
      <EngagementMetrics />
      <ActivityChart />
      <QuickActions />
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
  roleItem: {
    marginBottom: 16,
  },
  roleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  roleName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  roleCount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  engagementGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  engagementItem: {
    alignItems: 'center',
  },
  engagementValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  engagementLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  actionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
});