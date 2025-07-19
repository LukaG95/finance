import Image from "next/image";
import { THEME_CLASSES } from "@/lib/constants";


export default async function BillsCardContent({ bills }: any) {
  const today = new Date().getDate();
  const paid = bills.filter(b => b.dueDay < today).reduce((sum, b) => sum + b.amount, 0);
  const dueSoon = bills.filter(b => b.dueDay >= today && b.dueDay - today <= 3).reduce((sum, b) => sum + b.amount, 0);
  const upcoming = bills.filter(b => b.dueDay - today > 3).reduce((sum, b) => sum + b.amount, 0);

  return (
    <section className="flex flex-col gap-150">
      <div className="flex w-full justify-between bg-beige-100 border-l-[4px] border-green px-150 py-200 rounded-[8px]">
        <p className="text-preset-4 text-grey-500">Paid Bills</p>
        <p className="text-preset-4-bold">${paid}</p>
      </div>

      <div className="flex w-full justify-between bg-beige-100 border-l-[4px] border-yellow px-150 py-200 rounded-[8px]">
        <p className="text-preset-4 text-grey-500">Total Upcoming</p>
        <p className="text-preset-4-bold">${upcoming}</p>
      </div>

      <div className="flex w-full justify-between bg-beige-100 border-l-[4px] border-cyan px-150 py-200 rounded-[8px]">
        <p className="text-preset-4 text-grey-500">Due Soon</p>
        <p className="text-preset-4-bold">${dueSoon}</p>
      </div>
    </section>
  );
}
