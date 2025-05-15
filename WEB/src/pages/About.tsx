import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Sprout, Award, ChevronRight } from "lucide-react";
import { fadeIn, staggerContainer, slideIn } from "../utils/animations";
import { Layout } from "../components/Layout";
import { Language, Translations } from "../types";

interface AboutProps {
  language: Language;
  translations: Translations[Language];
}

export function About({ translations }: AboutProps) {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.pexels.com/photos/5717277/pexels-photo-5717277.jpeg",
      bio: "15 years of experience in AgTech",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.pexels.com/photos/8851637/pexels-photo-8851637.jpeg",
      bio: "Former lead engineer at AgriTech Solutions",
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Partnerships",
      image:
        "https://images.pexels.com/photos/5717526/pexels-photo-5717526.jpeg",
      bio: "Expert in agricultural partnerships",
    },
  ];

  const values = [
    {
      icon: Users,
      title: translations.about.communityFirst,
      description: translations.about.communityFirstDescription,
    },
    {
      icon: Target,
      title: translations.about.innovationDriven,
      description: translations.about.innovationDrivenDescription,
    },
    {
      icon: Sprout,
      title: translations.about.sustainabilityFocused,
      description: translations.about.sustainabilityFocusedDescription,
    },
    {
      icon: Award,
      title: translations.about.excellence,
      description: translations.about.excellenceDescription,
    },
  ];

  const milestones = [
    {
      year: "January 2025",
      title: "Idea Was Born",
      description:
        "The concept of AgroNetwork was envisioned to revolutionize agriculture.",
    },
    {
      year: "February 2025 - April 2025",
      title: "Software Development",
      description:
        "The team worked tirelessly to develop the foundation of the platform.",
    },
    {
      year: "June 2025",
      title: "Software Prototype Launch",
      description:
        "Released the first prototype to gather feedback and refine the platform.",
    },
    // Add more milestones as needed
  ];

  return (
    <div className="bg-background-light">
      {/* Hero Section */}
      <motion.div
        className="relative bg-primary-DEFAULT py-24 sm:py-32"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg"
            alt="Agriculture background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} className="text-center">
            <motion.h1
              variants={slideIn}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-montserrat"
            >
              {translations.about.title}
            </motion.h1>
            <motion.p
              variants={slideIn}
              className="mt-6 text-xl text-gray-100 max-w-3xl mx-auto"
            >
              {translations.about.description}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <Layout>
        {/* Mission Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <motion.div
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 font-montserrat">
              {translations.about.mission}
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              {translations.about.missionDescription}
            </p>
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 font-montserrat">
              {translations.about.ourValue}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {translations.about.ourValueDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeIn}
                  className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  <div className="flex justify-center">
                    <div className="bg-primary-light/10 p-4 rounded-full">
                      <Icon className="h-8 w-8 text-primary-DEFAULT" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 text-center">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-gray-600 text-center">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 font-montserrat">
              {translations.about.ourJourney}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {translations.about.ourJourneyDescription}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  variants={fadeIn}
                  className={`relative ${
                    index % 2 === 0
                      ? "lg:ml-auto lg:pl-8"
                      : "lg:mr-auto lg:pr-8"
                  } lg:w-1/2`}
                >
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-primary-DEFAULT w-4 h-4 rounded-full" />
                      <div className="h-full w-0.5 bg-primary-DEFAULT" />
                    </div>
                    <div className="ml-6 bg-white rounded-lg shadow-lg p-6 transform transition-all duration-200 hover:scale-105">
                      <span className="text-sm font-semibold text-primary-DEFAULT">
                        {milestone.year}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold text-gray-900">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 font-montserrat">
              {translations.about.ourTeam}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {translations.about.ourTeamDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeIn}
                className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-200 hover:scale-105"
              >
                <div className="relative h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary-light">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{member.bio}</p>
                  <button className="mt-4 inline-flex items-center text-primary-DEFAULT hover:text-primary-dark">
                    {translations.about.learnMore} <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Layout>
    </div>
  );
}
