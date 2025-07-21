'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { THEMES } from '@/lib/constants';
import Modal from '@/components/ui/Modal';
import DropdownButton from '../ui/DropdownButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  defaultValues?: {
    name: string;
    amount: number;
    theme: string;
    id?: string;
  };
};

export default function PotModal({ isOpen, onClose, mode, defaultValues }: Props) {
  const [name, setName] = useState(defaultValues?.name || '');
  const [theme, setTheme] = useState(defaultValues?.theme || 'Green');
  const [amount, setAmount] = useState(defaultValues?.amount?.toString() || '');
  const [existingThemes, setExistingThemes] = useState<string[]>([]);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!amount || !name || !theme) return;

    const payload = {
      theme,
      name,
      amount: parseFloat(amount),
    };

    if (mode === 'edit' && defaultValues?.id) {
      await fetch(`/api/pots/${defaultValues.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/pots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    onClose();
    setTheme('Green');
    setName('');
    setAmount('');
    router.refresh();
  };

  useEffect(() => {
    if (isOpen) {
      fetch('/api/pots')
        .then(res => res.json())
        .then(data => {
          const themes = data.pots.map((b: any) => b.theme);
          setExistingThemes(themes);
        });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-preset-2 sm:!text-[32px] text-grey-900">
        {mode === 'edit' ? 'Edit Pot' : 'Add New Pot'}
      </h2>
      <p className="text-preset-4 text-grey-500">
        Create a pot to set savings targets. These can help keep you on track as you save for special purchases.
      </p>

      <div className="flex flex-col gap-200">
        <div className='z-3'>
          <label className="text-preset-5-bold text-grey-500 block mb-50">Pot Name</label>
            <div className="flex items-center border rounded-[8px] px-250 py-[11px] border-beige-500 focus-within:border-black">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm focus:outline-none"
              />
          </div>
        </div>

        <div className='z-2'>
          <label className="text-preset-5-bold text-grey-500 block mb-50">Target</label>
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
        {mode === 'edit' ? 'Save Changes' : 'Add Pot'}
      </button>
    </Modal>
  );
}
