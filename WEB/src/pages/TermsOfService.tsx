import React from 'react';
import { FileText, Shield, Users, AlertTriangle, Scale, MessageSquare } from 'lucide-react';

export function TermsOfService() {
  const sections = [
    {
      icon: FileText,
      title: 'Agreement to Terms',
      content: `By accessing or using AgroNetwork's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.`,
    },
    {
      icon: Shield,
      title: 'Account Security',
      content: `You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.`,
    },
    {
      icon: Users,
      title: 'User Conduct',
      content: `You agree not to:
        • Post or transmit harmful or malicious content
        • Impersonate any person or entity
        • Interfere with or disrupt our services
        • Collect user information without consent
        • Use our services for illegal purposes`,
    },
    {
      icon: AlertTriangle,
      title: 'Termination',
      content: `We reserve the right to terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including breach of these Terms of Service.`,
    },
    {
      icon: Scale,
      title: 'Intellectual Property',
      content: `The service and its original content, features, and functionality are owned by AgroNetwork and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.`,
    },
    {
      icon: MessageSquare,
      title: 'Communication',
      content: `By creating an account, you agree to receive communications from us, including newsletters, updates, and promotional materials. You can opt out of marketing communications at any time.`,
    },
  ];

  return (
    <div className="bg-background-light min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 font-montserrat mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Last updated: March 1, 2024
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600 mb-8">
            Please read these Terms of Service carefully before using AgroNetwork's platform and services.
          </p>

          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="border-b border-gray-200 pb-8 last:border-0">
                  <div className="flex items-center mb-4">
                    <Icon className="h-6 w-6 text-primary-DEFAULT mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                  </div>
                  <p className="text-gray-600 whitespace-pre-line">{section.content}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <ul className="mt-4 text-gray-600">
              <li>Email: legal@agronetwork.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Legal Avenue, Compliance City, 12345</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}