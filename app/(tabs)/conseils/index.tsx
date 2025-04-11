import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {
  Search,
  Filter,
  BookOpen,
  Calendar,
  ChevronRight,
} from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

const categories = [
  { id: 'all', name: 'Tous' },
  { id: 'crops', name: 'Cultures' },
  { id: 'livestock', name: 'Élevage' },
  { id: 'equipment', name: 'Équipement' },
  { id: 'soil', name: 'Sol' },
  { id: 'irrigation', name: 'Irrigation' },
];

const resources = [
  {
    id: '1',
    title: 'Guide de Culture du Maïs Bio',
    category: 'crops',
    description:
      'Techniques complètes pour la culture biologique du maïs, de la préparation du sol à la récolte.',
    lastUpdated: '2025-03-15',
    readTime: '15 min',
    image:
      'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=1200&auto=format&fit=crop',
    topics: ['Bio', 'Maïs', 'Culture'],
  },
  {
    id: '2',
    title: "Gestion de l'Irrigation Moderne",
    category: 'irrigation',
    description:
      "Systèmes d'irrigation innovants et techniques d'économie d'eau pour une agriculture durable.",
    lastUpdated: '2025-03-10',
    readTime: '20 min',
    image:
      'https://images.unsplash.com/photo-1463123081488-789f998ac9c4?q=80&w=1200&auto=format&fit=crop',
    topics: ['Irrigation', 'Durable'],
  },
  {
    id: '3',
    title: 'Élevage Bovin Durable',
    category: 'livestock',
    description:
      "Guide complet sur l'élevage bovin respectueux de l'environnement et du bien-être animal.",
    lastUpdated: '2025-03-05',
    readTime: '25 min',
    image:
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1200&auto=format&fit=crop',
    topics: ['Élevage', 'Bovin', 'Durable'],
  },
];

export default function ConseilsScreen() {
  const { colors } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.topics.some((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'all' || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  type Resource = {
    id: string;
    title: string;
    category: string;
    description: string;
    lastUpdated: string;
    readTime: string;
    image: string;
    topics: string[];
  };

  const ResourceCard = ({
    resource,
    index,
  }: {
    resource: Resource;
    index: number;
  }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={[styles.resourceCard, { backgroundColor: colors.card }]}
    >
      <Image source={{ uri: resource.image }} style={styles.resourceImage} />

      <View style={styles.resourceContent}>
        <View style={styles.resourceHeader}>
          <Text style={[styles.resourceTitle, { color: colors.text }]}>
            {resource.title}
          </Text>
          <View
            style={[
              styles.readTime,
              { backgroundColor: colors.primary + '20' },
            ]}
          >
            <BookOpen size={16} color={colors.primary} />
            <Text style={[styles.readTimeText, { color: colors.primary }]}>
              {resource.readTime}
            </Text>
          </View>
        </View>

        <Text
          style={[styles.resourceDescription, { color: colors.muted }]}
          numberOfLines={2}
        >
          {resource.description}
        </Text>

        <View style={styles.resourceMeta}>
          <View style={styles.dateContainer}>
            <Calendar size={16} color={colors.muted} />
            <Text style={[styles.dateText, { color: colors.muted }]}>
              Mis à jour le{' '}
              {new Date(resource.lastUpdated).toLocaleDateString('fr-FR')}
            </Text>
          </View>

          <View style={styles.topics}>
            {resource.topics.map((topic, idx) => (
              <View
                key={idx}
                style={[
                  styles.topicTag,
                  { backgroundColor: colors.primary + '20' },
                ]}
              >
                <Text style={[styles.topicText, { color: colors.primary }]}>
                  {topic}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.readButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push(`/conseils/${resource.id}` as "/conseils/[id]")}
        >
          <Text style={[styles.readButtonText, { color: colors.card }]}>
            Lire l'article
          </Text>
          <ChevronRight size={20} color={colors.card} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Conseils Agricoles
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Ressources et guides pour une agriculture moderne
        </Text>
      </View>
      <ScrollView
        style={styles.resourcesList}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchInputContainer,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Search size={20} color={colors.muted} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Rechercher des ressources..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.muted}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                {
                  backgroundColor:
                    selectedCategory === category.id
                      ? colors.primary
                      : colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      selectedCategory === category.id
                        ? colors.card
                        : colors.muted,
                  },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {filteredResources.map((resource, index) => (
          <ResourceCard key={resource.id} resource={resource} index={index} />
        ))}

        {filteredResources.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: colors.muted }]}>
              Aucune ressource trouvée
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'web' ? 24 : 48,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
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
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    paddingVertical: 12,
    marginLeft: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryButton: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  resourcesList: {
    padding: 16,
  },
  resourceCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  resourceImage: {
    width: '100%',
    height: 200,
  },
  resourceContent: {
    padding: 16,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resourceTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    flex: 1,
    marginRight: 12,
  },
  readTime: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 4,
  },
  readTimeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  resourceDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  resourceMeta: {
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  topics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  topicText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  readButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
});
