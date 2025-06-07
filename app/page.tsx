import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/login" className="font-semibold text-gray-800">
        Login page
      </Link>
    </div>
  );
}
