import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import NatjecateljService from '../../services/NatjecateljService';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {RoutesNames} from '../../constants'


export default function Natjecatelji(){
    const [natjecatelji, setNatjecatelji] = useState();
    const navigate = useNavigate();


    async function dohvatiNatjecatelje(){
        await NatjecateljService.get()
        .then((odg)=>{
            setNatjecatelji(odg);
        })
        .catch((e)=>{
            console.log(e);
        });
    }

    useEffect(()=>{
        dohvatiNatjecatelje();
    },[]);


    async function obrisiAsync(id){
        const odgovor = await NatjecateljService._delete(id);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        dohvatiNatjecatelje();
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
                            <th>Broj_Telefona</th>
                            <th>Email</th>
                            <th>Clan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {natjecatelji && natjecatelji.map((natjecatelj,index)=>(
                            <tr key={index}>
                                <td>{natjecatelj.Ime}</td>
                                <td>{natjecatelj.Prezime}</td>
                                <td>{natjecatelj.Broj_Telefona}</td>
                                <td>{natjecatelj.Email}</td>
                                <td>{natjecatelj.Clan}</td>
                             
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