import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

export default function RouterProvider({ children }: { children: ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
