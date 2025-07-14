'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import clsx from 'clsx';
import { THEME_CLASSES } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import BudgetModal from '@/components/budgets/BudgetModal';

type Props = {
  label?: string;
  options: readonly string[];
  value?: string;
  onChange?: (value: string) => void;
  iconSrc?: string;
  buttonWidth?: string;
  dropdownWidth?: string;
  wrapperClassName?: string;
  variant: 'default' | 'modal' | 'ellipsis';
  isBudgetCategory?: boolean;
  isBudgetTheme?: boolean;
  existingValues?: string[];
  budget?: any;
};

export default function DropdownButton({
  label,
  options,
  value = '',
  onChange,
  iconSrc = '/images/icon-caret-down.svg',
  buttonWidth,
  wrapperClassName = '',
  variant,
  isBudgetTheme,
  existingValues,
  budget,
}: Props) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (budget) var { budgetId, category } = budget;

  const isDefault = variant === 'default';
  const isModal = variant === 'modal';
  const isEllipsis = variant === 'ellipsis';
  const themeColorClass = THEME_CLASSES[value];

  const handleDelete = async () => {
    if (!budgetId) return;
    await fetch(`/api/budgets/${budgetId}`, {
      method: 'DELETE'
    });
    router.refresh();
    setModalOpen(false);
  };

  return (
    <div className={clsx('flex items-center gap-100 relative', wrapperClassName)} ref={dropdownRef}>
      {label && (
        <label className="text-preset-4 text-grey-500 whitespace-nowrap hidden md:block">
          {label}
        </label>
      )}

      <div className={`relative ${isModal ? 'w-full' : 'w-max'}`}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={classNames(
            'flex justify-between gap-200 px-250 rounded-[8px] text-preset-4 cursor-pointer hover:bg-grey-100 active:bg-grey-300 transition-bg duration-200 border-beige-500',
            isModal ? 'py-[11px] border' : 'md:px-250 py-[14px] md:py-[11px] md:border',
            isEllipsis && 'border-none !px-150 !py-150',
            buttonWidth
          )}
        >
          <span
            className={clsx(
              'flex items-center',
              isDefault && 'hidden md:flex',
              existingValues?.includes(value) && 'opacity-25',
              isEllipsis && 'hidden'
            )}
          >
            {isBudgetTheme && (
              <div className={clsx(`${themeColorClass} h-[16px] w-[16px] rounded-xl mr-150`)} />
            )}
            {value}
          </span>

          <>
            {(isDefault || isEllipsis) && (
              <Image
                src={iconSrc}
                alt="icon"
                width={16}
                height={16}
                className={isDefault ? 'md:hidden' : ''}
              />
            )}
            {!isEllipsis && (
              <Image
                src="/images/icon-caret-down.svg"
                alt="toggle"
                width={12}
                height={6}
                className={classNames(
                  'transition-transform duration-200 md:block group-hover:brightness-300',
                  open ? 'rotate-180' : '',
                  !isModal && 'hidden'
                )}
              />
            )}
          </>
        </button>

        <div
          className={classNames(
            'absolute top-full right-0 mt-100 bg-white rounded-[8px] shadow-[0px_4px_24px_rgba(0,0,0,0.25)] max-h-[300px] overflow-scroll transition-all duration-200 origin-top transform',
            open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none',
            buttonWidth,
            'min-w-max'
          )}
        >
          <ul className="text-preset-4">
            {options.map((option, idx) => {
              const themeColorClass = THEME_CLASSES[option];
              const isUsed = existingValues?.includes(option);
              const isActive = value === option;
              const isBudgetEditButton = option === 'Edit Budget';
              const isBudgetDeleteButton = option === 'Delete Budget';

              return (
                <li
                  key={option}
                  onClick={() => {
                    if (isBudgetDeleteButton && budgetId) {
                      setOpen(false);
                      setModalOpen(true);
                      return;
                    }
                    if (isBudgetEditButton) {
                      setOpen(false);
                      setShowEditModal(true);
                      return;
                    }
                    if (!isUsed && onChange) {
                      onChange(option);
                    }
                    setOpen(false);
                  }}
                  className={clsx(
                    'cursor-pointer hover:bg-grey-100',
                    isUsed && 'pointer-events-none',
                    isBudgetDeleteButton && 'text-red'
                  )}
                >
                  <div
                    className={clsx(
                      'relative flex items-center px-250 py-150 whitespace-nowrap',
                      isActive && 'font-bold text-grey-900',
                      isUsed && 'font-normal !text-grey-500'
                    )}
                  >
                    {isBudgetTheme && (
                      <div
                        className={clsx(
                          `${themeColorClass} h-[16px] w-[16px] rounded-xl mr-150`,
                          isUsed && 'opacity-25'
                        )}
                      />
                    )}
                    {option}
                    {isUsed && <span className="absolute right-250 text-preset-5">Already used</span>}
                  </div>
                  {idx < options.length - 1 && (
                    <div className="px-250">
                      <div className="h-px bg-grey-500/15" />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col gap-250">
          <h2 className="text-preset-2 sm:!text-[32px] text-grey-900">{`Delete '${category}'`}</h2>
          <p className="text-preset-4 text-grey-500">
            Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.
          </p>
          <button
            onClick={handleDelete}
            className="text-preset-4-bold text-red-600 w-full p-200 bg-red text-white rounded-xl hover:brightness-115 transition duration-250 cursor-pointer"
          >
            Yes, delete
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="text-preset-4 text-grey-500 hover:text-grey-900 transition duration-200 cursor-pointer"
          >
            No, Go Back
          </button>
        </div>
      </Modal>

      {budget && showEditModal && (
        <BudgetModal
          mode="edit"
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          defaultValues={{
            id: budgetId,
            category: budget.category,
            amount: budget.amount,
            theme: budget.theme,
          }}
        />
      )}
    </div>
  );
}
