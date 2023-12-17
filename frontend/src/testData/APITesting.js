import { getFakeMarketData, getFakeInsiderData, getFakeInsiderNames, getMarketDatafromProfit, convertTwelveDataQuoteData, mockConvertTwelveDataQuoteData } from "./DataConversions"
const basePath = "https://finnhub.io/api/v1"
const apiKey = "cj006i1r01qlkaevun50cj006i1r01qlkaevun5g"


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
    const result = getFakeMarketData(fromDate)
    // const result = await getMarketDatafromProfit(symbol, fromDate)
    console.log("new stock datapoints", result);
    return result
}

export const searchInsiderInfo = async(symbol, fromDate) => {
    // const url = `${basePath}/stock/insider-transactions?symbol=TSLA&from=${fromDate}&token=${apiKey}`
    // console.log(url);
    // const url = `${basePath}/stock/insider-transactions?symbol=TSLA&token=${apiKey}`
    // const response = await fetch(url)

    // if (!response.ok) {
    //     const message = `Error: ${response.status}`
    //     throw new Error(message)
    // }

    // return await response.json()
    const result = getFakeInsiderNames(fromDate)
    console.log("new insider names", result);
    return result
}

export const getInfoOnInsider = async(insiderName, stockName, fromDate) => {
    const result = getFakeInsiderData(insiderName, stockName, fromDate)
    console.log("new insider data", result);
    return result
}

export const getInsiderSentiment = async(symbol) => {
    // const url = `${basePath}/stock/insider-sentiment?symbol=${symbol}&from=2022-12-12&token=${apiKey}`
    // console.log("using this api call:", url);
    // const response = await fetch(url)

    // if (!response.ok) {
    //     // const message = `Error: ${response.status}`
    //     // throw new Error(message)
    //     const errData = {
    //         dateRecorded: "No Recent Sentiments Found",
    //         mspr: "-",
    //         netChange: "-" 
    //     }
    //     return errData
    // }

    // const results = await response.json()
    // try {
    //     if (results["data"].length > 0) {
    //         const recent = results["data"].pop()
    //         console.log("Most recent insider sentiment:", recent);
    //         const result = {
    //             dateRecorded: recent.year + "-" + recent.month,
    //             mspr: recent.mspr,
    //             netChange: recent.change
    //         }
    //         return result
    //     } else {
    //         throw Error
    //     }
    // } catch (err) {
    //     const errData = {
    //         dateRecorded: "No Recent Sentiments Found",
    //         mspr: "-",
    //         netChange: "-" 
    //     }
    //     return errData
    // }
    const errData = {
        dateRecorded: "2023-12",
        mspr: "2.345",
        netChange: "-4005" 
    }
    return errData
}

export const getStockQuote = async(symbol) => {
    // try {
    //     const twelveDataKey = '74a6354a508c46b1a0178a88d04fa449'
    //     const url = `https://api.twelvedata.com/quote?symbol=AAPL&apikey=${twelveDataKey}`
    //     console.log("using this api call:", url);
    //     const response = await fetch(url)
    
    //     if (!response.ok) {
    //         const message = `Error: ${response.status}`
    //         throw new Error(message)
    //     }
    
    //     const result = await response.json()
    //     console.log(`twelveData for ${symbol} eod`, result);
    //     const reorganizeResult = convertTwelveDataQuoteData(result)
    //     return reorganizeResult
    // } catch {
    //     const errResult = {
    //         symbol: symbol,
    //         value: "$-",
    //         change: "-",
    //         percentChange: "-"
    //     }
    //     return errResult
    // }
    const result = mockConvertTwelveDataQuoteData(symbol)
    return result

}