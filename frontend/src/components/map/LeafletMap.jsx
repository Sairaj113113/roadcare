import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import MapMarker from './MapMarker';

/* Fix marker icons */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/* Auto move map */
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();

  if (lat && lng) {
    map.setView([lat, lng], 13);
  }

  return null;
};

const LeafletMap = ({
  reports = [],
  userLocation,
}) => {

  const defaultCenter = [17.3850, 78.4867];

  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden">

      <MapContainer
        center={
          userLocation?.lat
            ? [userLocation.lat, userLocation.lng]
            : defaultCenter
        }
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location */}
        {userLocation?.lat && userLocation?.lng && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>
              📍 Your Current Location
            </Popup>
          </Marker>
        )}

        {/* Pothole Markers */}
        {reports.map((report) => {

          if (!report.latitude || !report.longitude) {
            return null;
          }

          return (
            <Marker
              key={report.id}
              position={[
                report.latitude,
                report.longitude,
              ]}
            >
              <Popup>
                <MapMarker report={report} />
              </Popup>
            </Marker>
          );
        })}

        <RecenterMap
          lat={userLocation?.lat}
          lng={userLocation?.lng}
        />

      </MapContainer>
    </div>
  );
};

export default LeafletMap;