import { FC, PropsWithChildren } from "react";
import AccountMenu from "./menu";

const AccLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mt-24">
      <AccountMenu />
      {children}
    </div>
  );
};

export default AccLayout;
