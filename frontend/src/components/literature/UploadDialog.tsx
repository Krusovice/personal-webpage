import * as Dialog from "@radix-ui/react-dialog";
import styles from "./../../styles/literature/UploadDialog.module.css";

type UploadDialogProps = {
  onUploaded?: () => void;
};

export function UploadDialog({ onUploaded }: UploadDialogProps) {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // upload...
    onUploaded?.();
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.content}>
        <Dialog.Title className={styles.title}>Upload literature</Dialog.Title>

        <Dialog.Description className={styles.description}>
          Add metadata and select a file for upload.
        </Dialog.Description>

        <form onSubmit={onSubmit} className={styles.form}>
          <label className="field">
            Title
            <input name="title" />
          </label>

          <label className="field">
            Author
            <input name="author" />
          </label>

          <label className="field">
            Keywords
            <input name="keywords" />
          </label>

          <input type="file" name="file" />

          <div className={styles.actions}>
            <Dialog.Close asChild>
              <button type="button">Cancel</button>
            </Dialog.Close>
            <button type="submit">Upload</button>
          </div>
        </form>

      </Dialog.Content>
    </Dialog.Portal>
  );
}
