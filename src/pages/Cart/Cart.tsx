import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, useTranslation, useToast } from '@/hooks';
import { formatPrice, getLocalizedText } from '@/utils/filters';
import { validateDeliveryForm, estimateDeliveryTime } from '@/utils/validation';
import { DELIVERY_FEE, PROMO_CODES, MAX_ORDER_TOTAL } from '@/data/dishes';
import type { DeliveryForm } from '@/types';
import styles from './Cart.module.scss';

export function CartPage() {
  const { t, language } = useTranslation();
  const {
    cart, removeItem, updateQuantity, applyPromo, clearCart,
    subtotal, discountAmount, tax, total, cartCount,
  } = useCart();
  const { addToast } = useToast();

  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<DeliveryForm>({
    fullName: '', phone: '', address: '', apartment: '', notes: '',
  });

  const deliveryTime = estimateDeliveryTime(cartCount);

  const handlePromo = () => {
    const code = promoInput.toUpperCase();
    if (PROMO_CODES[code]) {
      applyPromo(code);
      setPromoApplied(true);
      addToast(t('cart.promoSuccess'));
    } else {
      addToast(t('cart.promoError'), 'error');
    }
  };

  const handleOrder = () => {
    if (!validateDeliveryForm(form)) {
      addToast(t('cart.validationError'), 'error');
      return;
    }
    if (subtotal > MAX_ORDER_TOTAL) {
      addToast(t('cart.maxOrderError', { max: MAX_ORDER_TOTAL }), 'error');
      return;
    }
    setShowModal(true);
    clearCart();
  };

  if (cart.items.length === 0 && !showModal) {
    return (
      <div className={`container ${styles.cart}`}>
        <div className={styles.cart__empty}>
          <span className={styles.cart__emptyIcon}>🛒</span>
          <h2>{t('cart.empty')}</h2>
          <Link to="/menu" className="btn btn--primary">{t('cart.emptyCta')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.cart}`}>
      <h1 className="section-title">{t('cart.title')}</h1>

      <div className={styles.cart__layout}>
        <div className={styles.cart__items}>
          {cart.items.map((item) => (
            <div key={item.dish.id} className={styles.cart__item}>
              <img src={item.dish.image} alt="" />
              <div className={styles.cart__itemInfo}>
                <h3>{getLocalizedText(item.dish.name, language)}</h3>
                <span className={styles.cart__itemPrice}>{formatPrice(item.dish.price)}</span>
                <div className={styles.cart__qty}>
                  <button onClick={() => updateQuantity(item.dish.id, item.quantity - 1)} aria-label="Decrease">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.dish.id, item.quantity + 1)} aria-label="Increase">+</button>
                </div>
              </div>
              <div className={styles.cart__itemTotal}>
                {formatPrice(item.dish.price * item.quantity)}
              </div>
              <button
                className={styles.cart__remove}
                onClick={() => removeItem(item.dish.id)}
                aria-label={t('cart.remove')}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <aside className={styles.cart__sidebar}>
          <div className={styles.cart__summary}>
            <div className={styles.cart__row}>
              <span>{t('cart.subtotal')}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className={styles.cart__row}>
                <span>{t('cart.discount')}</span>
                <span className={styles.cart__discount}>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className={styles.cart__row}>
              <span>{t('cart.delivery')}</span>
              <span>{formatPrice(DELIVERY_FEE)}</span>
            </div>
            <div className={styles.cart__row}>
              <span>{t('cart.tax')}</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className={`${styles.cart__row} ${styles.cart__total}`}>
              <span>{t('cart.total')}</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className={styles.cart__promo}>
            <input
              type="text"
              placeholder={t('cart.promoPlaceholder')}
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              disabled={promoApplied}
            />
            <button className="btn btn--secondary" onClick={handlePromo} disabled={promoApplied}>
              {t('cart.applyPromo')}
            </button>
          </div>

          <div className={styles.cart__delivery}>
            <h3>{t('cart.deliveryAddress')}</h3>
            <input
              type="text"
              placeholder={t('cart.fullName')}
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder={t('cart.phone')}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder={t('cart.address')}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder={t('cart.apartment')}
              value={form.apartment}
              onChange={(e) => setForm({ ...form, apartment: e.target.value })}
            />
            <textarea
              placeholder={t('cart.notes')}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
            />
          </div>

          <p className={styles.cart__eta}>
            {t('cart.estimatedTime')}: <strong>{deliveryTime} {t('cart.minutes')}</strong>
          </p>

          <button className="btn btn--primary" onClick={handleOrder}>
            {t('cart.placeOrder')}
          </button>
        </aside>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className={styles.cart__modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className={styles.cart__modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={styles.cart__modalIcon}>✓</span>
              <h2>{t('cart.orderSuccess')}</h2>
              <p>{t('cart.orderSuccessMsg', { time: deliveryTime })}</p>
              <Link to="/" className="btn btn--primary" onClick={() => setShowModal(false)}>
                {t('nav.home')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
