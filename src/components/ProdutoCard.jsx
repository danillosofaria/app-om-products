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
      <div className="card-text">
        <p className="card-code">M5-{produto.code}</p>
        <h2 className="card-title">{produto.name}</h2>
        <p className="card-description">{produto.descricao}</p>
        <p className="card-ficha">{produto.fm}</p>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        <span className="card-category">{produto.familia}</span>
        <span className="card-category">{produto.aplicacao}</span>
      </div>
    </div>
  );
}

export default ProdutoCard;
