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

export const formatTodaysDate = () => {
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



export const combineGraphData = (stockData) => {
  let min = -1
  let max = 0
  let graphData = []
  for (const [key, val] of Object.entries(stockData)) {
    if (max == 0 || val > max) {
      max = val
    }
    if (min == -1 || val < min) {
      min = val
    }
    let newDataEntry = {
      date: key,
      value: val
    }
    // if (key in insiderData) {
    //   if ("sell" in insiderData[key]) {
    //     const sellData = insiderData[key]["sell"]
    //     newDataEntry["sell"] = sellData
    //   }
    //   if ("buy" in insiderData[key]) {
    //     const buyData = insiderData[key]["buy"]
    //     newDataEntry["buy"] = buyData
    //   }
    // }
    graphData.push(newDataEntry)
  }
  const result = {
    "graphData": graphData,
    "min": min,
    "max": max
  } 
  return result
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

export const convertFinnhubQuoteData = (symbol, data) => {
  try {
    const result = {
      symbol: symbol,
      value: convertToHundrethsAndAddSuffix(data.c),
      change: convertToHundrethsAndAddSuffix(data.d),
      percentChange: convertToHundrethsAndAddSuffix(data.dp)
    }
    return result
  } catch (err) {
    throw new Error
  }
}



export const convertToHundrethsAndAddSuffix = (str) => {
  const num = Number(str)
  return num.toFixed(2)
}

export const getAnalystRecommendationFromFinnhub = async(symbol) => {
  const finnhubAPIKey = 'cj006i1r01qlkaevun50cj006i1r01qlkaevun5g'
  const url =`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${finnhubAPIKey}`
  console.log(url);
  const response = await fetch(url, 
    {"Access-Control-Allow-Origin": "*"});
  if (!response.ok) {
      const message = `Error: ${response.status}`
      throw new Error(message)
  }
  const jsonResponse = await response.json()
  console.log(jsonResponse);
  const result = reorganizeAnalystSentimentsFromFinnhub(jsonResponse)
  return result
}

export const formatYYYYMMDDFrom1YearAgo = () => {
  let a = new Date();
  a.setFullYear(a.getFullYear - 1)
  let year = a.getFullYear();
  let month = a.getMonth() + 1
  let day = a.getDate()
  let finalDate = year + '-' + month + '-' + day
  return finalDate
}

const reorganizeAnalystSentimentsFromFinnhub = (data) => {
  let result = {}
  const mostRecentReport = data[0]
  result["date"] = mostRecentReport.period
  let graphData = []
  if ("strongBuy" in mostRecentReport) {
    graphData.push({
      option: "strongBuy",
      value: mostRecentReport["strongBuy"]
    })
  }
  if ("buy" in mostRecentReport) {
    graphData.push({
      option: "buy",
      value: mostRecentReport["buy"]
    })
  }
  if ("hold" in mostRecentReport) {
    graphData.push({
      option: "hold",
      value: mostRecentReport["hold"]
    })
  }
  if ("sell" in mostRecentReport) {
    graphData.push({
      option: "sell",
      value: mostRecentReport["sell"]
    })
  }
  if ("strongSell" in mostRecentReport) {
    graphData.push({
      option: "strongSell",
      value: mostRecentReport["strongSell"]
    })
  }
  result["graphData"] = graphData
  console.log(result);
  return result
}