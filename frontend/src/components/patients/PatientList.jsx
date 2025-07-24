import React from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const PatientList = ({ patients, onEdit, onDelete, onAdd }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold text-gray-800">Patient Directory</h3>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition duration-200 shadow-sm hover:shadow-md"
      >
        <PlusCircle size={20} /> Add Patient
      </button>
    </div>

    {patients.length === 0 ? (
      <p className="text-gray-500 text-sm italic">No patients found. Add a new patient to begin.</p>
    ) : (
      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="min-w-full bg-white text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Full Name</th>
              <th className="py-3 px-4 text-left">DOB</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, idx) => (
              <tr
                key={patient.id}
                className={`hover:bg-gray-50 transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="py-3 px-4">{patient.PatientID}</td>
                <td className="py-3 px-4">{patient.PatientFullName}</td>
                <td className="py-3 px-4">{patient.DateOfBirth}</td>
                <td className="py-3 px-4">{patient.PatientEmail}</td>
                <td className="py-3 px-4">{patient.PatientPhone}</td>
                <td className="py-3 px-4 flex items-center space-x-3">
                  <button
                    onClick={() => onEdit(patient)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit Patient"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(patient.id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete Patient"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default PatientList;
