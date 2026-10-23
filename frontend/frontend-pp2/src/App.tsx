import Card from "./Card.tsx"
import Contador from "./Contador.tsx"
import IMC from "./imc.tsx"

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
    </div>
  );
}


export default App;
