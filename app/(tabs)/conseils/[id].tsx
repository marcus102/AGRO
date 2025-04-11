import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';

const article = {
  id: '1',
  title: 'Guide de Culture du Maïs Bio',
  category: 'crops',
  description: 'Techniques complètes pour la culture biologique du maïs, de la préparation du sol à la récolte.',
  content: `
# Introduction

La culture biologique du maïs nécessite une approche holistique qui prend en compte la santé du sol, la biodiversité et les cycles naturels. Ce guide vous accompagnera à travers toutes les étapes essentielles pour réussir votre culture.

## Préparation du Sol

La préparation du sol est une étape cruciale pour la réussite de votre culture de maïs biologique. Un sol bien préparé fournira les nutriments nécessaires et assurera une bonne croissance des plants.

### Points clés :
- Analyse du sol
- Travail du sol
- Amendements organiques
- Rotation des cultures

## Semis et Plantation

Le choix du moment du semis et la technique de plantation sont déterminants pour obtenir une bonne levée et un développement optimal des plants.

### Recommandations :
- Température du sol > 12°C
- Profondeur de semis : 3-5 cm
- Espacement entre les rangs : 75 cm
- Densité : 70 000 plants/ha

## Fertilisation Biologique

La fertilisation en agriculture biologique repose sur l'utilisation d'engrais organiques et de pratiques culturales favorisant la vie du sol.

### Solutions naturelles :
- Compost
- Fumier composté
- Engrais verts
- Purins végétaux

## Gestion des Adventices

La maîtrise des adventices est un défi majeur en agriculture biologique. Une approche préventive combinée à des interventions mécaniques est nécessaire.

### Techniques :
- Faux-semis
- Binage mécanique
- Paillage organique
- Cultures associées

## Irrigation

Une bonne gestion de l'irrigation est essentielle pour optimiser les rendements tout en préservant la ressource en eau.

### Points d'attention :
- Besoins en eau selon le stade
- Systèmes d'irrigation efficients
- Monitoring de l'humidité
- Stress hydrique

## Récolte et Conservation

La récolte doit être effectuée au bon moment pour garantir la qualité des grains et leur bonne conservation.

### Critères de récolte :
- Humidité des grains
- Maturité physiologique
- Conditions météo
- Techniques de stockage
  `,
  lastUpdated: '2025-03-15',
  readTime: '15 min',
  image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=1200&auto=format&fit=crop',
  topics: ['Bio', 'Maïs', 'Culture'],
  author: {
    name: 'Dr. Marie Laurent',
    title: 'Agronome - Spécialiste en Agriculture Biologique',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop',
  },
};

export default function ArticleScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useThemeStore();

  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <Text key={index} style={[styles.h1, { color: colors.text }]}>
            {line.replace('# ', '')}
          </Text>
        );
      } else if (line.startsWith('## ')) {
        return (
          <Text key={index} style={[styles.h2, { color: colors.text }]}>
            {line.replace('## ', '')}
          </Text>
        );
      } else if (line.startsWith('### ')) {
        return (
          <Text key={index} style={[styles.h3, { color: colors.text }]}>
            {line.replace('### ', '')}
          </Text>
        );
      } else if (line.startsWith('- ')) {
        return (
          <Text key={index} style={[styles.listItem, { color: colors.text }]}>
            {line}
          </Text>
        );
      } else {
        return (
          <Text key={index} style={[styles.paragraph, { color: colors.text }]}>
            {line}
          </Text>
        );
      }
    });
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity 
        style={[styles.backButton, { backgroundColor: colors.card }]}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={colors.primary} />
      </TouchableOpacity>

      <Image source={{ uri: article.image }} style={styles.coverImage} />

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(200)}>
          <Text style={[styles.title, { color: colors.text }]}>
            {article.title}
          </Text>

          <View style={styles.metadata}>
            <View style={styles.metaItem}>
              <Calendar size={16} color={colors.muted} />
              <Text style={[styles.metaText, { color: colors.muted }]}>
                {new Date(article.lastUpdated).toLocaleDateString('fr-FR')}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Clock size={16} color={colors.muted} />
              <Text style={[styles.metaText, { color: colors.muted }]}>
                {article.readTime}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <BookOpen size={16} color={colors.muted} />
              <Text style={[styles.metaText, { color: colors.muted }]}>
                {article.category}
              </Text>
            </View>
          </View>

          <View style={styles.topics}>
            {article.topics.map((topic, index) => (
              <View 
                key={index}
                style={[styles.topicTag, { backgroundColor: colors.primary + '20' }]}
              >
                <Text style={[styles.topicText, { color: colors.primary }]}>
                  {topic}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.authorCard, { backgroundColor: colors.card }]}>
            <Image source={{ uri: article.author.image }} style={styles.authorImage} />
            <View style={styles.authorInfo}>
              <Text style={[styles.authorName, { color: colors.text }]}>
                {article.author.name}
              </Text>
              <Text style={[styles.authorTitle, { color: colors.muted }]}>
                {article.author.title}
              </Text>
            </View>
          </View>

          <Text style={[styles.description, { color: colors.text }]}>
            {article.description}
          </Text>
        </Animated.View>

        <View style={styles.articleContent}>
          {renderMarkdown(article.content)}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 24 : 48,
    left: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },
  coverImage: {
    width: '100%',
    height: 300,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 16,
  },
  metadata: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  topics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
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
  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },
  authorImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  authorTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 32,
  },
  articleContent: {
    gap: 16,
  },
  h1: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginTop: 32,
    marginBottom: 16,
  },
  h2: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginTop: 24,
    marginBottom: 12,
  },
  h3: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  listItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 16,
  },
});