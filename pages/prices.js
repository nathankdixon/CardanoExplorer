import { useEffect, useState } from "react"


export default function Prices (props) {

    // time interval for price change datat


    const [priceColors, setPriceColors] = useState({usd: 'black', gbp: 'black', btc: 'black', eth: 'black', eur: 'black'});


    const [top5, setTop5] = useState([{name: null, price: null, priceChange:null, color: null}, {name: null, price: null, priceChange:null, color: null},{name: null, price: null,priceChange:null, color: null},{name: null, price: null,priceChange:null, color: null},{name: null, price: null,priceChange:null, color: null}]);
    const [adaPrice, setAdaPrice] = useState({usd: {price: null, change24hr: null}, gbp: {price: null, change24hr: null}, btc: {price: null, change24hr: null}, eth: {price: null, change24hr: null}, eur: {price: null, change24hr: null}});
    // json request of ADA market data

    // runs on first page load
    // gets ada price data and 24 hour price change for each currency
        // Sets prices in the navigation bar
        useEffect(() => {
            const getCardanoPrices = async () => {
            try {
                const top5 = await getTop5CryptoPrices('usd');
        
                if (top5?.[0]?.name) {
                  const [first, second, third, fourth, fifth] = top5;
                  setTop5([first, second, third, fourth, fifth]);
                }
        
                const cardanoPrices = await getCoinGeckoData();
        
                if (cardanoPrices) {
                  setAdaPrice(cardanoPrices);
                  props.data(cardanoPrices);
                }
                else{
                  props.data(adaPrice);
                }

            } catch (error) {
                console.error('Error fetching Cardano prices:', error);
            }
            };
            getCardanoPrices();
        }, []);


        async function getTop5CryptoPrices(currency) {
            try {
              const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=5&page=1&sparkline=false`
              );
          
              if (!response.ok) throw new Error('Failed to fetch data');
                else{
                  const data = await response.json();
          
                  const getColor = (priceChange) =>
                    priceChange > 0 ? 'limegreen' : priceChange < 0 ? 'red' : 'white';
              
                  const prices = data.map((coin) => {
                    const priceChange = coin.price_change_percentage_24h.toFixed(2);
                    const formattedPriceChange =
                      priceChange > 0 ? `+${priceChange}` : `${priceChange}`;
              
                    return {
                      name: coin.name,
                      price: (coin.current_price).toFixed(2),
                      priceChange: formattedPriceChange,
                      color: getColor(priceChange),
                    };
                  });
              
                  return prices;
                }

            } catch (error) {
              console.error(error);
              return null;
            }
          }

    async function getCoinGeckoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd%2Cgbp%2Cbtc%2Ceth%2Ceur&include_24hr_change=true');
        if (!response.ok) throw new Error('Failed to fetch data');
        else{
          const data = await response.json();
    
          const currencies = ['usd', 'gbp', 'btc', 'eth', 'eur'];
          const priceColors = {};
          const prices = {};
      
          currencies.forEach((currency) => {
          const price = (data.cardano[currency]).toFixed(5);
          const change24hrRaw = data.cardano[`${currency}_24h_change`].toFixed(2);
          const change24hr = change24hrRaw > 0 ? `+${change24hrRaw}` : `${change24hrRaw}`;
      
          prices[currency] = {price, change24hr};
      
          priceColors[currency] = change24hrRaw > 0
              ? 'limegreen'
              : change24hrRaw < 0
              ? 'red'
              : 'white';
          });
      
          setPriceColors(priceColors);
          return prices;
        }

    } catch (error) {
        console.error(error);
        return null;
    }
    }
        

    return (
        <div className="prices">
            <div className="titles-price"><h1>Top 5 Cryptocurrencies</h1><h1 className="">Cardano (ADA) Prices</h1></div>
        <div className="price-nav">
          <table className="crypto-prices">
            <thead>
              <tr>
                <th className="title">Currency</th>
                <th className="title">Price</th>
                <th className="title-change">24h Change % </th>
              </tr>
            </thead>
            <tbody>
              <tr className="out-price">
                <td className="price-label">{top5[0].name}</td>
                <td className="price-label"><span className="currency">$</span>{top5[0].price}</td>
                <td className="price-label-change" style={{color: top5[0].color}}>{top5[0].priceChange}%</td>
              </tr>
              <tr className="out-price">
                <td className="price-label">{top5[1].name}</td>
                <td className="price-label"><span className="currency">$</span>{top5[1].price}</td>
                <td className="price-label-change" style={{color: top5[1].color}}>{top5[1].priceChange}%</td>
              </tr>
              <tr className="out-price">
                <td className="price-label">{top5[2].name}</td>
                <td className="price-label"><span className="currency">$</span>{top5[2].price}</td>
                <td className="price-label-change" style={{color: top5[2].color}}>{top5[2].priceChange}%</td>
              </tr>
              <tr className="out-price">
                <td className="price-label">{top5[3].name}</td>
                <td className="price-label"><span className="currency">$</span>{top5[3].price}</td>
                <td className="price-label-change" style={{color: top5[3].color}}>{top5[3].priceChange}%</td>
              </tr>
              <tr className="out-price">
                <td className="price-label">{top5[4].name}</td>
                <td className="price-label"><span className="currency">$</span>{top5[4].price}</td>
                <td className="price-label-change" style={{color: top5[4].color}}>{top5[4].priceChange}%</td>
              </tr>
            </tbody>
          </table>
          <table className="crypto-prices">
            <thead>
              <tr>
                <th className="title">Currency</th>
                <th className="title">Price</th>
                <th className="title-change">24h Change % </th>
              </tr>
            </thead>
            <tbody>
              <tr className="out-price">
                <td className="price-label">ADA / US Dollar</td>
                <td className="price-label"><span className="currency">$</span>{adaPrice.usd.price}</td>
                <td className="price-label-change" style={{color: priceColors.usd}}>{adaPrice.usd.change24hr}%</td>
              </tr>
              <tr className="out-price">   
                <td className="price-label">ADA / GBP</td>
                <td className="price-label"><span className="currency">£</span>{adaPrice.gbp.price}</td>
                <td className="price-label-change" style={{color: priceColors.gbp}}>{adaPrice.gbp.change24hr}%</td>
              </tr>
              <tr className="out-price">
                <td className="price-label">ADA / Ethereum</td>
                <td className="price-label"><span className="currency">Ξ</span>{adaPrice.eth.price}</td>
                <td className="price-label-change" style={{color: priceColors.eth}}>{adaPrice.eth.change24hr}%</td>
            </tr>
            <tr className="out-price">
                <td className="price-label">ADA / Bitcoin</td>
                <td className="price-label"><span className="currency">฿</span>{adaPrice.btc.price}</td>
                <td className="price-label-change" style={{color: priceColors.btc}}>{adaPrice.btc.change24hr}%</td>
              </tr>
              <tr className="out-price">
                <td className="price-label">ADA / Euros</td>
                <td className="price-label"><span className="currency">€</span>{adaPrice.eur.price}</td>
                <td className="price-label-change" style={{color: priceColors.eur}}>{adaPrice.eur.change24hr}%</td>
                </tr>
        </tbody>
        </table>
        </div>
        </div>);}
      