"use client";

import { useEffect, useState } from "react";
import SettingsModal from "../modals/settings-modal";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return <SettingsModal />;
}

export default ModalProvider;
