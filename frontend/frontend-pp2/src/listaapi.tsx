import { useEffect, useState } from "react";
import type { Todo } from "./tipos";

const API_URL = "https://jsonplaceholder.typicode.com/todos?userId=1";

function ListaApi() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<Date | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function carregar() {
      setCarregando(true);
      setErro(null);

      try {
        const resposta = await fetch(API_URL, { signal: controller.signal });

        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const dados: Todo[] = await resposta.json();
        setTodos(dados);
        setUltimaAtualizacao(new Date());
      } catch (e) {
        if (e instanceof Error && e.name !== "AbortError") {
          setErro(e.message || "Erro desconhecido");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => controller.abort();
  }, [tentativa]);

  return (
    <section>
      <button
        type="button"
        onClick={() => setTentativa((valor) => valor + 1)}
        disabled={carregando}
      >
        {erro ? "Tentar de novo" : "Recarregar"}
      </button>

      <p>
        Última atualização:{" "}
        {ultimaAtualizacao
          ? ultimaAtualizacao.toLocaleTimeString()
          : "Ainda não atualizada"}
      </p>

      {carregando ? (
        <p>Carregando...</p>
      ) : erro ? (
        <p className="text-red-600">Erro: {erro}</p>
      ) : todos.length === 0 ? (
        <p>Nenhuma tarefa.</p>
      ) : (
        <ul className="space-y-1">
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.completed ? "[x]" : "[ ]"} {todo.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ListaApi;