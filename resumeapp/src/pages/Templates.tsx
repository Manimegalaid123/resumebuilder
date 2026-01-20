import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, LayoutGrid, LayoutList, ChevronDown } from 'lucide-react';
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
  { id: 'classic-1', name: 'Professional Classic', category: 'Classic', rating: 4.9, downloads: '12K+', atsOptimized: true, experience: 'all' },
  { id: 'classic-2', name: 'Executive Standard', category: 'Classic', rating: 4.8, downloads: '9K+', atsOptimized: true, experience: 'professional' },
  { id: 'classic-3', name: 'Traditional', category: 'Classic', rating: 4.7, downloads: '7K+', atsOptimized: true, experience: 'all' },
  { id: 'classic-4', name: 'Corporate', category: 'Classic', rating: 4.6, downloads: '5K+', atsOptimized: true, experience: 'professional' },
  { id: 'modern-1', name: 'Modern Minimal', category: 'Modern', rating: 4.9, downloads: '15K+', atsOptimized: true, experience: 'all' },
  { id: 'modern-2', name: 'Clean Sidebar', category: 'Modern', rating: 4.8, downloads: '11K+', atsOptimized: true, experience: 'fresher' },
  { id: 'modern-3', name: 'Tech Pro', category: 'Modern', rating: 4.7, downloads: '8K+', atsOptimized: true, experience: 'professional' },
  { id: 'modern-4', name: 'Elegant Blue', category: 'Modern', rating: 4.6, downloads: '6K+', atsOptimized: true, experience: 'all' },
  { id: 'modern-5', name: 'Split Layout', category: 'Modern', rating: 4.5, downloads: '4K+', atsOptimized: false, experience: 'fresher' },
  { id: 'creative-1', name: 'Creative Edge', category: 'Creative', rating: 4.8, downloads: '7K+', atsOptimized: false, experience: 'all' },
  { id: 'creative-2', name: 'Portfolio Style', category: 'Creative', rating: 4.7, downloads: '5K+', atsOptimized: false, experience: 'all' },
  { id: 'creative-3', name: 'Gradient Pro', category: 'Creative', rating: 4.6, downloads: '4K+', atsOptimized: false, experience: 'fresher' },
  { id: 'creative-4', name: 'Artistic', category: 'Creative', rating: 4.5, downloads: '3K+', atsOptimized: false, experience: 'all' },
  { id: 'creative-5', name: 'Bold & Colorful', category: 'Creative', rating: 4.4, downloads: '2K+', atsOptimized: false, experience: 'fresher' },
  { id: 'simple-1', name: 'Simple Clean', category: 'Simple', rating: 4.9, downloads: '20K+', atsOptimized: true, experience: 'fresher' },
  { id: 'simple-2', name: 'Minimalist', category: 'Simple', rating: 4.8, downloads: '15K+', atsOptimized: true, experience: 'all' },
  { id: 'simple-3', name: 'Basic Pro', category: 'Simple', rating: 4.7, downloads: '10K+', atsOptimized: true, experience: 'all' },
  { id: 'academic-1', name: 'Academic CV', category: 'Academic', rating: 4.8, downloads: '6K+', atsOptimized: true, experience: 'professional' },
  { id: 'academic-2', name: 'Research', category: 'Academic', rating: 4.7, downloads: '4K+', atsOptimized: true, experience: 'professional' },
  { id: 'entry-1', name: 'Fresh Graduate', category: 'Entry Level', rating: 4.9, downloads: '18K+', atsOptimized: true, experience: 'fresher' },
  { id: 'entry-2', name: 'First Job', category: 'Entry Level', rating: 4.8, downloads: '14K+', atsOptimized: true, experience: 'fresher' },
  { id: 'entry-3', name: 'Student CV', category: 'Entry Level', rating: 4.7, downloads: '12K+', atsOptimized: true, experience: 'fresher' },
  { id: 'tech-1', name: 'Developer Pro', category: 'Tech', rating: 4.9, downloads: '10K+', atsOptimized: true, experience: 'all' },
  { id: 'tech-2', name: 'Software Engineer', category: 'Tech', rating: 4.8, downloads: '8K+', atsOptimized: true, experience: 'professional' },
  { id: 'creative-6', name: 'Designer Portfolio', category: 'Creative', rating: 4.7, downloads: '6K+', atsOptimized: false, experience: 'all' },
];

const categories = ['All', 'Classic', 'Modern', 'Creative', 'Simple', 'Academic', 'Entry Level', 'Tech'];

const Templates: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [experience, setExperience] = useState<'all' | 'fresher' | 'professional'>('all');
  const [atsOnly, setAtsOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase()) ||
                         template.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || template.category === category;
    const matchesExperience = experience === 'all' || template.experience === experience || template.experience === 'all';
    const matchesAts = !atsOnly || template.atsOptimized;
    
    return matchesSearch && matchesCategory && matchesExperience && matchesAts;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
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
                    Sort: {sortBy === 'popular' ? 'Popular' : sortBy === 'rating' ? 'Top Rated' : 'Newest'}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy('popular')}>Most Popular</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('rating')}>Top Rated</DropdownMenuItem>
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
                    {/* Mock Resume Content */}
                    <div className="bg-card rounded-lg h-full p-3 shadow-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-muted" />
                        <div className="space-y-1">
                          <div className="h-2 w-16 bg-muted rounded" />
                          <div className="h-1 w-10 bg-muted rounded" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-1.5 w-full bg-muted rounded" />
                        <div className="h-1.5 w-4/5 bg-muted rounded" />
                        <div className="h-1.5 w-3/4 bg-muted rounded" />
                      </div>
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
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 bg-muted rounded-full">{template.category}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
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
