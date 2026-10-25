import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function ListaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function buscarPosts() {
      try {
        const resposta = await fetch(
          "https://jsonplaceholder.typicode.com/posts?userId=1",
          { signal: controller.signal },
        );

        if (!resposta.ok) {
          throw new Error("Não foi possível buscar os posts.");
        }

        const dados: Post[] = await resposta.json();
        setPosts(dados);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setErro("Ocorreu um erro ao carregar os posts.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCarregando(false);
        }
      }
    }

    buscarPosts();

    return () => controller.abort();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <ol>
      {posts.map((post) => (
        <li key={post.id}>
          <strong>{post.title}</strong>
          <p style={{ color: "gray", fontSize: "0.85em" }}>{post.body}</p>
        </li>
      ))}
    </ol>
  );
}