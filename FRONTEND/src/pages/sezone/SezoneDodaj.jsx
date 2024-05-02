import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/SezonaService";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";
import { dodaj } from "../../services/HttpService";
import moment from "moment";

export default function SezoneDodaj(){
    const navigate = useNavigate();
    const {prikaziError} = useError();

    async function dohvatiSezone(sezona){
        const odgovor = await Service.dodaj('Sezona', sezona);
        if (odgovor.ok){
            navigate(RoutesNames.SEZONA_PREGLED);
            return;
        }
        prikaziError(odgovor.podaci);
    }

    async function SezonaDodaj(sezona){
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



          SezonaDodaj({
            pocetakSezone: podaci.get('pocetakSezone'),  
            krajSezone: podaci.get('krajSezone'),
            cijena: parseFloat(podaci.get('cijena')),

        });
    }

    return (

        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='pocetakSezone'>
                  <Form.Label>Početak</Form.Label>
                  <Form.Control
                    type='date'
                    name='pocetakSezone'
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='krajSezone'>
                  <Form.Label>Kraj</Form.Label>
                  <Form.Control
                    type='date'
                    name='krajSezone'
                  />
                </Form.Group>
                <InputText atribut='cijena' vrijednost='' />
                <Akcije odustani={RoutesNames.SEZONA_PREGLED} akcija='Dodaj Sezonu' />

                </Form>
        </Container>

    );

}


