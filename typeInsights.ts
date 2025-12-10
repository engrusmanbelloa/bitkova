export interface NewsArticle {
    id: string
    title: string
    category: string
    date: string
    image: string
    content: string
    priceInfo: string
    timestamp: number
}

export interface MarketPrice {
    symbol: string
    name: string
    price: number
    change: number
    volume: string
}
// =======================
// INSGHTS MOCK DATA
// =======================

export const MOCK_NEWS: NewsArticle[] = [
    {
        id: "1",
        title: "Bitcoin Reaches New Highs in Q4 2025",
        category: "Market News",
        date: "Nov. 30, 2025",
        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800",
        content: `Bitcoin has experienced unprecedented growth in the fourth quarter of 2025, with Bitcoin hitting the $100K threshold and maintaining a steady upward trajectory since Q4. This rally reflects the broader adoption of digital assets, increased institutional participation, and evolving regulatory frameworks alongside growing institutional confidence.

Technical indicators suggest strong momentum, with support levels established around $92K. Market analysts point to increased corporate adoption and positive regulatory developments in key markets as primary drivers of this growth.

Looking ahead, experts remain cautiously optimistic about Bitcoin's trajectory, though they warn of potential volatility as the market consolidates at these elevated levels. The cryptocurrency has proven its resilience through multiple market cycles, and many believe this represents a new phase in its maturation as a financial asset.`,
        priceInfo: "BTC: $96,000 | ETH: $5,200 | BNB: $680",
        timestamp: 1701388800000,
    },
    {
        id: "2",
        title: "Nigeria Advance CBDC Adoption",
        category: "Central Bank",
        date: "Nov. 5, 2025",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
        content: `Nigeria continues to lead Africa's digital currency revolution with its eNaira central bank digital currency (CBDC) reaching new adoption milestones. The Central Bank of Nigeria reports significant increases in transaction volumes and active wallets.

The eNaira platform has expanded its integration with commercial banks and payment service providers, making it easier for citizens to access and use the digital currency. Recent updates to the platform have improved transaction speeds and user experience.

Financial inclusion remains a key objective, with the CBDC providing banking services to previously unbanked populations. The government has launched educational campaigns to increase awareness and understanding of digital currency benefits.`,
        priceInfo: "eNaira wallets: 2.5M+ | Daily transactions: $12M",
        timestamp: 1699228800000,
    },
    {
        id: "3",
        title: "Institutional Investment Trends in Crypto",
        category: "Investments",
        date: "Nov. 8, 2025",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
        content: `Institutional investors are significantly increasing their cryptocurrency allocations, with major pension funds, endowments, and hedge funds reporting double-digit percentage allocations to digital assets.

Recent surveys indicate that 78% of institutional investors plan to increase their crypto holdings over the next 12 months. This represents a major shift in sentiment compared to previous years, driven by improved regulatory clarity and the maturation of crypto infrastructure.

Bitcoin and Ethereum continue to dominate institutional portfolios, though there's growing interest in DeFi protocols and layer-2 solutions. Custody solutions and insurance products have evolved to meet institutional requirements, removing key barriers to entry.`,
        priceInfo: "Institutional inflows: $15B this quarter",
        timestamp: 1699488000000,
    },
    {
        id: "4",
        title: "Macroeconomic Impact on Digital Assets",
        category: "Economics",
        date: "Nov. 12, 2025",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
        content: `Global macroeconomic factors continue to play a crucial role in cryptocurrency valuations. Central bank policies, inflation data, and geopolitical events are increasingly correlated with digital asset prices.

Recent Federal Reserve commentary on monetary policy has been closely watched by crypto traders, with dovish signals generally supporting risk assets including cryptocurrencies. The relationship between traditional financial markets and crypto continues to evolve.

Analysts note that crypto is maturing as an asset class, with correlations to traditional assets fluctuating based on market conditions. Some investors view Bitcoin as "digital gold" providing inflation protection, while others see cryptocurrencies as growth assets sensitive to liquidity conditions.`,
        priceInfo: "Market correlation: 0.65 with S&P 500",
        timestamp: 1699833600000,
    },
    {
        id: "5",
        title: "DeFi Protocol Reaches $50B TVL",
        category: "DeFi",
        date: "Nov. 15, 2025",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800",
        content: `The decentralized finance sector has reached a new milestone with total value locked (TVL) across all protocols surpassing $50 billion. This represents a significant recovery and growth from previous market cycles.

Leading DeFi protocols have introduced innovative features including cross-chain bridges, improved yield farming mechanisms, and enhanced security measures. The sector has matured considerably with better auditing practices and insurance options.

Regulatory developments have provided more clarity for DeFi operations in major jurisdictions, though challenges remain. Users are encouraged to conduct thorough research and understand the risks before participating in DeFi protocols.`,
        priceInfo: "Total DeFi TVL: $52.3B | Top protocol: $8.2B",
        timestamp: 1700092800000,
    },
    {
        id: "6",
        title: "NFT Market Evolution and Trends",
        category: "NFTs",
        date: "Nov. 18, 2025",
        image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800",
        content: `The NFT market is experiencing a renaissance with renewed interest in digital collectibles, art, and utility-based tokens. Trading volumes have increased substantially, though the market has matured beyond the speculative frenzy of early cycles.

Successful NFT projects now emphasize utility, community building, and long-term value creation. Gaming NFTs and metaverse assets are gaining particular traction, with major game developers integrating blockchain technology.

The infrastructure supporting NFTs has improved dramatically, with better marketplaces, authentication systems, and cross-chain compatibility. Artists and creators are finding new ways to monetize their work and engage with fans through NFT technology.`,
        priceInfo: "Weekly NFT volume: $180M | Top sale: $2.1M",
        timestamp: 1700352000000,
    },
]

export const MARKET_PRICES: MarketPrice[] = [
    { symbol: "BTC", name: "Bitcoin", price: 96000, change: 5.2, volume: "28.5B" },
    { symbol: "ETH", name: "Ethereum", price: 4200, change: 3.8, volume: "15.2B" },
    { symbol: "BNB", name: "BNB", price: 612, change: -1.2, volume: "2.1B" },
]

// Crypto categories for filtering
export const CRYPTO_CATEGORIES = ["Investments", "DeFi", "NFTs", "Market News"]
