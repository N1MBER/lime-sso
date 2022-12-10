import React, { useMemo, useEffect } from 'react';
import { cn } from '##/utils/bem';
import './Gradient.css';
import { Gradient as StripeGradient } from './stripeGradient';

const cnGradient = cn('Gradient');

type Props = { colors?: string[]; className?: string };

const getColorsVariables = (colors: string[]): Record<string, string> => {
  const vars: Record<string, string> = {};
  colors.forEach((color, index) => {
    vars[`--gradient-color-${index + 1}`] = color;
  });
  return vars;
};

export const Gradient = (props: Props) => {
  const { colors = [], className } = props;

  const gradient = useMemo(() => new StripeGradient(), [colors]);

  useEffect(() => {
    gradient.initGradient('#gradient-canvas');
  }, [gradient]);

  return (
    <div
      style={{
        ...getColorsVariables(colors),
      }}
      className={cnGradient(null, [className])}
    >
      <div className={cnGradient('Overlay')}>
        <canvas className={cnGradient('Canvas')} id="gradient-canvas" />
      </div>
    </div>
  );
};
