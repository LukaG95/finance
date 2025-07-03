'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { CATEGORIES } from '@/lib/constants';

export default function AddTransactionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [sender, setSender] = useState('');
  const [category, setCategory] = useState('General');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [amount, setAmount] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [type, setType] = useState<'sent' | 'received'>('sent');

  const router = useRouter();

  const handleSubmit = async () => {
    if (!sender || !amount || !date || !category || !type) return;

    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender,
        category,
        date,
        amount: parseFloat(amount),
        recurring,
        type
      }),
    });

    setIsOpen(false);
    setSender('');
    setCategory('General');
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setAmount('');
    setRecurring(false);
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-grey-900 text-white px-200 h-full sm:px-300 rounded-[8px] hover:bg-grey-700 sm:h-full text-preset-4-bold hover:bg-grey-500 cursor-pointer"
      >
        <span className="sm:hidden">+ &nbsp;Add</span>
        <span className="hidden sm:inline">+ &nbsp;Add Transaction</span>
      </button>



      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white rounded-xl p-500 w-[420px] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-400">
              <div>
                <h2 className="text-preset-2 text-grey-900">Add New Transaction</h2>
                <p className="text-preset-5 text-grey-500 mt-50">Use this form to record a new transaction.</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-2xl text-grey-500 hover:text-grey-900">
                &times;
              </button>
            </div>

            <div className="flex flex-col gap-300">
              <div>
                <label className="text-preset-5-bold text-grey-900 block mb-100">Recipient/Sender Name</label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-black"
                />
              </div>

              <div>
                <label className="text-preset-4-bold text-grey-900 mb-100">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-grey-300 rounded-[6px] py-200 px-300 text-preset-4 text-grey-900"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-preset-5-bold text-grey-900 block mb-100">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-black"
                />
              </div>

              <div>
                <label className="text-preset-5-bold text-grey-900 block mb-100">Amount (USD)</label>
                <div className="flex items-center border rounded px-3 py-2">
                  <span className="text-sm text-grey-500 mr-2">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-preset-5-bold text-grey-900 block mb-100">Transaction Type</label>
                <div className="flex gap-200">
                  <button
                    type="button"
                    className={`px-300 py-200 rounded-[6px] border text-sm ${
                      type === 'sent' ? 'bg-grey-900 text-white' : 'bg-white text-grey-700'
                    }`}
                    onClick={() => setType('sent')}
                  >
                    Sent
                  </button>
                  <button
                    type="button"
                    className={`px-300 py-200 rounded-[6px] border text-sm ${
                      type === 'received' ? 'bg-grey-900 text-white' : 'bg-white text-grey-700'
                    }`}
                    onClick={() => setType('received')}
                  >
                    Received
                  </button>
                </div>
              </div>


              <div className="flex items-center gap-200">
                <input
                  type="checkbox"
                  checked={recurring}
                  onChange={() => setRecurring(!recurring)}
                  className="w-4 h-4"
                />
                <label className="text-preset-5 text-grey-900">Recurring</label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-400 bg-grey-900 text-white text-preset-4-bold py-200 rounded-[8px] hover:bg-grey-700"
            >
              Add Transaction
            </button>
          </div>
        </div>
      )}
    </>
  );
}
