'use client';

import { useState } from 'react';
import AttendanceForm from '@/components/AttendanceForm';
import Dashboard from '@/components/Dashboard';
import { LayoutDashboard, ClipboardCheck } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'attendance' | 'dashboard'>('attendance');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                Sistem Absensi Siswa
              </h1>
            </div>
            <div className="flex space-x-2 md:space-x-4">
              <button
                onClick={() => setActiveTab('attendance')}
                className={`flex items-center px-3 md:px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'attendance'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ClipboardCheck className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Absensi</span>
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center px-3 md:px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <LayoutDashboard className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="py-8">
        {activeTab === 'attendance' ? <AttendanceForm /> : <Dashboard />}
      </div>
    </main>
  );
}
