import { useEffect, useState } from "react"

export default function Prices () {

    const [prices, setPrices] = useState();

    useEffect(() => {
        const getPrices = async () => { 
            let req = await fetch('https://api.coingecko.com/api/v3/coins/cardano?localization=false&tickers=false&developer_data=false');
            let res = await req.json();

            let adaUSD = (res.market_data.current_price.usd).toFixed(2);
            let adaGBP = (res.market_data.current_price.gbp).toFixed(2);
            let adaBTC = (res.market_data.current_price.btc).toFixed(5);


            let ada24USD = res.market_data.price_change_percentage_24h_in_currency.usd;
            let ada24GBP = res.market_data.price_change_percentage_24h_in_currency.gbp;
            let ada24BTC = res.market_data.price_change_percentage_24h_in_currency.btc;

            setPrices(
                <nav>
                    <button className="sort-button">ADA/USD {adaUSD} {ada24USD}</button>
                    <button className="sort-button">ADA/GBP {adaGBP} {ada24GBP}</button>
                    <button className="sort-button">ADA/BTC {adaBTC} {ada24BTC}</button>

                </nav>

            )
        }
        getPrices();
    }, [])

    return(<div>{prices}</div>
    )
}