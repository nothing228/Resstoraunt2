import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { useTheme, useLanguage, useTranslation, useFavorites, useFilters } from '@/hooks';
import { useDebounce } from '@/hooks/useDebounce';
import { MiniCart } from '@/components/MiniCart/MiniCart';
import styles from './Header.module.scss';

export function Header() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { favorites } = useFavorites();
  const { dispatchFilter } = useFilters();
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    dispatchFilter({ type: 'SET_SEARCH', payload: debouncedSearch });
  }, [debouncedSearch, dispatchFilter]);

  const nav = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/menu', label: t('nav.menu') },
    { to: '/about', label: t('nav.about') },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Link to="/" className={styles.header__logo}>
          <span className={styles.header__logoIcon}>🍽</span>
          <span>Savory & Co.</span>
        </Link>

        <nav className={`${styles.header__nav} ${mobileOpen ? styles['header__nav--open'] : ''}`}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `${styles.header__link} ${isActive ? styles['header__link--active'] : ''}`
              }
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.header__search}>
          <input
            type="search"
            placeholder={t('search.placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={t('search.placeholder')}
          />
        </div>

        <div className={styles.header__actions}>
          <select
            className={styles.header__lang}
            value={language}
            onChange={(e) => setLanguage(e.target.value as typeof language)}
            aria-label="Language"
          >
            <option value="en">🇬🇧 EN</option>
            <option value="ru">🇷🇺 RU</option>
            <option value="uz">🇺🇿 UZ</option>
          </select>

          <button
            className={styles.header__theme}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          <Link to="/favorites" className={styles.header__fav} aria-label={t('header.favorites')}>
            <FiHeart />
            {favorites.length > 0 && (
              <span className={styles.header__badge}>{favorites.length}</span>
            )}
          </Link>

          <MiniCart />
        </div>

        <button
          className={styles.header__burger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
