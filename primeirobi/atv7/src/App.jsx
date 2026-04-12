import React from 'react';
import './App.css'; 

const Header = () => (
  <header>
    <h1>Meu Blog de Viagens</h1>
    <Navigation />
  </header>
);

const Navigation = () => (
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#sobre">Sobre</a></li>
      <li><a href="#contato">Contato</a></li>
    </ul>
  </nav>
);

const Article = ({ titulo, data, conteudo, imagem, legenda }) => (
  <article>
    <h2>{titulo}</h2>
    <p><time>{data}</time></p>
    {conteudo.map((paragrafo, index) => (
      <p key={index}>{paragrafo}</p>
    ))}
    <figure>
      <img src={imagem} alt={titulo} />
      <figcaption>{legenda}</figcaption>
    </figure>
  </article>
);

const Sidebar = () => (
  <aside>
    <h3>Mais Viagens</h3>
    <ul>
      <li><a href="#esgotoLV">Um dia no esgoto de Las Vegas</a></li>
      <li><a href="#fAbandonada">Uma noite na fazenda abandonada</a></li>
      <li><a href="#dUrsos">Dormindo ao lado de ursos</a></li>
    </ul>
  </aside>
);

const Footer = () => (
  <footer>
    <p>&copy; 2026 - Todos os direitos reservados.</p>
  </footer>
);

function App() {
  const postData = {
    titulo: "Descobrindo a favela da Rocinha",
    data: "29 de outubro de 2025",
    conteudo: [
      "Rocinha é uma favela localizada na Zona Sul do município do Rio de Janeiro, no Brasil. Destaca-se por ser a favela mais populosa do país, contando com cerca de 72.021 habitantes.",
      "A região passou a ser considerada um bairro e foi delimitada pela Lei Nº 1.995 de 18 de junho de 1993. O nome advém de uma fazenda, uma 'roça' que, na década de 1920, foi tomada pela expansão urbana."
    ],
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/1_rocinha_panorama_2014.jpg/1920px-1_rocinha_panorama_2014.jpg",
    legenda: "Um lindo dia na Rocinha."
  };

  return (
    <div className="app-container">
      <Header />

      <main>
        {}
        <Article
          titulo={postData.titulo}
          data={postData.data}
          conteudo={postData.conteudo}
          imagem={postData.imagem}
          legenda={postData.legenda}
        />
      </main>

      <Sidebar />
      <Footer />
    </div>
  );
}

export default App;