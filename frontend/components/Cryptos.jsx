import { useEffect } from "react";

const Cryptos = ({ cryptos }) => {
  return (
    <>
      <div className="p-6 bg-white rounded-lg">
        <table className="w-full bg-white rounded-lg table-auto">
          <thead className="text-left">
            <tr className="">
              <th className="px-6 py-2 text-base uppercase">Currency</th>
              <th className="px-6 py-2 text-base text-right uppercase">
                Price
              </th>
              <th className="px-6 py-2 text-base text-right uppercase">
                24H %
              </th>
              <th className="px-6 py-2 text-base text-right uppercase">
                Circ. supply
              </th>
              <th className="px-6 py-2 text-base text-right uppercase">
                Marketcap
              </th>
              <th className="px-6 py-2 text-base text-right uppercase">
                Marketcap dominance
              </th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto) => (
              <tr className="text-xl" key={crypto.name}>
                <td className="px-6 font-light">{crypto.name}</td>
                <td className="px-6 font-light text-right">
                  €{crypto.price.toFixed(2)}
                </td>
                <td className="px-6 font-light text-right">
                  {crypto.percent_change_24h.toFixed(2)}%
                </td>
                <td className="px-6 font-light text-right">
                  {crypto.circulating_supply.toFixed(2)} <b>{crypto.symbol}</b>
                </td>
                <td className="px-6 font-light text-right">
                  €{crypto.market_cap.toFixed(2)}
                </td>
                <td className="px-6 font-light text-right">
                  {crypto.market_cap_dominance.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Cryptos;
