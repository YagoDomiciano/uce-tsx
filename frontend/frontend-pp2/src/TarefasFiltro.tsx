import { useEffect, useState } from "react";

type Tarefa = {
  id: number;
  title: string;
  completed: boolean;
};

type Filtro = "Todas" | "Pendentes" | "Concluídas";

export default function TarefasFiltro() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [filtro, setFiltro] = useState<Filtro>("Todas");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarTarefas() {
      try {
        const resposta = await fetch(
          "https://jsonplaceholder.typicode.com/todos?userId=1",
        );
        if (!resposta.ok) throw new Error();

        setTarefas(await resposta.json());
      } catch {
        setErro("Não foi possível carregar as tarefas.");
      } finally {
        setCarregando(false);
      }
    }

    buscarTarefas();
  }, []);

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === "Pendentes") return !tarefa.completed;
    if (filtro === "Concluídas") return tarefa.completed;
    return true;
  });

  if (carregando) return <p>Carregando tarefas...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <section>
      {(["Todas", "Pendentes", "Concluídas"] as Filtro[]).map((opcao) => (
        <button
          key={opcao}
          onClick={() => setFiltro(opcao)}
          style={{
            fontWeight: filtro === opcao ? "bold" : "normal",
            marginRight: 8,
          }}
        >
          {opcao}
        </button>
      ))}

      <p>{tarefasVisiveis.length} tarefas</p>
      <ul>
        {tarefasVisiveis.map((tarefa) => (
          <li
            key={tarefa.id}
            style={{
              textDecoration: tarefa.completed ? "line-through" : "none",
            }}
          >
            {tarefa.title}
          </li>
        ))}
      </ul>
    </section>
  );
}