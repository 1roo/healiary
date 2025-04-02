// components/color-picker-modal.tsx
"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Button from "./button";

export default function ColorPickerModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (color: string) => void;
}) {
  const [color, setColor] = useState("#ffcccc");

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xs rounded-lg bg-white p-6 space-y-4">
          <Dialog.Title className="text-lg font-bold text-center">
            오늘의 감정 색상
          </Dialog.Title>

          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-12 rounded-md"
          />

          <Button className="w-full" onClick={() => onSave(color)}>
            최종 저장
          </Button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
