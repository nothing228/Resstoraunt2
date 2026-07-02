import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks';
import styles from './NotFound.module.scss';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className={styles.notFound}>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.message')}</p>
      <Link to="/" className="btn btn--primary">{t('notFound.back')}</Link>
    </div>
  );
}
