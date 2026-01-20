import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Mic, 
  MicOff, 
  Download, 
  User, 
  GraduationCap, 
  Briefcase, 
  FolderOpen, 
  Award, 
  Wrench,
  ChevronDown,
  ChevronUp,
  LayoutTemplate
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useResume } from '@/contexts/ResumeContext';
import { cn } from '@/lib/utils';

type SectionKey = 'personal' | 'education' | 'experience' | 'projects' | 'achievements' | 'skills';

const Builder: React.FC = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<SectionKey, boolean>>({
    personal: true,
    education: true,
    experience: true,
    projects: false,
    achievements: false,
    skills: true,
  });

  const {
    resumeData,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    addAchievement,
    updateAchievement,
    removeAchievement,
    addSkill,
    updateSkill,
    removeSkill,
    setTemplate,
  } = useResume();

  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const startVoiceInput = (fieldId: string) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setActiveVoiceField(fieldId);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      // Handle voice input result based on field
      console.log('Voice input:', transcript, 'for field:', fieldId);
    };

    recognition.onend = () => {
      setIsListening(false);
      setActiveVoiceField(null);
    };

    recognition.start();
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('resume.pdf');
  };

  const SectionHeader: React.FC<{
    icon: React.ReactNode;
    title: string;
    section: SectionKey;
    onAdd?: () => void;
  }> = ({ icon, title, section, onAdd }) => (
    <div 
      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg cursor-pointer"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-bg text-primary-foreground">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="flex items-center gap-2">
        {onAdd && (
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
          >
            <Plus className="w-4 h-4" />
          </Button>
        )}
        {expandedSections[section] ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
    </div>
  );

  return (
    <Layout hideFooter>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Left Panel - Form */}
        <div className="w-1/2 border-r border-border overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold">Resume Builder</h1>
                <p className="text-muted-foreground">Fill in your details to create your resume</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startVoiceInput('general')}
                  className={cn(isListening && 'text-primary')}
                >
                  {isListening ? <Mic className="w-4 h-4 animate-pulse" /> : <MicOff className="w-4 h-4" />}
                </Button>
                <Button onClick={downloadPDF} className="gradient-bg">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Template Selection */}
            <div className="p-4 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <LayoutTemplate className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Choose Template</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(['classic', 'modern', 'creative'] as const).map((template) => (
                  <button
                    key={template}
                    onClick={() => setTemplate(template)}
                    className={cn(
                      'p-4 rounded-lg border-2 transition-all capitalize text-sm font-medium',
                      resumeData.template === template
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SectionHeader icon={<User className="w-4 h-4" />} title="Personal Information" section="personal" />
              {expandedSections.personal && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        placeholder="John Doe"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        placeholder="+1 (555) 000-0000"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        placeholder="San Francisco, CA"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>LinkedIn URL</Label>
                    <Input
                      placeholder="linkedin.com/in/johndoe"
                      value={resumeData.personalInfo.linkedin}
                      onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Professional Summary</Label>
                    <Textarea
                      placeholder="Write a brief summary of your professional background..."
                      value={resumeData.personalInfo.summary}
                      onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Education */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SectionHeader 
                icon={<GraduationCap className="w-4 h-4" />} 
                title="Education" 
                section="education"
                onAdd={addEducation}
              />
              {expandedSections.education && (
                <div className="p-4 space-y-4">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="p-4 bg-muted/30 rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div>
                            <Label>School/University</Label>
                            <Input
                              placeholder="Harvard University"
                              value={edu.school}
                              onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Degree</Label>
                            <Input
                              placeholder="Bachelor's"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Field of Study</Label>
                            <Input
                              placeholder="Computer Science"
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>GPA (Optional)</Label>
                            <Input
                              placeholder="3.8/4.0"
                              value={edu.gpa}
                              onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              placeholder="Sep 2018"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              placeholder="May 2022"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive ml-2"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {resumeData.education.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No education added yet. Click + to add.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Experience */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SectionHeader 
                icon={<Briefcase className="w-4 h-4" />} 
                title="Work Experience" 
                section="experience"
                onAdd={addExperience}
              />
              {expandedSections.experience && (
                <div className="p-4 space-y-4">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="p-4 bg-muted/30 rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div>
                            <Label>Company</Label>
                            <Input
                              placeholder="Google Inc."
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Position</Label>
                            <Input
                              placeholder="Software Engineer"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Location</Label>
                            <Input
                              placeholder="Mountain View, CA"
                              value={exp.location}
                              onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                            />
                          </div>
                          <div className="flex items-end gap-4">
                            <div className="flex-1">
                              <Label>Start Date</Label>
                              <Input
                                placeholder="Jan 2020"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <Checkbox
                              id={`current-${exp.id}`}
                              checked={exp.current}
                              onCheckedChange={(checked) => 
                                updateExperience(exp.id, { current: !!checked, endDate: checked ? 'Present' : '' })
                              }
                            />
                            <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
                          </div>
                          {!exp.current && (
                            <div className="col-span-2">
                              <Label>End Date</Label>
                              <Input
                                placeholder="Dec 2023"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                              />
                            </div>
                          )}
                          <div className="col-span-2">
                            <Label>Description</Label>
                            <Textarea
                              placeholder="Describe your responsibilities and achievements..."
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                              rows={4}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive ml-2"
                          onClick={() => removeExperience(exp.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {resumeData.experience.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No experience added yet. Click + to add.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Projects */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SectionHeader 
                icon={<FolderOpen className="w-4 h-4" />} 
                title="Projects" 
                section="projects"
                onAdd={addProject}
              />
              {expandedSections.projects && (
                <div className="p-4 space-y-4">
                  {resumeData.projects.map((proj) => (
                    <div key={proj.id} className="p-4 bg-muted/30 rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div>
                            <Label>Project Name</Label>
                            <Input
                              placeholder="E-commerce Platform"
                              value={proj.name}
                              onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Link (Optional)</Label>
                            <Input
                              placeholder="github.com/project"
                              value={proj.link}
                              onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Technologies Used</Label>
                            <Input
                              placeholder="React, Node.js, PostgreSQL"
                              value={proj.technologies}
                              onChange={(e) => updateProject(proj.id, { technologies: e.target.value })}
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Description</Label>
                            <Textarea
                              placeholder="Describe your project..."
                              value={proj.description}
                              onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                              rows={3}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive ml-2"
                          onClick={() => removeProject(proj.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {resumeData.projects.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No projects added yet. Click + to add.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Achievements */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SectionHeader 
                icon={<Award className="w-4 h-4" />} 
                title="Achievements" 
                section="achievements"
                onAdd={addAchievement}
              />
              {expandedSections.achievements && (
                <div className="p-4 space-y-4">
                  {resumeData.achievements.map((ach) => (
                    <div key={ach.id} className="p-4 bg-muted/30 rounded-lg space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div>
                            <Label>Title</Label>
                            <Input
                              placeholder="Best Paper Award"
                              value={ach.title}
                              onChange={(e) => updateAchievement(ach.id, { title: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Date</Label>
                            <Input
                              placeholder="June 2023"
                              value={ach.date}
                              onChange={(e) => updateAchievement(ach.id, { date: e.target.value })}
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Description</Label>
                            <Textarea
                              placeholder="Describe your achievement..."
                              value={ach.description}
                              onChange={(e) => updateAchievement(ach.id, { description: e.target.value })}
                              rows={2}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive ml-2"
                          onClick={() => removeAchievement(ach.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {resumeData.achievements.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No achievements added yet. Click + to add.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SectionHeader 
                icon={<Wrench className="w-4 h-4" />} 
                title="Skills" 
                section="skills"
                onAdd={addSkill}
              />
              {expandedSections.skills && (
                <div className="p-4 space-y-4">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Skill name (e.g., React)"
                          value={skill.name}
                          onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                        />
                      </div>
                      <div className="w-32">
                        <Slider
                          value={[skill.proficiency]}
                          onValueChange={(value) => updateSkill(skill.id, { proficiency: value[0] })}
                          max={100}
                          step={10}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12">{skill.proficiency}%</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeSkill(skill.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {resumeData.skills.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No skills added yet. Click + to add.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2 bg-muted/30 overflow-y-auto p-8">
          <div className="max-w-[800px] mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Live Preview</h2>
              <span className="text-sm text-muted-foreground capitalize">{resumeData.template} Template</span>
            </div>
            
            {/* Resume Preview */}
            <div 
              ref={resumeRef}
              className={cn(
                'bg-white text-gray-900 shadow-2xl aspect-[8.5/11] p-8 font-resume',
                resumeData.template === 'modern' && 'flex',
                resumeData.template === 'creative' && 'bg-gradient-to-br from-white to-slate-50'
              )}
            >
              {resumeData.template === 'classic' && (
                <ClassicTemplate data={resumeData} />
              )}
              {resumeData.template === 'modern' && (
                <ModernTemplate data={resumeData} />
              )}
              {resumeData.template === 'creative' && (
                <CreativeTemplate data={resumeData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Classic Template
const ClassicTemplate: React.FC<{ data: any }> = ({ data }) => (
  <div className="h-full text-sm">
    {/* Header */}
    <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
      <h1 className="text-2xl font-bold uppercase tracking-wider">
        {data.personalInfo.fullName || 'Your Name'}
      </h1>
      <div className="flex items-center justify-center gap-4 text-xs mt-2 text-gray-600">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>|</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>|</span>}
        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
      </div>
      {data.personalInfo.linkedin && (
        <p className="text-xs text-blue-600 mt-1">{data.personalInfo.linkedin}</p>
      )}
    </div>

    {/* Summary */}
    {data.personalInfo.summary && (
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Summary</h2>
        <p className="text-xs leading-relaxed text-gray-700">{data.personalInfo.summary}</p>
      </div>
    )}

    {/* Experience */}
    {data.experience.length > 0 && (
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Experience</h2>
        {data.experience.map((exp: any) => (
          <div key={exp.id} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-xs">{exp.position}</p>
                <p className="text-xs text-gray-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
              </div>
              <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
            </div>
            {exp.description && <p className="text-xs text-gray-700 mt-1 leading-relaxed">{exp.description}</p>}
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {data.education.length > 0 && (
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Education</h2>
        {data.education.map((edu: any) => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-xs">{edu.degree} in {edu.field}</p>
                <p className="text-xs text-gray-600">{edu.school}</p>
              </div>
              <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
            </div>
            {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {data.skills.length > 0 && (
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: any) => (
            <span key={skill.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Projects */}
    {data.projects.length > 0 && (
      <div className="mb-4">
        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Projects</h2>
        {data.projects.map((proj: any) => (
          <div key={proj.id} className="mb-2">
            <p className="font-semibold text-xs">{proj.name}</p>
            {proj.technologies && <p className="text-xs text-gray-500">{proj.technologies}</p>}
            {proj.description && <p className="text-xs text-gray-700 mt-1">{proj.description}</p>}
          </div>
        ))}
      </div>
    )}
  </div>
);

// Modern Template
const ModernTemplate: React.FC<{ data: any }> = ({ data }) => (
  <>
    {/* Sidebar */}
    <div className="w-1/3 bg-slate-800 text-white p-6 text-xs">
      <div className="mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold mb-3">
          {data.personalInfo.fullName?.split(' ').map((n: string) => n[0]).join('') || 'NA'}
        </div>
        <h1 className="text-lg font-bold">{data.personalInfo.fullName || 'Your Name'}</h1>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-blue-400 font-semibold uppercase text-[10px] mb-2">Contact</h3>
          {data.personalInfo.email && <p className="text-[10px]">{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p className="text-[10px]">{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p className="text-[10px]">{data.personalInfo.location}</p>}
        </div>

        {data.skills.length > 0 && (
          <div>
            <h3 className="text-blue-400 font-semibold uppercase text-[10px] mb-2">Skills</h3>
            {data.skills.map((skill: any) => (
              <div key={skill.id} className="mb-2">
                <p className="text-[10px] mb-1">{skill.name}</p>
                <div className="w-full bg-slate-600 rounded-full h-1">
                  <div 
                    className="bg-blue-400 h-1 rounded-full" 
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-6 text-xs">
      {data.personalInfo.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-slate-800 border-b-2 border-blue-500 pb-1 mb-2">Profile</h2>
          <p className="text-gray-600 leading-relaxed text-[10px]">{data.personalInfo.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-slate-800 border-b-2 border-blue-500 pb-1 mb-2">Experience</h2>
          {data.experience.map((exp: any) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <p className="font-semibold text-[10px]">{exp.position}</p>
                <span className="text-[10px] text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
              </div>
              <p className="text-[10px] text-blue-600">{exp.company}</p>
              {exp.description && <p className="text-[10px] text-gray-600 mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold text-slate-800 border-b-2 border-blue-500 pb-1 mb-2">Education</h2>
          {data.education.map((edu: any) => (
            <div key={edu.id} className="mb-2">
              <p className="font-semibold text-[10px]">{edu.degree} in {edu.field}</p>
              <p className="text-[10px] text-blue-600">{edu.school}</p>
              <p className="text-[10px] text-gray-500">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
);

// Creative Template
const CreativeTemplate: React.FC<{ data: any }> = ({ data }) => (
  <div className="h-full text-sm">
    {/* Header with accent */}
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold text-white">
          {data.personalInfo.fullName?.split(' ').map((n: string) => n[0]).join('') || 'NA'}
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>•</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          </div>
          {data.personalInfo.location && (
            <p className="text-xs text-gray-500">{data.personalInfo.location}</p>
          )}
        </div>
      </div>
    </div>

    {/* Summary */}
    {data.personalInfo.summary && (
      <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
        <p className="text-xs text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
      </div>
    )}

    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-4">
        {/* Experience */}
        {data.experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-purple-600 mb-2 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-purple-600"></span>
              Experience
            </h2>
            {data.experience.map((exp: any) => (
              <div key={exp.id} className="mb-3 pl-4 border-l-2 border-purple-200">
                <p className="font-semibold text-xs">{exp.position}</p>
                <p className="text-xs text-purple-600">{exp.company}</p>
                <p className="text-[10px] text-gray-400">{exp.startDate} - {exp.endDate || 'Present'}</p>
                {exp.description && <p className="text-[10px] text-gray-600 mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-purple-600 mb-2 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-purple-600"></span>
              Projects
            </h2>
            {data.projects.map((proj: any) => (
              <div key={proj.id} className="mb-2 pl-4 border-l-2 border-purple-200">
                <p className="font-semibold text-xs">{proj.name}</p>
                {proj.technologies && (
                  <p className="text-[10px] text-purple-500">{proj.technologies}</p>
                )}
                {proj.description && <p className="text-[10px] text-gray-600">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-purple-600 mb-2">Education</h2>
            {data.education.map((edu: any) => (
              <div key={edu.id} className="mb-2">
                <p className="font-semibold text-[10px]">{edu.degree}</p>
                <p className="text-[10px] text-gray-600">{edu.school}</p>
                <p className="text-[10px] text-gray-400">{edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-purple-600 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill: any) => (
                <span 
                  key={skill.id} 
                  className="text-[10px] bg-gradient-to-r from-purple-100 to-blue-100 px-2 py-0.5 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Builder;
