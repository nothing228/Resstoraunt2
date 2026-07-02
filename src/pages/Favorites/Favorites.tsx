import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDishes } from '@/hooks/useDishes';
import { useFavorites, useTranslation } from '@/hooks';
import { DishCard } from '@/components/DishCard/DishCard';
import styles from './Favorites.module.scss';

export function Favorites() {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const { dishes, loading } = useDishes();

  const favoriteDishes = useMemo(
    () => dishes.filter((d) => favorites.includes(d.id)),
    [dishes, favorites]
  );

  return (
    <div className={`container ${styles.favorites}`}>
      <h1 className="section-title">{t('favorites.title')}</h1>
      <p className="section-subtitle">{t('favorites.subtitle')}</p>

      {loading ? (
        <p className={styles.favorites__status}>{t('common.loading')}</p>
      ) : favoriteDishes.length === 0 ? (
        <div className={styles.favorites__empty}>
          <span>♡</span>
          <p>{t('favorites.empty')}</p>
          <Link to="/menu" className="btn btn--primary">{t('favorites.browse')}</Link>
        </div>
      ) : (
        <div className={styles.favorites__grid}>
          {favoriteDishes.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
