import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { ToastContainer } from '@/components/ToastContainer/ToastContainer';
import styles from './Layout.module.scss';

export function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <motion.main
        className={styles.layout__main}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
