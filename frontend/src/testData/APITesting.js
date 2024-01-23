import {getFakeInsiderData, getMarketDatafromProfit, convertTwelveDataQuoteData, convertFinnhubQuoteData, getAnalystRecommendationFromFinnhub, formatTodaysDate, getHistoricalDataFromTwelve } from "./DataConversions"
import { getFakeMarketData, mockConvertTwelveDataQuoteData, getMockAnalystData, getMockInsiderSentiments } from "./testData"
const basePath = "https://finnhub.io/api/v1"
const apiKey = "cj006i1r01qlkaevun50cj006i1r01qlkaevun5g"

const useTestData = false

export const searchSymbols = async(query) => {
    const url = `${basePath}/search?q=${query}&token=${apiKey}`
    // const url = 'https://finnhub.io/api/v1/search?q=apple&token=cj006i1r01qlkaevun50cj006i1r01qlkaevun5g'
    console.log("using this api call:", url);
    const response = await fetch(url)

    if (!response.ok) {
        const message = `Error: ${response.status}`
        throw new Error(message)
    }

    return await response.json()
}

export const getInfoOnSymbol = async(symbol, fromDate) => {
    if (useTestData) {
        const result = getFakeMarketData(symbol, fromDate)
        console.log("new stock datapoints", result);
        return result
    }
    
    try {
        // let result = await getMarketDatafromProfit(symbol, fromDate)
        let result = await getHistoricalDataFromTwelve(symbol, fromDate)
        console.log("new stock datapoints", result);
        return result
    } catch {
        console.log("error getting graph data");
        return {}
    }
    
}

// export const searchInsiderInfo = async(symbol, fromDate) => {
//     // const url = `${basePath}/stock/insider-transactions?symbol=TSLA&from=${fromDate}&token=${apiKey}`
//     // console.log(url);
//     // const url = `${basePath}/stock/insider-transactions?symbol=TSLA&token=${apiKey}`
//     // const response = await fetch(url)

//     // if (!response.ok) {
//     //     const message = `Error: ${response.status}`
//     //     throw new Error(message)
//     // }

//     // return await response.json()
//     const result = getFakeInsiderNames(fromDate)
//     console.log("new insider names", result);
//     return result
// }

// export const getInfoOnInsider = async(insiderName, stockName, fromDate) => {
//     const result = getFakeInsiderData(insiderName, stockName, fromDate)
//     console.log("new insider data", result);
//     return result
// }

export const getInsiderSentiment = async(symbol) => {
    if(useTestData) {
        const result = getMockInsiderSentiments(symbol)
        return result
    }

    const url = `${basePath}/stock/insider-sentiment?symbol=${symbol}&from=2022-12-12&token=${apiKey}`
    console.log("using this api call:", url);
    const response = await fetch(url)

    if (!response.ok) {
        const errData = {
            dateRecorded: "No Recent Data",
            mspr: "-",
            netChange: "-" 
        }
        return errData
    }

    const results = await response.json()
    try {
        if (results["data"].length > 0) {
            const recent = results["data"].pop()
            console.log("Most recent insider sentiment:", recent);
            const result = {
                dateRecorded: recent.year + "-" + recent.month,
                mspr: recent.mspr,
                netChange: recent.change
            }
            return result
        } else {
            throw Error
        }
    } catch (err) {
        const errData = {
            dateRecorded: "No Recent Data",
            mspr: "-",
            netChange: "-" 
        }
        return errData
    }
}

export const getStockQuote = async(symbol) => {
    if(useTestData) {
        const result = mockConvertTwelveDataQuoteData(symbol)
        return result
    }

    try {
        // const twelveDataKey = '74a6354a508c46b1a0178a88d04fa449'
        // const url = `https://api.twelvedata.com/quote?symbol=AAPL&apikey=${twelveDataKey}`
        const secondFinnhubAccountAPIKey = 'cmc85k1r01qpbvb59efgcmc85k1r01qpbvb59eg0'
        const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${secondFinnhubAccountAPIKey}`
        console.log("using this api call:", url);
        const response = await fetch(url)
    
        if (!response.ok) {
            const message = `Error: ${response.status}`
            throw new Error(message)
        }
    
        const result = await response.json()
        console.log(`twelveData for ${symbol} eod`, result);
        // const reorganizeResult = convertTwelveDataQuoteData(result)
        const reorganizeResult = convertFinnhubQuoteData(symbol, result)
        return reorganizeResult
    } catch {
        const errResult = {
            symbol: symbol,
            value: "-",
            change: "-",
            percentChange: "-"
        }
        return errResult
    }

}

export const getAnalystRecommendation = async(symbol) => {
    if(useTestData){
        const result = getMockAnalystData(symbol)
        return result
    }
    try {
        const result = await getAnalystRecommendationFromFinnhub(symbol)
        return result
    } catch {
        const result = {
            date: "No Recent Data",
            graphData: [{
              option: "Buy+",
              value: 0
            },
            {
              option: "Buy",
              value: 0
            },
            {
              option: "Hold",
              value: 0
            },
            {
              option: "Sell",
              value: 0
            },
            {
              option: "Sell+",
              value: 0
            }]
        }
        return result
    }

}