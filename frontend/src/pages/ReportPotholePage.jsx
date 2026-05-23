import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ReportForm from '../components/report/ReportForm';
import DuplicateAlert from '../components/report/DuplicateAlert';

import reportService from '../services/reportService';

const ReportPotholePage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showDuplicate, setShowDuplicate] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const submitReport = async (data) => {
    try {
      setLoading(true);
      setError('');

      const formData = new FormData();

      formData.append('image', data.image);
      formData.append('description', data.description);
      formData.append('latitude', data.latitude);
      formData.append('longitude', data.longitude);
      formData.append('address', data.address);
      formData.append('city', data.city);

      const created = await reportService.createReport(formData);

      navigate(`/reports/${created.id}`);
    } catch (err) {

      if (err?.response?.status === 409) {
        setPendingData(data);
        setShowDuplicate(true);
        return;
      }

      setError('Failed to submit report.');

    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      const duplicate = await reportService.checkDuplicate(
        data.latitude,
        data.longitude
      );

      if (duplicate?.isDuplicate) {
        setPendingData(data);
        setShowDuplicate(true);
        return;
      }

      await submitReport(data);

    } catch (err) {

      if (err?.response?.status === 409) {
        setPendingData(data);
        setShowDuplicate(true);
        return;
      }

      setError('Duplicate detection failed.');

    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    setShowDuplicate(false);

    if (pendingData) {
      await submitReport(pendingData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          🚧 Report a Pothole
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Help improve roads by reporting potholes in your area.
        </p>
      </div>

      {/* Form Card */}
      <div className="card">
        <ReportForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>

      {/* Duplicate Modal */}
      {showDuplicate && (
        <DuplicateAlert
          onContinue={handleContinue}
          onCancel={() => setShowDuplicate(false)}
          loading={loading}
        />
      )}

    </div>
  );
};

export default ReportPotholePage;