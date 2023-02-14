import { ReactNode } from "react";
import MainHeader from "./main-header";

export default function Layout({ children }: {children?: ReactNode}) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
}
