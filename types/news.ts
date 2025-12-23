export type NewsCategory = "Crypto" | "Blockchain"
// 'All' is a UI state, not necessarily a data category stored in DB

export type NewsTag = "Asset Price" | "Blockchain News" | "Smart Money" | "Economics" | "Regulation"

export interface NewsArticle {
    id: string
    title: string
    date: string
    imageUrl: string
    tag: NewsTag
    // In Firebase, you might store categories as an array if an article fits multiple
    category: NewsCategory | NewsCategory[]
    summary: string
    // HTML string for the full content to allow formatting like the example image
    fullContent: string
    isBookmarked?: boolean
}

export interface MarketTicker {
    id: string
    symbol: string
    name: string
    price: string
    changeLabel: string
    isPositive: boolean
    volume: string
    mc: string
    // In a real app, this would be an array of numbers for a charting library
    chartSvgPath: string
}

// --- Dummy Data ---

const sampleFullContent = `
  <p>The cryptocurrency market has witnessed unprecedented growth in the fourth quarter of 2025, with Bitcoin leading the charge to new all-time highs. This remarkable rally has been fueled by a combination of institutional adoption, regulatory clarity, and increased mainstream acceptance.</p>

  <h4>Key Drivers of Growth</h4>
  <p>Several factors have contributed to Bitcoin's impressive performance. Major financial institutions have expanded their cryptocurrency offerings, while governments worldwide have begun implementing clearer regulatory frameworks that provide much-needed certainty for investors.</p>

  <h4>Market Analysis</h4>
  <p>Technical indicators suggest strong momentum, with trading volumes reaching record levels. Analysts predict continued growth as more institutional investors enter the market. The current market structure shows healthy consolidation patterns, indicating sustainable growth rather than speculative bubbles.</p>
  
  <h4>Looking Ahead</h4>
  <p>As we move forward, the cryptocurrency ecosystem continues to mature. With improved infrastructure, better user experiences, and increasing real-world applications, digital assets are becoming an integral part of the global financial system. Investors are advised to maintain a long-term perspective and diversify their portfolios appropriately.</p>
`

