import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Select from "react-select";

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(
    `http://localhost:8000/api/coins/${params.coinId}`
  ).then((r) => r.json());

  console.log("coinsId", params.coinId);

  return {
    props: {
      coin: JSON.parse(JSON.stringify(res[0])),
      revalidate: 1,
    },
  };
};

// export const getStaticPaths = async () => {
//   const coins = await fetch(`http://localhost:8000/api/coins/`).then((r) =>
//     r.json()
//   );

//   return {
//     paths: coins.map((coin) => {
//       const coinId = coin.symbol.toLowerCase();
//       return {
//         params: {
//           coinId,
//         },
//       };
//     }),
//     fallback: true,
//   };
// };

export default function Coin({ coin }) {
  const [changeTimestamp, setChangeTimestamp] = useState(
    coin.percent_change_24h
  );

  const change_timestamp = [
    { value: coin.percent_change_1h, label: "1 hour change" },
    { value: coin.percent_change_24h, label: "24 hours change" },
    { value: coin.percent_change_7d, label: "7 days change" },
    { value: coin.percent_change_30d, label: "30 days change" },
    { value: coin.percent_change_60d, label: "60 days change" },
    { value: coin.percent_change_90d, label: "90 days change" },
  ];

  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="mx-auto mt-8">
        <h1>Data is loading...</h1>
      </div>
    );
  }

  const handleChangeTime = (e) => {
    setChangeTimestamp(e);
  };

  return (
    <section className="grid grid-cols-4 gap-12">
      <div className="flex justify-between col-span-4 px-6 py-6 text-4xl font-semibold tracking-wide bg-gray-400/25 rounded-xl">
        <h1>{coin.name}</h1>
        <h1>€{coin.price.toFixed(4)}</h1>
      </div>
      <div className="flex flex-col justify-center w-full col-span-2 p-8 bg-gray-400/25 rounded-xl">
        <Select
          options={change_timestamp}
          defaultValue={coin.percent_change_24h}
          onChange={(e) => handleChangeTime(e.value)}
        />
        <div className="pt-8">
          <h1
            className={`${
              changeTimestamp < 0 ? "text-red-500" : "text-black"
            } text-center text-7xl`}
          >
            {changeTimestamp.toFixed(4)}%
          </h1>
        </div>
      </div>
      <div className="relative flex flex-col justify-center w-full col-span-2 p-8 bg-gray-400/25 rounded-xl">
        <h1 className="absolute text-xl top-6">
          24 HOURS VOLUME | {coin.volume_change_24h.toFixed(2)}%
          {coin.volume_change_24h < 0 ? <> &#8595;</> : <> &#8593;</>}
        </h1>
        <div>
          <h1 className="text-6xl text-center">
            €{coin.volume_24h.toFixed(2)}
          </h1>
        </div>
      </div>
      <div className="flex flex-col col-span-4 gap-6 p-8 rounded-xl bg-gray-400/25">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl">
            Market cap | {coin.market_cap_dominance.toFixed(2)}%
          </h1>
          <div className="relative w-full h-12 overflow-hidden bg-indigo-200 rounded-lg">
            <h1 className="absolute top-2 text-2xl tracking-wider font-bold left-[40%] text-white drop-shadow-lg">
              €{coin.market_cap.toFixed(2)}
            </h1>
            <div
              style={{ width: coin.market_cap_dominance.toFixed(0) + "%" }}
              className={`bg-indigo-500 h-full flex justify-center items-center relative `}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col col-span-4 gap-6 p-8 rounded-xl bg-gray-400/25">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl">
            Circulating supply |{" "}
            {coin.max_supply
              ? ((coin.circulating_supply / coin.max_supply) * 100).toFixed(2) +
                "%"
              : "∞"}
          </h1>
          <div className="w-full h-12 overflow-hidden bg-indigo-200 rounded-lg">
            <div
              style={{
                width:
                  ((coin.circulating_supply / coin.max_supply) * 100).toFixed(
                    0
                  ) + "%",
              }}
              className={`bg-indigo-500 text-white drop-shadow-lg font-bold h-full flex justify-center items-center text-2xl tracking-wider`}
            >
              {coin.max_supply
                ? coin.circulating_supply.toFixed(2)
                : coin.circulating_supply.toFixed(2)}{" "}
              {coin.symbol}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
