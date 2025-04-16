import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useThemeStore } from '@/stores/theme';
import { Users, Briefcase, CheckCircle, TrendingUp, ChevronRight } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { StatCard } from '@/components/StatCard';
import { SectionHeader } from '@/components/SectionHeader';

const mockData = {
  stats: [
    { title: 'Utilisateurs totaux', value: 1250, icon: Users },
    { title: 'Missions actives', value: 85, icon: Briefcase },
    { title: 'Missions terminées', value: 342, icon: CheckCircle },
    { title: 'Taux de succès', value: '94.5%', icon: TrendingUp },
  ],
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
    <FlatList
      data={[{ type: 'stats' }, { type: 'roleBreakdown' }, { type: 'engagementMetrics' }, { type: 'activityChart' }, { type: 'quickActions' }]}
      keyExtractor={(item, index) => `${item.type}-${index}`}
      renderItem={({ item }) => {
        if (item.type === 'stats') {
          return (
            <>
              <SectionHeader title="Statistiques" colors={colors} />
              <View style={styles.statsGrid}>
                {mockData.stats.map((stat, index) => (
                  <StatCard
                    key={index}
                    icon={stat.icon}
                    title={stat.title}
                    value={stat.value}
                    colors={colors}
                  />
                ))}
              </View>
            </>
          );
        } else if (item.type === 'roleBreakdown') {
          return <RoleBreakdown />;
        } else if (item.type === 'engagementMetrics') {
          return <EngagementMetrics />;
        } else if (item.type === 'activityChart') {
          return <ActivityChart />;
        } else if (item.type === 'quickActions') {
          return <QuickActions />;
        }
        return null;
      }}
      contentContainerStyle={{ padding: 12, backgroundColor: colors.background }}
    />
  );
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
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