import { useEffect } from 'react';
import { Pagination } from 'fwt-internship-uikit';
import classNames from 'classnames/bind';

import { useAppDispatch, useAppSelector } from '../../store';
import { setPaintingsCurentPage } from '../../store/reducers/appDataReducer';
import { useGetPaintingsQuery } from '../../services/PaintingsService';
import { PAINTINGS_LIMIT } from '../../constants';

import PaintingsList from '../PaintingsList';
import Filter from '../Filter';

import '../../assets/style/external_ui.scss';
import styles from './Main.module.scss';

const Main = () => {
  const cx = classNames.bind(styles);
  const paintingsCurentPage = useAppSelector((state) => state.appData.paintingsCurentPage);
  const paintingsRequestArguments = useAppSelector(
    (state) => state.appData.paintingsRequestArguments,
  );
  const { data: paintings } = useGetPaintingsQuery({
    page: paintingsCurentPage,
    args: paintingsRequestArguments,
  });

  const dispatch = useAppDispatch();

  const handleChangePagination = (page: number) => {
    dispatch(setPaintingsCurentPage(page));
  };

  useEffect(() => {
    dispatch(setPaintingsCurentPage(1));
  }, [paintingsRequestArguments]);

  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);
  return (
    <main className={cx('Main')}>
      <Filter />
      {paintings && (
        <div className={cx('Main__content')}>
          <PaintingsList paintings={paintings.data} />
          {paintings && paintings.totalCount && (
            <Pagination
              pagesAmount={Math.ceil(paintings.totalCount / PAINTINGS_LIMIT)}
              currentPage={paintingsCurentPage}
              onChange={handleChangePagination}
              isDarkTheme={isDarkTheme}
            />
          )}
        </div>
      )}
    </main>
  );
};

export default Main;
