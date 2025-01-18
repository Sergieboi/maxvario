"use client";
import { Card, CardBody } from "@nextui-org/react";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface ProfileFields {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const AccountProfile: FC = () => {
  const { handleSubmit } = useForm<ProfileFields>();
  const onSubmit = (data: ProfileFields) => {
    console.log(data);
  };
  return (
    <Card>
      <CardBody>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}></form>
      </CardBody>
    </Card>
  );
};

export default AccountProfile;
