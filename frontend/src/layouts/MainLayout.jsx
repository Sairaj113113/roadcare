import { useEffect, useState } from 'react';

import {
  Outlet,
  useLocation,
} from 'react-router-dom';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import Navbar from '../components/common/Navbar';

import Footer from '../components/common/Footer';

import Sidebar from '../components/common/Sidebar';

import useAuth from '../hooks/useAuth';

/**
 * MainLayout — global app layout
 *
 * Adds:
 * - page transitions
 * - scroll progress bar
 * - navbar blur effect
 * - smooth route animations
 *
 * SUPER_ADMIN:
 * - hides normal navbar
 * - hides footer
 * - hides sidebar
 */

const MainLayout = () => {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [scrollProgress, setScrollProgress] =
    useState(0);

  const [scrolled, setScrolled] =
    useState(false);

  const location = useLocation();

  const {
    currentUser,
  } = useAuth();

  // =====================================================
  // ROLE CHECK
  // =====================================================

  const isSuperAdmin =
    currentUser?.role ===
    'SUPER_ADMIN';

  // =====================================================
  // SCROLL EFFECTS
  // =====================================================

  useEffect(() => {

    const handleScroll = () => {

      const scrollTop =
        window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        (scrollTop / docHeight) * 100;

      setScrollProgress(progress);

      setScrolled(scrollTop > 20);
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );

  }, []);

  return (

    <div
      className="
        flex flex-col
        min-h-screen
        bg-gray-50
      "
    >

      {/* =====================================================
          SCROLL PROGRESS
      ===================================================== */}

      {!isSuperAdmin && (

        <motion.div
          className="
            fixed top-0 left-0
            h-[3px]
            bg-primary-500
            z-[9999]
            origin-left
          "
          style={{
            width:
              `${scrollProgress}%`,
          }}
        />

      )}

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      {!isSuperAdmin && (

        <div
          className={`
            sticky top-0 z-40
            transition-all duration-300

            ${
              scrolled
                ? 'backdrop-blur-xl bg-white/80 shadow-sm'
                : 'bg-transparent'
            }
          `}
        >

          <Navbar
            onMenuClick={() =>
              setSidebarOpen(true)
            }
          />

        </div>

      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      {!isSuperAdmin && (

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />

      )}

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <main className="flex-1">

        <AnimatePresence
          mode="wait"
        >

          <motion.div
            key={location.pathname}

            initial={{
              opacity: 0,
              y: 18,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              y: -18,
            }}

            transition={{
              duration: 0.45,
              ease: 'easeOut',
            }}
          >

            <Outlet />

          </motion.div>

        </AnimatePresence>

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      {!isSuperAdmin && (
        <Footer />
      )}

    </div>
  );
};

export default MainLayout;