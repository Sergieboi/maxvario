import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-content1 p-2 sm:p-4 lg:p-8"
      style={{
        backgroundImage:
          "url(/assets/friends-hiking-together-outdoors-exploring.jpg), url(/assets/friends-hiking-together-outdoors-exploring.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-blue-900 bg-opacity-70 z-10"></div>
      <div className="relative z-20 mt-24">{children}</div>
    </div>
  );
};

export default AuthLayout;
