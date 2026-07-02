import type { Dispatch } from 'react';
import type { FilterAction, FilterState, DishCategory, DietaryTag } from '@/types';
import { CATEGORIES, DIETARY_TAGS, PRICE_MIN, PRICE_MAX } from '@/data/dishes';
import { useTranslation } from '@/hooks';
import { formatPrice } from '@/utils/filters';
import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
  filters: FilterState;
  dispatch: Dispatch<FilterAction>;
}

export function FilterPanel({ filters, dispatch }: FilterPanelProps) {
  const { t } = useTranslation();

  return (
    <aside className={styles.panel}>
      <div className={styles.panel__header}>
        <h2>{t('menu.filters')}</h2>
        <button className={styles.panel__clear} onClick={() => dispatch({ type: 'RESET' })}>
          {t('menu.clearAll')}
        </button>
      </div>

      <div className={styles.panel__group}>
        <label>{t('menu.category')}</label>
        <div className={styles.panel__chips}>
          <button
            className={`${styles.panel__chip} ${!filters.category ? styles['panel__chip--active'] : ''}`}
            onClick={() => dispatch({ type: 'SET_CATEGORY', payload: null })}
          >
            {t('menu.all')}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.panel__chip} ${filters.category === cat ? styles['panel__chip--active'] : ''}`}
              onClick={() => dispatch({ type: 'SET_CATEGORY', payload: cat as DishCategory })}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.panel__group}>
        <label>{t('menu.dietary')}</label>
        <div className={styles.panel__chips}>
          {DIETARY_TAGS.map((tag) => (
            <button
              key={tag}
              className={`${styles.panel__chip} ${filters.dietary.includes(tag as DietaryTag) ? styles['panel__chip--active'] : ''}`}
              onClick={() => dispatch({ type: 'TOGGLE_DIETARY', payload: tag as DietaryTag })}
            >
              {t(`dietary.${tag}`)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.panel__group}>
        <label>{t('menu.priceRange')}</label>
        <div className={styles.panel__rangeLabels}>
          <span>{formatPrice(filters.priceRange[0])}</span>
          <span>{formatPrice(filters.priceRange[1])}</span>
        </div>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={1}
          value={filters.priceRange[0]}
          onChange={(e) =>
            dispatch({
              type: 'SET_PRICE_RANGE',
              payload: [Number(e.target.value), filters.priceRange[1]],
            })
          }
        />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={1}
          value={filters.priceRange[1]}
          onChange={(e) =>
            dispatch({
              type: 'SET_PRICE_RANGE',
              payload: [filters.priceRange[0], Number(e.target.value)],
            })
          }
        />
      </div>

      <div className={styles.panel__group}>
        <label>{t('menu.sortBy')}</label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            dispatch({
              type: 'SET_SORT',
              payload: e.target.value as FilterState['sortBy'],
            })
          }
        >
          <option value="popular">{t('menu.sort.popular')}</option>
          <option value="rating">{t('menu.sort.rating')}</option>
          <option value="price-asc">{t('menu.sort.price-asc')}</option>
          <option value="price-desc">{t('menu.sort.price-desc')}</option>
        </select>
      </div>
    </aside>
  );
}
