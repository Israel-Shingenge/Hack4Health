// src/components/medicalAids/MedicalAidList.jsx
import React from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const MedicalAidList = ({ medicalAids, onEdit, onDelete, onAdd }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold text-gray-800">Medical Aids</h3>
      <button
        onClick={onAdd}
        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        <PlusCircle size={18} className="mr-2" /> Add Medical Aid
      </button>
    </div>
    {medicalAids.length === 0 ? (
      <p className="text-gray-600">No medical aids found. Add one!</p>
    ) : (
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Contact</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {medicalAids.map((ma) => (
              <tr key={ma.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-3 px-4 text-sm text-gray-800">{ma.MedicalAidID}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{ma.MedicalAidName}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{ma.MedicalAidType}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{ma.MedicalAidContactNumber}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{ma.MedicalAidEmail}</td>
                <td className="py-3 px-4 text-sm text-gray-800 flex space-x-2">
                  <button onClick={() => onEdit(ma)} className="text-blue-600 hover:text-blue-800 transition-colors duration-200" title="Edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => onDelete(ma.id)} className="text-red-600 hover:text-red-800 transition-colors duration-200" title="Delete">
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

export default MedicalAidList;