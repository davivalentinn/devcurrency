import styles from './details.module.css'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CoinProps } from '../home';
interface ResponseData {
    data: CoinProps
}

interface ErrorData {
    error: string;
}

type DataProps = ResponseData | ErrorData

export function Details() {
    const { cripto } = useParams();
    const navigate = useNavigate();
    const [coin, setCoin] = useState<CoinProps>();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getCoin() {
            try {

                fetch(`https://rest.coincap.io/v3/assets/${cripto}`, {
                    headers: {
                        Authorization: 'Bearer 32bd6c3c2a5b04550373070f389c19b0e94356c21418ef36df3d3e6503071570'
                    }
                })
                    .then(response => response.json())
                    .then((data: DataProps) => {
                        if ("error" in data) {
                            navigate("/")
                            return;
                        }

                        const price = Intl.NumberFormat("en-US", {
                            style: 'currency',
                            currency: "USD"
                        })

                        const priceCompact = Intl.NumberFormat("en-US", {
                            style: 'currency',
                            currency: "USD",
                            notation: "compact"
                        })

                        const resultData = {
                            ...data.data,
                            formatedPrice: price.format(Number(data.data.priceUsd)),
                            formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
                            formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr)),
                        }

                        setCoin(resultData);
                        setLoading(false)
                    })

            } catch (err) {
                console.log(err);
                navigate("/")
            }
        }

        getCoin();
    }, [cripto])

    if (loading || !coin) {
        return (
            <div className={styles.containerLoader}>
                <div className={styles.loader}></div>
                <h4 className={styles.center}>Carregando detalhes...</h4>
            </div>

        )
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.center}>{coin?.name}</h1>
            <h1 className={styles.center}>{coin?.symbol}</h1>

            <section className={styles.content}>
                
                <img src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
                    alt="Logo da moeda"
                    className={styles.logo}
                />

                <h1>
                    {coin?.name} | {coin?.symbol}
                </h1>

                <p>
                    <strong>Preço: </strong>{coin?.formatedPrice}
                </p>
                <p>
                    <strong>Valor mercado: </strong>{coin?.formatedMarket}
                </p>
                <p>
                    <strong>Volume: </strong> {coin?.formatedVolume}
                </p>
                <p>
                    <strong>Mudança 24h: </strong>
                    <span
                        className={Number(coin?.changePercent24Hr) > 0 ? styles.profite
                            : styles.loss}
                    >{Number(coin?.changePercent24Hr).toFixed(2)}</span>
                </p>
            </section>
        </div>
    )
}