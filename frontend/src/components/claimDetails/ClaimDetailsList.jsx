// src/components/claimDetails/ClaimDetailsList.jsx
import React from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const ClaimDetailsList = ({ claimDetails, patients, onEdit, onDelete, onAdd }) => {
  const getPatientName = (id) => patients.find(p => p.id === id)?.PatientFullName || 'Unknown Patient';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Claim Details</h3>
        <button
          onClick={onAdd}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <PlusCircle size={18} className="mr-2" /> Add Claim
        </button>
      </div>
      {claimDetails.length === 0 ? (
        <p className="text-gray-600">No claim details found. Add one!</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Patient</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Procedure</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Diagnosis</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Item Code</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Service Date</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claimDetails.map((cd) => (
                <tr key={cd.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-3 px-4 text-sm text-gray-800">{getPatientName(cd.Patient)}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{cd.ClaimAmount}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{cd.ProcedureCode}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{cd.DiagnosisCode}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{cd.ItemCode}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{cd.ServiceDate}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 flex space-x-2">
                    <button onClick={() => onEdit(cd)} className="text-blue-600 hover:text-blue-800 transition-colors duration-200" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => onDelete(cd.id)} className="text-red-600 hover:text-red-800 transition-colors duration-200" title="Delete">
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
};

export default ClaimDetailsList;