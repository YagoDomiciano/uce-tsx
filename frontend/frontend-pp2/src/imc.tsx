import {useState} from "react";
const campo = "border rounded px-4 py-2"
function IMC(){
    const  [peso, setPeso] = useState(0);
    const  [altura,setAltura] = useState(0);
    const   [imc, setImc] = useState<number | null>(null);
    
    function calcularImc(){
        if(peso >= 0 && altura > 0){
            const resultado = peso / (altura * altura)
            setImc(resultado)
        }
    }

    return(
        <div>
            <input type="number" placeholder="Peso (Kg)" className={campo} value={peso}
            onChange={(e) => setPeso(parseFloat(e.target.value))}/>
            <input type="number" placeholder="Altura (M)" className={campo} value={altura}
            onChange={(e) => setAltura(parseFloat(e.target.value))}/>
            <button onClick={calcularImc}>Calcular IMC</button>

            {imc != null && (
                <p>Seu IMC é: {imc.toFixed(2)}</p>
            )

            }

        </div>
    )
}
export default IMC