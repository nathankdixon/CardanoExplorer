import { useEffect, useState } from "react"


export default function Prices (props) {

    // time interval for price change datat
    const [granularity, setGranularity] = useState('24 hours');

    // current currency
    const [currency, setCurrency] = useState({name: 'ada', value: 1, symbol: '₳'});

    // displayed ada prices
    const [adaUSD, setAdaUSD] = useState();
    const [adaGBP, setAdaGBP] = useState();
    const [adaBTC, setAdaBTC] = useState();
    const [adaETH, setAdaETH] = useState();

    // displayed price change
    const [adaUsdChange, setAdaUsdChange] = useState(0);
    const [adaGbpChange, setAdaGbpChange] = useState(0);
    const [adaBtcChange, setAdaBtcChange] = useState(0);
    const [adaEthChange, setAdaEthChange] = useState(0);

    const [priceColors, setPriceColors] = useState({usd: 'black', gbp: 'black', btc: 'black', eth: 'black', eur: 'black'});

    // displayed price change colors
    const [usdColor, setUsdColor] = useState('black');
    const [gbpColor, setGbpColor] = useState('black');
    const [btcColor, setBtcColor] = useState('black');
    const [ethColor, setEthColor] = useState('black');

    const [top5, setTop5] = useState([{name: null, price: null, priceChange:null, color: null}, {name: null, price: null, priceChange:null, color: null},{name: null, price: null,priceChange:null, color: null},{name: null, price: null,priceChange:null, color: null},{name: null, price: null,priceChange:null, color: null}]);
    const [adaPrice, setAdaPrice] = useState({usd: {price: null, change24hr: null}, gbp: {price: null, change24hr: null}, btc: {price: null, change24hr: null}, eth: {price: null, change24hr: null}, eur: {price: null, change24hr: null}});
    // json request of ADA market data
    const [gecko, setGecko] = useState(null);

    // ada price change - used by Fts
    const [adaChange, setAdaChange] = useState({usd24h: 0, usd7d:0, usd30d: 0, usd1y: 0});

    // privacy option to '*' sensitive option -- defaults to on (true)
    const [privacy, setPrivacy] = useState(true);

    // runs on first page load
    // gets ada price data and 24 hour price change for each currency
    // sets prices in nav bar
    useEffect(() => {
        const getCardanoPrices = async () => {

            let top5 = await getTop5CryptoPrices("usd");

            if(top5[0].name != null){
                let first = top5[0];
                let second = top5[1];
                let third = top5[2];
                let fourth = top5[3];
                let fifth = top5[4];

                setTop5([first, second, third, fourth, fifth]);
            }

            let cardanoPrices = await getCoinGeckoData();

            if(cardanoPrices != null){
                props.data(cardanoPrices);
                setAdaPrice(cardanoPrices);
            }

        }
        getCardanoPrices();
    }, [])

    async function getTop5CryptoPrices(currency) {
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=5&page=1&sparkline=false`
          );
      
          if (!response.ok) throw new Error('Failed to fetch data');
      
          const data = await response.json();
      
          const getColor = (priceChange) =>
            priceChange > 0 ? 'limegreen' : priceChange < 0 ? 'red' : 'black';
      
          const prices = data.map((coin) => {
            const priceChange = coin.price_change_percentage_24h.toFixed(2);
            return {
              name: coin.name,
              price: coin.current_price,
              priceChange,
              color: getColor(priceChange),
            };
          });
      
          return prices;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
      
      
      

      async function getCoinGeckoData() {
        try {
          const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd%2Cgbp%2Cbtc%2Ceth%2Ceur&include_24hr_change=true');
          if (!response.ok) throw new Error('Failed to fetch data');
      
          const data = await response.json();
      
          const currencies = ['usd', 'gbp', 'btc', 'eth', 'eur'];
          const priceColors = {};
          const prices = {};
      
          currencies.forEach((currency) => {
            const price = data.cardano[currency];
            const change24hr = data.cardano[`${currency}_24h_change`].toFixed(2);
      
            prices[currency] = {price, change24hr};
      
            priceColors[currency] = change24hr > 0
              ? 'limegreen'
              : change24hr < 0
                ? 'red'
                : 'black';
          });
      
          setPriceColors(priceColors);
          return prices;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
      


    // change currency of all values in app - usd, gbp, ada, eth, btc
    function changeCurrency (_currency) {

        let newCurrency = '';
        if(_currency.name == 'eth'){
            newCurrency = ({name: 'ada',value: 1, symbol: '₳'});
        }
        else if (_currency.name == 'ada'){
            newCurrency = ({name: 'usd', value: adaUSD, symbol: '$'});
        }
        else if (_currency.name == 'usd'){
            newCurrency = ({name: 'gbp',value: adaGBP, symbol: '£'});
        }
        else if (_currency.name == 'gbp'){
            newCurrency = ({name: 'btc',value: adaBTC, symbol: '฿'});
        }
        else if (_currency.name == 'btc'){
            newCurrency = ({name: 'eth',value: adaETH, symbol: 'Ξ'});
        }

        props.data({adaUSD: adaUSD, adaGBP: adaGBP, adaBTC:adaBTC, adaETH: adaETH, 
            usd24h: adaChange.usd24h, usd7d : adaChange.usd7d, usd30d: adaChange.usd30d, usd1y: adaChange.usd1y,
             currency: newCurrency, privacy: privacy});

        setCurrency(newCurrency);

    }

    // change time period of price change data - 24h, 7d, 30d or 1 year
    function increaseGranularity (granularity){
        if(gecko != null){

            let adausdchange = '';
            let adagbpchange = '';
            let adabtcchange = '';
            let adaethchhange = '';

            if(granularity == '24 hours'){
                adausdchange = ((gecko.market_data.price_change_percentage_24h_in_currency.usd).toFixed(2));
                adagbpchange = ((gecko.market_data.price_change_percentage_24h_in_currency.gbp).toFixed(2));
                adabtcchange = ((gecko.market_data.price_change_percentage_24h_in_currency.btc).toFixed(2));
                adaethchhange = ((gecko.market_data.price_change_percentage_24h_in_currency.eth).toFixed(2));
                setGranularity('7 days');

            }
            else if (granularity == '7 days'){
                adausdchange = ((gecko.market_data.price_change_percentage_7d_in_currency.usd).toFixed(2));
                adagbpchange = ((gecko.market_data.price_change_percentage_7d_in_currency.gbp).toFixed(2));
                adabtcchange = ((gecko.market_data.price_change_percentage_7d_in_currency.btc).toFixed(2));
                adaethchhange = ((gecko.market_data.price_change_percentage_7d_in_currency.eth).toFixed(2));
                setGranularity('30 days');

            }
            else if (granularity == '30 days'){
                adausdchange =((gecko.market_data.price_change_percentage_30d_in_currency.usd).toFixed(2));
                adagbpchange = ((gecko.market_data.price_change_percentage_30d_in_currency.gbp).toFixed(2));
                adabtcchange = ((gecko.market_data.price_change_percentage_30d_in_currency.btc).toFixed(2));
                adaethchhange = ((gecko.market_data.price_change_percentage_30d_in_currency.eth).toFixed(2));
                setGranularity('60 days');


            }
            else if (granularity == '60 days'){
                adausdchange = ((gecko.market_data.price_change_percentage_60d_in_currency.usd).toFixed(2));
                adagbpchange = ((gecko.market_data.price_change_percentage_60d_in_currency.gbp).toFixed(2));
                adabtcchange = ((gecko.market_data.price_change_percentage_60d_in_currency.btc).toFixed(2));
                adaethchhange = ((gecko.market_data.price_change_percentage_60d_in_currency.eth).toFixed(2));
                setGranularity('1 year');


            }
            else if(granularity == '1 year'){
                adausdchange = ((gecko.market_data.price_change_percentage_1y_in_currency.usd).toFixed(2));
                adagbpchange = ((gecko.market_data.price_change_percentage_1y_in_currency.gbp).toFixed(2));
                adabtcchange = ((gecko.market_data.price_change_percentage_1y_in_currency.btc).toFixed(2));
                adaethchhange = ((gecko.market_data.price_change_percentage_1y_in_currency.eth).toFixed(2));
                setGranularity('24 hours');

            }

            if(adausdchange <0 ){
                setUsdColor('red');
            }
            else if (adausdchange == 0){
                setUsdColor('grey');
            }
            else{
                setUsdColor('#7FFF00');
            }

            if(adagbpchange < 0){
                setGbpColor('red');
            }
            else if(adagbpchange == 0){
                setGbpColor('grey');
            }
            else{
                setGbpColor('#7FFF00');
            }

            if(adaethchhange < 0){
                setEthColor('red');
            }
            else if(adaethchhange == 0){
                setEthColor('grey');
            }
            else{
                setEthColor('#7FFF00');
            }

            if(adabtcchange < 0){
                setBtcColor('red');;
            }
            else if(adabtcchange == 0){
                setBtcColor('grey');
            }
            else{
                setBtcColor('#7FFF00');
            }

            setAdaUsdChange(adausdchange);
            setAdaGbpChange(adagbpchange);
            setAdaBtcChange(adabtcchange);
            setAdaEthChange(adaethchhange);
        }
    }

    // privacy option to '*' any sensitive info
    function changePrivacy (privacy) {
        
        props.data({adaUSD: adaUSD, adaGBP: adaGBP, adaBTC:adaBTC, adaETH: adaETH, 
            usd24h: adaChange.usd24h, usd7d : adaChange.usd7d, usd30d: adaChange.usd30d, usd1y: adaChange.usd1y,
             currency: currency, privacy: !privacy});

        setPrivacy(!privacy);
    }


    return(<div className="price-nav">
        <table className="crypto-prices">
            <tr><h1>Top 5 Cryptocurrencies 24h</h1></tr>
            <tr className="out-price">
                <td className="price-label">{top5[0].name}/USD ${top5[0].price}</td>
                <td className="price-label" style={{color: top5[0].color}}>({top5[0].priceChange}%)</td>
            </tr>
            <tr className="out-price">
                <td className="price-label">{top5[1].name}/USD ${top5[1].price}</td>
                <td className="price-label" style={{color: top5[1].color}}>({top5[1].priceChange}%)</td>

            </tr>
            <tr className="out-price">
                <td className="price-label">{top5[2].name}/USD ${top5[2].price}</td>
                <td className="price-label" style={{color: top5[2].color}}>({top5[2].priceChange}%)</td>

            </tr>
            <tr className="out-price">
                <td className="price-label">{top5[3].name}/USD ${top5[3].price}</td>
                <td className="price-label" style={{color: top5[3].color}}>({top5[3].priceChange}%)</td>

            </tr>
            <tr className="out-price">
                <td className="price-label">{top5[4].name}/USD ${top5[4].price}</td>
                <td className="price-label" style={{color: top5[4].color}}>({top5[4].priceChange}%)</td>
            </tr>
        </table>
        <table className="crypto-prices">
            <tr><h1>Cardano 24hr Prices</h1></tr>
            <tr className="out-price ">
                <td className="price-label">ADA/USD ${adaPrice.usd.price}</td>
                <td className="price-label" style={{color: priceColors.usd}}>({adaPrice.usd.change24hr}%)</td>
            </tr>

            <tr className="out-price">   
                <td className="price-label">ADA/GBP ${adaPrice.gbp.price}</td>
                <td className="price-label" style={{color: priceColors.gbp}}>({adaPrice.gbp.change24hr}%)</td>
            </tr>

            <tr className="out-price">
                <td className="price-label">ADA/ETH ${adaPrice.eth.price}</td>
                <td className="price-label" style={{color: priceColors.eth}}>({adaPrice.eth.change24hr}%)</td>
            </tr>

            <tr className="out-price">
                <td className="price-label">ADA/BTC ${adaPrice.btc.price}</td>
                <td className="price-label" style={{color: priceColors.btc}}>({adaPrice.btc.change24hr}%)</td>
            </tr>
            <tr className="out-price">
                <td className="price-label">ADA/EUR ${adaPrice.eur.price}</td>
                <td className="price-label" style={{color:priceColors.eur}}>({adaPrice.eur.change24hr}%)</td>
            </tr>
        </table>
    </div>
    )
}