import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// exports a table of fungible tokens with prices, price changes and values
export default function Fts (props){

    const [display, setDisplay] = useState("Coins");
    const [displayWithPrices, setDisplayWithPrices] = useState([]);
    const [displayWithoutPrices, setDisplayWithoutPrices] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    const router = useRouter();

    useEffect( () => {
      const getData = async () =>{
        if(props.data == null){
          //base
        }
        else{

        // Sort the fts array by the value
          const sortedFts = [...props.data.fts].sort((a, b) => {
            const aValue = a[0].prices?.current * a[0].quantity || 0;
            const bValue = b[0].prices?.current * b[0].quantity || 0;
            return bValue - aValue;
          });

          let displayWithPrices = [];
          let displayWithoutPrices = [];
          let totalPrice = 0;

          displayWithPrices.push(
            <tr key="keyregular" className="grid-item-ft" style={{ color: "darkgreen" }}>
              <td>Coin</td>
              <td>Ticker</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>24h</td>
              <td>7d</td>
              <td>30d</td>
              <td>1y</td>
              <td>Value</td>
            </tr>
          );

          displayWithoutPrices.push(
            <tr key="keyregular" className="grid-item-ft" style={{ color: "darkgreen" }}>
              <td>Coin</td>
              <td>Ticker</td>
              <td>Quantity</td>
            </tr>
          );

          for(const element of sortedFts){
            let coin = element[0];        

            if(coin.prices == null){
              if(coin.metadata.ticker == null){
                if(coin.metadata.name != null){
                  coin.metadata.ticker = coin.metadata.name;
                }
                else if(coin.metadata[0] != null){
                  coin.metadata.ticker = coin.metadata[0];
                }
                else{
                  coin.metadata.ticker = 'unknown';
                }
              }
              
              displayWithoutPrices.push(<tr className="grid-item-ft" key={coin.asset_name}>
              <td><Image src={coin.ipfs} height={50} width={50} alt={coin.asset_name}/></td><td>{coin.metadata.ticker}</td>
              <td>{coin.quantity}</td>
              </tr>);

            }
            else{
              let value = coin.prices.current * coin.quantity;
              totalPrice += value;

              displayWithPrices.push(<tr className="grid-item-ft" key={coin.asset_name}>
              <td><Image src={coin.ipfs} height={50} width={50} alt={coin.asset_name}/></td><td>{coin.metadata.ticker}</td>
              <td>{coin.quantity}</td><td>{((coin.prices.current)* props.currency.value.price).toFixed(2)}{props.currency.symbol}</td>
              <td style={{ color: getColor(coin.prices.change24h) }}>
            {coin.prices.change24h}%
          </td>
            <td style={{ color: getColor(coin.prices.change7d) }}>
              {coin.prices.change7d}%
            </td>
            <td style={{ color: getColor(coin.prices.change30d) }}>
              {coin.prices.change30d}%
            </td>
            <td style={{ color: getColor(coin.prices.change1y) }}>
              {coin.prices.change1y}%
            </td>
          <td>{((value)* props.currency.value.price).toFixed(2)} {props.currency.symbol}</td>
              </tr>);
            }

          }
          setDisplayWithPrices(displayWithPrices);
          setDisplayWithoutPrices(displayWithoutPrices);
          setTotalValue(totalPrice.toFixed(2));
        }
      }
      getData();
    }, [props.data, props.currency]);

    // requests account info from stake address from koios api -- ada balance used
    async function getAccountBalance(stakeAddress){
      try{
          const req = await fetch('https://api.koios.rest/api/v0/account_info', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "_stake_addresses": [
                  stakeAddress
                ]
              })
            });
        
        const res = await req.json();
        return res[0].total_balance;
      }catch(error){
          return null;
      }
  }

      // Function to get the color based on the value
    const getColor = (value) => {
      if (value > 0) {
        return "green";
      } else if (value < 0) {
        return "red";
      }
      return "black";
    };

  return (
    <div className="fts">
      <h1>Fungible Tokens (Coins)</h1>
      <h2>Tokens with Prices</h2>
      <div className="grid-ft">{displayWithPrices}</div>
      <h3>Total Value: {totalValue} {props.currency.symbol}</h3>
      <h2>Tokens without Prices</h2>
      <div className="grid-ft-noprice">{displayWithoutPrices}</div>
    </div>
  );
}