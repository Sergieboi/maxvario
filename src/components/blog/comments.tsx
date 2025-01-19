"use client";
import { Comment } from "@/lib/types/misc";
import { Avatar, Button, Input, Textarea } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  comments: Array<Comment>;
  postId: number | string;
};

interface CommentForm {
  name: string;
  email: string;
  content: string;
}

const Comments: FC<Props> = ({ comments, postId }) => {
  const locale = useLocale();
  const t = useTranslations();
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<CommentForm>({
    defaultValues: {
      name: "",
      email: "",
      content: "",
    },
  });

  const onSubmit = async (data: CommentForm) => {
    try {
      const token = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA as string, {
              action: "forgot_password_form",
            })
            .then(resolve)
            .catch(reject);
        });
      });
      const res = await fetch("/api/account/content/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          post_id: postId,
          lang: locale,
          recaptchaToken: token,
        }),
      });
      const result = await res.json();
      if (result.success) {
        alert(t("common.commentSuccess"));
        reset();
      } else {
        alert(result.messages.join(", "));
      }
    } catch {
      alert(t("common.error") + " " + t("common.tryAgain"));
    }
  };
  return (
    <>
      <div className="space-y-4 pt-16">
        <h3 className="font-semibold">{t("common.comments")}</h3>
        {comments.length === 0 && (
          <p className="bg-gray-50 border-1 rounded-lg p-3 text-center text-default-400">
            {t("common.noComments")}
          </p>
        )}
        {comments.map((comment) => {
          const { author_name, content, date } = comment;
          return (
            <div
              key={comment.id}
              className="space-y-3 border-1 p-4 border-gray-300 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <Avatar name={author_name?.substring(0, 1)} color="primary" />
                <div>
                  <h4 className="text-lg font-semibold">{author_name}</h4>
                  <p className="text-xs text-default-400">
                    {date.substring(0, 10)}
                  </p>
                </div>
              </div>
              <p className="text-sm">{content}</p>
            </div>
          );
        })}
      </div>
      <h3 className="font-semibold">{t("common.addComment")}</h3>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 flex-col md:flex-row">
          <Controller
            name="name"
            control={control}
            rules={{ required: t("common.requiredField") }}
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                type="text"
                placeholder={t("common.name")}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: t("common.requiredField") }}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder={t("common.email")}
                isRequired
              />
            )}
          />
        </div>
        <Controller
          name="content"
          control={control}
          rules={{ required: t("common.requiredField") }}
          render={({ field }) => (
            <Textarea {...field} isRequired placeholder={t("common.comment")} />
          )}
        />
        <Button color="primary" type="submit" isLoading={isSubmitting}>
          {t("common.submit")}
        </Button>
      </form>
    </>
  );
};

export default Comments;
