import { useState } from 'react';
import styles from './ImageSkeleton.module.scss';

interface ImageSkeletonProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageSkeleton({ src, alt, className = '' }: ImageSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {!loaded && <div className={`${styles.wrapper__skeleton} skeleton`} />}
      <img
        src={src}
        alt={alt}
        className={`${styles.wrapper__img} ${loaded ? styles['wrapper__img--loaded'] : ''}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}
