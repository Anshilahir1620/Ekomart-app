'use client'

import { Users, FileText, Bell } from "lucide-react";

export default function ModernDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-dark mb-2">Welcome to Your Dashboard</h1>
        <p className="text-neutral-dark">This is your main content area with responsive sidebar and header.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-neutral-light shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-primary-dark mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-primary">2,543</p>
          <p className="text-sm text-neutral-dark mt-2">↑ 12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-neutral-light shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-secondary-orange rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-primary-dark mb-2">Documents</h3>
          <p className="text-3xl font-bold text-secondary-orange">1,234</p>
          <p className="text-sm text-neutral-dark mt-2">↑ 8% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-neutral-light shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-secondary-red rounded-lg flex items-center justify-center mb-4">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-primary-dark mb-2">Notifications</h3>
          <p className="text-3xl font-bold text-secondary-red">24</p>
          <p className="text-sm text-neutral-dark mt-2">3 unread messages</p>
        </div>
      </div>
    </div>
  );
}
