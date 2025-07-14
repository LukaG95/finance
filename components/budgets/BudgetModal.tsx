'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES, THEMES } from '@/lib/constants';
import Modal from '@/components/ui/Modal';
import DropdownButton from '../ui/DropdownButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  defaultValues?: {
    category: string;
    amount: number;
    theme: string;
    id?: string;
  };
};

export default function BudgetModal({ isOpen, onClose, mode, defaultValues }: Props) {
  const [theme, setTheme] = useState(defaultValues?.theme || 'Green');
  const [category, setCategory] = useState(defaultValues?.category || 'General');
  const [amount, setAmount] = useState(defaultValues?.amount?.toString() || '');
  const [existingThemes, setExistingThemes] = useState<string[]>([]);
  const [existingCategories, setExistingCategories] = useState<string[]>([]);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!amount || !category || !theme) return;

    const payload = {
      theme,
      category,
      amount: parseFloat(amount),
    };

    if (mode === 'edit' && defaultValues?.id) {
      await fetch(`/api/budgets/${defaultValues.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    onClose();
    setTheme('Green');
    setCategory('General');
    setAmount('');
    router.refresh();
  };

  useEffect(() => {
    if (isOpen) {
      fetch('/api/budgets')
        .then(res => res.json())
        .then(data => {
          const themes = data.budgets.map((b: any) => b.theme);
          const categories = data.budgets.map((b: any) => b.category);
          setExistingThemes(themes);
          setExistingCategories(categories);
        });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-preset-2 sm:!text-[32px] text-grey-900">
        {mode === 'edit' ? 'Edit Budget' : 'Add New Budget'}
      </h2>
      <p className="text-preset-4 text-grey-500">
        Choose a category to set a spending budget. These categories can help you monitor spending.
      </p>

      <div className="flex flex-col gap-200">
        <div className='z-3'>
          <label className="text-preset-5-bold text-grey-500 block mb-50">Budget Category</label>
          <DropdownButton
            options={CATEGORIES}
            value={category}
            buttonWidth="w-full"
            wrapperClassName="!gap-0"
            variant="modal"
            onChange={(value) => setCategory(value)}
            existingValues={existingCategories}
            isBudgetCategory
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
          <label className="text-preset-5-bold text-grey-500 block mb-50">Theme</label>
          <DropdownButton
            options={THEMES}
            value={theme}
            buttonWidth="w-full"
            wrapperClassName="!gap-0"
            variant="modal"
            onChange={(value) => setTheme(value)}
            isBudgetTheme
            existingValues={existingThemes}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-grey-900 text-white text-preset-4-bold py-200 rounded-[8px] hover:bg-grey-500 transition duration-200 mt-auto sm:mt-0 cursor-pointer"
      >
        {mode === 'edit' ? 'Save Changes' : 'Add Budget'}
      </button>
    </Modal>
  );
}
