import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, Star, Code, Image, Briefcase, Award, 
  Mail, Phone, MapPin, CheckCircle, Search, Columns
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = [
  { id: 'all', name: 'All Templates', icon: LayoutGrid },
  { id: 'simple', name: 'Simple', icon: Star },
  { id: 'modern', name: 'Modern', icon: Code },
  { id: 'one-column', name: 'One Column', icon: Columns },
  { id: 'with-photo', name: 'With Photo', icon: Image },
  { id: 'professional', name: 'Professional', icon: Briefcase },
  { id: 'ats', name: 'ATS Friendly', icon: Award },
];

// Template Components
const KellyTemplate = () => (
  <div className="h-full flex text-[7px] bg-white overflow-hidden">
    <div className="w-[35%] bg-slate-100 p-3">
      <h3 className="font-bold text-[12px] text-slate-800 leading-tight">KELLY</h3>
      <h3 className="font-bold text-[12px] text-slate-800 mb-1">BLACKWELL</h3>
      <p className="text-slate-600 text-[8px] mb-3">Administrative Assistant</p>
      
      <div className="mb-3">
        <h4 className="font-bold text-[8px] text-slate-700 border-b border-slate-300 pb-1 mb-2">DETAILS</h4>
        <div className="space-y-1 text-[7px] text-slate-600">
          <div className="flex items-start gap-1">
            <Mail className="w-2.5 h-2.5 text-slate-400 mt-0.5 flex-shrink-0" />
            <span>kelly.blackwell@example.com</span>
          </div>
          <div className="flex items-start gap-1">
            <Phone className="w-2.5 h-2.5 text-slate-400 mt-0.5 flex-shrink-0" />
            <span>(210) 286-1624</span>
          </div>
          <div className="flex items-start gap-1">
            <MapPin className="w-2.5 h-2.5 text-slate-400 mt-0.5 flex-shrink-0" />
            <span>Weston, FL, United States</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-[8px] text-slate-700 border-b border-slate-300 pb-1 mb-2">SKILLS</h4>
        <ul className="space-y-0.5 text-[7px] text-slate-600">
          <li>• Analytical Thinking</li>
          <li>• Team Leadership</li>
          <li>• Organization</li>
          <li>• Strong Communication</li>
          <li>• MS Office Suite</li>
        </ul>
      </div>
    </div>
    <div className="flex-1 p-3">
      <div className="mb-3">
        <h4 className="font-bold text-[9px] text-slate-800 border-b border-slate-300 pb-1 mb-1.5">SUMMARY</h4>
        <p className="text-slate-600 leading-relaxed">
          Administrative assistant with 9+ years of experience organizing presentations, preparing reports, 
          and maintaining confidentiality. Expertise in Microsoft Excel.
        </p>
      </div>
      
      <div className="mb-3">
        <h4 className="font-bold text-[9px] text-slate-800 border-b border-slate-300 pb-1 mb-1.5">EXPERIENCE</h4>
        <div className="mb-2">
          <div className="flex justify-between items-start">
            <p className="font-semibold text-[8px]">Administrative Assistant</p>
            <p className="text-[7px] text-slate-500">Sep 2017 — Current</p>
          </div>
          <p className="text-blue-600 text-[7px]">Redford & Sons, Boston, MA</p>
          <ul className="text-slate-600 space-y-0.5 mt-0.5">
            <li>• Schedule and coordinate meetings for executives</li>
            <li>• Trained 2 assistants during company expansion</li>
          </ul>
        </div>
        <div>
          <div className="flex justify-between items-start">
            <p className="font-semibold text-[8px]">Secretary</p>
            <p className="text-[7px] text-slate-500">Jun 2016 — Aug 2017</p>
          </div>
          <p className="text-blue-600 text-[7px]">Bright Spot Ltd., Boston</p>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-[9px] text-slate-800 border-b border-slate-300 pb-1 mb-1.5">EDUCATION</h4>
        <p className="font-semibold text-[8px]">Bachelor of Arts, Finance</p>
        <p className="text-slate-500 text-[7px]">Brown University • 2004 — 2009</p>
      </div>
    </div>
  </div>
);

