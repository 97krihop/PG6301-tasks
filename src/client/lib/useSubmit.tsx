import { ChangeEvent, useState } from "react";

export function useSubmit(
  subFunc: () => Promise<void>,
  onSubmitSuccess: () => void
) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(undefined);

  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(undefined);
    try {
      await subFunc();
      onSubmitSuccess();
    } catch (e) {
      setError(e);
    } finally {
      setSubmitting(false);
    }
  };

  return { handleSubmit, submitting, error };
}
