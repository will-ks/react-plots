import React, { HTMLAttributes } from 'react';

export const Easel = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { children, style, ...rest } = props;

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '50px 30px',
        }}
      >
        <div
          style={{
            boxShadow: '-1px 13px 30px 7px rgba(171,171,171,0.39)',
            display: 'flex',
            ...style,
          }}
          {...rest}
        >
          {children}
        </div>
      </div>
    );
  }
);

