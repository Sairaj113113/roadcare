import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * DuplicateAlert — duplicate pothole modal.
 *
 * Props:
 *   onCancel {function}
 */
const DuplicateAlert = ({ onCancel }) => {
  const [notify, setNotify] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-7 animate-fade-in">

        {/* Header */}
        <div className="flex items-start gap-4 mb-5">

          <div
            className="flex-shrink-0 w-14 h-14 rounded-2xl
                       bg-amber-100 flex items-center justify-center text-3xl"
          >
            ⚠️
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">
              Pothole Already Reported
            </h2>

            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              A pothole near this location has already been reported
              and is currently under review by the maintenance team.
            </p>
          </div>
        </div>

        {/* Status Card */}
        <div
          className="bg-amber-50 border border-amber-200
                     rounded-2xl p-4 mb-5"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Current Status
            </span>

            <span
              className="px-3 py-1 rounded-full text-xs font-semibold
                         bg-yellow-100 text-yellow-800"
            >
              ⏳ Pending
            </span>
          </div>

          <p className="text-sm text-amber-800 leading-relaxed">
            This pothole is already being monitored by the maintenance team.
            You'll be notified once the issue is resolved.
          </p>
        </div>

        {/* Notify checkbox */}
        <label
          className="flex items-start gap-3 bg-gray-50 border border-gray-200
                     rounded-xl px-4 py-3 cursor-pointer mb-6 hover:bg-gray-100 transition"
        >
          <input
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
            className="mt-1 h-4 w-4 accent-primary-600"
          />

          <div>
            <p className="text-sm font-medium text-gray-700">
              Notify me when resolved
            </p>

            <p className="text-xs text-gray-500 mt-0.5">
              You’ll receive a notification when this pothole is fixed.
            </p>
          </div>
        </label>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">

          <Link
            to="/"
            onClick={onCancel}
            className="btn-secondary flex-1 text-center"
          >
            Back to Home
          </Link>

          <button
            onClick={onCancel}
            className="btn-primary flex-1"
          >
            Okay
          </button>

        </div>
      </div>
    </div>
  );
};

export default DuplicateAlert;