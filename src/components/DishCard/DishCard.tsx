import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiStar, FiClock } from 'react-icons/fi';
import type { Dish } from '@/types';
import { useCart, useFavorites, useTranslation, useToast } from '@/hooks';
import { formatPrice, getLocalizedText } from '@/utils/filters';
import { ImageSkeleton } from '@/components/ImageSkeleton/ImageSkeleton';
import { MAX_ORDER_TOTAL } from '@/data/dishes';
import styles from './DishCard.module.scss';

interface DishCardProps {
  dish: Dish;
  index?: number;
  showQuantity?: boolean;
}

export function DishCard({ dish, index = 0, showQuantity = true }: DishCardProps) {
  const { t, language } = useTranslation();
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const [qty, setQty] = useState(1);
  const favorited = isFavorite(dish.id);

  const handleAdd = () => {
    if (!dish.isAvailable) return;
    for (let i = 0; i < qty; i++) {
      const ok = addItem(dish);
      if (!ok) {
        addToast(t('cart.maxOrderError', { max: MAX_ORDER_TOTAL }), 'error');
        return;
      }
    }
    addToast(t('toast.addedToCart'));
  };

  const handleFav = () => {
    toggleFavorite(dish.id);
    addToast(favorited ? t('toast.removedFromFavorites') : t('toast.addedToFavorites'));
  };

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <div className={styles.card__imageWrap}>
        <ImageSkeleton src={dish.image} alt={getLocalizedText(dish.name, language)} className={styles.card__image} />
        <button
          className={`${styles.card__fav} ${favorited ? styles['card__fav--active'] : ''}`}
          onClick={handleFav}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiHeart />
        </button>
        {dish.special && <span className={styles.card__badge}>Special</span>}
      </div>

      <div className={styles.card__body}>
        <div className={styles.card__meta}>
          <span className={styles.card__category}>{t(`categories.${dish.category}`)}</span>
          <span className={styles.card__rating}>
            <FiStar /> {dish.rating} ({dish.reviews})
          </span>
        </div>

        <h3 className={styles.card__name}>{getLocalizedText(dish.name, language)}</h3>
        <p className={styles.card__desc}>{getLocalizedText(dish.description, language)}</p>

        <div className={styles.card__footer}>
          <div>
            <span className={styles.card__price}>{formatPrice(dish.price)}</span>
            <span className={styles.card__time}><FiClock /> {dish.preparationTime} {t('dish.min')}</span>
          </div>

          {showQuantity && dish.isAvailable && (
            <div className={styles.card__actions}>
              <div className={styles.card__qty}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
              </div>
              <button className={`btn btn--primary ${styles.card__addBtn}`} onClick={handleAdd}>
                {t('dish.addToCart')}
              </button>
            </div>
          )}

          {!dish.isAvailable && (
            <span className={styles.card__unavailable}>{t('dish.unavailable')}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
