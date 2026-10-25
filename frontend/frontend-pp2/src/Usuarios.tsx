import { useEffect, useState } from "react";

type Usuario = {
  id: number;
  name: string;
  email: string;
  address: { city: string };
  company: { name: string };
};

function LinhaUsuario({ usuario }: { usuario: Usuario }) {
  return (
    <tr>
      <td>{usuario.name}</td>
      <td>
        <a href={`mailto:${usuario.email}`}>{usuario.email}</a>
      </td>
      <td>{usuario.address.city}</td>
      <td>{usuario.company.name}</td>
    </tr>
  );
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarUsuarios() {
      try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!resposta.ok) throw new Error();

        setUsuarios(await resposta.json());
      } catch {
        setErro("Não foi possível carregar os usuários.");
      } finally {
        setCarregando(false);
      }
    }

    buscarUsuarios();
  }, []);

  if (carregando) return <p>Carregando usuários...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Cidade</th>
          <th>Empresa</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <LinhaUsuario key={usuario.id} usuario={usuario} />
        ))}
      </tbody>
    </table>
  );
}