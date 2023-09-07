import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Input, Select, Range } from 'fwt-internship-uikit';

import { useGetAuthorId, useGetLocationId } from '../../hooks/appData';
import { useAppDispatch, useAppSelector } from '../../store';
import { setPaintingsRequestArguments } from '../../store/reducers/appDataReducer';
import {
  DEFAULT_AUTOR_VALUE,
  DEFAULT_LOCATION_VALUE,
  PAINTINGS_REQUEST_KEY_AUTHOR_ID,
  PAINTINGS_REQUEST_KEY_CREATED_FROM,
  PAINTINGS_REQUEST_KEY_CREATED_TO,
  PAINTINGS_REQUEST_KEY_LOCATION_ID,
  PAINTINGS_REQUEST_KEY_SEARCH_BUY_NAME,
} from '../../constants';

import '../../assets/style/external_ui.scss';
import styles from './Filter.module.scss';

const Filter = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<string>(DEFAULT_AUTOR_VALUE);
  const [selectedLocation, setSelectedLocation] = useState<string>(DEFAULT_LOCATION_VALUE);
  const [valueFrom, setValueFrom] = useState('');
  const [valueTo, setValueTo] = useState('');
  const authors = useAppSelector((state) => state.appData.authors);
  const locations = useAppSelector((state) => state.appData.locations);
  const getAuthorId = useGetAuthorId();
  const getLocationId = useGetLocationId();

  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

  const dispatch = useAppDispatch();

  const cx = classNames.bind(styles);

  const handlerInputSearchByName = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(
      setPaintingsRequestArguments({
        argumentKey: PAINTINGS_REQUEST_KEY_SEARCH_BUY_NAME,
        value: event.currentTarget.value,
      }),
    );
  };

  const handlerChangeFrom = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(
      setPaintingsRequestArguments({
        argumentKey: PAINTINGS_REQUEST_KEY_CREATED_FROM,
        value: event.currentTarget.value,
      }),
    );
  };

  const handlerChangeTo = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(
      setPaintingsRequestArguments({
        argumentKey: PAINTINGS_REQUEST_KEY_CREATED_TO,
        value: event.currentTarget.value,
      }),
    );
  };

  const handlerInputFrom = (event: React.FormEvent<HTMLInputElement>) => {
    setValueFrom(event.currentTarget.value.replace(/[^0-9]/, ''));
  };

  const handlerInputTo = (event: React.FormEvent<HTMLInputElement>) => {
    setValueTo(event.currentTarget.value.replace(/[^0-9]/, ''));
  };

  const handleCloseCreatedRange = () => {
    return false;
  };

  useEffect(() => {
    if (authors) {
      dispatch(
        setPaintingsRequestArguments({
          argumentKey: PAINTINGS_REQUEST_KEY_AUTHOR_ID,
          value: getAuthorId(selectedAuthor),
        }),
      );
    }
  }, [selectedAuthor]);

  useEffect(() => {
    if (locations) {
      dispatch(
        setPaintingsRequestArguments({
          argumentKey: PAINTINGS_REQUEST_KEY_LOCATION_ID,
          value: getLocationId(selectedLocation),
        }),
      );
    }
  }, [selectedLocation]);

  return (
    <div className={cx('Filter')}>
      <Input
        className={cx('Filter__item')}
        isDarkTheme={isDarkTheme}
        onInput={handlerInputSearchByName}
        placeholder="Name"
      />
      {authors && (
        <Select
          isDarkTheme={isDarkTheme}
          options={[{ id: -1, name: DEFAULT_AUTOR_VALUE }, ...authors]}
          onChange={setSelectedAuthor}
          value={selectedAuthor}
          disabled={false}
          className={cx('Filter__item')}
        />
      )}
      {locations && (
        <Select
          isDarkTheme={isDarkTheme}
          options={[
            { id: -1, name: DEFAULT_LOCATION_VALUE },
            ...locations.map((location) => ({ id: location.id, name: location.location })),
          ]}
          onChange={setSelectedLocation}
          value={selectedLocation}
          disabled={false}
          className={cx('Filter__item')}
        />
      )}
      <Range
        className={cx('Filter__item')}
        isDarkTheme={isDarkTheme}
        onClose={handleCloseCreatedRange}>
        <Input
          isDarkTheme={isDarkTheme}
          className={cx('input', {
            'input--dark': isDarkTheme,
          })}
          placeholder="from"
          onChange={handlerChangeFrom}
          onInput={handlerInputFrom}
          value={valueFrom}
        />
        <div
          className={cx('separator', {
            'separator--dark': isDarkTheme,
          })}
        />
        <Input
          isDarkTheme={isDarkTheme}
          className={cx('input', {
            'input--dark': isDarkTheme,
          })}
          placeholder="before"
          onChange={handlerChangeTo}
          onInput={handlerInputTo}
          value={valueTo}
        />
      </Range>
    </div>
  );
};

export default Filter;
