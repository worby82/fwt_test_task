import classNames from 'classnames/bind';

import { useGetAuthorName, useGetLocationName } from '../../hooks/appData';

import { IPainting } from '../../models/IPainting';
import { BASE_URL } from '../../constants';

import styles from './Painting.module.scss';

interface PaintingProps {
  painting: IPainting;
}

const Painting: React.FC<PaintingProps> = ({ painting }: PaintingProps) => {
  const cx = classNames.bind(styles);
  const authorName = useGetAuthorName();
  const locationName = useGetLocationName();

  return (
    <div className={cx('Painting')}>
      <img
        className={cx('Painting__image')}
        src={BASE_URL + painting.imageUrl}
        alt={painting.name}
        loading="lazy"
      />
      <div className={cx('Painting__info')}>
        <h3 className={cx('Painting__title')}>{painting.name}</h3>
        <p className={cx('Painting__text')}>
          <span className={cx('Painting__text-title')}>Author:</span>{' '}
          {authorName(painting.authorId)}
        </p>
        <p className={cx('Painting__text')}>
          <span className={cx('Painting__text-title')}>Created:</span> {painting.created}
        </p>
        <p className={cx('Painting__text')}>
          <span className={cx('Painting__text-title')}>Location:</span>{' '}
          {locationName(painting.locationId)}
        </p>
      </div>
    </div>
  );
};

export default Painting;
