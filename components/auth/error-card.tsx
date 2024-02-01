import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function ErrorCard() {
  return (
    <CardWrapper headerLabel="Oops, something went wrong!" backButtonHref="/auth/login" backButtonLabel="Back to login">
      <div className="w-full items-center flex justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
}
