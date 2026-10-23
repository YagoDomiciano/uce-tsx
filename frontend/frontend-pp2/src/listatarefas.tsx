interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

const tarefas: Tarefa[] = [
  { id: 1, titulo: "Ler o capítulo 4", concluida: true },
  { id: 2, titulo: "Fazer a lista de exercícios", concluida: false },
  { id: 3, titulo: "Estudar para a prova", concluida: false },
];

function ListaTarefas() {
  if (tarefas.length === 0) {
    return <p>Nenhuma tarefa.</p>;
  }

  return (
    <ul className="space-y-2">
      {tarefas.map((t) => (
        <li
          key={t.id}
          className={t.concluida ? "line-through text-slate-400" : ""}
        >
          {t.concluida ? "[x]" : "[ ]"} {t.titulo}
        </li>
      ))}
    </ul>
  );
}

export default ListaTarefas;
