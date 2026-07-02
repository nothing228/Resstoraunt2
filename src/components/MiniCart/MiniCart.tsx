import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, useTranslation } from '@/hooks';
import { formatPrice, getLocalizedText } from '@/utils/filters';
import styles from './MiniCart.module.scss';

export function MiniCart() {
  const { t, language } = useTranslation();
  const { cart, removeItem, updateQuantity, total, cartCount } = useCart();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={styles.miniCart} ref={ref}>
      <button
        className={styles.miniCart__trigger}
        onClick={() => setOpen(!open)}
        aria-label={t('header.cart')}
        aria-expanded={open}
      >
        🛒
        {cartCount > 0 && <span className={styles.miniCart__badge}>{cartCount}</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.miniCart__dropdown}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <h3 className={styles.miniCart__title}>{t('cart.title')}</h3>
            {cart.items.length === 0 ? (
              <p className={styles.miniCart__empty}>{t('cart.empty')}</p>
            ) : (
              <>
                <ul className={styles.miniCart__list}>
                  {cart.items.map((item) => (
                    <li key={item.dish.id} className={styles.miniCart__item}>
                      <img src={item.dish.image} alt="" className={styles.miniCart__thumb} />
                      <div className={styles.miniCart__info}>
                        <span>{getLocalizedText(item.dish.name, language)}</span>
                        <span className={styles.miniCart__price}>{formatPrice(item.dish.price)}</span>
                        <div className={styles.miniCart__qty}>
                          <button onClick={() => updateQuantity(item.dish.id, item.quantity - 1)} aria-label="Decrease">−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.dish.id, item.quantity + 1)} aria-label="Increase">+</button>
                        </div>
                      </div>
                      <button className={styles.miniCart__remove} onClick={() => removeItem(item.dish.id)} aria-label={t('cart.remove')}>×</button>
                    </li>
                  ))}
                </ul>
                <div className={styles.miniCart__footer}>
                  <span>{t('cart.total')}</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
                <Link to="/cart" className="btn btn--primary" onClick={() => setOpen(false)}>
                  {t('nav.cart')}
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
