"use client";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = PropsWithChildren<{
  setSelectedImages: (images: File) => void;
  selectedImages?: File;
  preview?: boolean;
}>;

const ImagesPicker: FC<Props> = ({
  selectedImages,
  preview = true,
  setSelectedImages,
}) => {
  const t = useTranslations();
  const [imagePreviews, setImagePreviews] = useState<Array<string>>([]);

  // Initialize previews for already selected images
  useEffect(() => {
    const generatePreviews = async () => {
      const previews = await Promise.all(
        (selectedImages ? [selectedImages] : []).map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            })
        )
      );
      setImagePreviews(previews);
    };

    generatePreviews();
  }, [selectedImages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);

      // Append the new files to the existing state
      setSelectedImages(selectedImages ? selectedImages : fileArray[0]);

      // Generate previews for the new files and append them
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(() => [reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    // newImages.splice(index, 1);
    if (selectedImages) {
      setSelectedImages(selectedImages);
    }

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {preview && (
        <div className="flex flex-wrap gap-2 mb-3">
          {imagePreviews.map((preview, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center w-24 h-24 bg-gray-200 rounded-lg"
            >
              <Image
                src={preview}
                alt={`Image preview ${index}`}
                width={96}
                height={96}
                className="w-full h-full object-cover rounded-lg border border-solid border-gray-300"
              />
              <Button
                color="danger"
                className="absolute top-1 right-1"
                size="sm"
                isIconOnly
                onPress={() => {
                  removeImage(index);
                }}
              >
                <TrashIcon />
              </Button>
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
        accept="image/*"
      />

      <Button
        color="default"
        variant="bordered"
        startContent={<PhotoIcon className="size-5" />}
        onPress={() => {
          if (fileInputRef.current) fileInputRef.current.click();
        }}
        type="button"
      >
        {t("common.selectImage")}
      </Button>
    </>
  );
};

export default ImagesPicker;
