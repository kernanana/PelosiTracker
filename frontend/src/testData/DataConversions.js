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

export const getFakeMarketData = (fromDate) => {
    var data = {
      "2023-11-27": 1400,
      "2023-11-28": 1506,
      "2023-11-29": 989,
      "2023-11-30": 1228,
      "2023-12-1": 1100,
      "2023-12-2": 1700
    }
    if (fromDate === "2W") {
      data = {
        "2023-11-27": 1400,
        "2023-11-28": 1506,
        "2023-11-29": 989,
        "2023-11-30": 1228,
        "2023-12-01": 1100,
        "2023-12-02": 1700,
        "2023-12-03": 989,
        "2023-12-04": 1228,
        "2023-12-05": 1110,
        "2023-12-06": 1700
      }
    }
    return data
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

export const getFakeInsiderNames = (date) => {
  let data = {
    "count": 2,
    "result":
    [{
      "name": "insider1"
    },
    {
      "name": "insider2"
    }
    ]
  } 
  if (date === "2W") {
    data = {
      "count": 4,
      "result":
      [{
        "name": "insider1"
      },
      {
        "name": "insider2"
      },
      {
        "name": "insider3"
      },
      {
        "name": "insider4"
      }
      ]
    }
  }
  return data
}

export const getFakeInsiderData = (insiderName, stockName, fromDate) => {
  let data =  {
    "2023-11-29": {
      buy: 400,
    },
    "2023-12-2": {
      sell: 300
    }
  }
  if (fromDate === "2W") {
    data =  {
      "2023-11-29": {
        buy: 400,
      },
      "2023-12-3": {
        sell: 300
      },
      "2023-12-4": {
        buy: 100
      },
      "2023-12-6": {
        buy: 600,
        sell: 100
      }
    }
  }
  return data
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

export const mockConvertTwelveDataQuoteData = (symbol) => {
  let fakeStockQuote = {
    symbol: symbol,
    value: "-",
    change: "-",
    percentChange: "-"
  }
  if (symbol === "MSFT") {
    fakeStockQuote = {
      symbol: symbol,
      value: "370.9900",
      change: "5.0600",
      percentChange: "1.3800"
    }
  }
  else if  (symbol === "NVDA") {
    fakeStockQuote = {
      symbol: symbol,
      value: "490.8000",
      change: "7.3000",
      percentChange: "1.5100"
    }
  }
  else if  (symbol === "AAPL") {
    fakeStockQuote = {
      symbol: symbol,
      value: "197.5600",
      change: "-.5600",
      percentChange: "-0.2800"
    }
  }
  else if  (symbol === "META") {
    fakeStockQuote = {
      symbol: symbol,
      value: "335.9000",
      change: "2.6100",
      percentChange: "0.7800"
    }
  }
  fakeStockQuote.value = convertToHundrethsAndAddSuffix(fakeStockQuote.value)
  fakeStockQuote.change = convertToHundrethsAndAddSuffix(fakeStockQuote.change)
  fakeStockQuote.percentChange = convertToHundrethsAndAddSuffix(fakeStockQuote.percentChange)
  return fakeStockQuote
}

const convertToHundrethsAndAddSuffix = (str) => {
  const num = Number(str)
  return Number(num.toFixed(2))
}

export const getMockAnalystData = (symbol) => {
  const result = {
    date: "2023-12-01",
    graphData: [{
      option: "strongBuy",
      value: 8
    },
    {
      option: "buy",
      value: 10
    },
    {
      option: "hold",
      value: 13
    },
    {
      option: "sell",
      value: 5
    },
    {
      option: "strongSell",
      value: 2
    }]
  }
  return result
}