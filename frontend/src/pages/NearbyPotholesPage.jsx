import { useEffect, useState } from 'react';

import Loader from '../components/common/Loader';
import NearbyPotholes from '../components/map/NearbyPotholes';

import reportService from '../services/reportService';

const NearbyPotholesPage = () => {

  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          console.log("USER LOCATION:", lat, lng);

          const data = await reportService.getNearbyReports(lat, lng);

          console.log("NEARBY REPORTS:", data);

          setReports(data || []);

        } catch (err) {

          console.error(err);

          setError('Failed to load nearby potholes.');
        }

        setLoading(false);
      },

      () => {

        setError('Location access denied.');

        setLoading(false);
      }

    );

  }, []);

  if (loading) {

    return (
      <Loader message="Finding nearby potholes..." />
    );
  }

  return (

    <div className="max-w-5xl mx-auto px-4 py-6">

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          📍 Nearby Potholes
        </h1>

        <p className="text-gray-500 mt-1">
          Potholes near your current location.
        </p>

      </div>

      <NearbyPotholes
        reports={reports}
        loading={loading}
        error={error}
      />

    </div>
  );
};

export default NearbyPotholesPage;