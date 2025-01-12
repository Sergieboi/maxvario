import { FC, PropsWithChildren } from "react";
import AccountMenu from "./menu";
import Container from "../shared/container";
import { useTranslations } from "next-intl";

const AccLayout: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations();
  return (
    <div className="mt-24">
      <div
        className="flex items-center bg-cover bg-no-repeat bg-center h-56 relative"
        style={{
          backgroundImage: `url(/assets/maxvario-events-runners-on-the-street-healthy-lifestyle-jogging.jpg)`,
        }}
      >
        <div className="z-10 bg-opacity-60 bg-black absolute top-0 left-0 w-full h-full"></div>
        <Container className="relative z-20">
          <h1 className="text-4xl text-white font-bold">
            {t("account.title")}
          </h1>
        </Container>
      </div>
      <AccountMenu />
      <Container className="py-16">{children}</Container>
    </div>
  );
};

export default AccLayout;
