
import styles from "./../styles/Content.module.css"
import StocksContent from "./../components/stocks/Stocks"

export default function Stockspage() {
  return (
    <div className={ styles.content }>
      <StocksContent/>
    </div>
    
  )
}
