import './App.css'
import './index.css'
import NavBar from './components/NavBar';
import ProdutosList from './components/ProdutosList';
import AddProduct from './components/AddProduct';

function App() {

  return (
    <>
      <NavBar></NavBar>
      <main>
        {/* <h1>lista de produtos M5-xxxxxxxxx</h1> */}
        <ProdutosList></ProdutosList>
      </main>
      <AddProduct/>
    </>
  )
}

export default App
