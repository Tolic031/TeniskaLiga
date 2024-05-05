import { useEffect, useState } from 'react';
import {  Button, Container, Table } from "react-bootstrap";
import Service from '../../services/NatjecateljService';
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import useError from "../../hooks/useError";
import LoadingSpinner from './components/LoadingSpinner'


export default function Natjecatelji(){
    const [natjecatelji, setNatjecatelji] = useState([]);
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

    async function dohvatiNatjecatelje(){
        showLoading();
        const odgovor = await Service.get('Natjecatelj');
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setNatjecatelji(odgovor.podaci);
    }

    async function obrisiNatjecatelje(id){
        const odgovor = await Service.obrisi('Natjecatelj',id);
        prikaziError(odgovor.podaci);
        if (odgovor.ok){
            dohvatiNatjecatelje();
        }
    }


    useEffect(()=>{
        dohvatiNatjecatelje();
    },[]);


    


    function clan(natjecatelj){
        if (natjecatelj.clan==null) return 'gray';
        if(natjecatelj.clan) return 'green';
        return 'red';
    }

    function clanTitle(Natjecatelji){
        if (Natjecatelji.clan==null) return 'Nije definirano';
        if(Natjecatelji.clan) return 'Član';
        return 'NIJE Član';
    }


    return(
        <>
           <Container>
            <Link to={RoutesNames.NATJECATELJ_NOVI}> Dodaj </Link>
            <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Broj Telefona</th>
                            <th>Email</th>
                            <th>Član</th>
                        </tr>
                    </thead>
                    <tbody>
                        {natjecatelji && natjecatelji.map((natjecatelj,index)=>(
                            <tr key={index}>
                                <td>{natjecatelj.ime}</td>
                                <td>{natjecatelj.prezime}</td>
                                <td>{natjecatelj.broj_Telefona}</td>
                                <td>{natjecatelj.email}</td>
                                <td className="sredina">
                                <GrValidate 
                                size={30} 
                                color={clan(natjecatelj)} 
                                title={clanTitle(natjecatelj)}
                                />
                                </td>
                                  <td className='sredina'>
                                    <Button 
                                    variant='danger'
                                    onClick={()=>obrisiNatjecatelje(natjecatelj.id)}
                                    
                                    >
                                        Obriši
                                    </Button>
                                        {/* kosi jednostruki navodnici `` su AltGR (desni) + 7 */}
                                    <Button 
                                    onClick={()=>{navigate(`/natjecatelji/${natjecatelj.id}`)}} 
                                    >
                                        Promjeni
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </Table>
           </Container>
        </>
    );
}