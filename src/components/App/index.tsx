import { useEffect } from 'react';
import classNames from 'classnames/bind';

import { useAppDispatch, useAppSelector } from '../../store';
import { useGetAuthorsQuery } from '../../services/AuthorsService';
import { useGetLocationsQuery } from '../../services/LocationsService';
import { setAuthors, setLocations } from '../../store/reducers/appDataReducer';

import Header from '../Header';
import Main from '../Main';

import style from './App.module.scss';

const cx = classNames.bind(style);

const App = () => {
  const { data: authors } = useGetAuthorsQuery(undefined);
  const { data: locations } = useGetLocationsQuery(undefined);
  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authors) {
      dispatch(setAuthors(authors));
    }
  }, [authors]);

  useEffect(() => {
    if (locations) {
      dispatch(setLocations(locations));
    }
  }, [locations]);

  return (
    <div className={cx('App', { 'App--dark': isDarkTheme })}>
      <div className={cx('App__container')}>
        <Header />
        {authors && locations && <Main />}
      </div>
    </div>
  );
};

export default App;