const HowardTemplate = () => (
  <div className="h-full text-[7px] bg-white p-4 overflow-hidden">
    <div className="text-center border-b border-slate-300 pb-2 mb-3">
      <h3 className="font-bold text-[14px] text-slate-800 tracking-wide">HOWARD JONES</h3>
      <p className="text-slate-600 text-[9px] mt-0.5">Lawyer</p>
      <p className="text-[7px] text-slate-500 mt-1">
        San Francisco, CA | howard.jones@gmail.com | (415) 555-2671
      </p>
    </div>
    
    <div className="mb-3">
      <h4 className="font-bold text-[9px] text-slate-700 text-center border-b border-slate-200 pb-1 mb-1.5">SUMMARY</h4>
      <p className="text-slate-600 leading-relaxed text-center">
        Experienced Lawyer with passion for justice. Skilled in public speaking with proven track record 
        of achieving favorable outcomes. Adept in preparing trials and presenting cases.
      </p>
    </div>
    
    <div className="mb-3">
      <h4 className="font-bold text-[9px] text-slate-700 text-center border-b border-slate-200 pb-1 mb-1.5">EXPERIENCE</h4>
      <div className="mb-2">
        <div className="flex justify-between">
          <p className="font-semibold text-[8px]">Lawyer, Madison and Fletcher Attorneys</p>
          <p className="text-[7px] text-slate-500">Dec 2010 — Aug 2018</p>
        </div>
        <ul className="text-slate-600 space-y-0.5 mt-0.5">
          <li>• Prepared legal documents and presented cases</li>
          <li>• Filed briefings and collected evidence</li>
        </ul>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      <div>
        <h4 className="font-bold text-[9px] text-slate-700 border-b border-slate-200 pb-1 mb-1.5">EDUCATION</h4>
        <p className="font-semibold text-[8px]">New York Law School</p>
        <p className="text-[7px] text-slate-500">Juris Doctor • 2003 — 2006</p>
      </div>
      <div>
        <h4 className="font-bold text-[9px] text-slate-700 border-b border-slate-200 pb-1 mb-1.5">SKILLS</h4>
        <p className="text-[7px] text-slate-600">Regulatory Compliance • Contract Negotiation • Family Law • Mediation</p>
      </div>
    </div>
  </div>
);

