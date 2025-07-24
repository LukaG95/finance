'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { THEME_HEX } from '@/lib/constants';
import Modal from '@/components/ui/Modal';
import { Pot } from 'types/pot';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'withdraw' | null;
  pot: Pot;
};

export default function AddWithdrawModal({ isOpen, onClose, mode, pot }: Props) {
  const [saved, setSaved] = useState('');
  const percentage = Math.min((pot.saved / pot.amount) * 100, 100);
  const new_percentage = (Math.min(((pot.saved + parseFloat(saved))/ pot.amount) * 100, 100) - percentage) || 0;

  const router = useRouter();
  console.log(percentage - new_percentage)

  const handleSubmit = async () => {
    if (!saved) return;

    const payload = {
      saved: parseFloat(saved),
      mode: mode
    };

    await fetch(`/api/pots/${pot._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    onClose();
    router.refresh();
  };

  const displaySeparator = () => {
    if (mode === "add"){
      if (percentage <=0 ) return false;
    }
    if (mode === "withdraw"){
      if (Math.max(percentage - new_percentage, 0) <= 0) return false;
    }
    return true;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-preset-2 sm:!text-[32px] text-grey-900">
        {mode === 'add' ? `Add to '${pot.name}'` : `Withdraw from '${pot.name}'`}
      </h2>
      <p className="text-preset-4 text-grey-500">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
      </p>

      <div className="flex flex-col gap-50 py-150">
        <div className="flex justify-between items-center mb-150">
          <p className="text-preset-4 text-grey-500">New Amount</p>
          <div className="text-preset-1 text-grey-900">${pot.saved}</div>
        </div>
        <div className="relative flex h-[8px] rounded-[4px] w-full overflow-hidden bg-beige-100 mb-100">
          <div
            className={`h-full rounded-[4px] bg-grey-900 ${saved && mode==="add" && 'rounded-r-none'}`}
            style={{
              width: `${percentage}%`
            }}
          >
            {saved && displaySeparator() && 
              <span 
                className={`absolute w-[2px] h-full bg-beige-100 z-1`} 
                style={{
                  left: mode === 'add'
                    ? `${percentage}%`
                    : `${Math.max(percentage - new_percentage, 0)}%`,}}>
              </span> 
            }
            <div
              className={`absolute h-full rounded-[4px] rounded-l-none`}
                style={{
                  width: saved ? `${new_percentage}%` : '0%',
                  left: mode === 'add'
                    ? `${percentage}%`
                    : `${Math.min(percentage - new_percentage, 100)}%`,
                  background: mode === 'withdraw' ? THEME_HEX['Red'] : THEME_HEX[pot.theme]
                }}
              />
          </div>
      
        </div>
        <div className="flex justify-between ">
          <span className="text-preset-5-bold text-grey-500" 
            style={{color: !saved ? '#201F24' : mode === 'withdraw' ? THEME_HEX['Red'] : THEME_HEX[pot.theme]}}>{
            mode === "add" ? (percentage + new_percentage).toFixed(2) : Math.max(percentage - new_percentage, 0).toFixed(2)}
              %
          </span>
          <span className="text-preset-5 text-grey-500">Target of ${pot.amount}</span>
        </div>
      </div>
      
      <div className='z-2'>
        <label className="text-preset-5-bold text-grey-500 block mb-50">Amount to {mode === 'add' ? 'Add' : 'Withdraw'}</label>
        <div className="flex items-center border rounded-[8px] px-250 py-[11px] border-beige-500 focus-within:border-black">
          <span className="text-sm text-grey-500 mr-2">$</span>
          <input
            type="number"
            value={saved}
            onChange={(e) => setSaved(e.target.value)}
            className="w-full text-sm focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-grey-900 text-white text-preset-4-bold py-200 rounded-[8px] hover:bg-grey-500 transition duration-200 mt-auto sm:mt-0 cursor-pointer"
      >
        {mode === 'add' ? 'Confirm Addition' : 'Confirm Withdrawal'}
      </button>
    </Modal>
  );
}