import { useEffect, useState } from "react"

export default function Prices (props) {

    const [prices, setPrices] = useState();
    const [granularity, setGranularity] = useState('24 hours');
    const [currency, setCurrency] = useState({name: 'ada', value: 1, symbol: '₳'});
    const [adaUSD, setAdaUSD] = useState();
    const [adaGBP, setAdaGBP] = useState();
    const [adaBTC, setAdaBTC] = useState();
    const [adaETH, setAdaETH] = useState();

    useEffect(() => {
        const getPrices = async () => { 
            let req = await fetch('https://api.coingecko.com/api/v3/coins/cardano?localization=false&tickers=false&developer_data=false');
            let res = await req.json();

            let adaUSD = (res.market_data.current_price.usd).toFixed(2);
            let adaGBP = (res.market_data.current_price.gbp).toFixed(2);
            let adaBTC = (res.market_data.current_price.btc).toFixed(5);
            let adaETH = (res.market_data.current_price.eth).toFixed(5);

            setAdaUSD(adaUSD);
            setAdaGBP(adaGBP);
            setAdaBTC(adaBTC);
            setAdaETH(adaETH);


            props.data({adaUSD: adaUSD, adaGBP: adaGBP, adaBTC:adaBTC, adaETH: adaETH, currency: currency});

            let adaUsdChange = '';
            let adaGbpChange = '';
            let adaBtcChange = '';
            let adaEthChange = '';

            if(granularity == '24 hours'){
                adaUsdChange = (res.market_data.price_change_percentage_24h_in_currency.usd).toFixed(2);
                adaGbpChange = (res.market_data.price_change_percentage_24h_in_currency.gbp).toFixed(2);
                adaBtcChange = (res.market_data.price_change_percentage_24h_in_currency.btc).toFixed(2);
                adaEthChange = (res.market_data.price_change_percentage_24h_in_currency.eth).toFixed(2);
            }
            else if (granularity == '7 days'){
                adaUsdChange = (res.market_data.price_change_percentage_7d_in_currency.usd).toFixed(2);
                adaGbpChange = (res.market_data.price_change_percentage_7d_in_currency.gbp).toFixed(2);
                adaBtcChange = (res.market_data.price_change_percentage_7d_in_currency.btc).toFixed(2);
                adaEthChange = (res.market_data.price_change_percentage_7d_in_currency.eth).toFixed(2);
            }
            else if (granularity == '30 days'){
                adaUsdChange = (res.market_data.price_change_percentage_30d_in_currency.usd).toFixed(2);
                adaGbpChange = (res.market_data.price_change_percentage_30d_in_currency.gbp).toFixed(2);
                adaBtcChange = (res.market_data.price_change_percentage_30d_in_currency.btc).toFixed(2);
                adaEthChange = (res.market_data.price_change_percentage_30d_in_currency.eth).toFixed(2);

            }
            else if (granularity == '60 days'){
                adaUsdChange = (res.market_data.price_change_percentage_60d_in_currency.usd).toFixed(2);
                adaGbpChange = (res.market_data.price_change_percentage_60d_in_currency.gbp).toFixed(2);
                adaBtcChange = (res.market_data.price_change_percentage_60d_in_currency.btc).toFixed(2);
                adaEthChange = (res.market_data.price_change_percentage_60d_in_currency.eth).toFixed(2);

            }
            else if(granularity == '1 year'){
                adaUsdChange = (res.market_data.price_change_percentage_1y_in_currency.usd).toFixed(2);
                adaGbpChange = (res.market_data.price_change_percentage_1y_in_currency.gbp).toFixed(2);
                adaBtcChange = (res.market_data.price_change_percentage_1y_in_currency.btc).toFixed(2);
                adaEthChange = (res.market_data.price_change_percentage_1y_in_currency.eth).toFixed(2);

            }
            
            let usdcolor = 'black';
            let gbpcolor = 'black';
            let btccolor = 'black';
            let ethcolor = 'black';


            if(adaUsdChange <=0 ){
                usdcolor = 'red';
            }
            else if (adaUsdChange == 0){
                usdcolor = 'grey';
            }
            else{
                usdcolor = '#7FFF00';
            }

            if(adaGbpChange <= 0){
                gbpcolor = 'red';
            }
            else if(adaGbpChange == 0){
                gbpcolor ='grey';
            }
            else{
                gbpcolor = '#7FFF00';
            }

            if(adaEthChange <= 0){
                ethcolor = 'red';
            }
            else if(adaEthChange == 0){
                gbpcolor ='grey';
            }
            else{
                ethcolor = '#7FFF00';
            }

            if(adaBtcChange <= 0){
                btccolor = 'red';
            }
            else if(adaBtcChange == 0){
                btccolor ='grey';
            }
            else{
                btccolor = '#7FFF00';
            }
            

            setPrices(
                <nav>
                    <div className="out-price">
                        <div className="price-label">ADA/USD ${adaUSD}</div>
                        <div className="price-label" style={{color: usdcolor}}>({adaUsdChange}%)</div>
                    </div>

                    <div className="out-price">   
                        <div className="price-label">ADA/GBP £{adaGBP}</div>
                        <div className="price-label" style={{color: gbpcolor}}>({adaGbpChange}%)</div>
                    </div>

                    <div className="out-price">
                        <div className="price-label">ADA/ETH Ξ{adaETH}</div>
                        <div className="price-label" style={{color: ethcolor}}>({adaEthChange}%)</div>
                    </div>

                    <div className="out-price">
                        <div className="price-label">ADA/BTC ₿{adaBTC}</div>
                        <div className="price-label" style={{color: btccolor}}>({adaBtcChange}%)</div>
                    </div>
                </nav>

            )
        }
        getPrices();
    }, [granularity])

    useEffect(() => {
        function updateCurrency (){
            props.data({adaUSD: adaUSD, adaGBP: adaGBP, adaBTC:adaBTC, adaETH: adaETH, currency: currency});
        }

        updateCurrency();
    }, [currency])

    const changeCurrency = (_currency) => {


        if(_currency.name == 'eth'){
            setCurrency({name: 'ada',value: 1, symbol: '₳'});
        }
        else if (_currency.name == 'ada'){
            setCurrency({name: 'usd', value: adaUSD, symbol: '$'});
        }
        else if (_currency.name == 'usd'){
            setCurrency({name: 'gbp',value: adaGBP, symbol: '£'});
        }
        else if (_currency.name == 'gbp'){
            setCurrency({name: 'btc',value: adaBTC, symbol: '฿'});
        }
        else if (_currency.name == 'btc'){
            setCurrency({name: 'eth',value: adaETH, symbol: 'Ξ'});
        }

    }

    const increaseGranularity = (granularity) => {
        if(granularity == '24 hours'){
            setGranularity('7 days');
        }
        if(granularity == '7 days'){
            setGranularity('30 days');
        }
        if(granularity == '30 days'){
            setGranularity('60 days');
        }
        if(granularity == '60 days'){
            setGranularity('1 year');
        }
        if(granularity == '1 year'){
            setGranularity('24 hours');
        }
    }

    return(<nav>
        {prices}
        <div>
        <button className="setting-button" onClick={() => increaseGranularity(granularity)}>Interval:</button>
        <label className="setting-label">{granularity}</label>
        <button className="setting-button" onClick={() => changeCurrency(currency)}>Currency:</button>
        <label className="setting-label">{currency.symbol}</label>
        </div>

    </nav>
    )
}