import { getAsserted } from '@will-ks/helpers';
import React, { HTMLAttributes, useRef } from 'react';
import { saveAs } from 'file-saver';

export const Easel = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & Props
>((props, ref) => {
  const { children, style, toolbox, ...rest } = props;
  const containerRef = useRef<HTMLDivElement>(null);

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
        ref={containerRef}
        {...rest}
      >
        {children}
      </div>
      <div
        style={{
          boxShadow: '-1px 13px 30px 7px rgba(171,171,171,0.39)',
          display: 'grid',
          gridGap: '2em',
          padding: '10px',
          marginLeft: '30px',
          flexDirection: 'column',
          ...style,
        }}
        {...rest}
      >
        <button
          onClick={() => {
            const containerElement = getAsserted(containerRef.current);
            const svgContents = containerElement.innerHTML;
            const svgBlob = new Blob([svgContents], { type: 'image/svg+xml' });
            saveAs(svgBlob);
          }}
        >
          Save
        </button>
        {toolbox?.map((element) => (
          <div>{element}</div>
        ))}
      </div>
    </div>
  );
});

type Props = {
  toolbox?: React.ReactNode[];
};
