import React, { SVGProps } from 'react';
import { HorizontalVerticalPair, RegionSize } from '../lib/usePlot';

export const SvgPlotArea = React.forwardRef<SVGSVGElement, SvgPlotAreaProps>(
  (props, forwardedRef) => {
    const {
      children,
      paperSizeInPixels,
      drawableRegionInPixels,
      marginInPixels,
      clipPathId,
      ...svgProps
    } = props;

    return (
      <svg
        ref={forwardedRef}
        {...svgProps}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${paperSizeInPixels.width} ${paperSizeInPixels.height}`}
        style={{
          height: paperSizeInPixels.height,
          width: paperSizeInPixels.width,
        }}
      >
        {marginInPixels.horizontal + marginInPixels.vertical > 0 && (
          <clipPath id={clipPathId}>
            <rect
              x={0}
              y={0}
              width={drawableRegionInPixels.width}
              height={drawableRegionInPixels.height}
            />
          </clipPath>
        )}
        {children}
      </svg>
    );
  }
);

type Props = {
  paperSizeInPixels: RegionSize;
  drawableRegionInPixels: RegionSize;
  marginInPixels: HorizontalVerticalPair;
  clipPathId: string;
};
export type SvgPlotAreaProps = Props & Omit<SVGProps<SVGSVGElement>, 'ref'>;
