export default function Card({ title, topThree }) {
  return (
    <div className="w-full">
      <h1 className="pb-3 font-bold tracking-wide">{title}</h1>
      <div className="w-full py-6 pl-8 pr-8 bg-white rounded-2xl">
        <ul className="font-normal tracking-wide">
          <li>1. BTC/EUR</li>
          <li>2. ETH/EUR</li>
          <li>3. DOGE/EUR</li>
        </ul>
      </div>
    </div>
  );
}