const SamanthaTemplate = () => (
  <div className="h-full flex text-[7px] bg-white overflow-hidden">
    <div className="w-[32%] bg-gradient-to-b from-blue-600 to-blue-700 text-white p-3">
      <div className="w-12 h-12 rounded-full bg-blue-300 mx-auto mb-2 flex items-center justify-center border-2 border-white">
        <span className="text-blue-700 font-bold text-[10px]">SW</span>
      </div>
      <h3 className="text-center font-bold text-[10px] mb-0.5">Samantha Williams</h3>
      <p className="text-center text-blue-200 text-[8px] mb-2">Senior Analyst</p>
      
      <div className="space-y-1 text-[7px] mb-3">
        <div className="flex items-center gap-1">
          <MapPin className="w-2.5 h-2.5" />
          <span>New York, NY</span>
        </div>
        <div className="flex items-center gap-1">
          <Mail className="w-2.5 h-2.5" />
          <span className="truncate">samantha@email.com</span>
        </div>
        <div className="flex items-center gap-1">
          <Phone className="w-2.5 h-2.5" />
          <span>(555) 789-1234</span>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-[8px] border-b border-blue-400 pb-1 mb-1.5">SKILLS</h4>
        <ul className="space-y-0.5">
          {['Project Management', 'Data Analysis', 'SQL & Excel', 'Business Intelligence'].map(skill => (
            <li key={skill} className="flex items-center gap-1 text-[7px]">
              <div className="w-1 h-1 rounded-full bg-blue-300"></div>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="flex-1 p-3">
      <div className="mb-3">
        <h4 className="font-bold text-[9px] text-slate-800 border-b border-slate-300 pb-1 mb-1.5">SUMMARY</h4>
        <p className="text-slate-600 leading-relaxed">
          Senior Analyst with 5+ years of experience in data analysis and business intelligence. 
          Skilled in driving operational efficiency and data-driven strategies.
        </p>
      </div>
      
      <div className="mb-3">
        <h4 className="font-bold text-[9px] text-slate-800 border-b border-slate-300 pb-1 mb-1.5">EXPERIENCE</h4>
        <div className="mb-2">
          <div className="flex justify-between items-start">
            <p className="font-semibold text-[8px]">Senior Analyst</p>
            <p className="text-[7px] text-slate-500">Jul 2021 — Current</p>
          </div>
          <p className="text-blue-600 text-[7px]">Loom & Lantern Co. - New York</p>
          <ul className="text-slate-600 space-y-0.5 mt-0.5">
            <li>• Spearhead data analysis for key business functions</li>
            <li>• Conduct market analysis, resulting in 15% increase</li>
          </ul>
        </div>
        <div>
          <div className="flex justify-between items-start">
            <p className="font-semibold text-[8px]">Business Analyst</p>
            <p className="text-[7px] text-slate-500">Aug 2017 — May 2021</p>
          </div>
          <p className="text-blue-600 text-[7px]">Willow & Wren Ltd.</p>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-[9px] text-slate-800 border-b border-slate-300 pb-1 mb-1.5">EDUCATION</h4>
        <p className="font-semibold text-[8px]">New York University</p>
        <p className="text-slate-500 text-[7px]">B.S. Economics • 2013 — 2017</p>
      </div>
    </div>
  </div>
);

const JessieTemplate = () => (
  <div className="h-full text-[7px] bg-white overflow-hidden">
    <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-3">
      <h3 className="font-bold text-[12px]">Jessie Smith</h3>
      <p className="text-violet-200 text-[8px]">Human Resource Manager</p>
      <p className="text-[7px] text-violet-200 mt-1">
        Plano, TX | email@youremail.com | (469) 385-2948
      </p>
    </div>
    <div className="p-3">
      <div className="mb-3">
        <h4 className="font-bold text-[9px] text-violet-600 border-b border-violet-200 pb-1 mb-1.5">SUMMARY</h4>
        <p className="text-slate-600 leading-relaxed">
          HR generalist with 8 years of experience in hiring, training, and employee management. 
          Worked with labor unions to negotiate compensation packages.
        </p>
      </div>
      
      <div className="mb-3">
        <h4 className="font-bold text-[9px] text-violet-600 border-b border-violet-200 pb-1 mb-1.5">EXPERIENCE</h4>
        <div className="mb-2">
          <div className="flex justify-between">
            <p className="font-semibold text-[8px]">Human Resource Manager</p>
            <p className="text-[7px] text-slate-500">04/2019 - Current</p>
          </div>
          <p className="text-violet-600 text-[7px]">Jim's Widget Factory, Plano, TX</p>
          <ul className="text-slate-600 space-y-0.5 mt-0.5">
            <li>• Implement effective company policies for compliance</li>
            <li>• Increased retention rates to over 90%</li>
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <h4 className="font-bold text-[9px] text-violet-600 border-b border-violet-200 pb-1 mb-1.5">EDUCATION</h4>
          <p className="font-semibold text-[8px]">Master, Human Resources</p>
          <p className="text-[7px] text-slate-500">University of Texas • 2007 - 2011</p>
        </div>
        <div>
          <h4 className="font-bold text-[9px] text-violet-600 border-b border-violet-200 pb-1 mb-1.5">SKILLS</h4>
          <div className="flex flex-wrap gap-1">
            {['Analytics', 'Communication', 'Leadership'].map(skill => (
              <span key={skill} className="bg-violet-50 text-violet-600 px-1 py-0.5 rounded text-[6px]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WesTemplate = () => (
  <div className="h-full flex text-[7px] bg-white overflow-hidden">
    <div className="flex-1 p-3">
      <h3 className="font-bold text-[12px] text-slate-900">WES TURNER</h3>
      <p className="text-amber-600 text-[9px] font-medium mb-2">SALES MANAGER</p>
      
      <div className="mb-3">
        <h4 className="font-bold text-[8px] text-slate-800 bg-slate-100 px-1 py-0.5 mb-1.5">SUMMARY</h4>
        <p className="text-slate-600 leading-relaxed">
          Experienced Sales Manager with five years of industry experience overseeing sales figures 
          and new account developments.
        </p>
      </div>
      
      <div className="mb-3">
        <h4 className="font-bold text-[8px] text-slate-800 bg-slate-100 px-1 py-0.5 mb-1.5">EXPERIENCE</h4>
        <div className="mb-2">
          <p className="font-semibold text-[8px]">Sales Manager, Winthrop and Lee</p>
          <p className="text-[7px] text-slate-500">Boulder • Nov 2014 - Sep 2019</p>
          <ul className="text-slate-600 space-y-0.5 mt-0.5">
            <li>• Achieved 25% increase in sales revenue</li>
            <li>• Monitored competition and adjusted costs</li>
          </ul>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-[8px] text-slate-800 bg-slate-100 px-1 py-0.5 mb-1.5">EDUCATION</h4>
        <p className="font-semibold text-[8px]">Colorado College</p>
        <p className="text-[7px] text-slate-500">Bachelor of Marketing • 2008 - 2010</p>
      </div>
    </div>
    <div className="w-[28%] bg-amber-50 p-2">
      <h4 className="font-bold text-[8px] text-amber-800 mb-1.5">DETAILS</h4>
      <div className="space-y-1 text-[7px] text-slate-600 mb-3">
        <p>Boulder, CO</p>
        <p>(720) 315-8237</p>
        <p>wes@gmail.com</p>
      </div>
      
      <h4 className="font-bold text-[8px] text-amber-800 mb-1.5">SKILLS</h4>
      <ul className="space-y-0.5 text-[7px] text-slate-600">
        <li>Project Management</li>
        <li>Business Development</li>
        <li>Communication</li>
      </ul>
    </div>
  </div>
);

const SebastianTemplate = () => (
  <div className="h-full flex text-[7px] bg-white overflow-hidden">
    <div className="w-[30%] bg-gradient-to-b from-cyan-500 to-teal-600 text-white p-3">
      <div className="w-10 h-10 rounded-full bg-white/20 mx-auto mb-2 flex items-center justify-center border-2 border-white">
        <span className="text-[9px] font-bold">SW</span>
      </div>
      <h4 className="text-[8px] font-bold mt-2 mb-1.5">DETAILS</h4>
      <div className="space-y-1 text-[7px]">
        <p>Riverdale, NY</p>
        <p>(917) 324-1818</p>
        <p>hw12@yahoo.com</p>
      </div>
      
      <h4 className="text-[8px] font-bold mt-3 mb-1.5">SKILLS</h4>
      <ul className="space-y-0.5">
        {['Communication', 'Motivated', 'MS Office', 'Social Media'].map(skill => (
          <li key={skill} className="flex items-center gap-1 text-[7px]">
            <div className="w-1 h-1 rounded-full bg-white"></div>
            {skill}
          </li>
        ))}
      </ul>
    </div>
    <div className="flex-1 p-3">
      <h3 className="font-bold text-[12px] text-slate-900">SEBASTIAN</h3>
      <h3 className="font-bold text-[12px] text-slate-900 mb-0.5">WILDER</h3>
      <p className="text-cyan-600 text-[8px] font-medium mb-2">Student</p>
      
      <div className="mb-3">
        <h4 className="font-bold text-[9px] text-cyan-600 border-b border-cyan-200 pb-1 mb-1.5">SUMMARY</h4>
        <p className="text-slate-600 leading-relaxed">
          Hardworking student seeking employment with positive attitude and motivation to learn new skills.
        </p>
      </div>
      
      <div className="mb-3">
        <h4 className="font-bold text-[9px] text-cyan-600 border-b border-cyan-200 pb-1 mb-1.5">EXPERIENCE</h4>
        <p className="font-semibold text-[8px]">Sales Associate</p>
        <p className="text-[7px] text-slate-500">Big Apple Bookstore • Sep 2015 - Jun 2018</p>
      </div>
      
      <div>
        <h4 className="font-bold text-[9px] text-cyan-600 border-b border-cyan-200 pb-1 mb-1.5">EDUCATION</h4>
        <p className="font-semibold text-[8px]">Bachelor, Communications</p>
        <p className="text-[7px] text-slate-500">New York University • 2016 - Current</p>
      </div>
    </div>
  </div>
);

// Nebula Template - Modern clean with accent
const NebulaTemplate = () => (
  <div className="h-full text-[7px] bg-white p-4 overflow-hidden">
    <div className="border-l-4 border-indigo-500 pl-3 mb-4">
      <h3 className="font-bold text-[14px] text-slate-800">ALEX JOHNSON</h3>
      <p className="text-indigo-600 text-[9px] font-medium">Full Stack Developer</p>
      <div className="flex gap-3 mt-1 text-[7px] text-slate-500">
        <span>✉ alex@email.com</span>
        <span>☎ (555) 123-4567</span>
      </div>
    </div>
    
    <p className="text-slate-600 border-l-2 border-indigo-200 pl-2 mb-3 italic text-[7px]">
      Passionate developer with 5+ years of experience building scalable web applications.
    </p>
    
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2">
        <h4 className="font-bold text-[8px] text-indigo-600 mb-2 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>EXPERIENCE
        </h4>
        <div className="mb-2 pl-2">
          <p className="font-semibold text-[8px]">Senior Developer</p>
          <p className="text-indigo-500 text-[7px]">TechCorp Inc.</p>
          <p className="text-slate-400 text-[6px]">2020 — Present</p>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-[8px] text-indigo-600 mb-2">SKILLS</h4>
        <div className="space-y-1">
          {['React', 'Node.js', 'Python'].map(skill => (
            <div key={skill}>
              <p className="text-[7px]">{skill}</p>
              <div className="h-1 bg-slate-200 rounded-full">
                <div className="h-full bg-indigo-500 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Stellar Template - Minimal elegant
const StellarTemplate = () => (
  <div className="h-full text-[7px] bg-white p-4 overflow-hidden">
    <div className="text-center mb-4">
      <h3 className="font-light text-[16px] text-slate-800 tracking-wide">EMMA DAVIS</h3>
      <div className="w-8 h-0.5 bg-slate-300 mx-auto my-2"></div>
      <p className="text-slate-500 text-[9px]">Marketing Manager</p>
      <div className="flex justify-center gap-4 mt-2 text-[7px] text-slate-400">
        <span>emma@email.com</span>
        <span>New York, NY</span>
      </div>
    </div>
    
    <p className="text-center text-slate-600 mb-4 max-w-[80%] mx-auto text-[7px]">
      Strategic marketing professional with expertise in digital campaigns and brand development.
    </p>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h4 className="font-semibold text-[7px] uppercase tracking-widest text-slate-400 mb-2">Experience</h4>
        <p className="font-medium text-[8px]">Marketing Manager</p>
        <p className="text-slate-500 text-[7px]">Brand Co. · 2019 — Present</p>
      </div>
      <div>
        <h4 className="font-semibold text-[7px] uppercase tracking-widest text-slate-400 mb-2">Skills</h4>
        <div className="flex flex-wrap gap-1">
          {['SEO', 'Analytics', 'Copywriting'].map(skill => (
            <span key={skill} className="border border-slate-200 px-2 py-0.5 rounded-full text-[6px]">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Orbit Template - Creative with timeline
const OrbitTemplate = () => (
  <div className="h-full text-[7px] bg-gradient-to-br from-rose-50 to-orange-50 overflow-hidden">
    <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white p-3">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold border-2 border-white/50">
          MR
        </div>
        <div>
          <h3 className="font-bold text-[12px]">MAYA RODRIGUEZ</h3>
          <p className="text-rose-100 text-[8px]">UX Designer</p>
        </div>
      </div>
    </div>
    
    <div className="p-3">
      <div className="bg-white p-2 rounded-lg shadow-sm mb-2">
        <p className="text-slate-600 text-[7px]">Creative designer passionate about user-centered design.</p>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 bg-white p-2 rounded-lg shadow-sm">
          <h4 className="font-bold text-[8px] text-rose-600 mb-1">💼 Experience</h4>
          <div className="border-l-2 border-rose-200 pl-2">
            <p className="font-semibold text-[8px]">Lead UX Designer</p>
            <p className="text-rose-500 text-[7px]">Design Studio</p>
          </div>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <h4 className="font-bold text-[8px] text-rose-600 mb-1">⚡ Skills</h4>
          <div className="flex flex-wrap gap-0.5">
            {['Figma', 'UI/UX'].map(skill => (
              <span key={skill} className="bg-rose-100 text-rose-600 px-1 py-0.5 rounded text-[6px]">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const templates = [
  { 
    id: 'cosmos', 
    name: 'Cosmos', 
    category: ['all', 'professional', 'ats', 'simple'],
    component: KellyTemplate,
    description: 'Clean two-column professional layout'
  },
  { 
    id: 'celestial', 
    name: 'Celestial', 
    category: ['all', 'one-column', 'ats', 'professional'],
    component: HowardTemplate,
    description: 'Classic centered single-column design'
  },
  { 
    id: 'galaxy', 
    name: 'Galaxy', 
    category: ['all', 'with-photo', 'modern', 'professional'],
    component: SamanthaTemplate,
    description: 'Modern with photo sidebar'
  },
  { 
    id: 'aurora', 
    name: 'Aurora', 
    category: ['all', 'modern', 'professional'],
    component: JessieTemplate,
    description: 'Modern gradient header design'
  },
  { 
    id: 'lunar', 
    name: 'Lunar', 
    category: ['all', 'professional', 'simple'],
    component: WesTemplate,
    description: 'Two-column with colored sidebar'
  },
  { 
    id: 'eclipse', 
    name: 'Eclipse', 
    category: ['all', 'with-photo', 'simple'],
    component: SebastianTemplate,
    description: 'Entry-level with photo placeholder'
  },
  { 
    id: 'nebula', 
    name: 'Nebula', 
    category: ['all', 'modern', 'professional'],
    component: NebulaTemplate,
    description: 'Modern clean with accent line'
  },
  { 
    id: 'stellar', 
    name: 'Stellar', 
    category: ['all', 'simple', 'ats'],
    component: StellarTemplate,
    description: 'Minimal elegant design'
  },
  { 
    id: 'orbit', 
    name: 'Orbit', 
    category: ['all', 'modern', 'with-photo'],
    component: OrbitTemplate,
    description: 'Creative with timeline design'
  },
];

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.category.includes(selectedCategory);
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (templateId: string) => {
    navigate(`/builder?template=${templateId}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
              Resume templates
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg mb-6">
              Simple to use and ready in minutes resume templates — give it a try for free now!
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </motion.div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template, index) => {
              const TemplateComponent = template.component;
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                >
                  <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-slate-700">
                    {/* Template Preview */}
                    <div className="aspect-[8.5/11] bg-white overflow-hidden">
                      <TemplateComponent />
                    </div>
                    
                    {/* Template Info */}
                    <div className="p-4 border-t dark:border-slate-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{template.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
                    </div>

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center transition-opacity duration-300 ${
                      hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}>
                      <Button
                        onClick={() => handleUseTemplate(template.id)}
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg rounded-lg"
                      >
                        Use This Template
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No templates found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Can't decide? You can always change your template later.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/builder')}
              className="px-8"
            >
              Start with blank resume
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Templates;
