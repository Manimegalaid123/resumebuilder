import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const templates = [
  {
    id: 'classic-1',
    name: 'Professional Classic',
    category: 'Classic',
    rating: 4.9,
    downloads: '12K+',
    color: 'from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900',
  },
  {
    id: 'modern-1',
    name: 'Modern Minimal',
    category: 'Modern',
    rating: 4.8,
    downloads: '8K+',
    color: 'from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30',
  },
  {
    id: 'creative-1',
    name: 'Creative Edge',
    category: 'Creative',
    rating: 4.7,
    downloads: '5K+',
    color: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30',
  },
];

const TemplateShowcase: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional <span className="gradient-text">Templates</span>
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Choose from our collection of ATS-optimized templates designed by HR professionals 
              to maximize your interview chances.
            </p>
          </div>
          <Link to="/templates">
            <Button variant="outline" className="gap-2">
              View All Templates
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/templates/${template.id}`}>
                <div className="group cursor-pointer">
                  {/* Template Preview */}
                  <div className={`aspect-[3/4] rounded-2xl bg-gradient-to-br ${template.color} p-6 mb-4 border border-border overflow-hidden relative hover-lift`}>
                    {/* Mock Resume Content */}
                    <div className="bg-card rounded-lg h-full p-4 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-muted" />
                        <div className="space-y-1">
                          <div className="h-3 w-24 bg-muted rounded" />
                          <div className="h-2 w-16 bg-muted rounded" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-2 w-full bg-muted rounded" />
                        <div className="h-2 w-4/5 bg-muted rounded" />
                        <div className="h-2 w-3/4 bg-muted rounded" />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="h-3 w-20 bg-primary/20 rounded" />
                        <div className="h-2 w-full bg-muted rounded" />
                        <div className="h-2 w-5/6 bg-muted rounded" />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="h-3 w-16 bg-primary/20 rounded" />
                        <div className="flex gap-2">
                          <div className="h-4 w-12 bg-muted rounded" />
                          <div className="h-4 w-14 bg-muted rounded" />
                          <div className="h-4 w-10 bg-muted rounded" />
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button className="gradient-bg">Use Template</Button>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{template.name}</h3>
                      <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        {template.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {template.rating}
                      </div>
                      <span>{template.downloads} downloads</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
