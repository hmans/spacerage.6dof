import { createContext, FC, ReactNode, useContext } from "react"

type TickerState = {
  timeScale: number
  maxDelta: number
}

type TickerProps = {
  children?: ReactNode
} & Partial<TickerState>

const TickerContext = createContext<TickerState>(null!)

export const Ticker: FC<TickerProps> = ({
  children,
  timeScale = 1,
  maxDelta = 1
}) => {
  return (
    <TickerContext.Provider value={{ timeScale, maxDelta }}>
      {children}
    </TickerContext.Provider>
  )
}

export const useTicker = () => useContext(TickerContext)
