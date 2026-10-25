import { useEffect, useState } from "react";

type Comentario = {
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function ComentariosPost() {
  const [postId, setPostId] = useState(1);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function buscarComentarios() {
      setCarregando(true);
      setErro("");

      try {
        const resposta = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
          { signal: controller.signal },
        );
        if (!resposta.ok) throw new Error();

        setComentarios(await resposta.json());
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setErro("Não foi possível carregar os comentários.");
        }
      } finally {
        if (!controller.signal.aborted) setCarregando(false);
      }
    }

    buscarComentarios();
    return () => controller.abort();
  }, [postId]);

  function atualizarPostId(valor: string) {
    const id = Number(valor);
    if (id >= 1 && id <= 100) setPostId(id);
  }

  return (
    <section>
      <label>
        ID do post (1 a 100):{" "}
        <input
          type="number"
          min="1"
          max="100"
          value={postId}
          onChange={(evento) => atualizarPostId(evento.target.value)}
        />
      </label>

      {carregando ? (
        <p>Carregando comentários...</p>
      ) : erro ? (
        <p>{erro}</p>
      ) : (
        <>
          <p>{comentarios.length} comentários</p>
          <ul>
            {comentarios.map((comentario) => (
              <li key={comentario.id}>
                <strong>{comentario.name}</strong>
                <br />
                <a href={`mailto:${comentario.email}`}>{comentario.email}</a>
                <p>{comentario.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}