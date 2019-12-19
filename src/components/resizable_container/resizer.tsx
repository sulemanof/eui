import React from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiIcon } from '../icon';
import { EuiI18n } from '../i18n';

export type ResizerMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ResizerKeyDownEvent = React.KeyboardEvent<HTMLButtonElement>;

export interface ResizerProps extends CommonProps {
  /**
   * This flag specifies if the resizable container should be horizontal or vertical
   *
   * @default true
   */
  isHorizontal?: boolean;
}

function Resizer({ isHorizontal = true, className, ...rest }: ResizerProps) {
  const classes = classNames(
    'euiResizer',
    {
      'euiResizer--vertical': !isHorizontal,
      'euiResizer--horizontal': isHorizontal,
    },
    className
  );

  return (
    <EuiI18n
      tokens={[
        'euiResizer.horizontalResizerAriaLabel',
        'euiResizer.verticalResizerAriaLabel',
      ]}
      defaults={[
        'Press left/right to adjust panels size',
        'Press up/down to adjust panels size',
      ]}>
      {([horizontalResizerAriaLabel, verticalResizerAriaLabel]: string[]) => (
        <button
          aria-label={
            isHorizontal ? horizontalResizerAriaLabel : verticalResizerAriaLabel
          }
          className={classes}
          data-test-subj="splitPanelResizer"
          {...rest}>
          <EuiIcon type={isHorizontal ? 'grabHorizontal' : 'grab'} />
        </button>
      )}
    </EuiI18n>
  );
}

export function resizerWithControls(controls: {
  onKeyDown: (eve: ResizerKeyDownEvent) => void;
  onMouseDown: (eve: ResizerMouseEvent) => void;
}) {
  return (props: ResizerProps) => <Resizer {...controls} {...props} />;
}