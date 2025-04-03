"use client";

import { Dialog } from "@headlessui/react";
import { ChromePicker } from "react-color";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (moodColor: string) => void;
};

export default function MoodColorModal({ isOpen, onClose, onSubmit }: Props) {
  const [selectedColor, setSelectedColor] = useState("#f472b6");

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white p-6 rounded-xl space-y-4 shadow-xl w-[340px]">
          <Dialog.Title className="text-lg font-semibold text-center">
            오늘의 기분 색을 선택해 주세요
          </Dialog.Title>

          <div className="flex justify-center">
            <ChromePicker
              color={selectedColor}
              onChange={(color) => setSelectedColor(color.hex)}
              disableAlpha
            />
          </div>

          <div className="text-center text-sm mt-2">
            선택된 색상: <span className="font-mono">{selectedColor}</span>
          </div>

          <button
            onClick={() => onSubmit(selectedColor)}
            className="w-full mt-4 bg-black text-white py-2 rounded-md"
          >
            저장하기
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
