import React, { Component, PropsWithChildren } from "react";
import { Type } from "./types";

type Props = {
  type: Type;
  width?: string;
  onClick?: () => void;
};

const Button = ({ type, width = '120px', onClick, children, }: PropsWithChildren<Props>) => {
  return (
    <button
      style={{
        backgroundImage: `${type === Type.default ? "" : `linear-gradient(to right, ${type} -60%, skyblue 100%)`}`,
        padding: "8px",
        border: "none",
        color: `${type === Type.default ? 'black' : 'white'}`,
        borderRadius: "4px",
        cursor: "pointer",
        width: width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
      }}
      onClick={onClick}
    >
        {children}
    </button>
  );
};

export default Button;
