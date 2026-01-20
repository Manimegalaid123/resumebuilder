import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, LayoutGrid, LayoutList, ChevronDown, TrendingUp, Award } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

const templates = [
  { id: 'classic-1', name: 'Professional Classic', category: 'Classic', rating: 4.9, downloads: '12K+', atsOptimized: true, experience: 'all', baseAtsScore: 82, keywords: ['professional', 'experience', 'skills', 'education'], features: ['Clean layout', 'ATS-friendly', 'All sections'] },
  { id: 'classic-2', name: 'Executive Standard', category: 'Classic', rating: 4.8, downloads: '9K+', atsOptimized: true, experience: 'professional', baseAtsScore: 85, keywords: ['executive', 'leadership', 'management', 'results'], features: ['Executive focused', 'Achievement highlights', 'Professional'] },
  { id: 'classic-3', name: 'Traditional', category: 'Classic', rating: 4.7, downloads: '7K+', atsOptimized: true, experience: 'all', baseAtsScore: 78, keywords: ['traditional', 'formal', 'experience', 'education'], features: ['Classic style', 'Formal layout', 'Comprehensive'] },
  { id: 'classic-4', name: 'Corporate', category: 'Classic', rating: 4.6, downloads: '5K+', atsOptimized: true, experience: 'professional', baseAtsScore: 80, keywords: ['corporate', 'professional', 'management', 'strategy'], features: ['Corporate design', 'Professional', 'Clean'] },
  { id: 'modern-1', name: 'Modern Minimal', category: 'Modern', rating: 4.9, downloads: '15K+', atsOptimized: true, experience: 'all', baseAtsScore: 88, keywords: ['modern', 'minimal', 'clean', 'design'], features: ['Minimal design', 'ATS-friendly', 'Modern'] },
  { id: 'modern-2', name: 'Clean Sidebar', category: 'Modern', rating: 4.8, downloads: '11K+', atsOptimized: true, experience: 'fresher', baseAtsScore: 84, keywords: ['clean', 'sidebar', 'skills', 'projects'], features: ['Sidebar layout', 'Skills highlight', 'Fresh'] },
  { id: 'modern-3', name: 'Tech Pro', category: 'Modern', rating: 4.7, downloads: '8K+', atsOptimized: true, experience: 'professional', baseAtsScore: 86, keywords: ['tech', 'developer', 'skills', 'projects'], features: ['Tech-focused', 'Code highlight', 'Professional'] },
  { id: 'modern-4', name: 'Elegant Blue', category: 'Modern', rating: 4.6, downloads: '6K+', atsOptimized: true, experience: 'all', baseAtsScore: 81, keywords: ['elegant', 'modern', 'professional', 'design'], features: ['Elegant design', 'Blue theme', 'Professional'] },
  { id: 'modern-5', name: 'Split Layout', category: 'Modern', rating: 4.5, downloads: '4K+', atsOptimized: false, experience: 'fresher', baseAtsScore: 72, keywords: ['split', 'creative', 'modern', 'layout'], features: ['Split layout', 'Creative', 'Modern'] },
  { id: 'creative-1', name: 'Creative Edge', category: 'Creative', rating: 4.8, downloads: '7K+', atsOptimized: false, experience: 'all', baseAtsScore: 65, keywords: ['creative', 'design', 'visual', 'portfolio'], features: ['Creative design', 'Visual elements', 'Portfolio'] },
  { id: 'creative-2', name: 'Portfolio Style', category: 'Creative', rating: 4.7, downloads: '5K+', atsOptimized: false, experience: 'all', baseAtsScore: 68, keywords: ['portfolio', 'design', 'visual', 'creative'], features: ['Portfolio focus', 'Visual showcase', 'Creative'] },
  { id: 'creative-3', name: 'Gradient Pro', category: 'Creative', rating: 4.6, downloads: '4K+', atsOptimized: false, experience: 'fresher', baseAtsScore: 70, keywords: ['gradient', 'modern', 'design', 'colorful'], features: ['Gradient design', 'Modern', 'Colorful'] },
  { id: 'creative-4', name: 'Artistic', category: 'Creative', rating: 4.5, downloads: '3K+', atsOptimized: false, experience: 'all', baseAtsScore: 62, keywords: ['artistic', 'creative', 'design', 'visual'], features: ['Artistic style', 'Creative', 'Visual'] },
  { id: 'creative-5', name: 'Bold & Colorful', category: 'Creative', rating: 4.4, downloads: '2K+', atsOptimized: false, experience: 'fresher', baseAtsScore: 58, keywords: ['bold', 'colorful', 'creative', 'vibrant'], features: ['Bold colors', 'Vibrant', 'Creative'] },
  { id: 'simple-1', name: 'Simple Clean', category: 'Simple', rating: 4.9, downloads: '20K+', atsOptimized: true, experience: 'fresher', baseAtsScore: 90, keywords: ['simple', 'clean', 'minimal', 'clear'], features: ['Very clean', 'Simple', 'Minimal'] },
  { id: 'simple-2', name: 'Minimalist', category: 'Simple', rating: 4.8, downloads: '15K+', atsOptimized: true, experience: 'all', baseAtsScore: 87, keywords: ['minimalist', 'simple', 'clean', 'minimal'], features: ['Minimalist design', 'Clean', 'Simple'] },
  { id: 'simple-3', name: 'Basic Pro', category: 'Simple', rating: 4.7, downloads: '10K+', atsOptimized: true, experience: 'all', baseAtsScore: 83, keywords: ['basic', 'professional', 'simple', 'clean'], features: ['Basic design', 'Professional', 'Clean'] },
  { id: 'academic-1', name: 'Academic CV', category: 'Academic', rating: 4.8, downloads: '6K+', atsOptimized: true, experience: 'professional', baseAtsScore: 84, keywords: ['academic', 'research', 'publications', 'education'], features: ['Academic focus', 'Research highlight', 'Professional'] },
  { id: 'academic-2', name: 'Research', category: 'Academic', rating: 4.7, downloads: '4K+', atsOptimized: true, experience: 'professional', baseAtsScore: 82, keywords: ['research', 'academic', 'publications', 'papers'], features: ['Research-focused', 'Publications', 'Academic'] },
  { id: 'entry-1', name: 'Fresh Graduate', category: 'Entry Level', rating: 4.9, downloads: '18K+', atsOptimized: true, experience: 'fresher', baseAtsScore: 86, keywords: ['graduate', 'education', 'projects', 'skills'], features: ['Graduate focused', 'Education highlight', 'Projects'] },
  { id: 'entry-2', name: 'First Job', category: 'Entry Level', rating: 4.8, downloads: '14K+', atsOptimized: true, experience: 'fresher', baseAtsScore: 85, keywords: ['entry', 'fresher', 'skills', 'education'], features: ['Entry-level', 'Fresher', 'Skills focus'] },
  { id: 'entry-3', name: 'Student CV', category: 'Entry Level', rating: 4.7, downloads: '12K+', atsOptimized: true, experience: 'fresher', baseAtsScore: 83, keywords: ['student', 'education', 'projects', 'skills'], features: ['Student focused', 'Education', 'Projects'] },
  { id: 'tech-1', name: 'Developer Pro', category: 'Tech', rating: 4.9, downloads: '10K+', atsOptimized: true, experience: 'all', baseAtsScore: 89, keywords: ['developer', 'programming', 'tech', 'skills'], features: ['Developer focus', 'Tech skills', 'Professional'] },
  { id: 'tech-2', name: 'Software Engineer', category: 'Tech', rating: 4.8, downloads: '8K+', atsOptimized: true, experience: 'professional', baseAtsScore: 87, keywords: ['software', 'engineer', 'programming', 'development'], features: ['Engineering focus', 'Tech skills', 'Professional'] },
  { id: 'creative-6', name: 'Designer Portfolio', category: 'Creative', rating: 4.7, downloads: '6K+', atsOptimized: false, experience: 'all', baseAtsScore: 66, keywords: ['design', 'portfolio', 'visual', 'creative'], features: ['Designer focus', 'Portfolio', 'Visual'] },
];

