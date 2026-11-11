import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loaderWrapper}>
      <RotatingLines visible={true} height="50" width="50" color="grey" strokeWidth="5" animationDuration="0.75" />
    </div>
  );
}
