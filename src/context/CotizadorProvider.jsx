import { createContext, useState } from "react";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan,formatearDinero } from "../helpers";


const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [error, setError] = useState('');
    const [cotizadorResultado, setCotizadorResultado] = useState(0);
    const [cargando, setCargando ] = useState(false);

    const handleChangeDatos = e => {

        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }


    const cotizarSeguro = () => {
        //base de la cuenta
        let resultado = 2000
        //diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year);
        //por cada año se resta 3%
        resultado -= ((diferencia * 3) * resultado) / 100;
        resultado *= calcularMarca(datos.marca)
        resultado *= calcularPlan(datos.plan);


        setCargando(true)

        setTimeout(() => {
            setCotizadorResultado(formatearDinero(resultado));
            setCargando(false)
        }, 3000);

        


    }

    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                cotizadorResultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}
export default CotizadorContext;