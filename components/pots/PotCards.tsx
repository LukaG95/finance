'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { THEME_CLASSES, THEME_HEX } from '@/lib/constants';
import DropdownButton from '../ui/DropdownButton';
import AddWithdrawModal from './AddWithdrawModal';

type Pot = {
  _id: string;
  name: string;
  amount: number;
  saved: number;
  theme: string;
};

export default function PotCards({ pots }: { pots: Pot[] }) {
  const [modalMode, setModalMode] = useState<'add' | 'withdraw' | null>(null);
  const [selectedPot, setSelectedPot] = useState<Pot | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  const handleModalClose = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setModalMode(null);
      setSelectedPot(null);
    }, 300); // match with your modal transition duration
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-300">
      {pots.map((pot) => {
        const percentage = Math.min((pot.saved / pot.amount) * 100, 100);
        const themeColorClass = THEME_CLASSES[pot.theme] || 'bg-grey-300';
        return (
          <Card key={pot._id} className="relative flex flex-col gap-400 !p-300 !px-250 sm:!px-300 ">
            {/* Title */}
            <div className="flex gap-200 align-center items-center">
              <span className={`h-[16px] w-[16px] rounded-full ${themeColorClass}`} />
              <h2 className="text-preset-2 text-grey-900">{pot.name}</h2>
              <DropdownButton
                options={['Edit Pot', 'Delete Pot']}
                iconSrc='/images/icon-ellipsis.svg'
                buttonWidth="w-full"
                wrapperClassName='!absolute right-150'
                variant='ellipsis'
                pot={{ potId: pot._id, name: pot.name, theme: pot.theme, amount: pot.amount }}
              />
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-50 py-150">
              <div className="flex justify-between items-center mb-150">
                <p className="text-preset-4 text-grey-500">Total Saved</p>
                <div className="text-preset-1 text-grey-900">${pot.saved}</div>
              </div>
              <div className="h-[8px] rounded-[4px] w-full overflow-hidden bg-beige-100 mb-100">
                <div
                  className="h-full rounded-[4px]"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: THEME_HEX[pot.theme] || '#000',
                  }}
                />
                
              </div>
              <div className="flex justify-between ">
                <span className="text-preset-5-bold text-grey-500" style={{color: THEME_HEX[pot.theme]}}>{percentage.toFixed(2)}%</span>
                <span className="text-preset-5 text-grey-500">Target of ${pot.amount}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-200">
              <button
                className="flex-1 p-200 border border-beige-100 rounded-xl text-preset-4-bold text-grey-900 bg-beige-100 transition hover:bg-white hover:border hover:border-beige-500 duration-350 cursor-pointer"
                onClick={() => {
                  setSelectedPot(pot);
                  setModalMode('add');
                  setIsModalVisible(true);
                }}
              >
                + Add Money
              </button>

              <button
                className="flex-1 p-200 border border-beige-100 rounded-xl text-preset-4-bold text-grey-900 bg-beige-100 transition hover:bg-white hover:border hover:border-beige-500 duration-350 cursor-pointer"
                onClick={() => {
                  setSelectedPot(pot);
                  setModalMode('withdraw');
                  setIsModalVisible(true);
                }}
              >
                Withdraw
              </button>
            </div>
          </Card>
        );
      })}
      
      {
        selectedPot && 
          <AddWithdrawModal
            mode={modalMode}
            isOpen={isModalVisible}
            onClose={handleModalClose}
            pot={selectedPot}
          />
      }
      
    </div>
  );
}
