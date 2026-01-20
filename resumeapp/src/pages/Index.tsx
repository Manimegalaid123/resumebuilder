import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import TemplateShowcase from '@/components/home/TemplateShowcase';
import CTASection from '@/components/home/CTASection';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <TemplateShowcase />
      <CTASection />
    </Layout>
  );
};

export default Index;
