import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: '📸', title: 'Image-Based Reporting',   desc: 'Upload a clear photo of the pothole with GPS coordinates for precise, verifiable location tracking.' },
  { icon: '🗺️', title: 'Interactive Live Map',    desc: 'Explore all reported potholes on a live OpenStreetMap with colour-coded status markers.' },
  { icon: '🔁', title: 'Smart Duplicate Detection', desc: 'Haversine algorithm detects duplicate reports within 50 metres, keeping the database clean.' },
  { icon: '🔔', title: 'Real-Time Notifications', desc: 'In-app alerts and HTML email updates are sent automatically on every status change.' },
  { icon: '📊', title: 'Admin Dashboard',          desc: 'Officers filter reports by city or status, update progress, and resolve complaints efficiently.' },
  { icon: '🔒', title: 'Secure by Design',         desc: 'JWT authentication and role-based access control protect every endpoint and user account.' },
];

const TECH = [
  { label: 'React 18',        cat: 'Frontend'      },
  { label: 'Tailwind CSS',    cat: 'Styling'        },
  { label: 'React Leaflet',   cat: 'Maps'           },
  { label: 'Spring Boot',     cat: 'Backend'        },
  { label: 'Spring Security', cat: 'Auth'           },
  { label: 'MySQL',           cat: 'Database'       },
  { label: 'Cloudinary',      cat: 'Image Storage'  },
  { label: 'OpenStreetMap',   cat: 'Map Tiles'      },
  { label: 'SMTP Email',      cat: 'Notifications'  },
];

const AboutPage = () => (
  <div className="page-container max-w-3xl">

    {/* ── Hero ── */}
    <div className="text-center mb-14">
      <div className="text-6xl mb-5">🚧</div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
        About RoadCare
      </h1>
      <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-base">
        RoadCare is a full-stack smart pothole reporting platform that connects
        citizens with road maintenance authorities — making it simple to report
        damage, track repairs, and build safer communities.
      </p>
    </div>

    {/* ── Mission ── */}
    <div className="card bg-gradient-to-br from-primary-50 to-blue-50
                    border-primary-200 mb-10 text-center py-8">
      <span className="text-3xl block mb-3">🎯</span>
      <h2 className="text-xl font-bold text-primary-800 mb-3">Our Mission</h2>
      <p className="text-primary-700 text-sm leading-relaxed max-w-lg mx-auto">
        To empower every citizen to actively contribute to their city's road infrastructure
        through a transparent, technology-driven complaint management system that delivers
        real, measurable improvements to public safety.
      </p>
    </div>

    {/* ── How it works ── */}
    <h2 className="text-xl font-bold text-gray-800 mb-5">How It Works</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {[
        { step: '1', icon: '📍', label: 'Report',   desc: 'Upload a photo and drop a GPS pin in under a minute.' },
        { step: '2', icon: '🔔', label: 'Track',    desc: 'Follow real-time status updates via notifications.' },
        { step: '3', icon: '✅', label: 'Resolved', desc: 'Maintenance crew fixes the pothole and closes the case.' },
      ].map(({ step, icon, label, desc }) => (
        <div key={step} className="card text-center relative overflow-hidden py-6">
          <span className="absolute top-3 right-4 text-5xl font-black
                           text-gray-100 leading-none select-none">
            {step}
          </span>
          <div className="text-4xl mb-2">{icon}</div>
          <p className="font-bold text-gray-800 mb-1">{label}</p>
          <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    {/* ── Features ── */}
    <h2 className="text-xl font-bold text-gray-800 mb-5">Platform Features</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
      {FEATURES.map(({ icon, title, desc }) => (
        <div key={title} className="card flex gap-4 items-start">
          <div className="text-3xl flex-shrink-0">{icon}</div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">{title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* ── Who it's for ── */}
    <h2 className="text-xl font-bold text-gray-800 mb-5">Who It's For</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
      <div className="rounded-xl border p-5 bg-blue-50 border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">👤</span>
          <h3 className="font-bold text-base text-blue-800">Citizens</h3>
        </div>
        <ul className="space-y-1.5">
          {[
            'Submit pothole reports with images',
            'Track complaint status in real time',
            'Receive email and in-app notifications',
            'View nearby potholes on the map',
          ].map((p) => (
            <li key={p} className="flex items-start gap-2 text-xs text-gray-700">
              <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>{p}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border p-5 bg-emerald-50 border-emerald-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🛠️</span>
          <h3 className="font-bold text-base text-emerald-800">Road Officers</h3>
        </div>
        <ul className="space-y-1.5">
          {[
            'View and filter all incoming reports',
            'Update status: Pending → In Progress → Resolved',
            'Add admin remarks for each update',
            'Access dashboard analytics at a glance',
          ].map((p) => (
            <li key={p} className="flex items-start gap-2 text-xs text-gray-700">
              <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>{p}
            </li>
          ))}
        </ul>
      </div>
    </div>

   

    {/* ── Status lifecycle ── */}
    <div className="card mb-10">
      <h3 className="font-bold text-gray-800 mb-4 text-sm">Report Status Lifecycle</h3>
      <div className="flex items-start gap-2 flex-wrap">
        {[
          { label: 'Pending',     dot: 'bg-amber-400',   desc: 'Awaiting review' },
          { label: 'In Progress', dot: 'bg-blue-500',    desc: 'Repair underway', arrow: true },
          { label: 'Resolved',    dot: 'bg-emerald-500', desc: 'Pothole fixed',   arrow: true },
        ].map(({ label, dot, desc, arrow }) => (
          <div key={label} className="flex items-center gap-2">
            {arrow && <span className="text-gray-300 font-bold text-lg">→</span>}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                <span className="text-xs font-semibold text-gray-700">{label}</span>
              </div>
              <span className="text-xs text-gray-400">{desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── CTA ── */}
    <div className="text-center py-4 pb-12">
      <p className="text-gray-500 text-sm mb-5">
        Ready to report a pothole and help your community?
      </p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Link to="/register" className="btn-primary px-6 py-2.5">
          Get Started Free →
        </Link>
        <Link to="/map" className="btn-secondary px-6 py-2.5">
          🗺️ View Live Map
        </Link>
      </div>
    </div>

  </div>
);

export default AboutPage;