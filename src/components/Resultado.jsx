import useCotizador from "../hooks/useCotizador"
import { MARCAS,PLANES } from "../constants";
import { useCallback,useMemo,useRef } from "react";

const Resultado = () => {

    const { cotizadorResultado,datos } = useCotizador();

    const {marca,plan,year} = datos;
    const yearRef = useRef(year)

    const [ nombreMarca ] = useMemo(()=>MARCAS.filter(m => m.id === Number(marca))
    ,[cotizadorResultado] )

    const [ nombrePlan ] = useMemo( ()=>PLANES.filter(p => p.id === Number(plan))
    ,[cotizadorResultado])




    

    if(cotizadorResultado === 0){
        return null;
    }

    return (
        <div className="bg-gray-100 text-center mt-5 p-5 shadow">
            <h2 className="text-gray-600 font-black text-3xl">
                Resumen
            </h2>
            <p className=" my-2"><span className="text-gray-600 font-bold">Marca: </span>{nombreMarca.nombre}</p>
            <p className=" my-2"><span className="text-gray-600 font-bold">Año del Auto: </span>{yearRef.current}</p>
            <p className=" my-2"><span className="text-gray-600 font-bold">Plan: </span>{nombrePlan.nombre}</p>

            <p className=" my-2"><span className=" font-bold text-gray-600 text-3xl">Total Cotización: </span>{cotizadorResultado}</p>
            
        </div>
    )
}

export default Resultado