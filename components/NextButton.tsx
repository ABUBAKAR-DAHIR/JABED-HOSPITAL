import React from 'react';

type NextButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function NextButton({ icon, onClick, disabled }: NextButtonProps) {
  return (
    <button
    type='button'
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl border-2 border-purple-700 p-2.5 cursor-pointer  hover:bg-gray-300 dark:hover:bg-gray-900
        dark:hover:grayscale-50 disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {icon}
    </button>
  );
}
