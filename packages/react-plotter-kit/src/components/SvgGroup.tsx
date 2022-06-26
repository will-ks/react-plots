import React, { FC, SVGProps, useEffect, useRef, useState } from 'react';
import { HorizontalVerticalPair, RegionSize } from '../lib/usePlot';

export const SvgGroup: FC<SvgGroupProps> = (props) => {
  const {
    clipPathId,
    centerContents,
    paperSizeInPixels,
    marginInPixels,
    children,
    ...rest
  } = props;

  const groupRef = useRef<SVGSVGElement>(null);
  const [groupBBoxSize, setGroupBBoxSize] = useState<RegionSize>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (!groupRef.current) {
      return;
    }
    const groupBBox = groupRef.current.getBBox();
    setGroupBBoxSize({ width: groupBBox.width, height: groupBBox.height });
  }, [children]);

  return (
    <g
      ref={groupRef}
      clipPath={
        marginInPixels.horizontal + marginInPixels.vertical > 0
          ? `url(#${clipPathId})`
          : undefined
      }
      transform={
        centerContents
          ? `translate(${(paperSizeInPixels.width - groupBBoxSize.width) / 2},${
              (paperSizeInPixels.height - groupBBoxSize.height) / 2
            })`
          : `translate(${marginInPixels.horizontal},${marginInPixels.vertical})`
      }
      {...rest}
    >
      {children}
    </g>
  );
};

export type SvgGroupProps = {
  clipPathId: string;
  centerContents?: boolean;
  paperSizeInPixels: RegionSize;
  marginInPixels: HorizontalVerticalPair;
} & SVGProps<SVGSVGElement>;