export const DUMMY_NEWS: NewsArticle[] = [
    {
        id: "1",
        title: "Bitcoin Reaches New Heights in Q4 2025",
        date: "Nov 10, 2025",
        imageUrl: "/images/news-btc.png",
        tag: "Asset Price",
        category: "Crypto",
        summary: "BTC: $95,000 | ETH: $4,200 | BNB: $812",
        fullContent: `
      <div style="margin-bottom: 20px;">
          <strong>Current Market Prices</strong><br/>
          Bitcoin (BTC) $95,000 (+2.5%)<br/>
          Ethereum (ETH) $4,200 (+1.8%)<br/>
          BNB $812 (+0.9%)<br/>
      </div>
      ${sampleFullContent}
    `,
    },
    {
        id: "2",
        title: "Nigeria Advance CBDC Adoption",
        date: "Nov 8, 2025",
        imageUrl: "/images/news-cbdc.png",
        tag: "Blockchain News",
        category: "Blockchain",
        summary: "eNaira integration expand to new sections...",
        fullContent: `<p>Nigeria's central bank has announced significant strides in the adoption of its CBDC, the eNaira. New initiatives aim to integrate the digital currency into everyday commerce and government disbursements.</p>${sampleFullContent}`,
    },
    {
        id: "3",
        title: "Institutional Investment Trends in Crypto",
        date: "Nov 5, 2025",
        imageUrl: "/images/news-chart.png",
        tag: "Smart Money",
        category: "Crypto",
        summary: "Major funds increase blockchain allocations...",
        fullContent: `<p>Hedge funds and pension plans are allocating record amounts of capital to the crypto sector in Q4 2025, signaling long-term confidence in the asset class.</p>${sampleFullContent}`,
    },
    {
        id: "4",
        title: "Macroeconomic Impact on Digital Assets",
        date: "Nov 1, 2025",
        imageUrl: "/images/news-macro.png",
        tag: "Economics",
        category: ["Crypto", "Blockchain"],
        summary: "Analyzing inflation effects on cryptocurrency markets...",
        fullContent: `<p>Global inflation rates are cooling, leading to increased risk appetite among investors. This macroeconomic shift is proving beneficial for scarce digital assets.</p>${sampleFullContent}`,
    },
    {
        id: "5",
        title: "EU Finalizes MiCA Regulation Framework",
        date: "Oct 28, 2025",
        imageUrl: "/images/news-eu.png",
        tag: "Regulation",
        category: "Blockchain",
        summary: "Clearer rules for crypto asset service providers in Europe...",
        fullContent: `<p>The European Union has officially implemented the Markets in Crypto-Assets (MiCA) regulation, providing a comprehensive legal framework for the industry across member states.</p>${sampleFullContent}`,
    },
    {
        id: "6",
        title: "Web3 Gaming Activity Surges 300%",
        date: "Oct 25, 2025",
        imageUrl: "/images/news-gaming.png",
        tag: "Blockchain News",
        category: "Blockchain",
        summary: 'New "Play-to-Own" models drive massive user adoption...',
        fullContent: `<p>A new wave of high-fidelity blockchain games has attracted millions of players, proving that sustainable economic models can exist in Web3 gaming.</p>${sampleFullContent}`,
    },
    {
        id: "7",
        title: "Ethereum Layer 2 TVL Hits $50 Billion",
        date: "Oct 22, 2025",
        imageUrl: "/images/news-eth.png",
        tag: "Asset Price",
        category: "Crypto",
        summary: "Arbitrum and Optimism lead the scaling race...",
        fullContent: `<p>Ethereum scaling solutions are processing more transactions than the mainnet, with total value locked reaching unprecedented levels.</p>${sampleFullContent}`,
    },
]

// Simplified SVG path data for mini charts
const UP_CHART_PATH =
    "M0 30 L5 25 L10 28 L15 20 L20 22 L25 15 L30 18 L35 10 L40 12 L45 5 L50 8 L55 0"
const DOWN_CHART_PATH =
    "M0 5 L5 10 L10 8 L15 15 L20 12 L25 20 L30 18 L35 25 L40 22 L45 30 L50 28 L55 35"

export const DUMMY_MARKET_DATA: MarketTicker[] = [
    {
        id: "m1",
        symbol: "BTC",
        name: "Bitcoin",
        price: "$95,000",
        changeLabel: "2.5% 24h",
        isPositive: true,
        volume: "$28.5B",
        mc: "$900B",
        chartSvgPath: UP_CHART_PATH,
    },
    {
        id: "m2",
        symbol: "ETH",
        name: "Ethereum",
        price: "$4,200",
        changeLabel: "1.8% 24h",
        isPositive: true,
        volume: "$15.2B",
        mc: "$400B",
        chartSvgPath: UP_CHART_PATH,
    },
    {
        id: "m3",
        symbol: "BNB",
        name: "BNB",
        price: "$812",
        changeLabel: "0.9% 24h",
        isPositive: false,
        volume: "$15.2B",
        mc: "$90B",
        chartSvgPath: DOWN_CHART_PATH,
    },
    {
        id: "m4",
        symbol: "SOL",
        name: "Solana",
        price: "$145",
        changeLabel: "4.2% 24h",
        isPositive: true,
        volume: "$15.2B",
        mc: "$190B",
        chartSvgPath: UP_CHART_PATH,
    },
    {
        id: "m5",
        symbol: "XRP",
        name: "Ripple",
        price: "$0.65",
        changeLabel: "0.5% 24h",
        isPositive: false,
        volume: "$15.2B",
        mc: "$40B",
        chartSvgPath: DOWN_CHART_PATH,
    },
]
