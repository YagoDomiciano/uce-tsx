import Card from "./Card.tsx"
import Contador from "./Contador.tsx"
import IMC from "./imc.tsx"
import ListaFiltrada from './listafiltrada.tsx'
import ListaSimples from './listasimples.tsx'
import ListaTarefas from './listatarefas.tsx'
import ListaApi from './listaapi.tsx'
import TarefasPorUsuario from './tarefasporusuario.tsx'
import ListaPosts from "./listaposts.tsx"
import Usuarios from "./Usuarios.tsx"
import TarefasFiltro from "./TarefasFiltro.tsx"
import BuscaPosts from "./BuscaPosts.tsx"
import ComentariosPost from "./ComentariosPost.tsx"

function App() {
  return (
    <div className="p-6
      flex flex-col gap-3">
      <Card
        title="Estudar"
        description="Ler cap. 4"
      />
      <Card
        title="Exercício"
        description="Fazer a lista"
      />
      <Contador/>
      <IMC/>
      <ListaSimples/>
      <ListaTarefas/>
      <ListaFiltrada/>
      <ListaApi/>
      <TarefasPorUsuario/>
      <ListaPosts/>
      <Usuarios/>
      <TarefasFiltro/>
      <BuscaPosts/>
      <ComentariosPost/>
    </div>
  );
}


export default App;
