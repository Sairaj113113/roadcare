import api from './api';

/**
 * mapService — all map-related API calls for RoadCare.
 * Uses the centralized Axios instance (api.js).
 * All endpoints are public — no JWT required.
 */
const mapService = {

  /** GET /api/map/potholes — all potholes for full map view */
  getAllPotholes: async () => {
    const res = await api.get('/map/potholes');
    return res.data;
  },

  /** GET /api/map/city/{city} — potholes filtered by city */
  getPotholesByCity: async (city) => {
    const res = await api.get(`/map/city/${encodeURIComponent(city)}`);
    return res.data;
  },

  /** GET /api/reports/nearby?lat=X&lng=Y — potholes within 5 km radius */
  getNearbyPotholes: async (lat, lng) => {
    const res = await api.get('/reports/nearby', { params: { lat, lng } });
    return res.data;
  },
};

export default mapService;