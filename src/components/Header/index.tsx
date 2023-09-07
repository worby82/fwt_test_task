import classNames from 'classnames/bind';

import { useAppDispatch, useAppSelector } from '../../store';
import { toggleTheme } from '../../store/reducers/themeReducerSlice';

import { ReactComponent as Logo } from '../../assets/imges/logo.svg';
import { ReactComponent as ThemeButton } from '../../assets/imges/theme-button.svg';
import { ReactComponent as LogoDark } from '../../assets/imges/logo-dark.svg';
import { ReactComponent as ThemeButtonDark } from '../../assets/imges/theme-button-dark.svg';

import styles from './Header.module.scss';

const Header = () => {
  const cx = classNames.bind(styles);
  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);
  const dispatch = useAppDispatch();

  const handleClickTemeToggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <header className={cx('Header')}>
      {isDarkTheme ? <LogoDark /> : <Logo />}
      <button className={cx('Header__button')} onClick={handleClickTemeToggle} type="button">
        {isDarkTheme ? <ThemeButtonDark /> : <ThemeButton />}
      </button>
    </header>
  );
};

export default Header;
