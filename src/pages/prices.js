import { useEffect, useState } from "react"
import ColorPicker from "./colorPicker";

export default function Prices (props) {

    const [granularity, setGranularity] = useState('24 hours');
    const [currency, setCurrency] = useState({name: 'ada', value: 1, symbol: '₳'});
    const [adaUSD, setAdaUSD] = useState();
    const [adaGBP, setAdaGBP] = useState();
    const [adaBTC, setAdaBTC] = useState();
    const [adaETH, setAdaETH] = useState();

    const [adaUsdChange, setAdaUsdChange] = useState(0);
    const [adaGbpChange, setAdaGbpChange] = useState(0);
    const [adaBtcChange, setAdaBtcChange] = useState(0);
    const [adaEthChange, setAdaEthChange] = useState(0);

    const [usdColor, setUsdColor] = useState('black');
    const [gbpColor, setGbpColor] = useState('black');
    const [btcColor, setBtcColor] = useState('black');
    const [ethColor, setEthColor] = useState('black');

    const [gecko, setGecko] = useState(null);
    const [adaChange, setAdaChange] = useState({usd24h: 0, usd7d:0, usd30d: 0, usd1y: 0});
    const [privacy, setPrivacy] = useState(true);

    // runs on first page load
    // gets ada price data and 24 hour price change for each currency
    // sets prices in nav bar
    useEffect(() => {
        const getCardanoPrices = async () => {
            let req = await fetch('https://api.coingecko.com/api/v3/coins/cardano?localization=false&tickers=false&developer_data=false');
            let res = await req.json();
            setGecko(res);

            //curent ada price in usd, gbp, btc and eth
            let adaUSD = (res.market_data.current_price.usd);
            let adaGBP = (res.market_data.current_price.gbp);
            let adaBTC = (res.market_data.current_price.btc);
            let adaETH = (res.market_data.current_price.eth);

            setAdaUSD(adaUSD);
            setAdaGBP(adaGBP);
            setAdaBTC(adaBTC);
            setAdaETH(adaETH);

            // price change last 24 hours of usd, gbp, btc and eth
            let adaUsd24h = (res.market_data.price_change_percentage_24h_in_currency.usd);
            let adaGbp24h = (res.market_data.price_change_percentage_24h_in_currency.gbp);
            let adaBtc24h = (res.market_data.price_change_percentage_24h_in_currency.btc);
            let adaEth24h = (res.market_data.price_change_percentage_24h_in_currency.eth);

            setAdaUsdChange(adaUsd24h);
            setAdaGbpChange(adaGbp24h);
            setAdaBtcChange(adaBtc24h);
            setAdaEthChange(adaEth24h);

            // price change 24h, 7d, 30d and 1y in USD
            // passed as props for fts prices / currency
            let usd24h = (res.market_data.price_change_percentage_24h_in_currency.usd);
            let usd7d = (res.market_data.price_change_percentage_7d_in_currency.usd);
            let usd30d = (res.market_data.price_change_percentage_30d_in_currency.usd);
            let usd1y = (res.market_data.price_change_percentage_1y_in_currency.usd);

            setAdaChange({usd24h: usd24h, usd7d : usd7d, usd30d : usd30d, usd1y: usd1y});

            let usdcolor = '';
            let gbpcolor = '';
            let btccolor = '';
            let ethcolor = '';

            if(adaUsd24h <0 ){
                usdcolor = 'red';
            }
            else if (adaUsd24h == 0){
                usdcolor = 'grey';
            }
            else{
                usdcolor = '#7FFF00';
            }

            if(adaGbp24h < 0){
                gbpcolor = 'red';
            }
            else if(adaGbp24h == 0){
                gbpcolor ='grey';
            }
            else{
                gbpcolor = '#7FFF00';
            }

            if(adaEth24h < 0){
                ethcolor = 'red';
            }
            else if(adaEth24h == 0){
                gbpcolor ='grey';
            }
            else{
                ethcolor = '#7FFF00';
            }

            if(adaBtc24h < 0){
                btccolor = 'red';
            }
            else if(adaBtc24h == 0){
                btccolor ='grey';
            }
            else{
                btccolor = '#7FFF00';
            }

            setUsdColor(usdcolor);
            setGbpColor(gbpcolor);
            setBtcColor(btccolor);
            setEthColor(ethcolor);

            props.data({adaUSD: adaUSD, adaGBP: adaGBP, adaBTC:adaBTC, adaETH: adaETH,
                currency: currency, usd24h: usd24h, usd7d: usd7d, usd30d: usd30d, usd1y:usd1y, privacy: privacy});
        }
        getCardanoPrices();
    }, [])



    // change currency of all values in app - usd, gbp, ada, eth, btc
    const changeCurrency = (_currency) => {

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
    const increaseGranularity = (granularity) => {
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
    const changePrivacy = (privacy) => {
        
        props.data({adaUSD: adaUSD, adaGBP: adaGBP, adaBTC:adaBTC, adaETH: adaETH, 
            usd24h: adaChange.usd24h, usd7d : adaChange.usd7d, usd30d: adaChange.usd30d, usd1y: adaChange.usd1y,
             currency: currency, privacy: !privacy});

        setPrivacy(!privacy);
    }


    return(<nav className="price-nav">
        <nav className="price-nav-inner">
            <div className="out-price">
                <div className="price-label">ADA/USD ${adaUSD}</div>
                <div className="price-label" style={{color: usdColor}}>({adaUsdChange}%)</div>
            </div>

            <div className="out-price">   
                <div className="price-label">ADA/GBP £{adaGBP}</div>
                <div className="price-label" style={{color: gbpColor}}>({adaGbpChange}%)</div>
            </div>

            <div className="out-price">
                <div className="price-label">ADA/ETH Ξ{adaETH}</div>
                <div className="price-label" style={{color: ethColor}}>({adaEthChange}%)</div>
            </div>

            <div className="out-price">
                <div className="price-label">ADA/BTC ₿{adaBTC}</div>
                <div className="price-label" style={{color: btcColor}}>({adaBtcChange}%)</div>
            </div>
        </nav>
        <div className="price-buttons">
            <button className="setting-button" onClick={() => increaseGranularity(granularity)}>Interval:{granularity}</button>
            <button className="setting-button" onClick={() => changeCurrency(currency)}>Currency:{currency.symbol}</button>
            <button className="setting-button" onClick={() => changePrivacy(privacy)}>Privacy Mode</button>
        </div>
    </nav>
    )
}