"use client";

import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import { ModeToggle } from "../mode-toggle";

function SettingsModal() {
  const settings = useSettings();
  return (
    <Dialog
      open={settings.isOpen}
      onOpenChange={settings.onClose}
    >
      <DialogContent className="font-mono">
        <DialogHeader className="border-b pb-2">
          <h2 className="text-lg font-medium">Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Theme</Label>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsModal;
