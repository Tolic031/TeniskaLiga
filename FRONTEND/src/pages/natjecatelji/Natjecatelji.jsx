import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import NatjecateljService from '../../services/NatjecateljService';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {RoutesNames} from '../../constants'


export default function Natjecatelji(){
    const [natjecatelji, setNatjecatelji] = useState([]);
    const navigate = useNavigate();


    async function dohvatiNatjecatelje(){
        await NatjecateljService.get()
        .then((odg)=>{
            setNatjecatelji(odg.poruka);
        })
        .catch((e)=>{
            console.log(e);
        });
    }

    useEffect(()=>{
        dohvatiNatjecatelje();
    },[]);

    function formatirajClan(c){
        if (c==null){
        return 'Nije definirano';
        }
        if (c){
           return 'DA';
        }
        return 'NE';  
    }


    async function obrisiAsync(id){
        const odgovor = await NatjecateljService._delete(id);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        dohvatiNatjecatelje();
    }

    function Clan(Natjecatelji){
        if (Natjecatelji.Clan==null) return 'gray';
        if(Natjecatelji.Clan) return 'green';
        return 'red';
    }

    function ClanTitle(Natjecatelji){
        if (Natjecatelji.Clan==null) return 'Nije definirano';
        if(Natjecatelji.Clan) return 'Verificiran';
        return 'NIJE verificiran';
    }

    function obrisi(id){
        obrisiAsync(id);
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
                                <td>
                                    {formatirajClan(natjecatelj.clan)}
                                    {/* {natjecatelj.clan == null
                                    ? 'Nije definirano'
                                    : natjecatelj.clan ? 'DA' : 'NE'}
                                    */}
                                    </td>
                             
                                <td>
                                    <Button 
                                    onClick={()=>obrisi(natjecatelj.id)}
                                    variant='danger'
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