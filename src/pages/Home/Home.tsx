import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { fetchSpecials } from '@/data/api';
import { REVIEWS } from '@/data/dishes';
import type { Dish, DishCategory } from '@/types';
import { useTranslation } from '@/hooks';
import { getLocalizedText } from '@/utils/filters';
import { DishCard } from '@/components/DishCard/DishCard';
import styles from './Home.module.scss';

const HERO_IMG = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80';

const QUICK_CATS: DishCategory[] = ['pizza', 'burgers', 'sushi', 'drinks', 'desserts'];

const CAT_EMOJI: Record<string, string> = {
  pizza: '🍕', burgers: '🍔', sushi: '🍣', drinks: '🥤', desserts: '🍰',
};

export function Home() {
  const { t, language } = useTranslation();
  const [specials, setSpecials] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpecials().then(setSpecials).finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.home}>
      <section className={styles.home__hero}>
        <img src={HERO_IMG} alt="" className={styles.home__heroBg} />
        <div className={styles.home__heroOverlay} />
        <div className={styles.home__heroContent}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            className={styles.home__heroBtns}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link to="/menu" className="btn btn--primary">{t('hero.cta')}</Link>
            <Link to="/menu" className="btn btn--secondary">{t('hero.secondary')}</Link>
          </motion.div>
        </div>
      </section>

      <section className={`container ${styles.home__categories}`}>
        <h2 className="section-title">{t('categories.title')}</h2>
        <div className={styles.home__catGrid}>
          {QUICK_CATS.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={`/menu?category=${cat}`} className={styles.home__catCard}>
                <span className={styles.home__catEmoji}>{CAT_EMOJI[cat]}</span>
                <span>{t(`categories.${cat}`)}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={`container ${styles.home__specials}`}>
        <h2 className="section-title">{t('specials.title')}</h2>
        <p className="section-subtitle">{t('specials.subtitle')}</p>
        {loading ? (
          <p className={styles.home__loading}>{t('common.loading')}</p>
        ) : (
          <div className={styles.home__grid}>
            {specials.map((dish, i) => (
              <DishCard key={dish.id} dish={dish} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.home__promo}>
        <div className="container">
          <motion.div
            className={styles.home__promoBanner}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2>{t('promo.title')}</h2>
              <p>{t('promo.subtitle')}</p>
            </div>
            <Link to="/menu" className="btn btn--primary">{t('promo.cta')}</Link>
          </motion.div>
        </div>
      </section>

      <section className={`container ${styles.home__reviews}`}>
        <h2 className="section-title">{t('reviews.title')}</h2>
        <p className="section-subtitle">{t('reviews.subtitle')}</p>
        <div className={styles.home__reviewGrid}>
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              className={styles.home__reviewCard}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <img src={review.avatar} alt={review.name} className={styles.home__reviewAvatar} />
              <div className={styles.home__reviewStars}>
                {Array.from({ length: review.rating }).map((_, j) => (
                  <FiStar key={j} />
                ))}
              </div>
              <p>{getLocalizedText(review.comment, language)}</p>
              <span className={styles.home__reviewName}>— {review.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
