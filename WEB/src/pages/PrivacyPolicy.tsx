import React from 'react';
import { Shield, Lock, Eye, UserCheck, Server, Bell } from 'lucide-react';

export function PrivacyPolicy() {
  const sections = [
    {
      icon: Shield,
      title: 'Information Collection',
      content: `We collect information that you provide directly to us, including:
        • Personal information (name, email, phone number)
        • Professional information (occupation, company)
        • Account credentials
        • Communication preferences`,
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: `We implement appropriate technical and organizational security measures to protect your personal data against accidental or unlawful destruction, loss, alteration, and unauthorized disclosure or access.`,
    },
    {
      icon: Eye,
      title: 'Information Usage',
      content: `Your information is used to:
        • Provide and maintain our services
        • Process your transactions
        • Send you technical notices and support messages
        • Communicate with you about products, services, and events
        • Respond to your comments and questions`,
    },
    {
      icon: UserCheck,
      title: 'User Rights',
      content: `You have the right to:
        • Access your personal data
        • Correct inaccurate data
        • Request data deletion
        • Object to data processing
        • Request data portability`,
    },
    {
      icon: Server,
      title: 'Data Retention',
      content: `We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You can request deletion of your data at any time.`,
    },
    {
      icon: Bell,
      title: 'Updates to Policy',
      content: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.`,
    },
  ];

  return (
    <div className="bg-background-light min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 font-montserrat mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: March 1, 2024
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600 mb-8">
            At AgroNetwork, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information.
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="mt-4 text-gray-600">
              <li>Email: privacy@agronetwork.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Privacy Street, Security City, 12345</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}