import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Download, Eye, CheckCircle, Share2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TemplateDetail: React.FC = () => {
  const { id } = useParams();

  // Mock template data (in production, fetch from API)
  const template = {
    id,
    name: 'Professional Classic',
    category: 'Classic',
    rating: 4.9,
    reviews: 234,
    downloads: '12,450',
    atsOptimized: true,
    description: 'A timeless, ATS-friendly resume template perfect for traditional industries and corporate roles. Clean formatting ensures your content is easily parsed by applicant tracking systems.',
    features: [
      'ATS-optimized formatting',
      'Clean, professional layout',
      'Easy to customize',
      'Print-ready PDF export',
      'Compatible with all industries',
    ],
    bestFor: ['Software Engineer', 'Manager', 'Accountant', 'Consultant', 'Analyst'],
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <Link to="/templates" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Templates
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 sticky top-24">
              <div className="bg-white rounded-lg shadow-2xl aspect-[8.5/11] p-6">
                {/* Mock Resume Preview */}
                <div className="h-full text-gray-800">
                  <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
                    <h2 className="text-xl font-bold">JOHN DOE</h2>
                    <p className="text-xs text-gray-600 mt-1">
                      john.doe@email.com | (555) 123-4567 | San Francisco, CA
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xs font-bold border-b border-gray-300 pb-1 mb-2">SUMMARY</h3>
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-200 rounded w-full" />
                        <div className="h-2 bg-gray-200 rounded w-5/6" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-bold border-b border-gray-300 pb-1 mb-2">EXPERIENCE</h3>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between">
                            <div className="h-2 bg-gray-300 rounded w-24" />
                            <div className="h-2 bg-gray-200 rounded w-16" />
                          </div>
                          <div className="h-2 bg-gray-200 rounded w-20 mt-1" />
                          <div className="h-1.5 bg-gray-100 rounded w-full mt-2" />
                          <div className="h-1.5 bg-gray-100 rounded w-4/5 mt-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-bold border-b border-gray-300 pb-1 mb-2">EDUCATION</h3>
                      <div className="h-2 bg-gray-200 rounded w-32" />
                      <div className="h-2 bg-gray-200 rounded w-24 mt-1" />
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-bold border-b border-gray-300 pb-1 mb-2">SKILLS</h3>
                      <div className="flex flex-wrap gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="h-4 w-12 bg-gray-100 rounded" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">{template.category}</Badge>
                {template.atsOptimized && (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    ATS Optimized
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{template.name}</h1>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{template.rating}</span>
                  <span className="text-muted-foreground">({template.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Download className="w-4 h-4" />
                  <span>{template.downloads} downloads</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground">{template.description}</p>

            {/* Actions */}
            <div className="flex gap-4">
              <Link to="/builder" className="flex-1">
                <Button className="w-full gradient-bg text-lg py-6">
                  Use This Template
                </Button>
              </Link>
              <Button variant="outline" size="icon" className="h-14 w-14">
                <Eye className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-14 w-14">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-3">
                {template.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best For */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Best For</h3>
              <div className="flex flex-wrap gap-2">
                {template.bestFor.map((role) => (
                  <Badge key={role} variant="secondary">{role}</Badge>
                ))}
              </div>
            </div>

            {/* Similar Templates */}
            <div>
              <h3 className="font-semibold mb-4">Similar Templates</h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Link key={i} to={`/templates/similar-${i}`}>
                    <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg p-2 hover-lift cursor-pointer">
                      <div className="bg-white dark:bg-card h-full rounded shadow-sm" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default TemplateDetail;
