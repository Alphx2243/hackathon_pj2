import React from 'react';
import { Activity, Users, Calendar, FileText, TrendingUp, Clock, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data - In production, this would come from your backend
  const stats = [
    { name: 'Total Patients', value: '2,347', change: '+12%', icon: Users },
    { name: 'Appointments Today', value: '48', change: '+4%', icon: Calendar },
    { name: 'Active Doctors', value: '32', change: '+2%', icon: Activity },
    { name: 'Medical Records', value: '5,248', change: '+8%', icon: FileText },
  ];

  const recentAppointments = [
    { id: 1, patient: 'Sarah Johnson', doctor: 'Dr. Michael Chen', time: '09:00 AM', status: 'scheduled' },
    { id: 2, patient: 'Robert Smith', doctor: 'Dr. Emily Wong', time: '10:30 AM', status: 'completed' },
    { id: 3, patient: 'Maria Garcia', doctor: 'Dr. James Wilson', time: '11:45 AM', status: 'cancelled' },
    { id: 4, patient: 'David Brown', doctor: 'Dr. Sarah Miller', time: '02:15 PM', status: 'scheduled' },
  ];

  const alerts = [
    { id: 1, message: 'Low inventory for medical supplies', priority: 'high' },
    { id: 2, message: 'System maintenance scheduled for tonight', priority: 'medium' },
    { id: 3, message: 'New COVID-19 guidelines updated', priority: 'high' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="text-gray-500">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white overflow-hidden rounded-lg shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                          <span className="ml-1">{stat.change}</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Appointments */}
        <div className="bg-white overflow-hidden rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Appointments</h2>
              <a href="/appointments" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all
              </a>
            </div>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentAppointments.map((appointment) => (
                  <li key={appointment.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{appointment.patient}</p>
                        <p className="text-sm text-gray-500 truncate">{appointment.doctor}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                            appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="flex-shrink-0 text-sm text-gray-500">{appointment.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Alerts and Notifications */}
        <div className="bg-white overflow-hidden rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Alerts & Notifications</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {alerts.length} New
              </span>
            </div>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {alerts.map((alert) => (
                  <li key={alert.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <AlertCircle className={`h-5 w-5 ${
                          alert.priority === 'high' ? 'text-red-500' : 'text-yellow-500'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500">
                          Priority: <span className="font-medium">{alert.priority}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;