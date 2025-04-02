/*import React, { useState } from 'react';
import { Calendar, Clock, User, Search, Filter, Plus, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Appointment } from '../types';

const Appointments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - In production, this would come from your backend
  const mockAppointments: Appointment[] = [
    {
      id: '1',
      patientId: 'patient1',
      doctorId: 'doctor1',
      dateTime: new Date('2024-03-20T09:00:00'),
      status: 'scheduled',
      symptoms: 'Fever, headache',
      diagnosis: undefined,
      prescription: undefined
    },
    {
      id: '2',
      patientId: 'patient2',
      doctorId: 'doctor2',
      dateTime: new Date('2024-03-19T14:30:00'),
      status: 'completed',
      symptoms: 'Back pain',
      diagnosis: 'Muscle strain',
      prescription: {
        id: 'presc1',
        appointmentId: '2',
        medications: [
          { name: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily', duration: '5 days' }
        ],
        instructions: 'Take with food',
        issuedDate: new Date('2024-03-19T15:30:00')
      }
    },
    {
      id: '3',
      patientId: 'patient3',
      doctorId: 'doctor1',
      dateTime: new Date('2024-03-21T11:15:00'),
      status: 'cancelled',
      symptoms: 'Annual checkup',
      diagnosis: undefined,
      prescription: undefined
    }
  ];

  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesSearch = appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorId.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && appointment.status === statusFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-shrink-0">
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        Date & Time
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Patient
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Doctor
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {appointment.dateTime.toLocaleDateString()}
                              </div>
                              <div className="text-gray-500">
                                {appointment.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-5 w-5 text-gray-400 mr-2" />
                            {appointment.patientId}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-5 w-5 text-gray-400 mr-2" />
                            {appointment.doctorId}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            <span className="ml-1 capitalize">{appointment.status}</span>
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div>{appointment.symptoms}</div>
                          {appointment.diagnosis && (
                            <div className="mt-1 text-xs text-gray-900">
                              Diagnosis: {appointment.diagnosis}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;*/

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Search,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const mockAppointments = [
    {
      id: "1",
      patientName: "John Doe",
      doctorName: "Dr. Smith",
      dateTime: new Date("2024-03-20T09:00:00"),
      status: "scheduled",
      symptoms: "Fever, headache",
    },
    {
      id: "2",
      patientName: "Jane Doe",
      doctorName: "Dr. Brown",
      dateTime: new Date("2024-03-19T14:30:00"),
      status: "completed",
      symptoms: "Back pain",
    },
    {
      id: "3",
      patientName: "Alice Green",
      doctorName: "Dr. Wilson",
      dateTime: new Date("2024-03-21T11:15:00"),
      status: "cancelled",
      symptoms: "Annual checkup",
    },
  ];

  const totalAppointments = mockAppointments.length;
  const completedAppointments = mockAppointments.filter(app => app.status === "completed").length;
  const cancelledAppointments = mockAppointments.filter(app => app.status === "cancelled").length;

  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && appointment.status === statusFilter;
  });

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-gray-700">Total Appointments</h2>
          <p className="text-2xl font-semibold text-blue-600">{totalAppointments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-gray-700">Completed Appointments</h2>
          <p className="text-2xl font-semibold text-green-600">{completedAppointments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-gray-700">Cancelled Appointments</h2>
          <p className="text-2xl font-semibold text-red-600">{cancelledAppointments}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          <Plus className="h-5 w-5 mr-2" /> New Appointment
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search patients or doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            className="py-2 px-4 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Doctor</th>
              <th className="p-4">Status</th>
              <th className="p-4">Symptoms</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <Calendar className="inline-block h-5 w-5 text-gray-400 mr-2" />
                  {appointment.dateTime.toLocaleDateString()} - {" "}
                  {appointment.dateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="p-4">
                  <User className="inline-block h-5 w-5 text-gray-400 mr-2" />
                  {appointment.patientName}
                </td>
                <td className="p-4">{appointment.doctorName}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      appointment.status === "scheduled"
                        ? "bg-blue-100 text-blue-800"
                        : appointment.status === "completed"
                        ? "bg-green-500 text-black"
                        : "bg-red-500 text-black"
                    }`}>
                    {appointment.status === "scheduled" && <Clock className="inline-block h-4 w-4 mr-1" />}
                    {appointment.status === "completed" && <CheckCircle className="inline-block h-4 w-4 mr-1" />}
                    {appointment.status === "cancelled" && <XCircle className="inline-block h-4 w-4 mr-1" />}
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </td>
                <td className="p-4">{appointment.symptoms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
