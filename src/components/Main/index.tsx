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
  const {
    data: { data, totalCount } = { data: [], totalCount: 0 },
    isLoading,
    isError,
  } = useGetPaintingsQuery({
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
      {data.length > 0 && (
        <div className={cx('Main__content')}>
          <PaintingsList paintings={data} />
          {totalCount > 0 && (
            <Pagination
              pagesAmount={Math.ceil(totalCount / PAINTINGS_LIMIT)}
              currentPage={paintingsCurentPage}
              onChange={handleChangePagination}
              isDarkTheme={isDarkTheme}
            />
          )}
        </div>
      )}
      {data.length === 0 && !isLoading && <h3>Картины не найдены</h3>}
      {isLoading && <h3>Загрузка</h3>}
      {isError && <h3>Ошибка загрузки</h3>}
    </main>
  );
};

export default Main;
