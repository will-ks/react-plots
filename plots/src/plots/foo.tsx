import {
    Easel,
    getSizesInPixels,
    PAPER_SIZES_MILLIMETERS,
    RegionSize,
    SvgPlotArea,
    Turtle
} from "@react-plots/react-plotter-kit";
import React from "react"

const { drawableRegionInPixels, marginInPixels } = getSizesInPixels(
    PAPER_SIZES_MILLIMETERS.a3.vertical,
    0.5,
    {
        horizontal: 20,
        vertical: 30,
    }
);

const sketch = (drawableRegionInPixels: RegionSize) => {
    const turtle = new Turtle();
    turtle.penDown();
    turtle.forward(drawableRegionInPixels.width);
    turtle.right(90);
    turtle.forward(drawableRegionInPixels.height);
    turtle.right(90);
    turtle.forward(drawableRegionInPixels.width);
    turtle.right(90);
    turtle.forward(drawableRegionInPixels.height);
    return turtle.getPaths();
};

const TestRectangle = () => (
    <Easel>
        <SvgPlotArea
            drawableRegionInPixels={drawableRegionInPixels}
            marginInPixels={marginInPixels}
        >
            {sketch(drawableRegionInPixels)}
        </SvgPlotArea>
    </Easel>
);

export default TestRectangle;
