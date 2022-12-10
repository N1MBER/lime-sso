import { cn } from '##/utils/bem';
import './MixAuth.css';

type Props = {
  withBottomContainer?: boolean;
};

type CnAuth = (
  className: string | undefined | null,
  props: Props | undefined | null,
  classNames?: Array<string | undefined>,
) => string;

const cnAuth = cn('MixAuth');

export const cnMixAuth: CnAuth = (
  className = '',
  props = {},
  classNames = [],
) => cnAuth(className ?? '', { ...props }, [...classNames]);
