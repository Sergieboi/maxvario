"use client";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";

type Props = {
  onCancel?: () => void;
  onDelete?: () => void;
  posts: Array<{ id: string | number; title: string }>;
};

const DeleteConfirmation: FC<Props> = ({ posts, onCancel, onDelete }) => {
  const t = useTranslations();
  const [deleting, setDeleting] = useState(false);
  const { onOpenChange, isOpen, onClose } = useDisclosure({
    defaultOpen: true,
  });
  const [showAlert, setShowAlert] = useState(false);
  const del = async () => {
    setDeleting(true);
    const response = await fetch("/api/account/content/blog", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_ids: posts.map((post) => post.id) }),
    });
    if (response.ok) {
      onDelete?.();
      onClose();
    } else {
      setShowAlert(true);
    }
    setDeleting(false);
  };
  return (
    <Modal
      isDismissable
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="opaque"
      placement="center"
      onClose={() => {
        window.setTimeout(() => onCancel?.(), 500);
        onClose();
      }}
    >
      <ModalContent>
        <ModalHeader>
          {t("account.data.deletion.confirmation.title")}
        </ModalHeader>
        <ModalBody>
          {showAlert && (
            <Alert
              color="danger"
              title={t("common.error")}
              description={t("common.error")}
            />
          )}
          {t("account.data.deletion.description")}
          <ul className="list-inside list-disc italic font-medium">
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={deleting}
            onPress={() => {
              window.setTimeout(() => onCancel?.(), 500);
              onClose();
            }}
          >
            {t("common.cancel")}
          </Button>
          <Button onPress={del} color="danger" isLoading={deleting}>
            {t("common.delete")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmation;
