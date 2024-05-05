import { useEffect, useState } from 'react';
import {  Button, Container, Table } from "react-bootstrap";
import Service from '../../services/SezonaService';
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import useError from "../../hooks/useError";
import moment from "moment";


export default function Sezone(){
    const [sezone, setSezone] = useState([]);
    const navigate = useNavigate();
    const { prikaziError } = useError();

    async function dohvatiSezone(){
        const odgovor = await Service.get('Sezona');
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setSezone(odgovor.podaci);
    }

    async function obrisiSezone(id){
        const odgovor = await Service.obrisi('Sezona',id);
        prikaziError(odgovor.podaci);
        if (odgovor.ok){
            dohvatiSezone();
        }
    }


    useEffect(()=>{
        dohvatiSezone();
    },[]);

    function formatirajDatum(datumpocetka){
        let mdp = moment.utc(datumpocetka);
        if(mdp.hour()==0 && mdp.minutes()==0){
            return mdp.format('DD. MM. YYYY.');
        }
        return mdp.format('DD. MM. YYYY. HH:mm');
        
        }

    




    return(
        <>
           <Container>
            <Link to={RoutesNames.SEZONA_NOVI}> Dodaj </Link>
            <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Početak Sezone</th>
                            <th>Kraj Sezone</th>
                            <th>Cijena</th>

                        </tr>
                    </thead>
                    <tbody>
                        {sezone && sezone.map((sezona,index)=>(
                            <tr key={index}>
                                <td>{sezona.pocetakSezone}</td>
                                <td>{sezona.krajSezone}</td>
                                <td>{sezona.cijena}</td>

                                  <td className='sredina'>
                                    <Button 
                                    variant='danger'
                                    onClick={()=>obrisiSezone(sezona.id)}
                                    
                                    >
                                        Obriši
                                    </Button>
                                        {/* kosi jednostruki navodnici `` su AltGR (desni) + 7 */}
                                    <Button 
                                    onClick={()=>{navigate(`/Sezone/${sezone.id}`)}} 
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