import { useEffect, useState } from "react";

export default function Delegation(props){

    const [deleagtion, setDelegation] = useState();
    const [poolInfo, setPoolInfo] = useState({active_epoch_no: '', aactive_stake: '', block_count: '', fixed_cost: '', live_delegators: '', margin: '', meta_json: {name: 'in'}, owners: '', pledge: ''});
    const [stakeInfo, setStakeInfo] = useState({pool: '', rewards: '', availableRewards: '', balance: ''});

    useEffect(() => {
        async function getPoolData(){

            if(props.data != null){

            let stakeInfo = await getStakeInfo(props.data.stake);
            
            if(stakeInfo != null){
              setStakeInfo(stakeInfo);
            let poolInfo = await getPoolInfo(stakeInfo.pool); 
    
            
            if(poolInfo != null){
              setPoolInfo(poolInfo);
            }


            if(poolInfo != null){
            let activeEpoch = poolInfo.active_epoch_no;
            let activeStake = poolInfo.active_stake;
            let blockCount = poolInfo.block_count;
            let fixedCost = poolInfo.fixed_cost;
            let delegatorCount = poolInfo.live_delegators;
            let margin = poolInfo.margin;
            let metadata = poolInfo.meta_json;
            let owners = poolInfo.owners;
            let pledge = poolInfo.pledge;



            setDelegation(


            );}
          }
          }
        }                    
        getPoolData();
    }, [props.data])

        // requests account info from stake address from koios api -- ada balance used
        async function getStakeInfo(stakeAddress){
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
    
              let pool = res[0].delegated_pool;
              let rewards = res[0].rewards;
              let availableRewards = res[0].rewards_available;
              let balance = res[0].total_balance;
              return {pool: pool, rewards: rewards, availableRewards: availableRewards, balance: balance};
            }catch(error){
                return null;
            }
        }

    async function getPoolInfo(pool){
        try{
            const req = await fetch('https://api.koios.rest/api/v0/pool_info', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "_pool_bech32_ids": [
                    pool
                  ]
                })
              });
          
          const res = await req.json();
          return res[0];
        }catch(error){
            return null;
        }
    }

    return(
        <div>
          <table className="stake-info">
            <tbody>
                <tr className="stake-info-item"><td>Pool:</td><td><span style={{color: 'yellow'}}>{(stakeInfo.pool)}</span></td></tr>
                <tr className="stake-info-item"><td>Active Epoch:</td><td><span style={{color: 'purple'}}>{poolInfo.active_epoch_no}</span></td></tr>
                <tr className="stake-info-item"><td>Active Stake:</td><td><span style={{color: 'orange'}}>{poolInfo.active_stake/1000000} ADA</span></td></tr>
                <tr className="stake-info-item"><td>Block Count:</td><td><span style={{color: '#ccffcc'}}>{poolInfo.block_count}</span></td></tr>
                <tr className="stake-info-item"><td>Fixed Cost:</td><td><span style={{color: 'red'}}>{poolInfo.fixed_cost/1000000} ADA</span></td></tr>
                <tr className="stake-info-item"><td>Delegator Count:</td><td><span style={{color: 'blue'}}>{poolInfo.live_delegators}</span></td></tr>
                <tr className="stake-info-item"><td>Margin:</td><td><span style={{color: 'blue'}}>{poolInfo.margin}</span></td></tr>
                <tr className="stake-info-item"><td>Metadata:</td><td><span style={{color: 'blue'}}>{poolInfo.meta_json.name}</span></td></tr>
                <tr className="stake-info-item"><td>Owners:</td><td><span style={{color: 'blue'}}>{poolInfo.owners[0]}</span></td></tr>
                <tr className="stake-info-item"><td>Pledge:</td><td><span style={{color: 'blue'}}>{poolInfo.pledge/1000000} ADA</span></td></tr>
            </tbody>
        </table>
        </div>
    )
}