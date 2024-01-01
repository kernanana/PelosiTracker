import { convertToHundrethsAndAddSuffix } from "./DataConversions"

export const getFakeMarketData = (symbol, fromDate) => {
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
    if (symbol === "MSFT" && fromDate === "1W"){
      data = {
        "2023-11-27": 900,
        "2023-11-28": 806,
        "2023-11-29": 779,
        "2023-11-30": 528,
        "2023-12-01": 600,
        "2023-12-02": 700,
      }
    }
    if (symbol === "MSFT" && fromDate === "2W"){
      data = {
        "2023-11-27": 900,
        "2023-11-28": 806,
        "2023-11-29": 779,
        "2023-11-30": 528,
        "2023-12-01": 600,
        "2023-12-02": 700,
        "2023-12-03": 589,
        "2023-12-04": 528,
        "2023-12-05": 510,
        "2023-12-06": 500
      }
    }
    if (symbol === "AAPL" && fromDate === "1W"){
      data = {
        "2023-11-27": 1500,
        "2023-11-28": 1806,
        "2023-11-29": 1289,
        "2023-11-30": 1528,
        "2023-12-01": 1100,
        "2023-12-02": 700,
      }
    }
    if (symbol === "AAPL" && fromDate === "2W"){
      data = {
        "2023-11-27": 1500,
        "2023-11-28": 1806,
        "2023-11-29": 1289,
        "2023-11-30": 1528,
        "2023-12-01": 1100,
        "2023-12-02": 700,
        "2023-12-03": 489,
        "2023-12-04": 728,
        "2023-12-05": 410,
        "2023-12-06": 900
      }
    }
    if (symbol === "NVDA" && fromDate === "1W"){
      data = {
        "2023-11-27": 900,
        "2023-11-28": 1106,
        "2023-11-29": 1489,
        "2023-11-30": 1528,
        "2023-12-01": 1300,
        "2023-12-02": 1700,
      }
    }
    if (symbol === "NVDA" && fromDate === "2W"){
      data = {
        "2023-11-27": 900,
        "2023-11-28": 1106,
        "2023-11-29": 1489,
        "2023-11-30": 1528,
        "2023-12-01": 1300,
        "2023-12-02": 1700,
        "2023-12-03": 999,
        "2023-12-04": 1428,
        "2023-12-05": 1710,
        "2023-12-06": 2200
      }
    }
    if (symbol === "META" && fromDate === "1W"){
      data = {
        "2023-11-27": 400,
        "2023-11-28": 506,
        "2023-11-29": 389,
        "2023-11-30": 228,
        "2023-12-01": 300,
        "2023-12-02": 700,
      }
    }
    if (symbol === "META" && fromDate === "2W"){
      data = {
        "2023-11-27": 400,
        "2023-11-28": 506,
        "2023-11-29": 389,
        "2023-11-30": 228,
        "2023-12-01": 300,
        "2023-12-02": 700,
        "2023-12-03": 989,
        "2023-12-04": 928,
        "2023-12-05": 1310,
        "2023-12-06": 1800
      }
    }
    return data
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

  export const getMockAnalystData = (symbol) => {
    let result = {
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
    if (symbol === "MSFT") {
        result = {
            date: "2023-12-01",
            graphData: [{
                option: "strongBuy",
                value: 9
            },
            {
                option: "buy",
                value: 8
            },
            {
                option: "hold",
                value: 10
            },
            {
                option: "sell",
                value: 7
            },
            {
                option: "strongSell",
                value: 5
            }]
        }
    }
    if (symbol === "NVDA") {
        result = {
            date: "2023-12-01",
            graphData: [{
                option: "strongBuy",
                value: 6
            },
            {
                option: "buy",
                value: 15
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
                value: 3
            }]
        }
    }
    if (symbol === "AAPL") {
        result = {
            date: "2023-12-01",
            graphData: [{
                option: "strongBuy",
                value: 11
            },
            {
                option: "buy",
                value: 13
            },
            {
                option: "hold",
                value: 5
            },
            {
                option: "sell",
                value: 0
            },
            {
                option: "strongSell",
                value: 1
            }]
        }
    }
    if (symbol === "META") {
        result = {
            date: "2023-12-01",
            graphData: [{
                option: "strongBuy",
                value: 3
            },
            {
                option: "buy",
                value: 5
            },
            {
                option: "hold",
                value: 20
            },
            {
                option: "sell",
                value: 5
            },
            {
                option: "strongSell",
                value: 6
            }]
        }
    }
    return result
  }

  export const getMockInsiderSentiments = (symbol) => {
    let data = {
      dateRecorded: "No Recent Sentiments Found",
      mspr: "-",
      netChange: "-" 
    }
    if (symbol === "MSFT") {
      data = {
        dateRecorded: "12-01-2023",
        mspr: "-2.345",
        netChange: "-4005" 
      }
    }
    else if (symbol === "NVDA") {
      data = {
        dateRecorded: "12-15-2023",
        mspr: "9.08",
        netChange: "5450" 
      }
    }
    else if (symbol === "AAPL") {
      data = {
        dateRecorded: "12-03-2023",
        mspr: "5870",
        netChange: "5.96019" 
      }
    }
    else if (symbol === "META") {
      data = {
        dateRecorded: "12-02 2023",
        mspr: "-1250",
        netChange: "-2.1459227" 
      }
    }
    return data
  }