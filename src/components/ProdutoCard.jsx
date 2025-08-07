import Chip from "./Chip";
import "./ProdutoCard.css";

function ProdutoCard({ produto }) {
  console.log("produto recebido:", produto);

  if (!produto) return <div>Produto não encontrado</div>;

  return (
    <div className="card">
      <img
        src={`https://ntxziswczaigmgvlvwep.supabase.co/storage/v1/object/public/imagens/thumbs/${produto.name}/Tb_${produto.name}_${produto.aplicacao}.jpg`}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = produto.image_url;
        }}
        alt={produto.name}
        className="card-img"
      />
      <div className="card-content">
        <div className="card-text">
          <p className="card-code">M5-{produto.code}</p>
          <h2 className="card-title">{produto.name}</h2>
          <p className="card-description">2700K, 5,6W, 280lm, 2700K, Medium 33°, ø28mm</p>
          {/* <p className="card-description">{produto.descricao}</p> */}
          <p className="card-ficha">{produto.fm}</p>
        </div>
        <div className="card-chips">
            <Chip label={produto.familia}/>
            <Chip label={produto.aplicacao}/>
            <Chip label={produto.ip}/>
        </div>
      </div>
    </div>
  );
}

export default ProdutoCard;