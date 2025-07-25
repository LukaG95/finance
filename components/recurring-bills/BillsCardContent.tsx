import { formatCurrency } from "@/lib/utils";

export default async function BillsCardContent({ bills }: any) {
  const today = new Date().getDate();
  const paid = bills.filter(b => b.dueDay < today).reduce((sum, b) => sum + b.amount, 0);
  const dueSoon = bills.filter(b => b.dueDay >= today && b.dueDay - today <= 3).reduce((sum, b) => sum + b.amount, 0);
  const upcoming = bills.filter(b => b.dueDay - today > 3).reduce((sum, b) => sum + b.amount, 0);

  return (
    <section className="flex flex-col gap-150">
      <div className="flex w-full justify-between bg-beige-100 border-l-[4px] border-green px-200 py-250 rounded-[8px]">
        <p className="text-preset-4 text-grey-500">Paid Bills</p>
        <p className="text-preset-4-bold">{formatCurrency(paid)}</p>
      </div>

      <div className="flex w-full justify-between bg-beige-100 border-l-[4px] border-yellow px-200 py-250 rounded-[8px]">
        <p className="text-preset-4 text-grey-500">Total Upcoming</p>
        <p className="text-preset-4-bold">{formatCurrency(upcoming)}</p>
      </div>

      <div className="flex w-full justify-between bg-beige-100 border-l-[4px] border-cyan px-200 py-250 rounded-[8px]">
        <p className="text-preset-4 text-grey-500">Due Soon</p>
        <p className="text-preset-4-bold">{formatCurrency(dueSoon)}</p>
      </div>
    </section>
  );
}
