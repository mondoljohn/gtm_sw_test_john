import React, { FC } from "react";


export interface SizeButtonProps {
	displayText: string;
	selected?: boolean;
	selectHandler: (size: string) => void;
}

const SizeButton: FC<SizeButtonProps> = ({displayText, selected, selectHandler

}) => {

  return (
	<button onClick={() => selectHandler(displayText)} className={`size-button ${selected ? "selected" : ""}`}>{displayText}</button>
  );
};

export default SizeButton;