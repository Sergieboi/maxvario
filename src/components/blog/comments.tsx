"use client";
import { Comment } from "@/lib/types/misc";
import { Avatar, Button, Input, Textarea } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  comments: Array<Comment>;
};

interface CommentForm {
  name: string;
  email: string;
  comment: string;
}

const Comments: FC<Props> = ({ comments }) => {
  const t = useTranslations();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<CommentForm>({
    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });

  const onSubmit = async (data: CommentForm) => {
    console.log(data);
  };
  return (
    <>
      <div className="space-y-4">
        {comments.map((comment) => {
          const { comment_author, comment_content, comment_date } = comment;
          return (
            <div key={comment.comment_ID} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Avatar name={comment_author.substring(0, 1)} />
                <div>
                  <h4 className="text-lg font-semibold">{comment_author}</h4>
                  <p className="text-sm text-default-400">{comment_date}</p>
                </div>
              </div>
              <p className="text-sm">{comment_content}</p>
            </div>
          );
        })}
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 flex-col md:flex-row">
          <Controller
            name="name"
            control={control}
            rules={{ required: t("common.requiredField") }}
            render={({ field }) => (
              <Input {...field} type="text" placeholder={t("common.name")} />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: t("common.requiredField") }}
            render={({ field }) => (
              <Input {...field} type="email" placeholder={t("common.email")} />
            )}
          />
        </div>
        <Controller
          name="comment"
          control={control}
          rules={{ required: t("common.requiredField") }}
          render={({ field }) => (
            <Textarea {...field}  placeholder={t("common.comment")} />
          )}
        />
        <Button color="primary">{t("common.submit")}</Button>
      </form>
    </>
  );
};

export default Comments;
