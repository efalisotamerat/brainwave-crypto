// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const usedCoins = ["BTC", "ETH", "DOT", "ADA", "DOGE", "RUNE", "SOL"];
export const allCoins = [];

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

export async function getCrypto(symbol) {
  const res = await fetch(
    `http://localhost:8000/api/coins?symbol=${symbol}&convert=EUR`
  );
  const data = await res.json();

  return data;
}

/*
    STEPS:

    1. Get all cryptocoins (Table view)
    2. Get one cryptocoin (Coin view)
    3. Foreach cryptocoin 

*/

// get all cryptocoins
// arrange them to differect rankings >> most amount of transactions in 24h,
