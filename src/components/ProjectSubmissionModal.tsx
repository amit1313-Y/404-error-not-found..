import React from 'react';
import { X, Award, CheckCircle2, Database, Layers, Code2, Users, FileCheck } from 'lucide-react';
import { ProjectTeam } from '../types';

interface ProjectSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  team?: ProjectTeam;
}

export const ProjectSubmissionModal: React.FC<ProjectSubmissionModalProps> = ({
  isOpen,
  onClose,
  team
}) => {
  if (!isOpen) return null;

  const teamName = team?.teamName || '404 ERROR NOT FOUND';
  const teamId = team?.teamId || 'TEAM-2029-GUVI-042';
  const teamLeader = team?.teamLeader || { name: 'Partik', rollNumber: '' };
  const teamMembers = team?.teamMembers || [
    { name: 'Amit', rollNumber: '' },
    { name: 'Kartik', rollNumber: '' },
    { name: 'Ashwani', rollNumber: '' }
  ];
  const facultyGuide = team?.facultyGuide || {
    name: 'Anjali Kapoor',
    department: 'Computer Science & Engineering'
  };
  const department = team?.department || facultyGuide.department || 'Computer Science & Engineering';
  const status = team?.status || 'Approved in Review Zero';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 my-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luxury Top Banner */}
        <div className="bg-[#0B132B] text-white px-6 py-5 flex items-center justify-between border-b border-amber-500/25">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-white">
              Official Team: <span className="font-mono tracking-wider font-bold text-amber-300">{teamName}</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs">
          {/* Academic Registration & Team Details */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-700" />
              Academic Registration & Team Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Team Name & Registration</span>
                <span className="font-mono font-bold text-slate-900 text-sm block">{teamName}</span>
                <span className="text-[10px] text-slate-600 font-mono block">Team ID: {teamId}</span>
                <span className="text-[10px] text-emerald-700 font-semibold block">{status}</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Team Leader</span>
                <span className="font-semibold text-slate-900 text-sm block">{teamLeader.name}</span>
                {teamLeader.rollNumber ? (
                  <span className="text-[10px] text-slate-500 block font-mono">Roll: {teamLeader.rollNumber}</span>
                ) : null}
                <span className="text-[10px] text-amber-700 block">Section 30 · Galgotias University</span>
                <span className="text-[10px] text-slate-500 block">{department}</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Team Members</span>
                <span className="text-slate-900 font-semibold text-sm leading-tight block">
                  {teamMembers.map(m => m.name).join(', ')}
                </span>
                <span className="text-[10px] text-amber-700 block">Section 30 · Galgotias University</span>
                <span className="text-[10px] text-slate-500 block">Department: {department}</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Faculty Guide / Mentor</span>
                <span className="font-semibold text-slate-900 text-sm block">{facultyGuide.name}</span>
                <span className="text-[10px] text-slate-600 block">{facultyGuide.department || department}</span>
                <span className="text-[10px] text-amber-700 block">Galgotias University</span>
              </div>
            </div>
          </div>

          {/* Project Architecture & Modules */}
          <div>
            <h3 className="text-sm font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-700" />
              1. System Architecture & Functional Implementation Modules
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-900 block text-xs">
                  Module A: Guest Discovery & Reservation Engine
                </span>
                <p className="text-slate-600 mt-1 leading-relaxed font-light">
                  Real-time suite availability search by date, party size, and tier. Multi-step reservation checkout with dynamic GST (12%), resort cess, customizable Indian hospitality add-ons (breakfast, airport cab, spa, late check-out), and digital voucher slip generation with reference ID (e.g. GV-2029-XXXX).
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-900 block text-xs">
                  Module B: Front-Desk Property Management (PMS)
                </span>
                <p className="text-slate-600 mt-1 leading-relaxed font-light">
                  Live occupancy scoreboard, ADR calculation in Indian Rupees (₹), and reservation master ledger. Front desk staff can execute one-click Check-In, instant billing folio inspection, and walk-in guest intake.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-900 block text-xs">
                  Module C: Interactive Room Rack & Floor Matrix
                </span>
                <p className="text-slate-600 mt-1 leading-relaxed font-light">
                  Visual floor-by-floor room grid (Floors 1-3) tracking states: Available, Occupied, Reserved, Cleaning, and Maintenance. Front desk can manually override room statuses with real-time reactivity.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-900 block text-xs">
                  Module D: Housekeeping & Turnover Dispatch Pipeline
                </span>
                <p className="text-slate-600 mt-1 leading-relaxed font-light">
                  When a guest checks out, the PMS automatically shifts the room into turnover cleaning and queues a priority task for staff. Once staff marks inspection completed, the room automatically returns to available status.
                </p>
              </div>
            </div>
          </div>

          {/* Database Schema / Data Model */}
          <div>
            <h3 className="text-sm font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-700" />
              2. Data Schema & Relational Model (ER Architecture)
            </h3>
            
            <div className="p-4 bg-[#0B132B] text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto space-y-2 border border-amber-500/20">
              <div className="text-amber-400 font-bold">// Relational Entities & Attributes (INR Currencies & DD-MM-YYYY):</div>
              <div>
                <span className="text-emerald-400">TABLE Rooms</span> (id PK, number VARCHAR, type ENUM, priceINR DECIMAL, floor INT, capacity INT, status ENUM, amenities JSON);
              </div>
              <div>
                <span className="text-emerald-400">TABLE Bookings</span> (id PK, bookingReference VARCHAR, guestName VARCHAR, guestEmail VARCHAR, guestPhone VARCHAR, roomId FK, checkIn DATE, checkOut DATE, nights INT, totalAmountINR DECIMAL, status ENUM, paymentStatus ENUM);
              </div>
              <div>
                <span className="text-emerald-400">TABLE HousekeepingTasks</span> (id PK, roomId FK, taskType ENUM, priority ENUM, assignedStaff VARCHAR, status ENUM, scheduledTime VARCHAR);
              </div>
              <div>
                <span className="text-emerald-400">TABLE AddOns</span> (bookingId FK, breakfast BOOL, airportPickup BOOL, spaPackage BOOL, lateCheckout BOOL);
              </div>
            </div>
          </div>

          {/* Project Development and Implementation */}
          <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
            <h3 className="text-sm font-serif font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-700" />
              Project Development and Implementation
            </h3>
            <p className="text-slate-700 text-xs leading-relaxed font-normal">
              “This project was developed and implemented by Team 404 ERROR NOT FOUND as an academic project for Galgotias University, Section 30. The team worked on the website’s design, implementation, functionality, testing, and refinement.”
            </p>
          </div>

          {/* Tech Stack & Academic Evaluation Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-serif font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-700" />
                3. Technology Stack & Localized Standards
              </h3>
              <ul className="space-y-1.5 text-slate-600 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <strong>Frontend:</strong> React 19 SPA + TypeScript + Vite
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <strong>Localization:</strong> Indian Rupee (₹ INR) currency, DD-MM-YYYY dates, Asia/Kolkata timezone
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <strong>Styling:</strong> Tailwind CSS v4 design system with Luxury Navy & Gold palette
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <strong>State & Persistence:</strong> Reactive State + LocalStorage engine with INR initial dataset seed & instant reset
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-serif font-bold text-slate-900 mb-2 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-700" />
                4. Academic Milestones & Review Criteria
              </h3>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Team Formation & Review Zero: Approved (05-10-2026)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Review One Working Prototype: Ready for Evaluation (10-10-2026)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Dual Guest Reservation & Front-Desk PMS Lifecycle functional</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Final Project Submission & Viva Preparation: On Track</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
