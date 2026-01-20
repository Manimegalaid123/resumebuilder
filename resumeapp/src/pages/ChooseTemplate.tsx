import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, Star, Code, Image, Briefcase, Award, 
  Mail, Phone, MapPin, Calendar, CheckCircle
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', name: 'All Templates', icon: LayoutGrid },
  { id: 'simple', name: 'Simple', icon: Star },
  { id: 'modern', name: 'Modern', icon: Code },
  { id: 'photo', name: 'With photo', icon: Image },
  { id: 'professional', name: 'Professional', icon: Briefcase },
  { id: 'ats', name: 'ATS', icon: Award },
];

// Template 1: Galaxy - Blue sidebar with photo
const GalaxyTemplate = () => (
  <div className="h-full flex text-[6px] bg-white overflow-hidden">
    <div className="w-[35%] bg-gradient-to-b from-blue-600 to-blue-800 text-white p-3">
      <div className="w-10 h-10 rounded-full bg-blue-300 mx-auto mb-2 flex items-center justify-center">
        <span className="text-blue-800 font-bold text-[8px]">SW</span>
      </div>
      <h3 className="text-center font-bold text-[8px] mb-1">Samantha Williams</h3>
      <p className="text-center text-blue-200 text-[5px] mb-3">Senior Analyst</p>
      
      <div className="space-y-2">
        <div className="flex items-center gap-1 text-[5px]">
          <MapPin className="w-2 h-2" />
          <span>New York, NY</span>
        </div>
        <div className="flex items-center gap-1 text-[5px]">
          <Mail className="w-2 h-2" />
          <span>samantha@email.com</span>
        </div>
        <div className="flex items-center gap-1 text-[5px]">
          <Phone className="w-2 h-2" />
          <span>(555) 789-1234</span>
        </div>
      </div>
      
      <div className="mt-3">
        <h4 className="font-bold text-[6px] border-b border-blue-400 pb-1 mb-1">SKILLS</h4>
        <div className="space-y-1">
          {['Project Management', 'Data Analysis', 'SQL & Excel', 'Business Intelligence'].map(skill => (
            <div key={skill} className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-blue-300"></div>
              <span className="text-[5px]">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex-1 p-3">
      <h4 className="font-bold text-[7px] text-gray-800 border-b border-gray-300 pb-1 mb-1">SUMMARY</h4>
      <p className="text-gray-600 text-[5px] leading-relaxed mb-2">
        Senior Analyst with 5+ years of experience in data analysis and business intelligence.
      </p>
      
      <h4 className="font-bold text-[7px] text-gray-800 border-b border-gray-300 pb-1 mb-1">EXPERIENCE</h4>
      <div className="mb-2">
        <div className="flex justify-between">
          <span className="font-semibold text-[6px]">Senior Analyst</span>
          <span className="text-[5px] text-gray-500">Jul 2021 - Current</span>
        </div>
        <p className="text-blue-600 text-[5px]">Loom & Lantern Co.</p>
      </div>
      
      <h4 className="font-bold text-[7px] text-gray-800 border-b border-gray-300 pb-1 mb-1">EDUCATION</h4>
      <p className="font-semibold text-[6px]">New York University</p>
      <p className="text-[5px] text-gray-500">Bachelor of Science in Economics</p>
    </div>
  </div>
);

// Template 2: Cosmos - Left sidebar dark with icons
const CosmosTemplate = () => (
  <div className="h-full flex text-[6px] bg-white overflow-hidden">
    <div className="w-[32%] bg-slate-800 text-white p-3">
      <h3 className="font-bold text-[9px] tracking-wide">KELLY</h3>
      <h3 className="font-bold text-[9px] tracking-wide mb-1">BLACKWELL</h3>
      <p className="text-slate-300 text-[5px] mb-3">Administrative Assistant</p>
      
      <div className="space-y-2 mb-3">
        <h4 className="text-[6px] font-bold border-b border-slate-600 pb-1">DETAILS</h4>
        <div className="flex items-center gap-1 text-[5px]">
          <Mail className="w-2 h-2 text-slate-400" />
          <span>kelly@example.com</span>
        </div>
        <div className="flex items-center gap-1 text-[5px]">
          <Phone className="w-2 h-2 text-slate-400" />
          <span>(210) 286-1624</span>
        </div>
      </div>
      
      <h4 className="text-[6px] font-bold border-b border-slate-600 pb-1 mb-1">SKILLS</h4>
      <div className="space-y-1">
        {['Analytical Thinking', 'Team Leadership', 'Communication', 'MS Office'].map(skill => (
          <div key={skill} className="flex items-center gap-1">
            <CheckCircle className="w-2 h-2 text-green-400" />
            <span className="text-[5px]">{skill}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="flex-1 p-3">
      <h4 className="font-bold text-[7px] text-slate-800 border-b-2 border-slate-800 pb-1 mb-1">SUMMARY</h4>
      <p className="text-gray-600 text-[5px] leading-relaxed mb-2">
        Administrative assistant with 9+ years of experience organizing presentations and reports.
      </p>
      
      <h4 className="font-bold text-[7px] text-slate-800 border-b-2 border-slate-800 pb-1 mb-1">EXPERIENCE</h4>
      <div className="mb-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-slate-800"></div>
          <span className="font-semibold text-[6px]">Administrative Assistant</span>
        </div>
        <p className="text-slate-600 text-[5px] ml-3">Redford & Sons • Sep 2017 - Current</p>
      </div>
      <div className="mb-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-slate-800"></div>
          <span className="font-semibold text-[6px]">Secretary</span>
        </div>
        <p className="text-slate-600 text-[5px] ml-3">Bright Spot Ltd • Jun 2016 - Aug 2017</p>
      </div>
      
      <h4 className="font-bold text-[7px] text-slate-800 border-b-2 border-slate-800 pb-1 mb-1">EDUCATION</h4>
      <p className="font-semibold text-[6px]">Bachelor of Arts, Finance</p>
      <p className="text-[5px] text-gray-500">Brown University • 2004 - 2009</p>
    </div>
  </div>
);

// Template 3: Pulsar - Clean single column professional
const PulsarTemplate = () => (
  <div className="h-full text-[6px] bg-white p-3 overflow-hidden">
    <div className="text-center mb-2 border-b-2 border-emerald-500 pb-2">
      <p className="text-emerald-600 text-[6px] font-medium">Senior Sales Associate</p>
      <h3 className="font-bold text-[10px] text-gray-900">Samantha Williams</h3>
      <div className="flex justify-center gap-3 mt-1 text-[5px] text-gray-500">
        <span>New York, NY</span>
        <span>•</span>
        <span>samantha@email.com</span>
        <span>•</span>
        <span>(555) 789-1234</span>
      </div>
    </div>
    
    <div className="mb-2">
      <h4 className="font-bold text-[7px] text-emerald-600 mb-1">SUMMARY</h4>
      <p className="text-gray-600 text-[5px] leading-relaxed">
        Senior Analyst with 5+ years of experience in data analysis and process optimization.
      </p>
    </div>
    
    <div className="mb-2">
      <h4 className="font-bold text-[7px] text-emerald-600 mb-1">EXPERIENCE</h4>
      <div className="mb-1">
        <div className="flex justify-between">
          <span className="font-bold text-[6px]">SENIOR ANALYST | Jul 2021 - Current</span>
        </div>
        <p className="text-gray-700 text-[5px]">Loom & Lantern Co. - New York, NY</p>
        <ul className="text-[5px] text-gray-600 mt-1 list-disc list-inside">
          <li>Spearhead data analysis and reporting for key business functions</li>
        </ul>
      </div>
    </div>
    
    <div className="mb-2">
      <h4 className="font-bold text-[7px] text-emerald-600 mb-1">EDUCATION</h4>
      <p className="font-semibold text-[6px]">New York University - Bachelor of Science</p>
      <p className="text-[5px] text-gray-500">Economics | 2013 - 2017</p>
    </div>
    
    <div>
      <h4 className="font-bold text-[7px] text-emerald-600 mb-1">SKILLS</h4>
      <div className="flex flex-wrap gap-1">
        {['Project Management', 'SQL & Excel', 'Financial Analysis', 'Data Analysis'].map(skill => (
          <span key={skill} className="bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded text-[5px]">
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Template 4: Lunar - Two column with right sidebar
const LunarTemplate = () => (
  <div className="h-full flex text-[6px] bg-white overflow-hidden">
    <div className="flex-1 p-3">
      <h3 className="font-bold text-[10px] text-gray-900">WES TURNER</h3>
      <p className="text-amber-600 text-[6px] font-medium mb-2">SALES MANAGER</p>
      
      <h4 className="font-bold text-[6px] text-gray-800 bg-gray-100 px-1 py-0.5 mb-1">SUMMARY</h4>
      <p className="text-gray-600 text-[5px] leading-relaxed mb-2">
        Experienced Sales Manager with five years of industry experience overseeing sales figures.
      </p>
      
      <h4 className="font-bold text-[6px] text-gray-800 bg-gray-100 px-1 py-0.5 mb-1">EXPERIENCE</h4>
      <div className="mb-2">
        <p className="font-semibold text-[6px]">Sales Manager, Winthrop and Lee</p>
        <p className="text-[5px] text-gray-500">Boulder • Nov 2014 - Sep 2019</p>
        <ul className="text-[5px] text-gray-600 list-disc list-inside">
          <li>Achieved 25% increase in sales revenue</li>
        </ul>
      </div>
      
      <h4 className="font-bold text-[6px] text-gray-800 bg-gray-100 px-1 py-0.5 mb-1">EDUCATION</h4>
      <p className="font-semibold text-[5px]">Colorado College</p>
      <p className="text-[5px] text-gray-500">Bachelor of Marketing • 2008 - 2010</p>
    </div>
    <div className="w-[30%] bg-amber-50 p-2">
      <h4 className="font-bold text-[6px] text-amber-800 mb-1">DETAILS</h4>
      <div className="space-y-1 text-[5px] text-gray-600 mb-2">
        <p>Boulder, CO 80302</p>
        <p>(720) 315-8237</p>
        <p>wes.turner@gmail.com</p>
      </div>
      
      <h4 className="font-bold text-[6px] text-amber-800 mb-1">SKILLS</h4>
      <div className="space-y-1">
        {['Project Management', 'Business Development', 'Industry Knowledge', 'Communication'].map(skill => (
          <p key={skill} className="text-[5px] text-gray-600">{skill}</p>
        ))}
      </div>
    </div>
  </div>
);

// Template 5: Aurora - Modern with colored header
const AuroraTemplate = () => (
  <div className="h-full text-[6px] bg-white overflow-hidden">
    <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-3">
      <h3 className="font-bold text-[10px]">Jessie Smith</h3>
      <p className="text-violet-200 text-[6px]">Human Resource Manager</p>
      <div className="flex gap-3 mt-1 text-[5px] text-violet-200">
        <span>Plano, TX</span>
        <span>email@youremail.com</span>
        <span>(469) 385-2948</span>
      </div>
    </div>
    <div className="p-3">
      <h4 className="font-bold text-[7px] text-violet-600 border-b border-violet-200 pb-1 mb-1">Summary</h4>
      <p className="text-gray-600 text-[5px] leading-relaxed mb-2">
        HR generalist with 8 years of experience in hiring, training, and employee management.
      </p>
      
      <h4 className="font-bold text-[7px] text-violet-600 border-b border-violet-200 pb-1 mb-1">Experience</h4>
      <div className="mb-2">
        <div className="flex justify-between">
          <span className="font-semibold text-[6px]">Human Resource Manager</span>
          <span className="text-[5px] text-gray-500">04/2019 - Current</span>
        </div>
        <p className="text-violet-600 text-[5px]">Jim's Widget Factory, Plano, TX</p>
      </div>
      
      <h4 className="font-bold text-[7px] text-violet-600 border-b border-violet-200 pb-1 mb-1">Education</h4>
      <p className="font-semibold text-[6px]">Master, Human Resources</p>
      <p className="text-[5px] text-gray-500">The University of Texas • 2007 - 2011</p>
      
      <h4 className="font-bold text-[7px] text-violet-600 border-b border-violet-200 pb-1 mt-2 mb-1">Skills</h4>
      <div className="flex flex-wrap gap-1">
        {['Detail-oriented', 'Analytics', 'Communication', 'Platform expertise'].map(skill => (
          <span key={skill} className="bg-violet-50 text-violet-600 px-1 py-0.5 rounded text-[5px]">
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Template 6: Eclipse - Student/Entry level with photo placeholder
const EclipseTemplate = () => (
  <div className="h-full flex text-[6px] bg-white overflow-hidden">
    <div className="w-[30%] bg-gradient-to-b from-cyan-500 to-teal-600 text-white p-3">
      <div className="w-10 h-10 rounded-full bg-white/20 mx-auto mb-2 flex items-center justify-center border-2 border-white">
        <span className="text-[8px] font-bold">SW</span>
      </div>
      <h4 className="text-[6px] font-bold mt-3 mb-1">DETAILS</h4>
      <div className="space-y-1 text-[5px]">
        <p>Riverdale, NY 10471</p>
        <p>(917) 324-1818</p>
        <p>hw12@yahoo.com</p>
      </div>
      
      <h4 className="text-[6px] font-bold mt-3 mb-1">SKILLS</h4>
      <div className="space-y-1">
        {['Communication', 'Motivated', 'Office Tech', 'Social Media'].map(skill => (
          <div key={skill} className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-white"></div>
            <span className="text-[5px]">{skill}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="flex-1 p-3">
      <h3 className="font-bold text-[10px] text-gray-900">SEBASTIAN</h3>
      <h3 className="font-bold text-[10px] text-gray-900 mb-0.5">WILDER</h3>
      <p className="text-cyan-600 text-[6px] font-medium mb-2">Student</p>
      
      <h4 className="font-bold text-[7px] text-cyan-600 border-b border-cyan-200 pb-1 mb-1">SUMMARY</h4>
      <p className="text-gray-600 text-[5px] leading-relaxed mb-2">
        Hardworking Student seeking employment with positive attitude and motivation to learn.
      </p>
      
      <h4 className="font-bold text-[7px] text-cyan-600 border-b border-cyan-200 pb-1 mb-1">EXPERIENCE</h4>
      <p className="font-semibold text-[6px]">Sales Associate</p>
      <p className="text-[5px] text-gray-500">Big Apple Bookstore • Sep 2015 - Jun 2018</p>
      
      <h4 className="font-bold text-[7px] text-cyan-600 border-b border-cyan-200 pb-1 mt-2 mb-1">EDUCATION</h4>
      <p className="font-semibold text-[5px]">Bachelor, Communications</p>
      <p className="text-[5px] text-gray-500">New York University • 2016 - Current</p>
    </div>
  </div>
);

// Template 7: Nebula - Right aligned modern
const NebulaTemplate = () => (
  <div className="h-full text-[6px] bg-gradient-to-br from-slate-50 to-slate-100 p-3 overflow-hidden">
    <div className="flex gap-2 mb-3">
      <div className="flex-1">
        <h3 className="font-bold text-[10px] text-rose-600">Wes Turner</h3>
        <p className="text-gray-600 text-[6px]">Sales Manager</p>
      </div>
      <div className="text-right text-[5px] text-gray-500">
        <p>8790 Sugarbean Lane, Boulder</p>
        <p>(720) 315-8237</p>
        <p>wes.turner@gmail.com</p>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-2">
        <h4 className="font-bold text-[7px] text-rose-600 mb-1">SUMMARY</h4>
        <p className="text-gray-600 text-[5px] leading-relaxed mb-2">
          Experienced Sales Manager with five years of industry experience.
        </p>
        
        <h4 className="font-bold text-[7px] text-rose-600 mb-1">EXPERIENCE</h4>
        <div className="relative pl-2 border-l-2 border-rose-200">
          <div className="mb-1">
            <p className="font-semibold text-[6px]">Sales Manager</p>
            <p className="text-[5px] text-gray-500">Winthrop and Lee • Nov 2014 - Sep 2019</p>
          </div>
          <div className="mb-1">
            <p className="font-semibold text-[6px]">Sales Manager</p>
            <p className="text-[5px] text-gray-500">Lola & Co • Sep 2010 - Oct 2014</p>
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-[7px] text-rose-600 mb-1">SKILLS</h4>
        <div className="space-y-1">
          {['Project Management', 'Business Dev', 'Communication', 'Problem Solving'].map(skill => (
            <p key={skill} className="text-[5px] text-gray-600 bg-white rounded px-1 py-0.5">{skill}</p>
          ))}
        </div>
        
        <h4 className="font-bold text-[7px] text-rose-600 mt-2 mb-1">EDUCATION</h4>
        <p className="text-[5px]">Colorado College</p>
        <p className="text-[5px] text-gray-500">B. Marketing</p>
      </div>
    </div>
  </div>
);

// Template 8: Solstice - Clean minimal horizontal sections
const SolsticeTemplate = () => (
  <div className="h-full text-[6px] bg-white p-3 overflow-hidden">
    <div className="border-b-2 border-indigo-600 pb-2 mb-2">
      <h3 className="font-bold text-[10px] text-gray-900">Elsa Williams</h3>
      <div className="flex items-center gap-2 text-[5px] text-gray-500">
        <span>elsa_williams2@gmail.com</span>
        <span>•</span>
        <span>(845) 763-1264</span>
        <span>•</span>
        <span>Poughkeepsie, NY</span>
      </div>
      <p className="text-indigo-600 font-medium text-[6px] mt-1">Physical Therapist</p>
    </div>
    
    <h4 className="font-bold text-[7px] text-indigo-600 mb-1">Summary</h4>
    <p className="text-gray-600 text-[5px] leading-relaxed mb-2">
      Dedicated Physical Therapist with 6+ years of experience in patient evaluation and treatment.
    </p>
    
    <h4 className="font-bold text-[7px] text-indigo-600 mb-1">Experience</h4>
    <div className="flex gap-2 mb-2">
      <div className="flex-1">
        <p className="font-semibold text-[6px]">Physical Therapist</p>
        <p className="text-indigo-500 text-[5px]">Care Mount Medical Center</p>
      </div>
      <p className="text-[5px] text-gray-500">Jan 2013 - Aug 2019</p>
    </div>
    
    <h4 className="font-bold text-[7px] text-indigo-600 mb-1">Education</h4>
    <p className="font-semibold text-[6px]">Marist College - Master of Physical Therapy</p>
    <p className="text-[5px] text-gray-500">2013 - 2017</p>
    
    <h4 className="font-bold text-[7px] text-indigo-600 mt-2 mb-1">Skills</h4>
    <div className="flex gap-1">
      {['Patient Education', 'Physical Evaluations', 'Communication', 'Treatment Plans'].map(skill => (
        <span key={skill} className="border border-indigo-200 text-indigo-600 px-1 py-0.5 rounded text-[5px]">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

// Template 9: Comet - Modern card style
const CometTemplate = () => (
  <div className="h-full text-[6px] bg-slate-50 p-2 overflow-hidden">
    <div className="bg-white rounded-lg p-2 shadow-sm mb-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-[8px]">
          SW
        </div>
        <div>
          <h3 className="font-bold text-[9px] text-gray-900">Samantha Williams</h3>
          <p className="text-orange-500 text-[5px]">Senior Sales Associate</p>
        </div>
      </div>
      <div className="flex gap-2 mt-1 text-[5px] text-gray-500">
        <span className="flex items-center gap-0.5"><Mail className="w-2 h-2"/> samantha@email.com</span>
        <span className="flex items-center gap-0.5"><Phone className="w-2 h-2"/> (555) 789-1234</span>
      </div>
    </div>
    
    <div className="bg-white rounded-lg p-2 shadow-sm mb-2">
      <h4 className="font-bold text-[7px] text-orange-500 mb-1">SUMMARY</h4>
      <p className="text-gray-600 text-[5px]">Senior Analyst with 5+ years of experience in data analysis.</p>
    </div>
    
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-white rounded-lg p-2 shadow-sm">
        <h4 className="font-bold text-[7px] text-orange-500 mb-1">EXPERIENCE</h4>
        <p className="font-semibold text-[5px]">Senior Analyst</p>
        <p className="text-[5px] text-gray-500">Loom & Lantern Co.</p>
        <p className="text-[5px] text-gray-400">Jul 2021 - Current</p>
      </div>
      <div className="bg-white rounded-lg p-2 shadow-sm">
        <h4 className="font-bold text-[7px] text-orange-500 mb-1">EDUCATION</h4>
        <p className="font-semibold text-[5px]">NYU</p>
        <p className="text-[5px] text-gray-500">B.S. Economics</p>
        <h4 className="font-bold text-[6px] text-orange-500 mt-1 mb-0.5">SKILLS</h4>
        <p className="text-[5px] text-gray-600">SQL, Excel, Analysis</p>
      </div>
    </div>
  </div>
);

// Template 10: Celestial - Classic professional
const CelestialTemplate = () => (
  <div className="h-full text-[6px] bg-white p-3 overflow-hidden">
    <div className="text-center border-b border-gray-300 pb-2 mb-2">
      <h3 className="font-bold text-[11px] text-gray-900 tracking-wide">HOWARD JONES</h3>
      <p className="text-gray-600 text-[6px] mt-0.5">Lawyer</p>
      <div className="flex justify-center gap-3 mt-1 text-[5px] text-gray-500">
        <span>howard.jones@gmail.com</span>
        <span>|</span>
        <span>(415) 555-2674</span>
        <span>|</span>
        <span>San Francisco, CA</span>
      </div>
    </div>
    
    <h4 className="font-bold text-[7px] text-gray-800 border-b border-gray-200 pb-0.5 mb-1">SUMMARY</h4>
    <p className="text-gray-600 text-[5px] leading-relaxed mb-2">
      Experienced Lawyer with a passion for justice. Highly organized and skilled in public speaking.
    </p>
    
    <h4 className="font-bold text-[7px] text-gray-800 border-b border-gray-200 pb-0.5 mb-1">EXPERIENCE</h4>
    <div className="mb-1">
      <div className="flex justify-between">
        <span className="font-semibold text-[6px]">Lawyer, Madison and Fletcher Attorneys</span>
        <span className="text-[5px] text-gray-500">Dec 2010 - Aug 2018</span>
      </div>
      <ul className="text-[5px] text-gray-600 list-disc list-inside">
        <li>Prepared legal documents and presented cases</li>
      </ul>
    </div>
    
    <h4 className="font-bold text-[7px] text-gray-800 border-b border-gray-200 pb-0.5 mb-1">EDUCATION</h4>
    <p className="font-semibold text-[6px]">New York Law School</p>
    <p className="text-[5px] text-gray-500">Juris Doctor • 2003 - 2006</p>
    
    <h4 className="font-bold text-[7px] text-gray-800 border-b border-gray-200 pb-0.5 mt-2 mb-1">SKILLS</h4>
    <p className="text-[5px] text-gray-600">Regulatory Compliance • Contract Negotiation • Family Law • Mediation</p>
  </div>
);

// Template 11: Astral - Creative with icons
const AstralTemplate = () => (
  <div className="h-full flex text-[6px] bg-white overflow-hidden">
    <div className="w-[30%] bg-gradient-to-b from-pink-500 to-rose-600 text-white p-2">
      <div className="w-10 h-10 rounded-full bg-white/20 mx-auto mb-2 border-2 border-white flex items-center justify-center">
        <span className="text-[8px] font-bold">JS</span>
      </div>
      <h3 className="text-center font-bold text-[8px]">Jessie</h3>
      <h3 className="text-center font-bold text-[8px] mb-1">Smith</h3>
      <p className="text-center text-pink-200 text-[5px] mb-2">HR Manager</p>
      
      <h4 className="text-[5px] font-bold mb-1">Details</h4>
      <div className="space-y-1 text-[5px]">
        <div className="flex items-center gap-1">
          <Mail className="w-2 h-2" />
          <span className="truncate">email@email.com</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-2 h-2" />
          <span>New York, USA</span>
        </div>
      </div>
      
      <h4 className="text-[5px] font-bold mt-2 mb-1">Skills</h4>
      {['Detail-oriented', 'Analytics', 'Communication'].map(skill => (
        <p key={skill} className="text-[5px] text-pink-100">{skill}</p>
      ))}
    </div>
    <div className="flex-1 p-2">
      <div className="flex items-center gap-1 mb-1">
        <div className="w-3 h-3 rounded bg-pink-100 flex items-center justify-center">
          <span className="text-pink-500 text-[6px]">▸</span>
        </div>
        <h4 className="font-bold text-[7px] text-gray-800">Summary</h4>
      </div>
      <p className="text-gray-600 text-[5px] leading-relaxed mb-2">
        HR generalist with 8 years of experience in hiring and employee management.
      </p>
      
      <div className="flex items-center gap-1 mb-1">
        <div className="w-3 h-3 rounded bg-pink-100 flex items-center justify-center">
          <Calendar className="text-pink-500 w-2 h-2" />
        </div>
        <h4 className="font-bold text-[7px] text-gray-800">Experience</h4>
      </div>
      <p className="font-semibold text-[6px]">HR Manager • Apr 2019 - Current</p>
      <p className="text-pink-500 text-[5px]">Jim's Widget Factory</p>
      
      <div className="flex items-center gap-1 mt-2 mb-1">
        <div className="w-3 h-3 rounded bg-pink-100 flex items-center justify-center">
          <Award className="text-pink-500 w-2 h-2" />
        </div>
        <h4 className="font-bold text-[7px] text-gray-800">Education</h4>
      </div>
      <p className="text-[5px]">Master, Human Resources</p>
      <p className="text-[5px] text-gray-500">University of Texas • 2007 - 2011</p>
    </div>
  </div>
);

// Template 12: Astralis - Creative portfolio style
const AstralisTemplate = () => (
  <div className="h-full flex text-[6px] bg-slate-900 overflow-hidden">
    <div className="w-[35%] bg-slate-800 p-3 text-white">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mx-auto mb-2 flex items-center justify-center">
        <span className="text-slate-900 font-bold text-[8px]">DG</span>
      </div>
      <h3 className="text-center font-bold text-[9px]">Daniel</h3>
      <h3 className="text-center font-bold text-[9px] mb-1">Gallego</h3>
      <p className="text-center text-yellow-400 text-[5px] mb-2">Professional Model</p>
      
      <h4 className="text-[6px] font-bold text-yellow-400 mb-1">Details</h4>
      <p className="text-[5px] text-gray-300">+1 234-567-890</p>
      <p className="text-[5px] text-gray-300">hello@example.com</p>
      <p className="text-[5px] text-gray-300">Any City, 123</p>
      
      <h4 className="text-[6px] font-bold text-yellow-400 mt-2 mb-1">Skills</h4>
      <div className="flex flex-wrap gap-1">
        {['Model', 'Runway', 'Posing'].map(skill => (
          <span key={skill} className="bg-yellow-400/20 text-yellow-300 px-1 py-0.5 rounded text-[5px]">
            {skill}
          </span>
        ))}
      </div>
    </div>
    <div className="flex-1 p-3 text-white">
      <h4 className="font-bold text-[7px] text-yellow-400 flex items-center gap-1 mb-1">
        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
        Summary
      </h4>
      <p className="text-gray-300 text-[5px] leading-relaxed mb-2">
        Innovative professional striving to make impact. Adept in various creative fields.
      </p>
      
      <h4 className="font-bold text-[7px] text-yellow-400 flex items-center gap-1 mb-1">
        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
        Experience
      </h4>
      <p className="font-semibold text-[6px]">Runway Model, Salford & Co.</p>
      <p className="text-[5px] text-gray-400">Sep 2013 - Current • New York</p>
      <p className="text-[5px] text-gray-300 mt-0.5">Walked for renowned designers at NYFW</p>
      
      <h4 className="font-bold text-[7px] text-yellow-400 flex items-center gap-1 mt-2 mb-1">
        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
        Education
      </h4>
      <p className="font-semibold text-[6px]">Bachelor, Arts</p>
      <p className="text-[5px] text-gray-400">Fashion Institute of Technology • 2013 - 2017</p>
    </div>
  </div>
);

const templates = [
  { id: 'galaxy', name: 'Galaxy', category: ['photo', 'professional', 'modern'], component: GalaxyTemplate },
  { id: 'cosmos', name: 'Cosmos', category: ['professional', 'ats', 'simple'], component: CosmosTemplate },
  { id: 'pulsar', name: 'Pulsar', category: ['simple', 'ats', 'professional'], component: PulsarTemplate },
  { id: 'lunar', name: 'Lunar', category: ['professional', 'modern'], component: LunarTemplate },
  { id: 'aurora', name: 'Aurora', category: ['modern', 'professional'], component: AuroraTemplate },
  { id: 'eclipse', name: 'Eclipse', category: ['photo', 'simple'], component: EclipseTemplate },
  { id: 'nebula', name: 'Nebula', category: ['modern', 'professional'], component: NebulaTemplate },
  { id: 'solstice', name: 'Solstice', category: ['simple', 'ats'], component: SolsticeTemplate },
  { id: 'comet', name: 'Comet', category: ['modern', 'photo'], component: CometTemplate },
  { id: 'celestial', name: 'Celestial', category: ['ats', 'simple', 'professional'], component: CelestialTemplate },
  { id: 'astral', name: 'Astral', category: ['photo', 'modern'], component: AstralTemplate },
  { id: 'astralis', name: 'Astralis', category: ['modern', 'photo'], component: AstralisTemplate },
];

const ChooseTemplate: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category.includes(selectedCategory));

  const handleUseTemplate = (templateId: string) => {
    navigate(`/builder?template=${templateId}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Resume templates
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple to use and ready in minutes resume templates — give it a try for free now!
            </p>
            <button className="text-primary hover:underline mt-2 text-sm">
              Choose later
            </button>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
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
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </motion.div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template, index) => {
              const TemplateComponent = template.component;
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                    selectedTemplate === template.id ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  {/* Template Preview */}
                  <div className="aspect-[8.5/11] bg-gray-100 overflow-hidden">
                    <TemplateComponent />
                  </div>

                  {/* Template Name */}
                  <div className="p-4 border-t">
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <div className="flex gap-1 mt-1">
                      {template.category.slice(0, 2).map(cat => (
                        <span key={cat} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-20">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUseTemplate(template.id);
                      }}
                      className="bg-primary hover:bg-primary/90 text-white px-6"
                    >
                      Use This Template
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 mb-4">
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

export default ChooseTemplate;
