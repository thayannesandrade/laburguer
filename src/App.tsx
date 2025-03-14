import { StoreProvider } from "./context/StoreContext"
import HomePage from "./pages/HomePage"

function App() {
  

  return (
    <>
      <StoreProvider>
        <HomePage />
      </StoreProvider>  
    </>
  )
}

export default App
