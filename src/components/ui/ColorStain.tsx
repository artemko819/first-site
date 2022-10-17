import React from 'react';
import cn from 'classnames';

type ColorKey = 'violet' | 'blue' | 'orange' | 'green'

interface Props {
  size: number,
  color: ColorKey,
  className?: string,
}

const colors = {
  'violet': '#45245ccc',
  'blue': '#073455cc',
  'orange': '#4B2C0Fcc',
  'green': '#15483Ccc',
}

const ColorStain = ({ size, color, className }: Props) => (
  <div className={cn("Stain", className)}>
    <span
      style={{
        height: `${size}px`,
        width: `${size}px`,
        backgroundColor: colors[color],
        boxShadow: `0px 0px 25px 60px ${colors[color]}`
      }}
    />
  </div>
);

export default ColorStain;
