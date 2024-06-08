import { useMemo, useState } from 'react';
import classes from './Switcher.module.css';
import { getActiveToggleClass, getTogglePosition } from './Switcher.service';
import { DataLoader } from '../Loaders/Loaders';
import { accentColor, alertMessages } from '../../utils/constants';

export const switcherTypes = {
  MAIN: classes.mainSwitcher,
  MULTI: classes.multiSwitcher
};

export const Switcher = ({
  type = switcherTypes.MAIN,
  value,
  setValue,
  setAlert,
  hasLoader
}) => {
  const [loading, setLoading] = useState(false);
  const showLoader = useMemo(() => hasLoader && loading, [hasLoader, loading]);

  const changeValue = async (v) => {
    if (value === v) return;
    if (hasLoader) {
      setLoading(true);
      const res = await setValue(v);
      if (!res && setAlert) setAlert(alertMessages.somethingWrong, 'error');
      setLoading(false);
    } else {
      setValue(v);
    }
  };

  if (!type) return null;

  return (
    <div className={type}>
      <div
        style={{ left: getTogglePosition(value) }}
        className={`${classes.switcherToggle} ${
          classes[getActiveToggleClass(value)]
        }`}
      />
      <div className={classes.switcherItemBox}>
        <div
          className={`${classes.switcherItem} ${
            value === false ? classes.activeItem : ''
          }`}
          onClick={() => changeValue(false)}
        >
          NO
        </div>
        {type === switcherTypes.MULTI && (
          <div className={classes.switcherNullBox}>
            <div
              className={`${classes.switcherNull} ${
                value === null ? classes.activeNull : ''
              }`}
            />
          </div>
        )}
        <div
          className={`${classes.switcherItem} ${
            value === true ? classes.activeItem : ''
          }`}
          onClick={() => changeValue(true)}
        >
          YES
        </div>
      </div>
      {showLoader && (
        <div className={classes.loaderBox}>
          <DataLoader size="20px" color={accentColor} />
        </div>
      )}
    </div>
  );
};
