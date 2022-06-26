import {
  Coordinates,
  Easel,
  getArrayOfNumbers,
  getRandomInteger,
  getRandomNumber,
  getSizesInPixels,
  PAPER_SIZES_MILLIMETERS,
  SvgPlotArea,
  Turtle,
} from '@react-plots/react-plotter-kit';
import { SvgGroup } from '@react-plots/react-plotter-kit/src/components/SvgGroup';
import usePlot from '@react-plots/react-plotter-kit/src/lib/usePlot';
import { useSlider } from '@react-plots/react-plotter-kit/src/lib/useSlider';
import React from 'react';

const { drawableRegionInPixels, marginInPixels } = getSizesInPixels(
  PAPER_SIZES_MILLIMETERS.a3.vertical,
  0.5,
  {
    horizontal: 20,
    vertical: 20,
  }
);

const drawBranch = (
  coords: Coordinates,
  initialLifetime = 0,
  initialBearing = 90,
  initialDirection: 'left' | 'right' = 'left'
) => {
  const nodes: { coords: Coordinates; lifetime: number; bearing: number }[] =
    [];
  const decideIfContinue = () => getRandomNumber() < 0.8 - lifetime / 300;
  const decideIfNode = () => getRandomNumber() < 1 - lifetime / 500;

  let lifetime = initialLifetime;
  const turtle = new Turtle(coords).face(initialBearing);

  while (decideIfContinue()) {
    if (decideIfNode()) {
      nodes.push({
        coords: turtle.getPosition(),
        lifetime,
        bearing: turtle.getOrientation(),
      });
    }
    turtle.penDown().forward(getRandomInteger(10, 25));
    const rotation = getRandomInteger(2, 2 + Math.max(20 - lifetime / 3, 0));
    switch (initialDirection) {
      case 'left':
        turtle.left(rotation);
        break;
      case 'right':
        turtle.right(rotation);
        break;
    }
    lifetime++;
  }
  const subBranches = nodes
    .map(({ coords, bearing, lifetime }) => {
      const direction = getRandomInteger(0, 1) === 0 ? 'left' : 'right';
      return drawBranch(
        coords,
        lifetime * 3,
        bearing +
          (direction === 'left'
            ? getRandomInteger(0, 10)
            : 0 - getRandomInteger(0, 10)),
        direction
      );
    })
    .flat();
  return [...turtle.getPaths(), ...subBranches];
};

export default () => {
  const { svgGroupProps, svgPlotAreaProps } = usePlot(
    drawableRegionInPixels,
    marginInPixels
  );
  const { value: numberOfInitialBranches, slider: branchesSlider } = useSlider(
    1,
    50,
    'Number of initial branches',
    3
  );
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Easel toolbox={[branchesSlider]}>
        <SvgPlotArea {...svgPlotAreaProps}>
          <SvgGroup {...svgGroupProps} centerContents={false}>
            {new Turtle({
              x: drawableRegionInPixels.width / 2,
              y: drawableRegionInPixels.height,
            })
              .face(90)
              .forward(300)
              .getPaths()}
            {getArrayOfNumbers(numberOfInitialBranches).map(() =>
              drawBranch({
                x: drawableRegionInPixels.width / 2,
                y: drawableRegionInPixels.height - 300,
              })
            )}
          </SvgGroup>
        </SvgPlotArea>
      </Easel>
    </div>
  );
};
