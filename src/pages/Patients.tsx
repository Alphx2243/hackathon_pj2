import React, { useState } from 'react';
import { Search, Plus, MoreVertical, User, Phone, MapPin, Activity, ClipboardList, Calendar, Edit, Trash2, FilePlus } from 'lucide-react';

const Patients = () => {
  const [patients, setPatients] = useState([
    { id: '1', name: 'John Doe', dateOfBirth: '1990-05-15', gender: 'Male', bloodGroup: 'A+', address: '123 Main St, Boston', phone: '(617) 555-0123', emergencyContact: '(617) 555-9999', medicalHistory: ['Hypertension', 'Diabetes'], prescriptions: ['Metformin 500mg'], upcomingAppointments: ['2025-04-10'] },
    { id: '2', name: 'Alice Smith', dateOfBirth: '1985-07-21', gender: 'Female', bloodGroup: 'O-', address: '456 Park Ave, Boston', phone: '(617) 555-9876', emergencyContact: '(617) 555-8888', medicalHistory: ['Asthma'], prescriptions: ['Inhaler'], upcomingAppointments: ['2025-04-12'] },
    { id: '3', name: 'Jordan Lee', dateOfBirth: '1995-09-10', gender: 'Other', bloodGroup: 'B+', address: '789 Elm St, Boston', phone: '(617) 555-6543', emergencyContact: '(617) 555-7777', medicalHistory: ['Allergy'], prescriptions: ['Cetirizine'], upcomingAppointments: ['2025-04-15'] }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.phone.includes(searchTerm);
    return selectedFilter === 'all' ? matchesSearch : matchesSearch && patient.gender.toLowerCase() === selectedFilter;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patients</h1>
        <button onClick={() => setShowAddForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <Plus className="mr-2" /> Add Patient
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-lg font-semibold mb-2">Add New Patient</h2>
          <form className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="border p-2 rounded" />
            <input type="date" placeholder="DOB" className="border p-2 rounded" />
            <select className="border p-2 rounded">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="text" placeholder="Blood Group" className="border p-2 rounded" />
            <input type="text" placeholder="Address" className="border p-2 rounded" />
            <input type="text" placeholder="Phone" className="border p-2 rounded" />
            <input type="text" placeholder="Emergency Contact" className="border p-2 rounded" />
            <input type="text" placeholder="Medical History" className="border p-2 rounded" />
            <input type="text" placeholder="Prescriptions" className="border p-2 rounded" />
            <input type="date" placeholder="Appointment Date" className="border p-2 rounded" />
            <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
            <button onClick={() => setShowAddForm(false)} className="bg-red-600 text-white px-4 py-2 rounded">Cancel</button>
          </form>
        </div>
      )}

      <div className="flex gap-4 mb-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 text-gray-400" />
          <input type="text" className="pl-10 pr-4 py-2 border rounded w-full" placeholder="Search patients..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <select className="border rounded px-3 py-2" value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Medical Info</th>
              <th className="p-3 text-left">Prescriptions</th>
              <th className="p-3 text-left">Appointments</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id} className="border-b">
                <td className="p-3">
                  <User className="mr-2 text-gray-600" /> {patient.name}, {patient.gender}, {patient.bloodGroup}
                </td>
                <td className="p-3">
                  <Phone className="mr-2 text-gray-600" /> {patient.phone}
                </td>
                <td className="p-3">
                  <Activity className="mr-2 text-gray-600" /> {patient.medicalHistory.join(', ')}
                </td>
                <td className="p-3">
                  <ClipboardList className="mr-2 text-gray-600" /> {patient.prescriptions.join(', ')}
                </td>
                <td className="p-3">
                  <Calendar className="mr-2 text-gray-600" /> {patient.upcomingAppointments.join(', ')}
                </td>
                <td className="p-3 flex gap-2">
                  <button className="text-yellow-500 hover:text-yellow-700"><Edit /></button>
                  <button className="text-blue-500 hover:text-blue-700"><FilePlus /></button>
                  <button className="text-red-500 hover:text-red-700"><Trash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
