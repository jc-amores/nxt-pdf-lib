import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Link href="/pdf">
        <a>Generate PDF</a>
      </Link>
    </div>
  );
}
