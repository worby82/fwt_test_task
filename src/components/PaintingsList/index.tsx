import classNames from 'classnames/bind';

import { IPainting } from '../../models/IPainting';

import Painting from '../Painting';

import styles from './PaintingsList.module.scss';

interface PaintingsListProps {
  paintings: IPainting[];
}

const PaintingsList = ({ paintings }: PaintingsListProps) => {
  const cx = classNames.bind(styles);
  return (
    <div className={cx('PaintingsList')}>
      {paintings.map((painting) => (
        <Painting key={painting.id} painting={painting} />
      ))}
    </div>
  );
};

export default PaintingsList;
