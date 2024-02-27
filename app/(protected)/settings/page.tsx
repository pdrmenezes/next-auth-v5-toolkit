"use client";

import { useTransition } from "react";
import { updateSettings } from "@/actions/update-settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  const [isPending, startTransition] = useTransition();

  function onClick() {
    startTransition(() => {
      updateSettings({ name: "new name" });
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
