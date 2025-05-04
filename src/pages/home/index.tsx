import styles from './home.module.css'
import { data, Link, useNavigate } from 'react-router-dom'
import { useState, FormEvent, useEffect } from 'react'

export interface CoinProps {
    id: string;
    name: string;
    symbol: string;
    priceUsd: string;
    vwap24Hr: string;
    changePercent24Hr: string;
    rank: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    explorer: string;
    formatedPrice?: string;
    formatedMarket?: string;
    formatedVolume?: string;
}

interface DataProps {
    data: CoinProps[]
}
export function Home() {
    const [input, setInput] = useState("");
    const [coins, setCoins] = useState<CoinProps[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    // Quando o componente e recarregado, busca essa requisição
    useEffect(() => {
        getData();
    }, [offset])

    if (loading || !data) {
        return (
            <div className={styles.containerLoader}>
                <div className={styles.loader}></div>
                <h4 className={styles.center}>Carregando detalhes...</h4>
            </div>

        )
    }

    async function getData() {
        // Requisição da API

        fetch(`https://rest.coincap.io/v3/assets?limit=10&offset=${offset}`, {
            headers: {
                Authorization: 'Bearer 32bd6c3c2a5b04550373070f389c19b0e94356c21418ef36df3d3e6503071570'
            }
        })
            .then(response => response.json())
            .then((data: DataProps) => {
                const coinsData = data.data;

                const price = Intl.NumberFormat("en-US", {
                    style: 'currency',
                    currency: "USD"
                })

                const priceCompact = Intl.NumberFormat("en-US", {
                    style: 'currency',
                    currency: "USD",
                    notation: "compact"
                })

                const formatedResult = coinsData.map((item) => {
                    const formated = {
                        ...item,
                        formatedPrice: price.format(Number(item.priceUsd)),
                        formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
                        formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
                    }

                    return formated;
                })

                // console.log(formatedResult);
                const listCoin = [...coins, ...formatedResult]
                setCoins(listCoin)
                setLoading(false)
            })
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (input === "") return;

        navigate(`/details/${input}`)
    }

    function handleGetMore() {
        if (offset === 0) {
            setOffset(10)
            return;
        }

        setOffset(offset + 10)
    }
    return (
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    placeholder='Digite o nome da moeda. Exemplo: Bitcoin'
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type='submit'>
                    <i className="ri-search-line"></i>
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor Mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                        <th scope='col'>Mudança 24h</th>
                    </tr>
                </thead>

                <tbody id='tbody'>

                    {coins.length > 0 && coins.map((item) => (
                        <tr className={styles.tr} key={item.id}>

                            <td className={styles.tdLabel} data-label='Moeda'>
                                <div className={styles.name}>
                                    <img
                                        className={styles.logo}
                                        src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} alt="LogoCripto" />
                                    <Link to={`/details/${item.id}`}>
                                        <span>{item.name}</span> | {item.symbol}
                                    </Link>
                                </div>
                            </td>

                            <td className={styles.tdLabel} data-label='Valor Mercado'>
                                {item.formatedMarket}
                            </td>

                            <td className={styles.tdLabel} data-label='Preço'>
                                {item.formatedPrice}
                            </td>

                            <td className={styles.tdLabel} data-label='Volume'>
                                {item.formatedVolume}
                            </td>

                            <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfite
                                : styles.tdLoss} data-label='Mudança 24h'>
                                <span>
                                    {Number(item.changePercent24Hr).toFixed(2)}
                                </span>
                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>

            <button className={styles.buttonMore} onClick={handleGetMore}>
                Carregar mais
            </button>
        </main>
    )
}