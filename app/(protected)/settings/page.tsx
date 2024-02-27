"use client";

import { useTransition } from "react";
import { updateSettings } from "@/actions/update-settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  function onClick() {
    startTransition(() => {
      updateSettings({ name: "new name" }).then(() => update());
    });
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>
          Update Name
        </Button>
      </CardContent>
    </Card>
  );
}
