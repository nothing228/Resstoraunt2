import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/hooks';
import styles from './ToastContainer.module.scss';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.toasts} aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`${styles.toasts__item} ${styles[`toasts__item--${toast.type}`]}`}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            onClick={() => removeToast(toast.id)}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
