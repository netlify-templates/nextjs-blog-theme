import Link from 'next/link';

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
      <div className="block w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-conic from-gradient-3 to-gradient-4" />
      <p className="text-2xl text-center dark:text-white">
        <Link href="/">
          {name}
        </Link>
      </p>
    </header>
  );
}