const categories = ['All', 'Classic', 'Modern', 'Creative', 'Simple', 'Academic', 'Entry Level', 'Tech'];

// Dynamic ATS Scoring Function
const calculateDynamicAtsScore = (template: typeof templates[0]): number => {
  let score = template.baseAtsScore;
  
  // Bonus for popularity (affects ATS readability - popular = well tested)
  const downloads = parseInt(template.downloads);
  if (downloads >= 15000) score += 3;
  else if (downloads >= 10000) score += 2;
  else if (downloads >= 5000) score += 1;
  
  // Bonus for high rating (quality = better ATS compatibility)
  if (template.rating >= 4.8) score += 2;
  else if (template.rating >= 4.6) score += 1;
  
  // Template category bonus
  if (template.atsOptimized) score += 2;
  
  // Keyword count bonus
  score += Math.min(template.keywords.length, 2);
  
  // Cap at 100
  return Math.min(score, 100);
};

const Templates: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [experience, setExperience] = useState<'all' | 'fresher' | 'professional'>('all');
  const [atsOnly, setAtsOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'ats'>('popular');

  // Calculate dynamic ATS scores for all templates
  const templatesWithScores = useMemo(() => {
    return templates.map(template => ({
      ...template,
      dynamicAtsScore: calculateDynamicAtsScore(template),
    }));
  }, []);

  const filteredTemplates = templatesWithScores.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase()) ||
                         template.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || template.category === category;
    const matchesExperience = experience === 'all' || template.experience === experience || template.experience === 'all';
    const matchesAts = !atsOnly || template.atsOptimized;
    
    return matchesSearch && matchesCategory && matchesExperience && matchesAts;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'ats') return b.dynamicAtsScore - a.dynamicAtsScore;
    if (sortBy === 'popular') return parseInt(b.downloads) - parseInt(a.downloads);
    return 0;
  });

  const getGradient = (category: string) => {
    switch (category) {
      case 'Classic': return 'from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900';
      case 'Modern': return 'from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30';
      case 'Creative': return 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30';
      case 'Simple': return 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900';
      case 'Academic': return 'from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30';
      case 'Entry Level': return 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30';
      case 'Tech': return 'from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30';
      default: return 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Resume <span className="gradient-text">Templates</span>
          </h1>
          <p className="text-muted-foreground">
            Choose from our collection of 25+ professional, ATS-optimized resume templates 
            designed to help you land your dream job.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 5).map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategory(cat)}
                  className={cn(category === cat && 'gradient-bg')}
                >
                  {cat}
                </Button>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    More <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.slice(5).map((cat) => (
                    <DropdownMenuItem key={cat} onClick={() => setCategory(cat)}>
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filters:</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Experience: {experience === 'all' ? 'All' : experience === 'fresher' ? 'Fresher' : 'Professional'}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setExperience('all')}>All Levels</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setExperience('fresher')}>Fresher / Entry</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setExperience('professional')}>Professional</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant={atsOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAtsOnly(!atsOnly)}
              className={cn(atsOnly && 'gradient-bg')}
            >
              ATS Optimized
            </Button>

            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Sort: {sortBy === 'popular' ? 'Popular' : sortBy === 'rating' ? 'Top Rated' : sortBy === 'ats' ? 'Best ATS Score' : 'Newest'}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy('popular')}>Most Popular</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('rating')}>Top Rated</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('ats')}>Best ATS Score</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('newest')}>Newest</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex border border-border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={cn('rounded-none', viewMode === 'grid' && 'bg-muted')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={cn('rounded-none', viewMode === 'list' && 'bg-muted')}
                >
                  <LayoutList className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {sortedTemplates.length} templates
        </p>

        {/* Templates Grid */}
        <div className={cn(
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        )}>
          {sortedTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/templates/${template.id}`}>
                <div className={cn(
                  'group cursor-pointer',
                  viewMode === 'list' && 'flex gap-6 items-center bg-card border border-border rounded-2xl p-4'
                )}>
                  {/* Template Preview */}
                  <div className={cn(
                    'rounded-2xl p-4 border border-border overflow-hidden relative hover-lift',
                    `bg-gradient-to-br ${getGradient(template.category)}`,
                    viewMode === 'grid' ? 'aspect-[3/4] mb-4' : 'w-32 h-40 flex-shrink-0'
                  )}>
                    {/* Resume Content - Different layouts per category */}
                    <div className="bg-white dark:bg-slate-950 rounded-lg h-full shadow-lg overflow-hidden">
                      {/* Template Type 1: Classic - Header on top */}
                      {(template.category === 'Classic' || template.category === 'Simple') && (
                        <div className="h-full flex flex-col p-3">
                          <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mx-auto mb-1" />
                            <div className="h-2 w-16 bg-gray-300 dark:bg-gray-600 rounded mx-auto" />
                            <div className="h-1 w-20 bg-gray-200 dark:bg-gray-700 rounded mx-auto mt-1" />
                          </div>
                          <div className="space-y-2 flex-1">
                            <div className="h-1.5 w-12 bg-blue-200 dark:bg-blue-800 rounded" />
                            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-1 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-1.5 w-14 bg-blue-200 dark:bg-blue-800 rounded mt-2" />
                            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-1 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
                          </div>
                        </div>
                      )}

                      {/* Template Type 2: Modern - Sidebar */}
                      {template.category === 'Modern' && (
                        <div className="h-full flex">
                          <div className="w-1/3 bg-gradient-to-b from-blue-500 to-indigo-600 p-2">
                            <div className="w-6 h-6 rounded-full bg-white/30 mx-auto mb-2" />
                            <div className="h-1 w-8 bg-white/50 rounded mx-auto" />
                            <div className="space-y-1 mt-3">
                              <div className="h-0.5 w-full bg-white/30 rounded" />
                              <div className="h-0.5 w-4/5 bg-white/30 rounded" />
                            </div>
                          </div>
                          <div className="flex-1 p-2">
                            <div className="h-1.5 w-12 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                            <div className="space-y-1">
                              <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                              <div className="h-1 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
                              <div className="h-1 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
                            </div>
                            <div className="h-1.5 w-10 bg-gray-300 dark:bg-gray-600 rounded mt-2 mb-1" />
                            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                          </div>
                        </div>
                      )}

                      {/* Template Type 3: Creative - Colorful */}
                      {template.category === 'Creative' && (
                        <div className="h-full p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500" />
                            <div>
                              <div className="h-2 w-14 bg-purple-300 dark:bg-purple-700 rounded" />
                              <div className="h-1 w-10 bg-pink-200 dark:bg-pink-800 rounded mt-0.5" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded p-1.5">
                              <div className="h-1 w-6 bg-purple-300 dark:bg-purple-700 rounded mb-1" />
                              <div className="h-0.5 w-full bg-purple-200 dark:bg-purple-800 rounded" />
                            </div>
                            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded p-1.5">
                              <div className="h-1 w-6 bg-blue-300 dark:bg-blue-700 rounded mb-1" />
                              <div className="h-0.5 w-full bg-blue-200 dark:bg-blue-800 rounded" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Template Type 4: Academic */}
                      {template.category === 'Academic' && (
                        <div className="h-full p-3">
                          <div className="border-b-2 border-amber-400 dark:border-amber-600 pb-2 mb-2">
                            <div className="h-2.5 w-20 bg-gray-400 dark:bg-gray-500 rounded" />
                            <div className="h-1 w-24 bg-gray-300 dark:bg-gray-600 rounded mt-1" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-1.5 w-16 bg-amber-300 dark:bg-amber-700 rounded" />
                            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-1 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-1.5 w-14 bg-amber-300 dark:bg-amber-700 rounded mt-2" />
                            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                          </div>
                        </div>
                      )}

                      {/* Template Type 5: Entry Level */}
                      {template.category === 'Entry Level' && (
                        <div className="h-full p-3">
                          <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
                            <div>
                              <div className="h-1.5 w-12 bg-green-400 dark:bg-green-600 rounded" />
                              <div className="h-1 w-16 bg-green-300 dark:bg-green-700 rounded mt-0.5" />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-1.5 w-10 bg-emerald-300 dark:bg-emerald-700 rounded" />
                            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-1 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
                          </div>
                        </div>
                      )}

                      {/* Template Type 6: Tech */}
                      {template.category === 'Tech' && (
                        <div className="h-full p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                              <div className="w-3 h-3 border border-white/50 rounded-sm" />
                            </div>
                            <div>
                              <div className="h-2 w-14 bg-cyan-300 dark:bg-cyan-700 rounded" />
                              <div className="h-1 w-18 bg-gray-300 dark:bg-gray-600 rounded mt-0.5" />
                            </div>
                          </div>
                          <div className="flex gap-1 mb-2">
                            <div className="px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-900/50 rounded text-[6px]">
                              <div className="w-4 h-1 bg-cyan-400 rounded" />
                            </div>
                            <div className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/50 rounded text-[6px]">
                              <div className="w-5 h-1 bg-blue-400 rounded" />
                            </div>
                            <div className="px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 rounded text-[6px]">
                              <div className="w-4 h-1 bg-indigo-400 rounded" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-1 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ATS Badge */}
                    {template.atsOptimized && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                        ATS
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="sm" className="gradient-bg">Use Template</Button>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className={cn(viewMode === 'list' && 'flex-1')}>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">{template.name}</h3>
                      {viewMode === 'list' && (
                        <Button size="sm" className="gradient-bg">Use Template</Button>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="px-2 py-0.5 bg-muted rounded-full">{template.category}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {template.rating}
                      </div>
                      <span>{template.downloads} downloads</span>
                    </div>

                    {/* Dynamic ATS Score Display */}
                    <div className="space-y-2 mt-3 pt-3 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-semibold">ATS Score</span>
                        </div>
                        <span className={cn(
                          'text-xs font-bold px-2 py-1 rounded-full',
                          template.dynamicAtsScore >= 85 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                          template.dynamicAtsScore >= 75 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                          'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                        )}>
                          {template.dynamicAtsScore}/100
                        </span>
                      </div>
                      
                      {/* ATS Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${template.dynamicAtsScore}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={cn(
                            'h-full rounded-full transition-all duration-500',
                            template.dynamicAtsScore >= 85 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                            template.dynamicAtsScore >= 75 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                            'bg-gradient-to-r from-amber-400 to-amber-600'
                          )}
                        />
                      </div>

                      {/* ATS Insights */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        <span>
                          {template.dynamicAtsScore >= 85 ? '✨ Excellent for ATS' :
                           template.dynamicAtsScore >= 75 ? '✓ Good for ATS' :
                           '⚠ Limited ATS compatibility'}
                        </span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="text-[10px] bg-muted px-2 py-0.5 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {sortedTemplates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No templates found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearch('');
              setCategory('All');
              setExperience('all');
              setAtsOnly(false);
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Templates;
