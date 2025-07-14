'use client';

import { useState } from 'react';
import BudgetModal from './BudgetModal';

export default function AddBudgetButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-grey-900 text-white px-200 h-full sm:px-300 rounded-[8px] sm:h-full text-preset-4-bold hover:bg-grey-500 cursor-pointer"
      >
        <span className="sm:hidden">+ &nbsp;Add</span>
        <span className="hidden sm:inline">+ &nbsp;Add New Budget</span>
      </button>

      <BudgetModal
        mode="add"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
