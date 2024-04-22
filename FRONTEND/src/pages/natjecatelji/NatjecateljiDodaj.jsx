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
        //alert('Dodajem natjecatelja');

        const podaci = new FormData(e.target);

        const natjecatelj = {
            ime: podaci.get('ime'),  // 'naziv' je name atribut u Form.Control
            prezime: podaci.get('prezime'), 
            broj_Telefona: podaci.get('broj_Telefona'),
            email: podaci.get('email'),  
            clan: podaci.get('clan')=='on' ? true : false            
        };

        console.log(natjecatelj);
        dodaj(natjecatelj);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" />
                </Form.Group>

                <Form.Group controlId="broj_Telefona">
                    <Form.Label>Broj Telefona</Form.Label>
                    <Form.Control type="text" name="broj_Telefona" />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" />
                </Form.Group>

                <Form.Group controlId="clan">
                    <Form.Check label="Član" name="clan" />
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