import Card from "@/components/ui/Card";

export default function StatCards({bills}: any) {
  const total = bills.reduce((sum, bill) => sum + bill.amount, 0);
  return (
    <section className="flex flex-col md:flex-row gap-150 md:gap-300 ">
      <Card variant="dark" className="!p-250 md:!p-300">
        <p className="text-preset-4 mb-150 ">Current Balance</p>
        <p className="text-preset-1 text-white">$4,836.00</p>
      </Card>
      <Card className="!p-250 md:!p-300">
        <p className="text-preset-4 mb-150">Income</p>
        <p className="text-preset-1">$2,000</p>
      </Card>
      <Card className="!p-250 md:!p-300">
        <p className="text-preset-4 mb-150">Expenses</p>
        <p className="text-preset-1">${total}</p>
      </Card>
    </section>
  );
}