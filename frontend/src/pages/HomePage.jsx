import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import reportService from "../services/reportService";
import heroRoad from '../assets/images/road-image.png';

const HomePage = () => {
  const [stats, setStats] = useState({
    totalReports: 0,
    resolvedRate: 0,
    citiesCovered: 0,
    inProgress: 0,
    resolved: 0,
    pending: 0,
  });

useEffect(() => {

  const loadStats = async () => {
    try {
      const data = await reportService.getHomepageStats();
        console.log(data);

      setStats({
        totalReports: data.totalReports || 0,
        resolvedRate: data.resolvedRate || 0,
        citiesCovered: data.citiesCovered || 0,
        inProgress: data.inProgress || 0,
        resolved: data.resolved || 0,
        pending: data.pending || 0,
      });
    } catch (err) {
      console.log(err);
    }
  };

  loadStats();
}, []);
   

  return (
    <div className="overflow-hidden bg-[#f7f9fc]">

      {/* ================= HERO ================= */}

      <section
        className="relative min-h-screen
                   overflow-hidden
                   bg-gradient-to-br
                   from-[#00227B]
                   via-[#1740C9]
                   to-[#2954DA]"
      >

        {/* Animated Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute top-0 left-0
                     w-[500px] h-[500px]
                     bg-blue-400/20
                     blur-3xl rounded-full"
        />

        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute bottom-0 right-0
                     w-[450px] h-[450px]
                     bg-cyan-300/20
                     blur-3xl rounded-full"
        />

       {/* Background Road */}
<div
  className="absolute inset-0"
  style={{
    backgroundImage: `
      linear-gradient(
        to right,
        rgba(5, 15, 45, 0.92),
        rgba(15, 45, 120, 0.80)
      ),
      url(${heroRoad})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }}
/>

        {/* Content */}
        <div
          className="relative z-10
                     max-w-7xl mx-auto
                     px-6 lg:px-10
                     py-24
                     grid lg:grid-cols-2
                     gap-16
                     items-center"
        >

          {/* ================= LEFT ================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.9,
            }}
          >

            {/* Live Badge */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="inline-flex items-center
                         gap-3 px-6 py-3
                         rounded-full
                         bg-white/10
                         backdrop-blur-xl
                         border border-white/20
                         text-white font-medium mb-8"
            >
              <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              Live pothole tracking powered by citizens
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.8,
              }}
              className="text-6xl lg:text-8xl
                         font-black
                         leading-none
                         text-white"
            >
              Report Roads.
            </motion.h1>

            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.8,
              }}
              className="text-6xl lg:text-8xl
                         font-black
                         leading-none
                         bg-gradient-to-r
                         from-blue-300
                         to-cyan-300
                         bg-clip-text
                         text-transparent"
            >
              Transform Cities.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.6,
                duration: 1,
              }}
              className="mt-8 text-xl
                         leading-relaxed
                         text-blue-100
                         max-w-xl"
            >
              RoadCare helps citizens report potholes,
              track repair progress in real-time,
              and build safer roads through transparent civic collaboration.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
                duration: 0.8,
              }}
              className="flex flex-wrap gap-5 mt-10"
            >

              <Link
                to="/report"
                className="group px-10 py-5
                           rounded-2xl
                           bg-white
                           text-primary-700
                           font-bold text-lg
                           shadow-2xl
                           hover:scale-105
                           transition-all duration-300"
              >
                🚧 Report Pothole
              </Link>

              <Link
                to="/map"
                className="group px-10 py-5
                           rounded-2xl
                           border border-white/30
                           text-white
                           font-bold text-lg
                           backdrop-blur-md
                           hover:bg-white/10
                           hover:scale-105
                           transition-all duration-300"
              >
                🗺️ Explore Map
              </Link>

            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1,
                duration: 1,
              }}
              className="grid grid-cols-3 gap-8 mt-16"
            >

              <div>
                <h2 className="text-5xl font-black text-white">
                  {stats.totalReports}
                </h2>

                <p className="text-blue-200 mt-2">
                  Reports Submitted
                </p>
              </div>

              <div>
                <h2 className="text-5xl font-black text-white">
                  {stats.resolvedRate}%
                </h2>

                <p className="text-blue-200 mt-2">
                  Resolution Rate
                </p>
              </div>

              <div>
                <h2 className="text-5xl font-black text-white">
                  {stats.citiesCovered}
                </h2>

                <p className="text-blue-200 mt-2">
                  Cities Covered
                </p>
              </div>

            </motion.div>

          </motion.div>

          {/* ================= RIGHT VISUAL ================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.5,
              duration: 1,
            }}
            className="relative"
          >

            {/* Glow */}
            <div
              className="absolute -inset-10
                         bg-primary-400/20
                         blur-3xl rounded-full"
            />

            {/* Main Card */}
            <motion.div
              whileHover={{
                y: -10,
                rotateX: 2,
                rotateY: -2,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
              }}
              className="relative overflow-hidden
                         rounded-[36px]
                         border border-white/10
                         bg-white/10
                         backdrop-blur-xl
                         shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
            >

              {/* Real Background */}
              <div
                className="relative h-[620px] w-full"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      to bottom,
                      rgba(5,15,50,0.2),
                      rgba(5,10,40,0.75)
                    ),
                    url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1400&auto=format&fit=crop')
                  `,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >

                {/* Dark Overlay */}
                <div
                  className="absolute inset-0
                             bg-gradient-to-br
                             from-primary-950/40
                             via-transparent
                             to-black/75"
                />

                {/* Animated Path */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 800 500"
                  fill="none"
                >
                  <motion.path
                    d="M80 380 C220 200 340 420 520 260 C620 180 720 220 760 120"
                    stroke="#60A5FA"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="12 12"
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                </svg>

                {/* Markers */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute top-24 left-24
                             w-5 h-5 bg-red-500
                             rounded-full
                             shadow-[0_0_25px_rgba(239,68,68,0.9)]"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                  className="absolute bottom-28 left-1/2
                             w-5 h-5 bg-emerald-400
                             rounded-full
                             shadow-[0_0_25px_rgba(52,211,153,0.9)]"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute top-48 right-24
                             w-5 h-5 bg-yellow-400
                             rounded-full
                             shadow-[0_0_25px_rgba(250,204,21,0.9)]"
                />

                {/* Floating Notification */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="absolute top-8 right-8
                             bg-white/95
                             backdrop-blur-md
                             rounded-3xl
                             shadow-2xl
                             p-5 w-72"
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="w-14 h-14 rounded-2xl
                                 bg-primary-100
                                 flex items-center
                                 justify-center text-2xl"
                    >
                      🚧
                    </div>

                    <div>

                      <p className="font-bold text-gray-800 text-lg">
                        Report a Pothole
                      </p>

                      <p className="text-gray-500 text-sm">
                        Quickly report road damage
                      </p>

                      <p className="text-primary-500 text-sm mt-1">
                        Smart City Service
                      </p>

                    </div>

                  </div>

                  <div
                    className="mt-4 h-2
                               bg-gray-200
                               rounded-full overflow-hidden"
                  >
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: "78%",
                      }}
                      transition={{
                        duration: 2,
                      }}
                      className="h-full bg-primary-500"
                    />
                  </div>

                </motion.div>

                {/* Analytics Card */}
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="absolute bottom-8 left-8
                             bg-slate-900/90
                             backdrop-blur-xl
                             border border-white/10
                             rounded-3xl
                             p-6 w-[320px]"
                >

                  <div className="flex items-center justify-between mb-6">

                    <div>

                      <p className="text-blue-200 text-sm">
                        Smart City Tracking
                      </p>

                      <h3 className="text-3xl font-black text-white mt-1">
                        Live Analytics
                      </h3>

                    </div>

                    <div
                      className="w-12 h-12 rounded-2xl
                                 bg-primary-500/20
                                 flex items-center justify-center"
                    >
                      📊
                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <div
                      className="bg-white/5 rounded-2xl
                                 p-4 border border-white/5"
                    >
                      <div className="w-3 h-3 bg-blue-400 rounded-full mb-4" />

                      <p className="text-gray-300 text-sm">
                        Total Reports
                      </p>

                      <h4 className="text-4xl font-black text-white mt-2">
                        {stats.totalReports}
                      </h4>
                    </div>

                    <div
                      className="bg-white/5 rounded-2xl
                                 p-4 border border-white/5"
                    >
                      <div className="w-3 h-3 bg-orange-400 rounded-full mb-4" />

                      <p className="text-gray-300 text-sm">
                        In Progress
                      </p>

                      <h4 className="text-4xl font-black text-white mt-2">
                        {stats.inProgress}
                      </h4>
                    </div>

                    <div
                      className="bg-white/5 rounded-2xl
                                 p-4 border border-white/5"
                    >
                      <div className="w-3 h-3 bg-green-400 rounded-full mb-4" />

                      <p className="text-gray-300 text-sm">
                        Resolved
                      </p>

                      <h4 className="text-4xl font-black text-white mt-2">
                        {stats.resolved}
                      </h4>
                    </div>

                    <div
                      className="bg-white/5 rounded-2xl
                                 p-4 border border-white/5"
                    >
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mb-4" />

                      <p className="text-gray-300 text-sm">
                        Pending
                      </p>

                      <h4 className="text-4xl font-black text-white mt-2">
                        {stats.pending}
                      </h4>
                    </div>

                  </div>

                </motion.div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </section>
      {/* =========================================================
   HOW IT WORKS
========================================================= */}

<section className="py-24 bg-white">

  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >

      <h2
        className="text-4xl lg:text-5xl
                   font-black
                   tracking-tight
                   text-slate-900"
      >
        How It Works
      </h2>

      <p
        className="mt-4 text-base lg:text-lg
                   text-slate-500"
      >
        From report to resolution in three seamless steps
      </p>

    </motion.div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-6">

      {[
        {
          icon: "📸",
          title: "Snap & Report",
          desc:
            "Take a photo, drop a pin, and submit a pothole in under a minute.",
          number: "01",
        },
        {
          icon: "🔔",
          title: "Track Progress",
          desc:
            "Receive real-time notifications as reports move through stages.",
          number: "02",
        },
        {
          icon: "✅",
          title: "Roads Get Fixed",
          desc:
            "Authorities resolve issues faster with transparent workflows.",
          number: "03",
        },
      ].map((item, index) => (

        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: index * 0.15,
          }}
          whileHover={{
            y: -8,
          }}
          className="relative
                     overflow-hidden
                     rounded-[28px]
                     border border-slate-200
                     bg-white
                     p-7
                     shadow-md
                     hover:shadow-2xl
                     transition-all duration-500"
        >

          <div
            className="absolute top-5 right-5
                       text-6xl font-black
                       text-slate-100"
          >
            {item.number}
          </div>

          <div className="text-5xl mb-6">
            {item.icon}
          </div>

          <h3
            className="text-2xl
                       font-black
                       text-slate-900"
          >
            {item.title}
          </h3>

          <p
            className="mt-4
                       text-base
                       leading-relaxed
                       text-slate-500"
          >
            {item.desc}
          </p>

        </motion.div>
      ))}

    </div>

  </div>

</section>

{/* =========================================================
   FEATURES SECTION
========================================================= */}

<section className="py-24 bg-[#f7f9fc]">

  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >

      <h2
        className="text-4xl lg:text-5xl
                   font-black
                   tracking-tight
                   text-slate-900"
      >
        Everything You Need
      </h2>

      <p
        className="mt-4 text-base lg:text-lg
                   text-slate-500"
      >
        Smart tools for citizens and road maintenance teams
      </p>

    </motion.div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {[
        {
          icon: "🗺️",
          title: "Interactive Map",
          desc:
            "Browse potholes on a live OpenStreetMap with status-based markers.",
        },
        {
          icon: "📍",
          title: "GPS Auto-Location",
          desc:
            "Device location is detected automatically for accurate reporting.",
          featured: true,
        },
        {
          icon: "🔁",
          title: "Duplicate Detection",
          desc:
            "Prevents duplicate reports within nearby radius zones.",
        },
        {
          icon: "🔔",
          title: "Email & App Alerts",
          desc:
            "Instant notifications and updates for every status change.",
        },
        {
          icon: "📊",
          title: "Admin Dashboard",
          desc:
            "Officers manage and resolve complaints using a clean dashboard.",
        },
        {
          icon: "📱",
          title: "Fully Responsive",
          desc:
            "Optimized beautifully for desktop, tablet, and mobile devices.",
        },
      ].map((feature, index) => (

        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: index * 0.1,
          }}
          whileHover={{
            y: -8,
          }}
          className={`rounded-[28px]
                      p-7
                      border
                      transition-all duration-500
                      ${
                        feature.featured
                          ? "bg-gradient-to-br from-white to-blue-50 border-blue-100 shadow-xl"
                          : "bg-white border-slate-200 shadow-md hover:shadow-2xl"
                      }`}
        >

          <div className="text-5xl mb-6">
            {feature.icon}
          </div>

          <h3
            className="text-xl
                       font-black
                       text-slate-900"
          >
            {feature.title}
          </h3>

          <p
            className="mt-4
                       text-base
                       leading-relaxed
                       text-slate-500"
          >
            {feature.desc}
          </p>

        </motion.div>
      ))}

    </div>

  </div>

</section>

    </div>
  );
};

export default HomePage;