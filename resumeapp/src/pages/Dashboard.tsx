import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { resumeService } from '@/services/resumeService';
import { resumeTemplates } from '@/constants/templates';
import { Trash2, Edit2, Download, Eye } from 'lucide-react';

interface Resume {
  _id: string;
  title: string;
  template: string;
  atsScore: number;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('My Resume');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [creating, setCreating] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/signup');
      return;
    }
    loadResumes();
  }, [userId, navigate]);

  const loadResumes = async () => {
    try {
      setLoading(true);
      const data = await resumeService.getUserResumes(userId!);
      setResumes(data || []);
      setError('');
    } catch (err) {
      setError('Failed to load resumes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = async () => {
    try {
      setCreating(true);
      const newResume = await resumeService.createResume(
        userId!,
        newResumeTitle,
        selectedTemplate
      );
      setResumes([...resumes, newResume]);
      setOpenDialog(false);
      setNewResumeTitle('My Resume');
      setSelectedTemplate('modern');
    } catch (err) {
      setError('Failed to create resume');
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteResume = async (resumeId: string) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;

    try {
      await resumeService.deleteResume(resumeId);
      setResumes(resumes.filter(r => r._id !== resumeId));
    } catch (err) {
      setError('Failed to delete resume');
      console.error(err);
    }
  };

  const handleEditResume = (resumeId: string) => {
    navigate(`/builder/${resumeId}`);
  };

  const getTemplateInfo = (templateId: string) => {
    return resumeTemplates.find(t => t.id === templateId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero-bg pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your resumes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero-bg pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">My Resumes</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create, manage and export your professional resumes
            </p>
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                + Create New Resume
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Resume</DialogTitle>
                <DialogDescription>
                  Choose a template and give your resume a name
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Resume Title</label>
                  <Input
                    placeholder="e.g., Software Engineer Resume"
                    value={newResumeTitle}
                    onChange={(e) => setNewResumeTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Template</label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resumeTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleCreateResume}
                  disabled={creating || !newResumeTitle.trim()}
                  className="w-full"
                >
                  {creating ? 'Creating...' : 'Create Resume'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Resumes Grid */}
        {resumes.length === 0 ? (
          <Card className="text-center py-12 glass-effect border-0">
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't created any resumes yet. Create one to get started!
              </p>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                    Create Your First Resume
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume, index) => {
              const template = getTemplateInfo(resume.template);
              return (
                <Card
                  key={resume._id}
                  className="glass-effect border-0 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: template?.color }}
                      />
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                        {template?.name}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{resume.title}</CardTitle>
                    <CardDescription className="text-xs">
                      Updated {new Date(resume.updatedAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* ATS Score */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">ATS Score</span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {resume.atsScore}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${resume.atsScore}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditResume(resume._id)}
                        className="gap-2"
                      >
                        <Edit2 size={16} />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/preview/${resume._id}`)}
                        className="gap-2"
                      >
                        <Eye size={16} />
                        Preview
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2"
                        onClick={() => navigate(`/export/${resume._id}`)}
                      >
                        <Download size={16} />
                        Export PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteResume(resume._id)}
                        className="gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
