import React from 'react';

export type Coordinates = { x: number; y: number };

const radians = function (r: number) {
  return 2 * Math.PI * (r / 360);
};

export class Turtle {
  private position: Coordinates;
  private rotation = 0;
  private paths: string[] = [];
  private id = Math.random().toString(36).substring(7);
  private isPenDown = false;

  constructor(initialCoordinates: Coordinates = { x: 0, y: 0 }) {
    this.position = initialCoordinates;
    this.penDown();
  }

  private addPath(initialPosition: Coordinates) {
    this.paths.push(`M ${initialPosition.x} ${initialPosition.y}`);
  }

  private addLineToPosition(finalPosition: Coordinates) {
    const currentPath = this.paths.pop();
    if (currentPath) {
      this.paths.push(
        `${currentPath} L ${Number(finalPosition.x.toFixed(2))} ${Number(
          finalPosition.y.toFixed(2)
        )}`
      );
    }
  }

  rotate(degrees: number) {
    this.rotation = (this.rotation + degrees) % 360;
    if (this.rotation < 0) {
      this.rotation += 360;
    }
    return this;
  }

  left(degrees: number) {
    this.rotate(degrees);
    return this;
  }

  right(degrees: number) {
    this.rotate(-degrees);
    return this;
  }

  penUp() {
    this.isPenDown = false;
    return this;
  }

  penDown() {
    if (!this.isPenDown) {
      this.addPath(this.position);
    }
    this.isPenDown = true;
    return this;
  }

  forward(distance: number) {
    const { x: origX, y: origY } = this.position;
    const newPosition = {
      x: origX + Math.cos(radians(this.rotation)) * distance,
      y: origY - Math.sin(radians(this.rotation)) * distance,
    };
    this.goTo(newPosition, this.isPenDown);
    return this;
  }

  goTo(position: Coordinates, draw = false) {
    const previousPenDown = this.getIsPenDown();
    if (!draw) {
      this.penUp();
    }
    const roundedCoordinates = {
      x: position.x,
      y: position.y,
    };
    if (draw) {
      this.addLineToPosition(roundedCoordinates);
    }
    this.position = roundedCoordinates;
    if (previousPenDown && !draw) {
      this.penDown();
    }
    return this;
  }

  getOrientation() {
    return this.rotation;
  }

  getPosition() {
    return { ...this.position };
  }

  getIsPenDown() {
    return this.isPenDown;
  }

  getPaths() {
    return this.paths.map((pathString, i) => (
      <path
        d={pathString}
        stroke={'#000'}
        fill={'none'}
        key={`${this.id}_${i}`}
      />
    ));
  }
}
