import React from "react";

interface Props {
  className?: string,
  name: string,
}

const Icon = ({ className = '', name }: Props) => (
  <span className={"material-icons " + className}>{name}</span>
)

export default Icon;
