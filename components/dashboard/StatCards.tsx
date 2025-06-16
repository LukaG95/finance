import Card from "@/components/ui/Card";

export default function StatCards() {
  return (
    <section className="flex gap-[24px]">
      <Card variant="dark">
        <p className="text-preset-4 mb-150">Current Balance</p>
        <p className="text-preset-1 text-white">$4,836.00</p>
      </Card>
      <Card>
        <p className="text-preset-4 mb-150">Income</p>
        <p className="text-preset-1">$3,814.25</p>
      </Card>
      <Card>
        <p className="text-preset-4 mb-150">Expenses</p>
        <p className="text-preset-1">$1,700.50</p>
      </Card>
    </section>
  );
}