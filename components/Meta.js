import Head from "next/head"

const Meta = ({ title, keywords, description }) => {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: "BITKOVA ACADEMY",
    keywords:
        "blockchain education, blockchain academy blocckchain certifiaction, blockchain security, blockchain architecture, blockchain solution, learn crypto trading crypto currency trading school, cryptocurrency learning, crypto, crypto trading, cryptocurrencies, crypto currency, exchances, digital skills, programming",
    description:
        "everythin you need to know about technology and crypto trading, skillup with bitkova.",
}

export default Meta
