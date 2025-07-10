'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';
import Modal from '@/components/ui/Modal';
import DropdownButton from '../ui/DropdownButton';

export default function AddBudgetModal() {
  const [showModal, setShowModal] = useState(false);
  const [sender, setSender] = useState('');
  const [category, setCategory] = useState('General');
  const [amount, setAmount] = useState('');

  const router = useRouter();

  const handleSubmit = async () => {
    if (!sender || !amount || !category) return;

    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender,
        category,
        amount: parseFloat(amount)
      }),
    });

    setShowModal(false);
    setSender(''); 
    setCategory('General');
    setAmount('');
    router.refresh();
  };

  return (
  <>
    <button
      onClick={() => setShowModal(true)}
      className="bg-grey-900 text-white px-200 h-full sm:px-300 rounded-[8px] sm:h-full text-preset-4-bold hover:bg-grey-500 cursor-pointer"
    >
      <span className="sm:hidden">+ &nbsp;Add</span>
      <span className="hidden sm:inline">+ &nbsp;Add New Budget</span>
    </button>

    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <h2 className="text-preset-2 sm:!text-[32px] text-grey-900">Add New Budget</h2>
      <p className="text-preset-4 text-grey-500">Choose a category to set a spending budget. These categories can help you monitor spending.</p>

      <div className="flex flex-col gap-200">

        <div className='z-3'>
          <label className="text-preset-5-bold text-grey-500 block mb-50">Budget Category</label>
          <DropdownButton
            options={CATEGORIES}
            value={category}
            iconSrc='/images/icon-sort-mobile.svg'
            buttonWidth="w-full"
            wrapperClassName="!gap-0"
            variant="modal"
            onChange={(value) => setCategory(value)}
          />
        </div>

        <div className='z-2'>
          <label className="text-preset-5-bold text-grey-500 block mb-50">Maximum Spend</label>
          <div className="flex items-center border rounded-[8px] px-250 py-[11px] border-beige-500 focus-within:border-black">
            <span className="text-sm text-grey-500 mr-2">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className='z-1'>
          <label className="text-preset-5-bold text-grey-500 block mb-50">Budget Category</label>
          <DropdownButton
            options={CATEGORIES}
            value={category}
            iconSrc='/images/icon-sort-mobile.svg'
            buttonWidth="w-full"
            wrapperClassName="!gap-0"
            variant="modal"
            onChange={(value) => setCategory(value)}
          />
        </div>
       
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-grey-900 text-white text-preset-4-bold py-200 rounded-[8px] hover:bg-grey-500 cursor-pointer mt-auto sm:mt-0"
      >
        Add Transaction
      </button>
    </Modal>
  </>
);

}
