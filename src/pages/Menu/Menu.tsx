import { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDishes } from '@/hooks/useDishes';
import { useFilters, useTranslation } from '@/hooks';
import { filterAndSortDishes } from '@/utils/filters';
import { FilterPanel } from '@/components/FilterPanel/FilterPanel';
import { DishCard } from '@/components/DishCard/DishCard';
import type { DishCategory } from '@/types';
import styles from './Menu.module.scss';

export function Menu() {
  const { t } = useTranslation();
  const { dishes, loading, error } = useDishes();
  const { filters, dispatchFilter } = useFilters();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      dispatchFilter({ type: 'SET_CATEGORY', payload: cat as DishCategory });
    }
  }, [searchParams, dispatchFilter]);

  const filtered = useMemo(
    () => filterAndSortDishes(dishes, filters),
    [dishes, filters]
  );

  return (
    <div className={`container ${styles.menu}`}>
      <header className={styles.menu__header}>
        <h1 className="section-title">{t('menu.title')}</h1>
        <p className="section-subtitle">{t('menu.subtitle')}</p>
      </header>

      <div className={styles.menu__layout}>
        <FilterPanel filters={filters} dispatch={dispatchFilter} />

        <div className={styles.menu__content}>
          {loading && <p className={styles.menu__status}>{t('common.loading')}</p>}
          {error && <p className={styles.menu__status}>{t('common.error')}</p>}

          {!loading && !error && (
            <>
              <p className={styles.menu__count}>
                {t('menu.results', { count: filtered.length, total: dishes.length })}
              </p>

              {filtered.length === 0 ? (
                <p className={styles.menu__empty}>{t('menu.noResults')}</p>
              ) : (
                <div className={styles.menu__grid}>
                  {filtered.map((dish, i) => (
                    <DishCard key={dish.id} dish={dish} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
