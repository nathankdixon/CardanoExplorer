import { useEffect, useState } from "react"
import ColorPicker from "./colorPicker";

export default function Prices (props) {

    const [prices, setPrices] = useState();
    const [granularity, setGranularity] = useState('24 hours');
    const [currency, setCurrency] = useState({name: 'ada', value: 1, symbol: '₳'});
    const [adaUSD, setAdaUSD] = useState();
    const [adaGBP, setAdaGBP] = useState();
    const [adaBTC, setAdaBTC] = useState();
    const [adaETH, setAdaETH] = useState();
    const [adaChange, setAdaChange] = useState({usd24h: 0, usd7d:0, usd30d: 0, usd1y: 0});
    const [colors, setColors] = useState();
    const [privacy, setPrivacy] = useState(true);

    useEffect(() => {
        const getPrices = async () => { 
            let req = await fetch('https://api.coingecko.com/api/v3/coins/cardano?localization=false&tickers=false&developer_data=false');
            let res = await req.json();

            let adaUSD = (res.market_data.current_price.usd);
            let adaGBP = (res.market_data.current_price.gbp);
            let adaBTC = (res.market_data.current_price.btc);
            let adaETH = (res.market_data.current_price.eth);

            let usd24h = (res.market_data.price_change_percentage_24h_in_currency.usd);
            let usd7d = (res.market_data.price_change_percentage_7d_in_currency.usd);
            let usd30d = (res.market_data.price_change_percentage_30d_in_currency.usd);
            let usd1y = (res.market_data.price_change_percentage_1y_in_currency.usd);

            setAdaChange({usd24h: usd24h, usd7d : usd7d, usd30d : usd30d, usd1y: usd1y});

            setAdaUSD(adaUSD);
            setAdaGBP(adaGBP);
            setAdaBTC(adaBTC);
            setAdaETH(adaETH);


            props.data({adaUSD: adaUSD, adaGBP: adaGBP, adaBTC:adaBTC, adaETH: adaETH,
                 currency: currency, usd24h: usd24h, usd7d: usd7d, usd30d: usd30d, usd1y:usd1y, privacy: privacy});

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
                <nav className="price-nav-inner">
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
            props.data({adaUSD: adaUSD, adaGBP: adaGBP, adaBTC:adaBTC, adaETH: adaETH, 
                usd24h: adaChange.usd24h, usd7d : adaChange.usd7d, usd30d: adaChange.usd30d, usd1y: adaChange.usd1y,
                 currency: currency, privacy: privacy});
        }

        updateCurrency();
    }, [currency])

    useEffect(() => {
        function updatePrivacy (){
            props.data({adaUSD: adaUSD, adaGBP: adaGBP, adaBTC:adaBTC, adaETH: adaETH, 
                usd24h: adaChange.usd24h, usd7d : adaChange.usd7d, usd30d: adaChange.usd30d, usd1y: adaChange.usd1y,
                 currency: currency, privacy: privacy});
        }

        updatePrivacy();
    }, [privacy])

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

    const changePrivacy = (privacy) => {
        setPrivacy(!privacy);
    }

    function setColorData(data){
        setColors(data);
    }

    return(<nav className="price-nav">
        {prices}
        <div className="price-buttons">
            <ColorPicker data={setColorData} stake={props.tokens}/>
            <button className="setting-button" onClick={() => increaseGranularity(granularity)}>Interval:{granularity}</button>
            <button className="setting-button" onClick={() => changeCurrency(currency)}>Currency:{currency.symbol}</button>
            <button className="setting-button" onClick={() => changePrivacy(privacy)}>Privacy Mode</button>
        </div>
    </nav>
    )
}