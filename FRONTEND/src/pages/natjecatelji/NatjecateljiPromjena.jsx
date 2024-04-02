import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import NatjecateljService from "../../services/NatjecateljService";
import { useEffect, useState } from "react";


export default function NatjecateljiPromjena(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [natjecatelj, setNatjecatelji] = useState({});

   async function dohvatiNatjecatelje(){
        const o = await NatjecateljService.getById(routeParams.id);
        if(o.greska){
            console.log(o.poruka);
            alert('pogledaj konzolu');
            return;
        }
        setNatjecatelj(o.poruka);
   }

   async function promjeni(natjecatelj){
    const odgovor = await NatjecateljService.put(routeParams.id,natjecatelj);
    if (odgovor.greska){
        console.log(odgovor.poruka);
        alert('Pogledaj konzolu');
        return;
    }
    navigate(RoutesNames.NATJECATELJ_PREGLED);
}

   useEffect(()=>{
    dohvatiNatjecatelje();
   },[]);

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem smjer');

        const podaci = new FormData(e.target);

        const natjecatelj = {
            Ime: podaci.get('Ime'),  // 'naziv' je name atribut u Form.Control
            Prezime: podaci.get('Prezime'), 
            Broj_Telefona: podaci.get('Broj telefona'),
            Email: podaci.get('Email'),  
            Clan: podaci.get('Član')=='on' ? true : false             
        };
        //console.log(routeParams.sifra);
        //console.log(smjer);
        promjeni(natjecatelj);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="Ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="Ime" 
                    defaultValue={natjecatelj.Ime}
                    required />
                </Form.Group>

                <Form.Group controlId="Prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="Prezime"
                    defaultValue={natjecatelj.Prezime}
                     />
                </Form.Group>


                <Form.Group controlId="Broj Telefona">
                    <Form.Label>Broj_Telefona</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="Broj Telefona" 
                    defaultValue={natjecatelj.Broj_Telefona}
                    required />
                </Form.Group>

                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="Email" 
                    defaultValue={natjecatelj.Email}
                    required />
                </Form.Group>

                <Form.Group controlId="Član">
                    <Form.Check label="Član" name="Član" defaultChecked={natjecatelj.Clan   } />
                </Form.Group>

                <hr />
                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.NATJECATELJ_PREGLED}>
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button className="siroko" variant="primary" type="submit">
                            Promjeni
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}