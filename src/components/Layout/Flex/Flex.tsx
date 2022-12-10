import React, { CSSProperties, forwardRef } from 'react';
import { PropsWithHTMLAttributesAndRef } from '##/types/PropsWithHTMLAttributes';
import { cn } from '##/utils/bem';
import './Flex.css';

type Props = PropsWithHTMLAttributesAndRef<
  {
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    gap?: CSSProperties['gap'];
  },
  HTMLDivElement
>;

const cnFlex = cn('Flex');

export const Flex = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    align = 'flex-start',
    direction = 'row',
    justify = 'flex-start',
    wrap = 'nowrap',
    gap = 0,
    className,
    children,
  } = props;

  return (
    <div
      ref={ref}
      style={{
        ['--flex-align' as string]: align,
        ['--flex-direction' as string]: direction,
        ['--flex-justify' as string]: justify,
        ['--flex-wrap' as string]: wrap,
        ['--flex-gap' as string]: gap,
      }}
      className={cnFlex(null, [className])}
    >
      {children}
    </div>
  );
});
