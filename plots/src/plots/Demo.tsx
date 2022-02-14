import {
  Coordinates,
  Easel,
  getGridCoords,
  getSizesInPixels,
  PAPER_SIZES_MILLIMETERS,
  SvgPlotArea,
  Turtle,
} from '@react-plots/react-plotter-kit';
import { useSlider } from '@react-plots/react-plotter-kit/src/lib/useSlider';
import React from 'react';

const { drawableRegionInPixels, marginInPixels } = getSizesInPixels(
  PAPER_SIZES_MILLIMETERS.a4.vertical,
  0.5,
  {
    horizontal: 20,
    vertical: 20,
  }
);

const drawSpiral = (coords: Coordinates) => {
  const turtle = new Turtle().penUp();
  turtle.goTo(coords, false);
  let distance = 1000;
  while (distance > 0) {
    turtle
      .penDown()
      .forward(distance / 20)
      .right(90);
    distance -= 100;
  }

  return turtle.getPaths();
};

const Demo = () => {
  const { value: xNum, slider: xNumSlider } = useSlider(
    1,
    Math.floor(drawableRegionInPixels.width / 50),
    'xNum'
  );
  const { value: yNum, slider: yNumSlider } = useSlider(
    1,
    Math.floor(drawableRegionInPixels.height / 50),
    'yNum'
  );
  const points = getGridCoords(
    { horizontal: xNum, vertical: yNum },
    drawableRegionInPixels
  );
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Easel toolbox={[xNumSlider, yNumSlider]}>
        <SvgPlotArea
          drawableRegionInPixels={drawableRegionInPixels}
          marginInPixels={marginInPixels}
          centerContents={true}
        >
          {points.map((coords) => drawSpiral(coords))}
        </SvgPlotArea>
      </Easel>
    </div>
  );
};

export default Demo;
