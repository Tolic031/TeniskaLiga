import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/SezonaService";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";
import { dodaj } from "../../services/HttpService";

export default function SezoneDodaj(){
    const navigate = useNavigate();
    const {prikaziError} = useError();

    async function dodajSezone(sezona){
        const odgovor = await Service.dodaj('Sezona', sezona);
        if (odgovor.ok){
            navigate(RoutesNames.SEZONA_PREGLED);
            return;
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e){ 
        e.preventDefault();

        const podaci = new FormData(e.target);
        
        if(podaci.get('datum')=='' && podaci.get('vrijeme')!=''){
            alert('Ako postavljate vrijeme morate i datum');
            return;
          }
          let datumpocetka=null;
          if(podaci.get('datum')!=''){
            if (podaci.get('vrijeme')!=''){
              datumpocetka = moment.utc(podaci.get('datum') + ' ' + podaci.get('vrijeme'));
            }else{
              datumpocetka = moment.utc(podaci.get('datum'));
            }
            
          }



        dodaj({
            pocetak_sezone: datumpocetka,  
            kraj_sezone: datumpocetka, 
            cijena: parseFloat(podaci.get('cijena')),

        });
    }

    return (

        <Container>
            <Form onSubmit={handleSubmit}>
                <InputText atribut='Početak sezone' vrijednost='' />
                <InputText atribut='Kraj sezone' vrijednost='' />
                <InputText atribut='Cijena' vrijednost='' />
                <Akcije odustani={RoutesNames.SEZONA_PREGLED} akcija='Dodaj Sezonu' />

                </Form>
        </Container>

    );

}


