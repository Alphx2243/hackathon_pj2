import React, { useState } from 'react';
import { FileText, Search, Filter, Download, Eye, Clock, User } from 'lucide-react';

interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  type: string;
  description: string;
  attachments: string[];
}

const Records: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data - In production, this would come from your backend
  const mockRecords: MedicalRecord[] = [
    {
      id: '1',
      patientId: 'patient1',
      doctorId: 'doctor1',
      date: new Date('2024-03-15'),
      type: 'Lab Report',
      description: 'Complete Blood Count (CBC) Results',
      attachments: ['cbc_report.pdf']
    },
    {
      id: '2',
      patientId: 'patient2',
      doctorId: 'doctor2',
      date: new Date('2024-03-14'),
      type: 'X-Ray',
      description: 'Chest X-Ray Analysis',
      attachments: ['chest_xray.pdf', 'radiologist_notes.pdf']
    },
    {
      id: '3',
      patientId: 'patient1',
      doctorId: 'doctor3',
      date: new Date('2024-03-13'),
      type: 'Prescription',
      description: 'Monthly medication review',
      attachments: ['prescription.pdf']
    }
  ];

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (typeFilter === 'all') return matchesSearch;
    return matchesSearch && record.type === typeFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
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
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-shrink-0">
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Lab Report">Lab Reports</option>
                <option value="X-Ray">X-Rays</option>
                <option value="Prescription">Prescriptions</option>
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
                        Record Details
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Patient & Doctor
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRecords.map((record) => (
                      <tr key={record.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-2" />
                            <div>
                              <div className="font-medium text-gray-900">{record.type}</div>
                              <div className="text-gray-500">{record.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center mb-1">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <span>Patient: {record.patientId}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <span>Doctor: {record.doctorId}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            {record.date.toLocaleDateString()}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="flex space-x-3">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-5 w-5" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Download className="h-5 w-5" />
                            </button>
                          </div>
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

export default Records;