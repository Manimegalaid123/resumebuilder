import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Sparkles, FileText, Wand2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const MakeOptions: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              How will you make your resume?
            </h1>
            <p className="text-muted-foreground text-lg">
              Simple to use and ready in minutes resume templates — give it a try for free now!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Option 1: Upload existing resume */}
            <Link to="/builder?mode=upload">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="bg-card border-2 border-border hover:border-primary/50 rounded-2xl p-8 cursor-pointer transition-all hover:shadow-lg group"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-amber-500" />
                    <span className="text-xs text-amber-600 font-medium">QUICK EDIT</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-3">I already have a resume</h2>
                <p className="text-muted-foreground">
                  Upload your existing resume to make quick edits and improvements with AI assistance.
                </p>
              </motion.div>
            </Link>

            {/* Option 2: Start from scratch */}
            <Link to="/choose-template">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="bg-card border-2 border-border hover:border-primary/50 rounded-2xl p-8 cursor-pointer transition-all hover:shadow-lg group"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Wand2 className="w-8 h-8 text-pink-600" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-pink-500" />
                    <span className="text-xs text-pink-600 font-medium">AI GUIDED</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-3">Start from scratch</h2>
                <p className="text-muted-foreground">
                  Our AI will guide you through creating a resume step by step with smart suggestions.
                </p>
              </motion.div>
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            <Link to="/templates" className="text-primary hover:underline">
              Choose later
            </Link>
            {' '}— Browse all templates first
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default MakeOptions;
