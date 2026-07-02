import { useTranslation } from '@/hooks';
import styles from './Footer.module.scss';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div>
          <span className={styles.footer__brand}>Savory & Co.</span>
          <p className={styles.footer__tagline}>{t('footer.tagline')}</p>
        </div>
        <p className={styles.footer__rights}>© {year}. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}
