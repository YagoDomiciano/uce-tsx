import type { ReactNode } from "react";
import Card from "./Card.tsx";
import Contador from "./Contador.tsx";
import IMC from "./imc.tsx";
import ListaFiltrada from "./listafiltrada.tsx";
import ListaSimples from "./listasimples.tsx";
import ListaTarefas from "./listatarefas.tsx";
import ListaApi from "./listaapi.tsx";
import TarefasPorUsuario from "./tarefasporusuario.tsx";
import ListaPosts from "./listaposts.tsx";
import Usuarios from "./Usuarios.tsx";
import TarefasFiltro from "./TarefasFiltro.tsx";
import BuscaPosts from "./BuscaPosts.tsx";
import ComentariosPost from "./ComentariosPost.tsx";

function Secao({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-800">{titulo}</h2>
        <p className="mt-1 text-sm text-slate-500">{descricao}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

function Painel({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) {
  return (
    <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 border-b border-slate-100 pb-3 text-sm font-semibold uppercase tracking-wide text-indigo-700">
        {titulo}
      </h3>
      <div className="text-slate-700">{children}</div>
    </article>
  );
}

function App() {
  return (
    <main className="min-h-screen w-full bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full space-y-10">
        <header className="rounded-2xl bg-gradient-to-r from-indigo-700 to-violet-600 px-6 py-8 text-white shadow-lg sm:px-8">
          <p className="text-sm font-medium text-indigo-100">React + TypeScript</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Painel de exercícios
          </h1>
          <p className="mt-2 max-w-2xl text-indigo-100">
            Componentes, listas e consultas a APIs organizados em um só lugar.
          </p>
        </header>

        <Secao
          titulo="Componentes básicos"
          descricao="Exemplos de componentes, estado e interação."
        >
          <Painel titulo="Cards">
            <div className="space-y-3">
              <Card title="Estudar" description="Ler cap. 4" />
              <Card title="Exercício" description="Fazer a lista" />
            </div>
          </Painel>
          <Painel titulo="Contador">
            <Contador />
          </Painel>
          <Painel titulo="IMC">
            <IMC />
          </Painel>
        </Secao>

        <Secao
          titulo="Listas e tarefas"
          descricao="Renderização de listas e organização de tarefas."
        >
          <Painel titulo="Lista simples">
            <ListaSimples />
          </Painel>
          <Painel titulo="Lista de tarefas">
            <ListaTarefas />
          </Painel>
          <Painel titulo="Lista filtrada">
            <ListaFiltrada />
          </Painel>
          <Painel titulo="Tarefas por usuário">
            <TarefasPorUsuario />
          </Painel>
          <Painel titulo="Tarefas com filtros">
            <TarefasFiltro />
          </Painel>
        </Secao>

        <Secao
          titulo="Dados de API"
          descricao="Busca, exibição e filtragem de dados externos."
        >
          <Painel titulo="Lista de tarefas da API">
            <ListaApi />
          </Painel>
          <Painel titulo="Posts">
            <ListaPosts />
          </Painel>
          <Painel titulo="Busca de posts">
            <BuscaPosts />
          </Painel>
          <Painel titulo="Usuários">
            <Usuarios />
          </Painel>
          <Painel titulo="Comentários por post">
            <ComentariosPost />
          </Painel>
        </Secao>
      </div>
    </main>
  );
}

export default App;