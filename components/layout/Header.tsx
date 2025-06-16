export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="relative py-100">
      {children}
    </header>
  );
}
