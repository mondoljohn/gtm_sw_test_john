import React, { FC } from "react";


export interface ColorButtonProps {
	color: string;
	selected?: boolean;
	selectHandler: (size: string) => void;
}

const ColorButton: FC<ColorButtonProps> = ({color, selected, selectHandler}) => {

  return (
	<button style={{height:"32px", width:"32px", backgroundColor: color, border: selected ? "3px solid green": "3px solid transparent", marginRight: "12px"}} onClick={() => selectHandler(color)}></button>
  );
};

export default ColorButton;