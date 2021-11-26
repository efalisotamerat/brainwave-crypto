import Link from "next/link";

export default function Sidenav() {
  return (
    <aside className="flex justify-center w-1/3 h-screen p-6 bg-blue-700 lg:w-1/5 rounded-r-3xl">
      <ul className="flex flex-col w-full pt-16 text-lg font-semibold text-white pt- gap-y-4">
        <li>
          <Link href="/">
            <a className="text-2xl">Dashboard</a>
          </Link>
        </li>
        <li className="cursor-pointer">
          <a className="text-2xl" href="">
            Coins
          </a>
          <i className="float-right text-2xl">&#8595;</i>
          <ul className="flex flex-col pt-5 pl-4 text-lg font-light gap-y-5">
            <Link href="/coins/btc">
              <a>BTC/EUR</a>
            </Link>
            <Link href="/coins/eth">
              <a>ETH/EUR</a>
            </Link>
            <Link href="/coins/ada">
              <a>ADA/EUR</a>
            </Link>
            <Link href="/coins/doge">
              <a>DOGE/EUR</a>
            </Link>
            <Link href="/coins/rust">
              <a>RUST/EUR</a>
            </Link>
            <Link href="/coins/dot">
              <a>DOT/EUR</a>
            </Link>
            <Link href="/coins/sol">
              <a>SOL/EUR</a>
            </Link>
          </ul>
        </li>
      </ul>
    </aside>
  );
}
