import React from 'react';
import { Modal } from '@consta/uikit/Modal';
import { Gradient } from '##/components/Gradient';
import { PropsWithHTMLAttributes } from '##/types/PropsWithHTMLAttributes';
import { cn } from '##/utils/bem';
import './GradientContainer.css';

type Props = PropsWithHTMLAttributes<{}, HTMLDivElement>;

const colors = [
  'var(--color-control-bg-primary)',
  'var(--color-control-typo-secondary-hover)',
  'var(--color-bg-normal-custom)',
  '#1c1d1f',
];

const cnGradientContainer = cn('GradientContainer');

export const GradientContainer = (props: Props) => {
  const { children, className } = props;

  return (
    <div className={cnGradientContainer(null, [className])}>
      <Gradient colors={colors} />
      <Modal
        isOpen
        hasOverlay={false}
        className={cnGradientContainer('Modal')}
        rootClassName={cnGradientContainer('Root')}
      >
        <div className={cnGradientContainer('Content')}>{children}</div>
      </Modal>
    </div>
  );
};
