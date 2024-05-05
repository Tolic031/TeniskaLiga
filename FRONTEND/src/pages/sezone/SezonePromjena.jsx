import { useEffect, useState } from "react";
import {  Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/SezonaService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";
import moment from "moment";


export default function SezonePromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [sezona, setSezone] = useState({});
    const { prikaziError } = useError();


   async function SezonePromjena(){

        const odgovor = await Service.getById('Sezona',routeParams.id);

        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            navigate(RoutesNames.SEZONA_PREGLED)
            return;
        }
        setSezone(odgovor.podaci);
   }
   async function dohvatiSezone() {
    const odgovor = await Service.get("Sezona");
    if (!odgovor.ok) {
      prikaziError(odgovor.podaci);
      return;
    }
    
    setSezone(odgovor.podaci);
  }

   useEffect(()=>{
    dohvatiSezone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

   async function SezonePromjena(sezona){
    const odgovor = await Service.promjeni('Sezona',routeParams.id,sezona);
    if (odgovor.ok){
        navigate(RoutesNames.SEZONA_PREGLED)
        return;
    }
    prikaziError(odgovor.podaci);
}


    function handleSubmit(e){ 
        e.preventDefault();
        const podaci = new FormData(e.target);
        const datum = moment.utc(podaci.get('datum') + ' ' + podaci.get('vrijeme'));
        SezonePromjena({
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
                <Akcije odustani={RoutesNames.SEZONA_PREGLED} akcija='Promijeni Sezonu' />
            </Form>
        </Container>

    );
}