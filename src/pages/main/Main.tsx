import React, { FC, useEffect } from "react";
import { useAppSelector } from "../../App/hooks";

import { json } from "body-parser";
import { SelectAuth } from "../../features/authSlice";

interface IProps {}

const Main: FC<IProps> = (Props) => {
  // get token from authSlice
  const { token } = useAppSelector(SelectAuth);

  return <div>{"token" + token}</div>;
};

export default Main;
