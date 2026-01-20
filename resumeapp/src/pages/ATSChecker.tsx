import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Sparkles,
  Target,
  TrendingUp,
  Award,
  RefreshCw
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface AnalysisResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  formatIssues: string[];
}

const ATSChecker: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFile = e.dataTransfer.files[0];
      if (uploadedFile.type === 'application/pdf' || 
          uploadedFile.type === 'application/msword' ||
          uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(uploadedFile);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyzeResume = async () => {
    if (!file || !jobDescription.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis (in production, this would call an API)
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock result
    const mockResult: AnalysisResult = {
      score: 78,
      matchedKeywords: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'REST API', 'Git', 'Agile'],
      missingKeywords: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'GraphQL'],
      suggestions: [
        'Add quantifiable achievements (e.g., "Increased performance by 40%")',
        'Include more industry-specific keywords from the job description',
        'Add a professional summary at the top of your resume',
        'Use action verbs to start bullet points',
        'Include relevant certifications if available',
      ],
      formatIssues: [
        'Consider using a single-column layout for better ATS parsing',
        'Avoid using headers/footers - some ATS systems skip them',
        'Use standard section headings (Experience, Education, Skills)',
      ],
    };

    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">ATS Score Checker</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Check Your Resume's{' '}
            <span className="gradient-text">ATS Compatibility</span>
          </h1>
          <p className="text-muted-foreground">
            Upload your resume and paste the job description to see how well your resume 
            matches the requirements and get personalized improvement suggestions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* File Upload */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Upload Resume
              </h3>
              
              <div
                className={cn(
                  'border-2 border-dashed rounded-xl p-8 text-center transition-colors',
                  dragActive ? 'border-primary bg-primary/5' : 'border-border',
                  file && 'border-green-500 bg-green-50 dark:bg-green-900/10'
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                      className="ml-2"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">
                      Drag and drop your resume here, or
                    </p>
                    <label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button variant="outline" asChild>
                        <span className="cursor-pointer">Browse Files</span>
                      </Button>
                    </label>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported formats: PDF, DOC, DOCX
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Job Description
              </h3>
              <Textarea
                placeholder="Paste the job description here to compare against your resume..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={8}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {jobDescription.length} characters
              </p>
            </div>

            {/* Analyze Button */}
            <Button
              onClick={analyzeResume}
              disabled={!file || !jobDescription.trim() || isAnalyzing}
              className="w-full gradient-bg text-primary-foreground py-6 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Resume
                </>
              )}
            </Button>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {result ? (
              <div className="space-y-6">
                {/* Score Card */}
                <div className="bg-card border border-border rounded-2xl p-6 text-center">
                  <h3 className="font-semibold mb-6">ATS Compatibility Score</h3>
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="url(#gradient)"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${result.score * 5.52} 552`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(217.2, 91.2%, 59.8%)" />
                          <stop offset="100%" stopColor="hsl(270, 91%, 56%)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={cn('text-5xl font-bold', getScoreColor(result.score))}>
                        {result.score}%
                      </span>
                      <span className="text-sm text-muted-foreground">{getScoreLabel(result.score)}</span>
                    </div>
                  </div>
                </div>

                {/* Keyword Match */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Matched Keywords ({result.matchedKeywords.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Missing Keywords ({result.missingKeywords.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Improvement Suggestions
                  </h3>
                  <ul className="space-y-3">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Format Issues */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    Format Considerations
                  </h3>
                  <ul className="space-y-3">
                    {result.formatIssues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-12 bg-card border border-border rounded-2xl">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-hero-bg flex items-center justify-center">
                    <Target className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Upload your resume and paste the job description to get your ATS score 
                    and personalized recommendations.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ATSChecker;
