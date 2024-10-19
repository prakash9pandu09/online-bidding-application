import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useSetHeaderBgColor = () => {
  const [headerColor, setHeaderColor] = useState("");
  const urlPath = useLocation().pathname;
  useEffect(() => {
    if (urlPath.includes("login") || urlPath.includes("signup") || urlPath.includes("signupsuccess")) {
      setHeaderColor("white");
    }else {
        setHeaderColor('#ebcde5');
    }
  }, [urlPath]);
  return headerColor;
};
