const convertUNIXtoymd = (unix) => {
  let a = new Date(unix * 1000);
  let year = a.getFullYear();
  let month = a.getMonth() + 1
  let day = a.getDate()
  let finalDate = year + '-' + month + '-' + day
  return finalDate
}

export const reorganizeProfitCOMData = (rawData) => {
    console.log("stock graph data before being reorganized", rawData);
    let output = {}
    for (let i = 0; i < rawData.length; i++) {
      let unixTime = rawData[i]["t"]
      const newDate = convertUNIXtoymd(unixTime)
      const stockValue = rawData[i]["o"]
      output[newDate] = stockValue
    }
    console.log("reorganized Profit.com Data", output);
    return output
}



export const formatFromDateForProfitAPI = (fromDate) => {
  let a = new Date();
  if (fromDate === "3M") {
    a.setMonth(a.getMonth() - 3)
  }
  else if (fromDate === "1M") {
    a.setMonth(a.getMonth() - 1)
  }
  else if (fromDate === "2W") {
    a.setDate(a.getDate() - 14)
  }
  else {
    a.setDate(a.getDate() - 7)
  }
  let year = a.getFullYear();
  let month = a.getMonth() + 1
  let day = a.getDate()
  let finalDate = year + '-' + month + '-' + day
  return finalDate
}

const formatTodaysDate = () => {
  let a = new Date(Date.now());
  let year = a.getFullYear();
  let month = a.getMonth() + 1
  let day = a.getDate()
  let finalDate = year + '-' + month + '-' + day
  return finalDate
}

export const getMarketDatafromProfit = async(symbol, fromDate) => {
    const realDomain = "https://api.profit.com"
    const msURL = `${realDomain}/data-api/market-data/historical/daily/`
    const msAPIKey = '7a4c07f9a79b499b8d64c4268e724a8a'
    const formattedFromDate = formatFromDateForProfitAPI(fromDate)
    const formattedToDate = formatTodaysDate()
    const url =`${msURL}${symbol}?token=${msAPIKey}&start_date=${formattedFromDate}&end_date=${formattedToDate}`
    console.log(url);
    const response = await fetch(url, 
      {"Access-Control-Allow-Origin": "*"});
    if (!response.ok) {
        const message = `Error: ${response.status}`
        throw new Error(message)
    }

    const jsonResponse = await response.json()
    console.log(jsonResponse);
    const result = reorganizeProfitCOMData(jsonResponse)
    return result
}



export const combineGraphData = (stockData, insiderData) => {
  let output = []
  for (const [key, val] of Object.entries(stockData)) {
    let newDataEntry = {
      date: key,
      value: val
    }
    if (key in insiderData) {
      if ("sell" in insiderData[key]) {
        const sellData = insiderData[key]["sell"]
        newDataEntry["sell"] = sellData
      }
      if ("buy" in insiderData[key]) {
        const buyData = insiderData[key]["buy"]
        newDataEntry["buy"] = buyData
      }
    }
    output.push(newDataEntry)
  }
  // for (const [key, val] of Object.entries(insiderData)) {
  //   if (!(key in stockData)) {
  //     let newDataEntry = {
  //       date: key,
  //     }
  //     if ("sell" in insiderData[key]) {
  //       const sellData = insiderData[key]["sell"]
  //       newDataEntry["sell"] = sellData
  //     }
  //     if ("buy" in insiderData[key]) {
  //       const buyData = insiderData[key]["buy"]
  //       newDataEntry["buy"] = buyData
  //     }
  //     output.push(newDataEntry)
  //   }
  // }
  return output
}

export const convertTwelveDataQuoteData = (data) => {
  try {
    const result = {
      symbol: data.symbol,
      value: data.open,
      change: data.change,
      percentChange: data.percent_change
    }
    return result
  } catch (err) {
    throw new Error
  }

}



export const convertToHundrethsAndAddSuffix = (str) => {
  const num = Number(str)
  return Number(num.toFixed(2))
}

