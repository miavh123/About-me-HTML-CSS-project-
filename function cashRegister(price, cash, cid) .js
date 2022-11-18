function cashRegister(price, cash, cid) {
    let diff = cash - price;
    const changeDue = diff;
    const INSUFFICIENT_FUNDS = {status: "INSUFFICIENT_FUNDS", change: []}
    const INCORRECT_PAYMENT = {status: "INCORRECT_PAYMENT", change: []}
    const CLOSED = {status: "CLOSED", change: cid}
    const OPEN = {status: "OPEN", change: []}
    let cidTotal = drawerTotal(cid);
    const cashValues = [
        ["ONE HUNDRED", 100],
        ["TWENTY", 20],
        ["TEN", 10],
        ["FIVE", 5],
        ["ONE", 1],
        ["QUARTER", 0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01]
    ]
    let coinChange = [...cashValues];

    function drawerTotal(cid) {
        return parseFloat(cid.reduce((a,b) => a + b[1], 0).toFixed(2));
    }

    cid.reverse();


    for(let i = 0; i<cashValues.length; i++){
        let returnCoins = 0;
        let cashVal = cashValues[i][1];
        let count = cid[i][1].toFixed(2)/cashVal.toFixed(2);
        while(diff.toFixed(2)>=cashVal && count>=1){
            diff -= cashVal;
            returnCoins += cashVal;
            count--;
        }
        coinChange[i][1] = returnCoins>0 ?
            returnCoins - Math.floor(returnCoins) !== 0 ?
                parseFloat(returnCoins.toFixed(2)) :  returnCoins
            : returnCoins;
    }

    if(changeDue<0){ 
        return INCORRECT_PAYMENT;
    }else if(drawerTotal(coinChange) < changeDue || cidTotal < changeDue ){
        return INSUFFICIENT_FUNDS;
    }else if(cidTotal == changeDue){ 
        CLOSED.change = cid.reverse(); 
        return CLOSED;
    }else{ 
        let openChange =[];
        for(let i = 0; i<coinChange.length; i++){
            coinChange[i][1]!==0 ? openChange.push(coinChange[i]) : null;
        }
        OPEN.change = openChange.reverse(); 
        return OPEN
    }
} 
 console.logcashRegister(19.5, 18, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ]);
  