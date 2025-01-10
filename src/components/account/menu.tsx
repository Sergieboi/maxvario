"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { FC } from "react";

const AccountMenu: FC = () => {
  return (
    <div>
      Menu
      <Button onPress={() => signOut()}>Logout</Button>
    </div>
  );
};

export default AccountMenu;
