"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

export function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((response) => {
        setSuccess(response.success);
        setError(response.error);
      })
      .catch(() => setError("Something went wrong."));
  }, [token]);

  useEffect(() => {
    if (success || error) return;
    onSubmit();
  }, [error, onSubmit, success]);

  return (
    <CardWrapper headerLabel="Verifying your email" backButtonLabel="Back to login" backButtonHref="/auth/login">
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
}
