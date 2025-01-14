"use client";
import ImagesPicker from "@/components/shared/images-picker";
import { MVBlog, MVNews, Taxonomy } from "@/lib/types/misc";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Editor = dynamic(() => import("@/components/shared/editor/editor"), {
  ssr: false,
});

interface SingleBlogProps {
  title: string;
  content: string;
  category: string;
  thumbnail: File | undefined;
}

interface SingleBlogParams {
  init?: MVNews | MVBlog;
  categories: Array<Taxonomy>;
  news_categories: Array<Taxonomy>;
  postType: "news" | "post";
}

const SingleBlog: FC<SingleBlogParams> = ({
  init,
  categories,
  news_categories,
  postType,
}) => {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<SingleBlogProps>({
    defaultValues: {
      title: init?.title || "",
      content: "",
      category: init?.categories[0]?.term_id?.toString() || "",
      thumbnail: undefined,
    },
  });
  const locale = useLocale();
  const params = useParams();
  const t = useTranslations();
  const onSubmit = async (data: SingleBlogProps) => {
    try {
      // Execute reCAPTCHA and get the token
      const token = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA as string, {
              action: "registration_form",
            })
            .then(resolve)
            .catch(reject);
        });
      });

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", JSON.stringify(postContent));
      formData.append("category", data.category);
      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }
      formData.append("lang", locale);
      formData.append("recaptchaToken", token);
      formData.append("post_type", postType);

      const res = await fetch("/api/account/content/blog", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        reset();
        setValue("thumbnail", undefined);
        setPostContent("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [postContent, setPostContent] = useState("");

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold">
        {params?.posttype === "news"
          ? t("add.new.news.title")
          : t("account.new.blog.title")}
      </h1>
      <div className="flex gap-4 items-center flex-col md:flex-row">
        <Controller
          name="title"
          control={control}
          rules={{ required: t("account.new.title.required") }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              isRequired
              label={t("account.new.title.label")}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          rules={{ required: t("account.new.category.required") }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Select
              {...field}
              label={t("account.new.category.label")}
              isRequired
              isInvalid={invalid}
              errorMessage={error?.message}
            >
              {(postType === "news" ? news_categories : categories).map(
                (category) => (
                  <SelectItem key={category.term_id}>
                    {category.name}
                  </SelectItem>
                )
              )}
            </Select>
          )}
        />
      </div>
      <Editor
        value={postContent}
        onChange={setPostContent}
        holder="editorjs-container"
      />
      <div>
        <ImagesPicker
          setSelectedImages={(images) => setValue("thumbnail", images)}
          selectedImages={getValues("thumbnail")}
        />
      </div>
      <Button
        type="submit"
        variant="solid"
        color="primary"
        isLoading={isSubmitting}
      >
        {t("common.submit")}
      </Button>
    </form>
  );
};

export default SingleBlog;
