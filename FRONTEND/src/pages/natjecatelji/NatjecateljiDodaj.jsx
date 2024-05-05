import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/NatjecateljService";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function NatjecateljiDodaj(){
    const navigate = useNavigate();
    const {prikaziError} = useError();
    const { showLoading, hideLoading } = useLoading();


    async function dodajNatjecatelja(natjecatelj){
        showLoading();
        const odgovor = await Service.dodaj('Natjecatelj', natjecatelj);
        hideLoading();
        if (odgovor.ok){
            navigate(RoutesNames.NATJECATELJ_PREGLED);
            return;
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e){ 
        e.preventDefault();
        const podaci = new FormData(e.target);
        dodajNatjecatelja({
            ime: podaci.get('ime'),  
            prezime: podaci.get('prezime'), 
            broj_Telefona: podaci.get('broj_Telefona'),
            email: podaci.get('email'),  
            clan: podaci.get('clan')=='on' ? true : false 
        });
    }

    return (

        <Container>
            <Form onSubmit={handleSubmit}>
                <InputText atribut='ime' vrijednost='' />
                <InputText atribut='prezime' vrijednost='' />
                <InputText atribut='broj_Telefona' vrijednost='' />
                <InputText atribut='email' vrijednost='' />
                <InputCheckbox atribut='Clan' vrijednost={false} />
                <Akcije odustani={RoutesNames.NATJECATELJ_PREGLED} akcija='Dodaj natjecatelja' />

                </Form>
        </Container>

    );

}


