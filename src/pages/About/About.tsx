import { FiInstagram, FiFacebook } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';
import { RESTAURANT } from '@/data/dishes';
import { useTranslation } from '@/hooks';
import { getLocalizedText } from '@/utils/filters';
import styles from './About.module.scss';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

export function About() {
  const { t, language } = useTranslation();
  const info = RESTAURANT;

  return (
    <div className={styles.about}>
      <section className={`container ${styles.about__hero}`}>
        <h1 className="section-title">{t('about.title')}</h1>
        <p className="section-subtitle">{t('about.subtitle')}</p>
        <p className={styles.about__desc}>{getLocalizedText(info.description, language)}</p>
      </section>

      <section className={`container ${styles.about__story}`}>
        <div className={styles.about__storyGrid}>
          <div className={styles.about__storyCard}>
            <h3>{t('about.history')}</h3>
            <p>{getLocalizedText(info.description, language)}</p>
            <span className={styles.about__founded}>Est. {info.founded}</span>
          </div>
          <div className={styles.about__storyCard}>
            <h3>{t('about.mission')}</h3>
            <p>{getLocalizedText(info.mission, language)}</p>
          </div>
          <div className={styles.about__storyCard}>
            <h3>{t('about.vision')}</h3>
            <p>{getLocalizedText(info.vision, language)}</p>
          </div>
        </div>
      </section>

      <section className={`container ${styles.about__chef}`}>
        <h2 className="section-title">{t('about.chef')}</h2>
        <div className={styles.about__chefCard}>
          <img src={info.chefImage} alt={getLocalizedText(info.chefName, language)} />
          <div>
            <h3>{getLocalizedText(info.chefName, language)}</h3>
            <p>{getLocalizedText(info.chefBio, language)}</p>
          </div>
        </div>
      </section>

      <section className={`container ${styles.about__gallery}`}>
        <h2 className="section-title">{t('about.gallery')}</h2>
        <div className={styles.about__galleryGrid}>
          {info.images.map((img, i) => (
            <img key={i} src={img} alt={`Restaurant ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </section>

      <section className={`container ${styles.about__info}`}>
        <div className={styles.about__infoGrid}>
          <div>
            <h3>{t('about.hours')}</h3>
            <table className={styles.about__hours}>
              <tbody>
                {DAYS.map((day) => (
                  <tr key={day}>
                    <td>{t(`days.${day}`)}</td>
                    <td>{getLocalizedText(info.openingHours[day], language)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3>{t('about.contact')}</h3>
            <dl className={styles.about__contact}>
              <dt>{t('about.address')}</dt>
              <dd>{getLocalizedText(info.address, language)}</dd>
              <dt>{t('about.phone')}</dt>
              <dd><a href={`tel:${info.phone}`}>{info.phone}</a></dd>
              <dt>{t('about.email')}</dt>
              <dd><a href={`mailto:${info.email}`}>{info.email}</a></dd>
            </dl>

            <h3 className={styles.about__socialTitle}>{t('about.followUs')}</h3>
            <div className={styles.about__social}>
              {info.socialMedia.instagram && (
                <a href={info.socialMedia.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FiInstagram />
                </a>
              )}
              {info.socialMedia.telegram && (
                <a href={info.socialMedia.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <FaTelegramPlane />
                </a>
              )}
              {info.socialMedia.facebook && (
                <a href={info.socialMedia.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FiFacebook />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.about__map}>
          <iframe
            title="Restaurant location"
            src="https://maps.google.com/maps?q=New+York+NY&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
