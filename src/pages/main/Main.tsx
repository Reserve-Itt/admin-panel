import React, { FC, useEffect } from "react";
import { useAppSelector } from "../../App/hooks";
import { SelectAuth } from "../../features/authSlice";
import { json } from "body-parser";

interface IProps {}

const Main: FC<IProps> = (Props) => {
  // get token from authSlice
  const { token } = useAppSelector(SelectAuth);

  return <div>{"token" + token}</div>;
};

export default Main;
