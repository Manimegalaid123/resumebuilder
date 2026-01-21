import React, { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  LayoutTemplate,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  List,
  PlusCircle
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

// Template options - matches Templates.tsx
const templateOptions = [
  { id: 'cosmos', name: 'Cosmos', style: 'sidebar-left' },
  { id: 'celestial', name: 'Celestial', style: 'centered' },
  { id: 'galaxy', name: 'Galaxy', style: 'sidebar-photo' },
  { id: 'aurora', name: 'Aurora', style: 'header-gradient' },
  { id: 'lunar', name: 'Lunar', style: 'sidebar-right' },
  { id: 'eclipse', name: 'Eclipse', style: 'sidebar-photo-alt' },
  { id: 'nebula', name: 'Nebula', style: 'modern-clean' },
  { id: 'stellar', name: 'Stellar', style: 'minimal' },
  { id: 'orbit', name: 'Orbit', style: 'creative' },
];

// Color accent options
const colorOptions = [
  { id: 'slate', name: 'Slate', primary: '#475569', secondary: '#f1f5f9' },
  { id: 'blue', name: 'Blue', primary: '#2563eb', secondary: '#eff6ff' },
  { id: 'emerald', name: 'Emerald', primary: '#059669', secondary: '#ecfdf5' },
  { id: 'purple', name: 'Purple', primary: '#7c3aed', secondary: '#f5f3ff' },
  { id: 'rose', name: 'Rose', primary: '#e11d48', secondary: '#fff1f2' },
  { id: 'amber', name: 'Amber', primary: '#d97706', secondary: '#fffbeb' },
  { id: 'cyan', name: 'Cyan', primary: '#0891b2', secondary: '#ecfeff' },
  { id: 'indigo', name: 'Indigo', primary: '#4f46e5', secondary: '#eef2ff' },
];

const Builder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlTemplate = searchParams.get('template') || 'cosmos';
  
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(urlTemplate);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  const [selectedColor, setSelectedColor] = useState('slate');
  const [isMonochrome, setIsMonochrome] = useState(false);

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
    addCustomSection,
    updateCustomSectionTitle,
    removeCustomSection,
    addCustomSectionItem,
    updateCustomSectionItem,
    removeCustomSectionItem,
    setTemplate,
  } = useResume();

  // Set template from URL on mount
  useEffect(() => {
    if (urlTemplate) {
      setSelectedTemplate(urlTemplate);
      setTemplate(urlTemplate as any);
    }
  }, [urlTemplate, setTemplate]);

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
    onAdd?: () => void;
  }> = ({ icon, title, onAdd }) => (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-bg text-primary-foreground">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      {onAdd && (
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onAdd();
          }}
          className="gap-1 gradient-bg"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      )}
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
                {templateOptions.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setTemplate(template.id as any);
                    }}
                    className={cn(
                      'p-4 rounded-lg border-2 transition-all capitalize text-sm font-medium',
                      selectedTemplate === template.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    {template.name}
                  </button>
                ))}
              </div>
              
              {/* Color Selection */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Accent Color</span>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={isMonochrome}
                      onCheckedChange={(checked) => setIsMonochrome(checked as boolean)}
                    />
                    Monochrome
                  </label>
                </div>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={cn(
                        'w-8 h-8 rounded-full transition-all',
                        selectedColor === color.id && 'ring-2 ring-offset-2 ring-primary'
                      )}
                      style={{ backgroundColor: isMonochrome ? '#475569' : color.primary }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SectionHeader icon={<User className="w-4 h-4" />} title="Personal Information" />
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
            </div>

            {/* Education */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SectionHeader 
                icon={<GraduationCap className="w-4 h-4" />} 
                title="Education" 
                onAdd={addEducation}
              />
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
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">
                        No education added yet.
                      </p>
                      <Button 
                        onClick={addEducation}
                        variant="outline"
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Education
                      </Button>
                    </div>
                  )}
                </div>
            </div>

            {/* Experience */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SectionHeader 
                icon={<Briefcase className="w-4 h-4" />} 
                title="Work Experience" 
                onAdd={addExperience}
              />
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
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">
                        No experience added yet.
                      </p>
                      <Button 
                        onClick={addExperience}
                        variant="outline"
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Experience
                      </Button>
                    </div>
                  )}
                </div>
            </div>

            {/* Projects */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SectionHeader 
                icon={<FolderOpen className="w-4 h-4" />} 
                title="Projects" 
                onAdd={addProject}
              />
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
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">
                        No projects added yet.
                      </p>
                      <Button 
                        onClick={addProject}
                        variant="outline"
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Project
                      </Button>
                    </div>
                  )}
                </div>
            </div>

            {/* Achievements */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SectionHeader 
                icon={<Award className="w-4 h-4" />} 
                title="Achievements" 
                onAdd={addAchievement}
              />
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
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">
                        No achievements added yet.
                      </p>
                      <Button 
                        onClick={addAchievement}
                        variant="outline"
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Achievement
                      </Button>
                    </div>
                  )}
                </div>
            </div>

            {/* Skills */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <SectionHeader 
                icon={<Wrench className="w-4 h-4" />} 
                title="Skills" 
                onAdd={addSkill}
              />
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
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">
                        No skills added yet.
                      </p>
                      <Button 
                        onClick={addSkill}
                        variant="outline"
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Skill
                      </Button>
                    </div>
                  )}
                </div>
            </div>

            {/* Custom Sections */}
            {resumeData.customSections.map((section) => (
              <div key={section.id} className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 rounded-lg gradient-bg text-primary-foreground">
                      <List className="w-4 h-4" />
                    </div>
                    <Input
                      value={section.title}
                      onChange={(e) => updateCustomSectionTitle(section.id, e.target.value)}
                      className="font-semibold bg-transparent border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 max-w-[200px]"
                      placeholder="Section Title"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => addCustomSectionItem(section.id)}
                      className="gap-1 gradient-bg"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeCustomSection(section.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="flex-1">
                        <Textarea
                          placeholder="Enter content..."
                          value={item.content}
                          onChange={(e) => updateCustomSectionItem(section.id, item.id, e.target.value)}
                          rows={2}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeCustomSectionItem(section.id, item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {section.items.length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">
                        No items added yet.
                      </p>
                      <Button 
                        onClick={() => addCustomSectionItem(section.id)}
                        variant="outline"
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Item
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Add New Custom Section */}
            <div className="bg-card border border-dashed border-border rounded-xl p-4">
              {showAddSection ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <PlusCircle className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <Input
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      placeholder="Enter section title (e.g., Languages, Certifications, Hobbies)"
                      className="flex-1"
                      autoFocus
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowAddSection(false);
                        setNewSectionTitle('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="gradient-bg"
                      onClick={() => {
                        if (newSectionTitle.trim()) {
                          addCustomSection(newSectionTitle.trim());
                          setNewSectionTitle('');
                          setShowAddSection(false);
                        }
                      }}
                      disabled={!newSectionTitle.trim()}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Section
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full h-auto py-4 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowAddSection(true)}
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Add Custom Section</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2 bg-muted/30 overflow-y-auto p-8">
          <div className="max-w-[800px] mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Live Preview</h2>
              <span className="text-sm text-muted-foreground capitalize">
                {templateOptions.find(t => t.id === selectedTemplate)?.name || 'Cosmos'} Template
              </span>
            </div>
            
            {/* Resume Preview */}
            <div 
              ref={resumeRef}
              className="bg-white text-gray-900 shadow-2xl aspect-[8.5/11] font-resume overflow-hidden"
            >
              {selectedTemplate === 'cosmos' && <CosmosTemplate data={resumeData} accentColor={colorOptions.find(c => c.id === selectedColor)!} isMonochrome={isMonochrome} />}
              {selectedTemplate === 'celestial' && <CelestialTemplate data={resumeData} accentColor={colorOptions.find(c => c.id === selectedColor)!} isMonochrome={isMonochrome} />}
              {selectedTemplate === 'galaxy' && <GalaxyTemplate data={resumeData} accentColor={colorOptions.find(c => c.id === selectedColor)!} isMonochrome={isMonochrome} />}
              {selectedTemplate === 'aurora' && <AuroraTemplate data={resumeData} accentColor={colorOptions.find(c => c.id === selectedColor)!} isMonochrome={isMonochrome} />}
              {selectedTemplate === 'lunar' && <LunarTemplate data={resumeData} accentColor={colorOptions.find(c => c.id === selectedColor)!} isMonochrome={isMonochrome} />}
              {selectedTemplate === 'eclipse' && <EclipseTemplate data={resumeData} accentColor={colorOptions.find(c => c.id === selectedColor)!} isMonochrome={isMonochrome} />}
              {selectedTemplate === 'nebula' && <NebulaTemplate data={resumeData} accentColor={colorOptions.find(c => c.id === selectedColor)!} isMonochrome={isMonochrome} />}
              {selectedTemplate === 'stellar' && <StellarTemplate data={resumeData} accentColor={colorOptions.find(c => c.id === selectedColor)!} isMonochrome={isMonochrome} />}
              {selectedTemplate === 'orbit' && <OrbitTemplate data={resumeData} accentColor={colorOptions.find(c => c.id === selectedColor)!} isMonochrome={isMonochrome} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Template Props Type
interface TemplateProps {
  data: any;
  accentColor: { id: string; name: string; primary: string; secondary: string };
  isMonochrome: boolean;
}

// Cosmos Template - Clean two-column with left sidebar (like Kelly)
const CosmosTemplate: React.FC<TemplateProps> = ({ data, accentColor, isMonochrome }) => {
  const primary = isMonochrome ? '#475569' : accentColor.primary;
  const secondary = isMonochrome ? '#f1f5f9' : accentColor.secondary;
  
  return (
  <div className="h-full flex text-[11px]">
    {/* Left Sidebar */}
    <div className="w-[35%] p-6" style={{ backgroundColor: secondary }}>
      <h1 className="font-bold text-xl leading-tight" style={{ color: primary }}>
        {data.personalInfo.fullName || 'Your Name'}
      </h1>
      <p className="text-slate-600 text-sm mb-6">
        {data.experience[0]?.position || 'Professional'}
      </p>
      
      <div className="mb-6">
        <h4 className="font-bold text-sm border-b pb-2 mb-3" style={{ color: primary, borderColor: primary }}>DETAILS</h4>
        <div className="space-y-2 text-slate-600">
          {data.personalInfo.email && (
            <div className="flex items-start gap-2">
              <Mail className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: primary }} />
              <span className="break-all">{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-start gap-2">
              <Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: primary }} />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-start gap-2">
              <Linkedin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span className="break-all">{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>
      
      {data.skills.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-slate-700 border-b border-slate-300 pb-2 mb-3">SKILLS</h4>
          <ul className="space-y-1 text-slate-600">
            {data.skills.map((skill: any) => (
              <li key={skill.id}>• {skill.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    
    {/* Main Content */}
    <div className="flex-1 p-6">
      {data.personalInfo.summary && (
        <div className="mb-5">
          <h4 className="font-bold text-sm text-slate-800 border-b border-slate-300 pb-2 mb-2">SUMMARY</h4>
          <p className="text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-5">
          <h4 className="font-bold text-sm text-slate-800 border-b border-slate-300 pb-2 mb-2">EXPERIENCE</h4>
          {data.experience.map((exp: any) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <p className="font-semibold">{exp.position}</p>
                <p className="text-slate-500 text-[10px]">{exp.startDate} — {exp.endDate || 'Present'}</p>
              </div>
              <p className="text-blue-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
              {exp.description && (
                <ul className="text-slate-600 mt-1 space-y-0.5">
                  {exp.description.split('\n').map((line: string, i: number) => (
                    <li key={i}>• {line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      
      {data.education.length > 0 && (
        <div className="mb-5">
          <h4 className="font-bold text-sm text-slate-800 border-b border-slate-300 pb-2 mb-2">EDUCATION</h4>
          {data.education.map((edu: any) => (
            <div key={edu.id} className="mb-2">
              <p className="font-semibold">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
              <p className="text-slate-500">{edu.school} • {edu.startDate} — {edu.endDate}</p>
              {edu.gpa && <p className="text-slate-500">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-slate-800 border-b border-slate-300 pb-2 mb-2">PROJECTS</h4>
          {data.projects.map((proj: any) => (
            <div key={proj.id} className="mb-2">
              <p className="font-semibold">{proj.name}</p>
              {proj.technologies && <p className="text-slate-500 text-[10px]">{proj.technologies}</p>}
              {proj.description && <p className="text-slate-600 mt-1">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.customSections?.map((section: any) => (
        section.items.length > 0 && (
          <div key={section.id} className="mb-5">
            <h4 className="font-bold text-sm border-b pb-2 mb-2" style={{ color: primary, borderColor: primary }}>{section.title.toUpperCase()}</h4>
            <ul className="text-slate-600 space-y-1">
              {section.items.map((item: any) => (
                <li key={item.id}>• {item.content}</li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  </div>
  );
};

// Celestial Template - Centered single-column (like Howard)
const CelestialTemplate: React.FC<TemplateProps> = ({ data, accentColor, isMonochrome }) => {
  const primary = isMonochrome ? '#475569' : accentColor.primary;
  
  return (
  <div className="h-full text-[11px] p-8">
    {/* Header */}
    <div className="text-center pb-4 mb-6" style={{ borderBottom: `2px solid ${primary}` }}>
      <h1 className="font-bold text-2xl tracking-wide uppercase" style={{ color: primary }}>
        {data.personalInfo.fullName || 'Your Name'}
      </h1>
      <p className="text-slate-600 text-sm mt-1">{data.experience[0]?.position || 'Professional'}</p>
      <p className="text-slate-500 mt-2">
        {[data.personalInfo.location, data.personalInfo.email, data.personalInfo.phone]
          .filter(Boolean).join(' | ')}
      </p>
    </div>
    
    {data.personalInfo.summary && (
      <div className="mb-5">
        <h4 className="font-bold text-sm text-slate-700 text-center border-b border-slate-200 pb-2 mb-2">SUMMARY</h4>
        <p className="text-slate-600 leading-relaxed text-center">{data.personalInfo.summary}</p>
      </div>
    )}
    
    {data.experience.length > 0 && (
      <div className="mb-5">
        <h4 className="font-bold text-sm text-slate-700 text-center border-b border-slate-200 pb-2 mb-3">EXPERIENCE</h4>
        {data.experience.map((exp: any) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between">
              <p className="font-semibold">{exp.position}, {exp.company}</p>
              <p className="text-slate-500">{exp.startDate} — {exp.endDate || 'Present'}</p>
            </div>
            {exp.description && (
              <ul className="text-slate-600 mt-1 space-y-0.5">
                {exp.description.split('\n').map((line: string, i: number) => (
                  <li key={i}>• {line}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}
    
    <div className="grid grid-cols-2 gap-6">
      {data.education.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-slate-700 border-b border-slate-200 pb-2 mb-2">EDUCATION</h4>
          {data.education.map((edu: any) => (
            <div key={edu.id} className="mb-2">
              <p className="font-semibold">{edu.school}</p>
              <p className="text-slate-500">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
              <p className="text-slate-500 text-[10px]">{edu.startDate} — {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}
      {data.skills.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-slate-700 border-b border-slate-200 pb-2 mb-2">SKILLS</h4>
          <p className="text-slate-600">{data.skills.map((s: any) => s.name).join(' • ')}</p>
        </div>
      )}
    </div>

    {data.customSections?.map((section: any) => (
      section.items.length > 0 && (
        <div key={section.id} className="mt-5">
          <h4 className="font-bold text-sm text-center border-b pb-2 mb-2" style={{ color: primary, borderColor: primary }}>{section.title.toUpperCase()}</h4>
          <ul className="text-slate-600 space-y-1">
            {section.items.map((item: any) => (
              <li key={item.id}>• {item.content}</li>
            ))}
          </ul>
        </div>
      )
    ))}
  </div>
  );
};

// Galaxy Template - Modern with photo sidebar (like Samantha)
const GalaxyTemplate: React.FC<TemplateProps> = ({ data, accentColor, isMonochrome }) => {
  const primary = isMonochrome ? '#475569' : accentColor.primary;
  
  return (
  <div className="h-full flex text-[11px]">
    {/* Colored Sidebar */}
    <div className="w-[32%] text-white p-5" style={{ background: `linear-gradient(to bottom, ${primary}, ${primary}dd)` }}>
      <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center border-3 border-white" style={{ backgroundColor: `${primary}66` }}>
        <span className="text-white font-bold text-lg">
          {data.personalInfo.fullName?.split(' ').map((n: string) => n[0]).join('') || 'NA'}
        </span>
      </div>
      <h3 className="text-center font-bold text-lg mb-0.5">{data.personalInfo.fullName || 'Your Name'}</h3>
      <p className="text-center opacity-80 text-sm mb-4">{data.experience[0]?.position || 'Professional'}</p>
      
      <div className="space-y-2 mb-5">
        {data.personalInfo.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            <span>{data.personalInfo.location}</span>
          </div>
        )}
        {data.personalInfo.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3" />
            <span className="truncate">{data.personalInfo.email}</span>
          </div>
        )}
        {data.personalInfo.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3" />
            <span>{data.personalInfo.phone}</span>
          </div>
        )}
      </div>
      
      {data.skills.length > 0 && (
        <div>
          <h4 className="font-bold text-sm border-b border-blue-400 pb-2 mb-3">SKILLS</h4>
          <ul className="space-y-1">
            {data.skills.map((skill: any) => (
              <li key={skill.id} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-300"></div>
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    
    {/* Main Content */}
    <div className="flex-1 p-5">
      {data.personalInfo.summary && (
        <div className="mb-5">
          <h4 className="font-bold text-sm text-slate-800 border-b border-slate-300 pb-2 mb-2">SUMMARY</h4>
          <p className="text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-5">
          <h4 className="font-bold text-sm text-slate-800 border-b border-slate-300 pb-2 mb-2">EXPERIENCE</h4>
          {data.experience.map((exp: any) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <p className="font-semibold">{exp.position}</p>
                <p className="text-slate-500 text-[10px]">{exp.startDate} — {exp.endDate || 'Present'}</p>
              </div>
              <p className="text-blue-600">{exp.company}{exp.location && ` - ${exp.location}`}</p>
              {exp.description && (
                <ul className="text-slate-600 mt-1 space-y-0.5">
                  {exp.description.split('\n').map((line: string, i: number) => (
                    <li key={i}>• {line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      
      {data.education.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-slate-800 border-b border-slate-300 pb-2 mb-2">EDUCATION</h4>
          {data.education.map((edu: any) => (
            <div key={edu.id} className="mb-2">
              <p className="font-semibold">{edu.school}</p>
              <p className="text-slate-500">{edu.degree}{edu.field && ` in ${edu.field}`} • {edu.startDate} — {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {data.customSections?.map((section: any) => (
        section.items.length > 0 && (
          <div key={section.id} className="mt-5">
            <h4 className="font-bold text-sm text-slate-800 border-b border-slate-300 pb-2 mb-2">{section.title.toUpperCase()}</h4>
            <ul className="text-slate-600 space-y-1">
              {section.items.map((item: any) => (
                <li key={item.id}>• {item.content}</li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  </div>
  );
};

// Aurora Template - Modern gradient header (like Jessie)
const AuroraTemplate: React.FC<TemplateProps> = ({ data, accentColor, isMonochrome }) => {
  const primary = isMonochrome ? '#475569' : accentColor.primary;
  
  return (
  <div className="h-full text-[11px]">
    {/* Gradient Header */}
    <div className="text-white p-6" style={{ background: `linear-gradient(to right, ${primary}, ${primary}cc)` }}>
      <h1 className="font-bold text-xl">{data.personalInfo.fullName || 'Your Name'}</h1>
      <p className="opacity-80 text-sm">{data.experience[0]?.position || 'Professional'}</p>
      <p className="opacity-80 mt-2">
        {[data.personalInfo.location, data.personalInfo.email, data.personalInfo.phone]
          .filter(Boolean).join(' | ')}
      </p>
    </div>
    
    <div className="p-6">
      {data.personalInfo.summary && (
        <div className="mb-5">
          <h4 className="font-bold text-sm pb-2 mb-2" style={{ color: primary, borderBottom: `1px solid ${primary}33` }}>SUMMARY</h4>
          <p className="text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-5">
          <h4 className="font-bold text-sm pb-2 mb-2" style={{ color: primary, borderBottom: `1px solid ${primary}33` }}>EXPERIENCE</h4>
          {data.experience.map((exp: any) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <p className="font-semibold">{exp.position}</p>
                <p className="text-slate-500">{exp.startDate} — {exp.endDate || 'Present'}</p>
              </div>
              <p className="text-violet-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
              {exp.description && (
                <ul className="text-slate-600 mt-1 space-y-0.5">
                  {exp.description.split('\n').map((line: string, i: number) => (
                    <li key={i}>• {line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-6">
        {data.education.length > 0 && (
          <div>
            <h4 className="font-bold text-sm text-violet-600 border-b border-violet-200 pb-2 mb-2">EDUCATION</h4>
            {data.education.map((edu: any) => (
              <div key={edu.id} className="mb-2">
                <p className="font-semibold">{edu.degree}{edu.field && `, ${edu.field}`}</p>
                <p className="text-slate-500">{edu.school} • {edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <h4 className="font-bold text-sm text-violet-600 border-b border-violet-200 pb-2 mb-2">SKILLS</h4>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill: any) => (
                <span key={skill.id} className="bg-violet-50 text-violet-600 px-2 py-1 rounded text-[10px]">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.customSections?.map((section: any) => (
        section.items.length > 0 && (
          <div key={section.id} className="mt-5">
            <h4 className="font-bold text-sm text-violet-600 border-b border-violet-200 pb-2 mb-2">{section.title.toUpperCase()}</h4>
            <ul className="text-slate-600 space-y-1">
              {section.items.map((item: any) => (
                <li key={item.id}>• {item.content}</li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  </div>
  );
};

// Lunar Template - Two-column with right sidebar (like Wes)
const LunarTemplate: React.FC<TemplateProps> = ({ data, accentColor, isMonochrome }) => {
  const primary = isMonochrome ? '#475569' : accentColor.primary;
  const secondary = isMonochrome ? '#f1f5f9' : accentColor.secondary;
  
  return (
  <div className="h-full flex text-[11px]">
    {/* Main Content */}
    <div className="flex-1 p-6">
      <h1 className="font-bold text-xl text-slate-900 uppercase">{data.personalInfo.fullName || 'Your Name'}</h1>
      <p className="text-sm font-medium mb-4" style={{ color: primary }}>{data.experience[0]?.position?.toUpperCase() || 'PROFESSIONAL'}</p>
      
      {data.personalInfo.summary && (
        <div className="mb-5">
          <h4 className="font-bold text-sm text-slate-800 px-2 py-1 mb-2" style={{ backgroundColor: secondary }}>SUMMARY</h4>
          <p className="text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-5">
          <h4 className="font-bold text-sm text-slate-800 px-2 py-1 mb-2" style={{ backgroundColor: secondary }}>EXPERIENCE</h4>
          {data.experience.map((exp: any) => (
            <div key={exp.id} className="mb-4">
              <p className="font-semibold">{exp.position}, {exp.company}</p>
              <p className="text-slate-500">{exp.location} • {exp.startDate} — {exp.endDate || 'Present'}</p>
              {exp.description && (
                <ul className="text-slate-600 mt-1 space-y-0.5">
                  {exp.description.split('\n').map((line: string, i: number) => (
                    <li key={i}>• {line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      
      {data.education.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-slate-800 px-2 py-1 mb-2" style={{ backgroundColor: secondary }}>EDUCATION</h4>
          {data.education.map((edu: any) => (
            <div key={edu.id} className="mb-2">
              <p className="font-semibold">{edu.school}</p>
              <p className="text-slate-500">{edu.degree}{edu.field && ` in ${edu.field}`} • {edu.startDate} — {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {data.customSections?.map((section: any) => (
        section.items.length > 0 && (
          <div key={section.id} className="mt-5">
            <h4 className="font-bold text-sm text-slate-800 px-2 py-1 mb-2" style={{ backgroundColor: secondary }}>{section.title.toUpperCase()}</h4>
            <ul className="text-slate-600 space-y-1">
              {section.items.map((item: any) => (
                <li key={item.id}>• {item.content}</li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
    
    {/* Right Sidebar */}
    <div className="w-[28%] bg-amber-50 p-4">
      <h4 className="font-bold text-sm text-amber-800 mb-3">DETAILS</h4>
      <div className="space-y-2 text-slate-600 mb-5">
        {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
        {data.personalInfo.email && <p className="break-all">{data.personalInfo.email}</p>}
      </div>
      
      {data.skills.length > 0 && (
        <>
          <h4 className="font-bold text-sm text-amber-800 mb-3">SKILLS</h4>
          <ul className="space-y-1 text-slate-600">
            {data.skills.map((skill: any) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  </div>
  );
};

// Eclipse Template - Entry-level with photo (like Sebastian)
const EclipseTemplate: React.FC<TemplateProps> = ({ data, accentColor, isMonochrome }) => {
  const primary = isMonochrome ? '#475569' : accentColor.primary;
  
  return (
  <div className="h-full flex text-[11px]">
    {/* Colored Sidebar */}
    <div className="w-[30%] text-white p-5" style={{ background: `linear-gradient(to bottom, ${primary}, ${primary}dd)` }}>
      <div className="w-16 h-16 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center border-2 border-white">
        <span className="text-sm font-bold">
          {data.personalInfo.fullName?.split(' ').map((n: string) => n[0]).join('') || 'NA'}
        </span>
      </div>
      
      <h4 className="font-bold text-sm mt-4 mb-3">DETAILS</h4>
      <div className="space-y-2">
        {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
        {data.personalInfo.email && <p className="break-all">{data.personalInfo.email}</p>}
      </div>
      
      {data.skills.length > 0 && (
        <>
          <h4 className="font-bold text-sm mt-5 mb-3">SKILLS</h4>
          <ul className="space-y-1">
            {data.skills.map((skill: any) => (
              <li key={skill.id} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                {skill.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
    
    {/* Main Content */}
    <div className="flex-1 p-6">
      <h1 className="font-bold text-xl text-slate-900">{data.personalInfo.fullName || 'Your Name'}</h1>
      <p className="text-sm font-medium mb-4" style={{ color: primary }}>{data.experience[0]?.position || 'Professional'}</p>
      
      {data.personalInfo.summary && (
        <div className="mb-5">
          <h4 className="font-bold text-sm pb-2 mb-2" style={{ color: primary, borderBottom: `1px solid ${primary}33` }}>SUMMARY</h4>
          <p className="text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-5">
          <h4 className="font-bold text-sm text-cyan-600 border-b border-cyan-200 pb-2 mb-2">EXPERIENCE</h4>
          {data.experience.map((exp: any) => (
            <div key={exp.id} className="mb-3">
              <p className="font-semibold">{exp.position}</p>
              <p className="text-slate-500">{exp.company} • {exp.startDate} — {exp.endDate || 'Present'}</p>
              {exp.description && <p className="text-slate-600 mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {data.education.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-cyan-600 border-b border-cyan-200 pb-2 mb-2">EDUCATION</h4>
          {data.education.map((edu: any) => (
            <div key={edu.id} className="mb-2">
              <p className="font-semibold">{edu.degree}{edu.field && `, ${edu.field}`}</p>
              <p className="text-slate-500">{edu.school} • {edu.startDate} — {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {data.customSections?.map((section: any) => (
        section.items.length > 0 && (
          <div key={section.id} className="mt-5">
            <h4 className="font-bold text-sm mb-2" style={{ color: primary }}>{section.title.toUpperCase()}</h4>
            <ul className="text-slate-600 space-y-1">
              {section.items.map((item: any) => (
                <li key={item.id}>• {item.content}</li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  </div>
  );
};

// Nebula Template - Modern clean with accent line
const NebulaTemplate: React.FC<TemplateProps> = ({ data, accentColor, isMonochrome }) => {
  const primary = isMonochrome ? '#475569' : accentColor.primary;
  
  return (
  <div className="h-full text-[11px] p-6">
    {/* Header with accent */}
    <div className="pl-4 mb-6" style={{ borderLeft: `4px solid ${primary}` }}>
      <h1 className="font-bold text-2xl text-slate-800">{data.personalInfo.fullName || 'Your Name'}</h1>
      <p className="font-medium" style={{ color: primary }}>{data.experience[0]?.position || 'Professional Title'}</p>
      <div className="flex flex-wrap gap-4 mt-2 text-slate-500 text-[10px]">
        {data.personalInfo.email && <span>✉ {data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>☎ {data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>📍 {data.personalInfo.location}</span>}
      </div>
    </div>

    {data.personalInfo.summary && (
      <div className="mb-5">
        <p className="text-slate-600 leading-relaxed italic border-l-2 border-indigo-200 pl-3">
          {data.personalInfo.summary}
        </p>
      </div>
    )}

    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-5">
        {data.experience.length > 0 && (
          <div>
            <h4 className="font-bold text-sm text-indigo-600 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              EXPERIENCE
            </h4>
            {data.experience.map((exp: any) => (
              <div key={exp.id} className="mb-4 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-indigo-300 before:rounded-full">
                <div className="flex justify-between">
                  <p className="font-semibold">{exp.position}</p>
                  <p className="text-slate-400 text-[10px]">{exp.startDate} — {exp.endDate || 'Present'}</p>
                </div>
                <p className="text-indigo-500">{exp.company}</p>
                {exp.description && <p className="text-slate-600 mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {data.projects.length > 0 && (
          <div>
            <h4 className="font-bold text-sm text-indigo-600 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              PROJECTS
            </h4>
            {data.projects.map((proj: any) => (
              <div key={proj.id} className="mb-3 pl-4">
                <p className="font-semibold">{proj.name}</p>
                {proj.technologies && <p className="text-indigo-400 text-[10px]">{proj.technologies}</p>}
                {proj.description && <p className="text-slate-600">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-5">
        {data.education.length > 0 && (
          <div>
            <h4 className="font-bold text-sm text-indigo-600 mb-3">EDUCATION</h4>
            {data.education.map((edu: any) => (
              <div key={edu.id} className="mb-2">
                <p className="font-semibold text-[10px]">{edu.degree}</p>
                <p className="text-slate-500 text-[10px]">{edu.school}</p>
                <p className="text-slate-400 text-[9px]">{edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {data.skills.length > 0 && (
          <div>
            <h4 className="font-bold text-sm text-indigo-600 mb-3">SKILLS</h4>
            <div className="space-y-2">
              {data.skills.map((skill: any) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span>{skill.name}</span>
                    <span className="text-slate-400">{skill.proficiency}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${skill.proficiency}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.achievements.length > 0 && (
          <div>
            <h4 className="font-bold text-sm text-indigo-600 mb-3">ACHIEVEMENTS</h4>
            {data.achievements.map((ach: any) => (
              <div key={ach.id} className="mb-2">
                <p className="font-semibold text-[10px]">{ach.title}</p>
                <p className="text-slate-500 text-[9px]">{ach.date}</p>
              </div>
            ))}
          </div>
        )}

        {data.customSections?.map((section: any) => (
          section.items.length > 0 && (
            <div key={section.id}>
              <h4 className="font-bold text-sm mb-3" style={{ color: primary }}>{section.title.toUpperCase()}</h4>
              <ul className="text-slate-600 space-y-1 text-[10px]">
                {section.items.map((item: any) => (
                  <li key={item.id}>• {item.content}</li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    </div>
  </div>
  );
};

// Stellar Template - Minimal elegant
const StellarTemplate: React.FC<TemplateProps> = ({ data, accentColor, isMonochrome }) => {
  const primary = isMonochrome ? '#475569' : accentColor.primary;
  
  return (
  <div className="h-full text-[11px] p-8 bg-white">
    {/* Minimal Header */}
    <div className="text-center mb-8">
      <h1 className="font-light text-3xl text-slate-800 tracking-wide">{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className="w-16 h-0.5 mx-auto my-3" style={{ backgroundColor: primary }}></div>
      <p className="text-slate-500 text-sm">{data.experience[0]?.position || 'Professional'}</p>
      <div className="flex justify-center gap-6 mt-3 text-slate-400 text-[10px]">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
      </div>
    </div>

    {data.personalInfo.summary && (
      <div className="mb-6 text-center max-w-lg mx-auto">
        <p className="text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
      </div>
    )}

    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        {data.experience.length > 0 && (
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-400 mb-4">Experience</h4>
            {data.experience.map((exp: any) => (
              <div key={exp.id} className="mb-4">
                <p className="font-medium">{exp.position}</p>
                <p className="text-slate-500">{exp.company} · {exp.startDate} — {exp.endDate || 'Present'}</p>
                {exp.description && <p className="text-slate-600 mt-1 text-[10px]">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {data.projects.length > 0 && (
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-400 mb-4">Projects</h4>
            {data.projects.map((proj: any) => (
              <div key={proj.id} className="mb-3">
                <p className="font-medium">{proj.name}</p>
                {proj.technologies && <p className="text-slate-400 text-[10px]">{proj.technologies}</p>}
                {proj.description && <p className="text-slate-600 text-[10px]">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {data.education.length > 0 && (
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-400 mb-4">Education</h4>
            {data.education.map((edu: any) => (
              <div key={edu.id} className="mb-3">
                <p className="font-medium">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                <p className="text-slate-500">{edu.school}</p>
                <p className="text-slate-400 text-[10px]">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {data.skills.length > 0 && (
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-400 mb-4">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: any) => (
                <span key={skill.id} className="border border-slate-200 px-3 py-1 rounded-full text-[10px]">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.achievements.length > 0 && (
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-400 mb-4">Achievements</h4>
            {data.achievements.map((ach: any) => (
              <div key={ach.id} className="mb-2">
                <p className="font-medium text-[10px]">{ach.title}</p>
                {ach.description && <p className="text-slate-500 text-[9px]">{ach.description}</p>}
              </div>
            ))}
          </div>
        )}

        {data.customSections?.map((section: any) => (
          section.items.length > 0 && (
            <div key={section.id}>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-slate-400 mb-4">{section.title}</h4>
              <ul className="text-slate-600 space-y-1 text-[10px]">
                {section.items.map((item: any) => (
                  <li key={item.id}>• {item.content}</li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    </div>
  </div>
  );
};

// Orbit Template - Creative with timeline
const OrbitTemplate: React.FC<TemplateProps> = ({ data, accentColor, isMonochrome }) => {
  const primary = isMonochrome ? '#475569' : accentColor.primary;
  const secondary = isMonochrome ? '#f1f5f9' : accentColor.secondary;
  
  return (
  <div className="h-full text-[11px]" style={{ background: `linear-gradient(to bottom right, ${secondary}, white)` }}>
    {/* Creative Header */}
    <div className="text-white p-6" style={{ background: `linear-gradient(to right, ${primary}, ${primary}cc)` }}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold border-2 border-white/50">
          {data.personalInfo.fullName?.split(' ').map((n: string) => n[0]).join('') || 'NA'}
        </div>
        <div>
          <h1 className="font-bold text-xl">{data.personalInfo.fullName || 'Your Name'}</h1>
          <p className="opacity-80">{data.experience[0]?.position || 'Professional'}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4 opacity-80 text-[10px]">
        {data.personalInfo.email && <span>✉ {data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>☎ {data.personalInfo.phone}</span>}
        {data.personalInfo.location && <span>📍 {data.personalInfo.location}</span>}
      </div>
    </div>

    <div className="p-6">
      {data.personalInfo.summary && (
        <div className="mb-5 p-4 bg-white rounded-lg shadow-sm">
          <p className="text-slate-600 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          {data.experience.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-sm text-rose-600 mb-3">💼 Experience</h4>
              <div className="border-l-2 border-rose-200 pl-4 space-y-4">
                {data.experience.map((exp: any) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-[21px] top-1 w-2 h-2 bg-rose-400 rounded-full"></div>
                    <p className="font-semibold">{exp.position}</p>
                    <p className="text-rose-500">{exp.company}</p>
                    <p className="text-slate-400 text-[10px]">{exp.startDate} — {exp.endDate || 'Present'}</p>
                    {exp.description && <p className="text-slate-600 mt-1">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.projects.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-sm text-rose-600 mb-3">🚀 Projects</h4>
              {data.projects.map((proj: any) => (
                <div key={proj.id} className="mb-3">
                  <p className="font-semibold">{proj.name}</p>
                  {proj.technologies && (
                    <div className="flex flex-wrap gap-1 my-1">
                      {proj.technologies.split(',').map((tech: string, i: number) => (
                        <span key={i} className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded text-[9px]">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.description && <p className="text-slate-600 text-[10px]">{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {data.education.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-sm text-rose-600 mb-3">🎓 Education</h4>
              {data.education.map((edu: any) => (
                <div key={edu.id} className="mb-2">
                  <p className="font-semibold text-[10px]">{edu.degree}</p>
                  <p className="text-slate-500 text-[10px]">{edu.school}</p>
                  <p className="text-slate-400 text-[9px]">{edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {data.skills.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-sm text-rose-600 mb-3">⚡ Skills</h4>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill: any) => (
                  <span key={skill.id} className="px-2 py-1 rounded-full text-[10px]" style={{ backgroundColor: secondary, color: primary }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.achievements.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-sm mb-3" style={{ color: primary }}>🏆 Achievements</h4>
              {data.achievements.map((ach: any) => (
                <div key={ach.id} className="mb-2">
                  <p className="font-semibold text-[10px]">{ach.title}</p>
                  <p className="text-slate-400 text-[9px]">{ach.date}</p>
                </div>
              ))}
            </div>
          )}

          {data.customSections?.map((section: any) => (
            section.items.length > 0 && (
              <div key={section.id} className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-sm mb-3" style={{ color: primary }}>📝 {section.title}</h4>
                <ul className="text-slate-600 space-y-1 text-[10px]">
                  {section.items.map((item: any) => (
                    <li key={item.id}>• {item.content}</li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Builder;
