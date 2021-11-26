import { useState, useEffect } from "react";
import Card from "../components/Card";
import Cryptos from "../components/Cryptos";
import { getCrypto } from "./api";

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:8000/api/coins/`);
  const data = await res.json();

  return {
    props: { cryptos: data },
  };
};

const Dashboard = ({ cryptos }) => {
  return (
    <section className="flex flex-col gap-y-8">
      <div className="flex flex-row justify-between w-full gap-x-8">
        <Card title="💎 Trending " />
        <Card title="📈 Top gainers" />
        <Card title="📉 Top losers" />
      </div>
      <div>
        <Cryptos cryptos={cryptos} />
      </div>
    </section>
  );
};

export default Dashboard;
