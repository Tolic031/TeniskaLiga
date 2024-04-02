import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import NatjecateljService from "../../services/NatjecateljService";


export default function NatjecateljiDodaj(){
    const navigate = useNavigate();

    async function dodaj(natjecatelj){
        const odgovor = await NatjecateljService.post(natjecatelj);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.NATJECATELJ_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem smjer');

        const podaci = new FormData(e.target);

        const natjecatelj = {
            ime: podaci.get('Ime'),  // 'naziv' je name atribut u Form.Control
            prezime: podaci.get('Prezime'), 
            broj_Telefona: podaci.get('broj_Telefona'),
            email: podaci.get('Email'),  
            clan: podaci.get('Clan')=='on' ? true : false            
        };

        console.log(natjecatelj);
        dodaj(natjecatelj);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="Ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="Ime" required />
                </Form.Group>

                <Form.Group controlId="Prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="Prezime" />
                </Form.Group>

                <Form.Group controlId="Broj Telefona">
                    <Form.Label>Broj_Telefona</Form.Label>
                    <Form.Control type="text" name="broj_Telefona" />
                </Form.Group>

                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="Email" />
                </Form.Group>

                <Form.Group controlId="Član">
                    <Form.Check label="Član" name="Clan" />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}>
                        <Link className="btn btn-danger siroko" to={RoutesNames.NATJECATELJ_PREGLED}>
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={1} xxl={10}>
                        <Button className="siroko" variant="primary" type="submit">
                            Dodaj
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}