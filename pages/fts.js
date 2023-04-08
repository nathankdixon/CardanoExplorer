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

          let pricedGrid = [];
          let unpricedGrid = [];

          unpricedGrid.push(<div className='grid-ft-item' key = 'titlec' style={{fontWeight: "bold"}}>Coin</div>);
          unpricedGrid.push(<div className='grid-ft-item' key = 'titley'style={{fontWeight: "bold"}}>Ticker</div>);
          unpricedGrid.push(<div className='grid-ft-item' key = 'titleq'style={{fontWeight: "bold"}}>Quantity</div>);

          pricedGrid.push(<div className='grid-ft-item' key = 'titlec'style={{fontWeight: "bold"}}>Coin</div>);
          pricedGrid.push(<div className='grid-ft-item' key = 'titley'style={{fontWeight: "bold"}}>Ticker</div>);
          pricedGrid.push(<div className='grid-ft-item' key = 'titleq'style={{fontWeight: "bold"}}>Quantity</div>);
          pricedGrid.push(<div className='grid-ft-item' key = 'titlep'style={{fontWeight: "bold"}}>Price</div>);
          pricedGrid.push(<div className='grid-ft-item' key = 'titlecd'style={{fontWeight: "bold"}}>24hr</div>);
          pricedGrid.push(<div className='grid-ft-item' key = 'titleee'style={{fontWeight: "bold"}}>7d</div>);
          pricedGrid.push(<div className='grid-ft-item' key = 'titledd'style={{fontWeight: "bold"}}>30d</div>);
          pricedGrid.push(<div className='grid-ft-item' key = 'titlehh'style={{fontWeight: "bold"}}>1y</div>);
          pricedGrid.push(<div className='grid-ft-item' key = 'titlev'style={{fontWeight: "bold"}}>Value</div>);

          let totalPrice = 0;


          for (const element of sortedFts) {
            let coin = element[0];
          
            const ticker = coin.metadata?.ticker || coin.metadata?.name || coin.metadata?.[0] || 'unknown';
            let ipfs = '';

            if(coin.ipfs != null || coin.ipfs != ''){
              ipfs = coin.ipfs;
            }
            else if(coin.onchain_metadata.image != null){
              ipfs = coin.onchain_metadata.image;
            }
            else{
              ipfs = '/black.jpeg';
            }

          
            if (coin.prices == null) {

              unpricedGrid.push(<div className='grid-ft-item' key = {coin.asset_name}>
                <Image src={ipfs} height={50} width={50} alt={coin.asset_name}/>
                </div>);
              unpricedGrid.push(<div className='grid-ft-item' key = {coin.asset_name + 't'}>{ticker}</div>);
              unpricedGrid.push(<div className='grid-ft-item' key = {coin.asset_name + 'q'}>{coin.quantity}</div>);

            } else {

              totalPrice += (coin.prices.current * coin.quantity);

              pricedGrid.push(<div className='grid-ft-item' key = {coin.asset_name}>
                <Image src={ipfs} height={50} width={50} alt={coin.asset_name}/>
                </div>);
              pricedGrid.push(<div className='grid-ft-item' key = {coin.asset_name + 't'}>{ticker}</div>);
              pricedGrid.push(<div className='grid-ft-item' key = {coin.asset_name + 'q'}>{coin.quantity}</div>);
              pricedGrid.push(<div className='grid-ft-item' key = {coin.asset_name + 'p'}>{((coin.prices.current) * props.currency.value.price).toFixed(2)} {props.currency.symbol}</div>);
              pricedGrid.push(<div className='grid-ft-item' key = {coin.asset_name + 'c'} style={{ color: getColor(coin.prices.change24h) }}>{coin.prices.change24h}%</div>);
              pricedGrid.push(<div className='grid-ft-item' key = {coin.asset_name + 'ee'} style={{ color: getColor(coin.prices.change7d) }}>{coin.prices.change7d}%</div>);
              pricedGrid.push(<div className='grid-ft-item' key = {coin.asset_name + 'dd'} style={{ color: getColor(coin.prices.change30d) }}>{coin.prices.change30d}%</div>);
              pricedGrid.push(<div className='grid-ft-item' key = {coin.asset_name + 'hh'} style={{ color: getColor(coin.prices.change1y) }}>{coin.prices.change1y}%</div>);
              pricedGrid.push(<div className='grid-ft-item' key = {coin.asset_name + 'v'}>{((coin.prices.current) * props.currency.value.price * coin.quantity).toFixed(2)} {props.currency.symbol}</div>);
            }
          }
            setDisplayWithPrices(pricedGrid);
            setDisplayWithoutPrices(unpricedGrid);
            setTotalValue(totalPrice.toFixed(2));
        }
      }
      getData();
    }, [props.data, props.currency]);

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
      <h2 style={{color: "black", fontSize: 'xx-large'}}>Coins with Prices (CoinGecko)</h2>
      <div className="grid-ft">{displayWithPrices}</div>
      <h3 style={{color: "black", fontSize: 'x-large'}}>Total Value: {totalValue} {props.currency.symbol}</h3>
      <h2 style={{color: "black"}}>Other Coins</h2>
      <div className="grid-ft-noprice">{displayWithoutPrices}</div>
    </div>
  );
}