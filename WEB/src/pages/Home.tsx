import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Target, Shield, Sprout, ArrowRight } from 'lucide-react';
import { fadeIn, staggerContainer, slideIn, cardHover } from '../utils/animations';
import { Layout } from '../components/Layout';
import { Language, Translations } from "../types";

interface HomeProps {
  language: Language;
  translations: Translations[Language];
}

export function Home({ translations }: HomeProps) {
  const features = [
    {
      icon: Users,
      title: translations.home.conectExperts,
      description: translations.home.conectExpertsDescription,
    },
    {
      icon: Target,
      title: translations.home.findOpportunities,
      description: translations.home.findOpportunitiesDescription,
    },
    {
      icon: Shield,
      title: translations.home.securePlatform,
      description: translations.home.securePlatformDescription,
    },
  ];

  const solutions = [
    {
      title: translations.home.forFarmers,
      description: translations.home.forFarmersDescription,
      image: 'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg',
      benefits: translations.home.farmerBenefits,
    },
    {
      title: translations.home.forTechnicians,
      description: translations.home.forTechniciansDescription,
      image: 'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg',
      benefits: translations.home.forTechniciansBenefits,
    },
    {
      title: translations.home.forEntrepreneurs,
      description: translations.home.forEntrepreneursDescription,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      benefits: translations.home.forEntrepreneursBenefits,
    },
  ];

  return (
    <div className="bg-background-light dark:dark:bg-gray-900/80">
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop"
            alt="Agricultural landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-r bg-black opacity-30 from-primary-DEFAULT/90 to-primary-dark/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            className="text-center lg:text-left lg:max-w-2xl"
          >
            <motion.h1 
              variants={slideIn}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-montserrat"
            >
              {translations.home.title}
            </motion.h1>
            <motion.p 
              variants={slideIn}
              className="mt-6 text-xl text-gray-100 max-w-3xl"
            >
              {translations.home.subtitle}
            </motion.p>
            <motion.div 
              variants={slideIn}
              className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-primary-DEFAULT bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                {translations.home.getStarted}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-full text-white hover:text-gray-700 hover:bg-white hover:text-primary-DEFAULT transition-colors duration-200"
              >
                {translations.home.learnMore}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <Layout>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 font-montserrat">
              {translations.home.whyUs}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {translations.home.whyUsDescription}
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={cardHover}
                  className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-200"
                >
                  <div className="flex justify-center">
                    <div className="bg-primary-light/10 p-4 rounded-full">
                      <Icon className="h-8 w-8 text-primary-DEFAULT" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 text-center">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-gray-600 text-center">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Solutions Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 font-montserrat">
              {translations.home.solutionsForEveryNeeds}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {translations.home.solutionsForEveryNeedsDescription}
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={cardHover}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                    src={solution.image}
                    alt={solution.title}
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {solution.title}
                  </h3>
                  <p className="mt-4 text-gray-600">
                    {solution.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <Sprout className="h-5 w-5 text-primary-DEFAULT mr-3" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/register?type=${solution.title.toLowerCase()}`}
                    className="mt-8 inline-flex items-center text-primary-DEFAULT hover:text-primary-dark transition-colors duration-200"
                  >
                    {translations.home.getStarted}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-primary-DEFAULT rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-montserrat">
                <span className="block">{translations.home.readyToGetStarted}</span>
                <span className="block text-primary-light">{translations.home.joinOurNetwork}</span>
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                {translations.home.connect}
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-primary-DEFAULT bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  {translations.home.createAccountButton}
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-full text-gray-700 hover:bg-white hover:text-primary-DEFAULT transition-colors duration-200"
                >
                  {translations.home.contactUsButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Layout>
    </div>
  );
}