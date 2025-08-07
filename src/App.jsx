import './App.css'
import './index.css'
import NavBar from './components/NavBar';
import ProdutosList from './components/ProdutosList';

function App() {

  return (
    <>
      <NavBar></NavBar>
      <main>
        {/* <h1>lista de produtos M5-xxxxxxxxx</h1> */}
        <ProdutosList></ProdutosList>
      </main>
    </>
  )
}

export default App
