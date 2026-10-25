import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
};

export default function BuscaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarPosts() {
      try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!resposta.ok) throw new Error();

        setPosts(await resposta.json());
      } catch {
        setErro("Não foi possível carregar os posts.");
      } finally {
        setCarregando(false);
      }
    }

    buscarPosts();
  }, []);

  const postsVisiveis = posts.filter((post) =>
    post.title.toLowerCase().includes(busca.toLowerCase()),
  );

  if (carregando) return <p>Carregando posts...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <section>
      <input
        value={busca}
        onChange={(evento) => setBusca(evento.target.value)}
        placeholder="Buscar pelo título"
      />

      <p>
        {postsVisiveis.length} de {posts.length}
      </p>

      {postsVisiveis.length === 0 ? (
        <p>Nenhum resultado</p>
      ) : (
        <ul>
          {postsVisiveis.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}