import { useEffect, useState } from "react";
import {  Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/SezonaService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";

export default function SezonePromjeni(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [sezona, setSezone] = useState({});
    const { prikaziError } = useError();

   async function dohvatiSezone(){
        const o = await Service.getById('Sezona', routeParams.id);
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            navigate(RoutesNames.SEZONA_PREGLED)
            return;
        }
        setNatjecatelj(odgovor.podaci);
   }

   useEffect(()=>{
    dohvatiSezone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

   async function promjeniSezone(sezona){
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
        promjeniNatjecatelje({
            Ime: podaci.get('Ime'),  // 'naziv' je name atribut u Form.Control
            Prezime: podaci.get('Prezime'), 
            broj_Telefona: podaci.get('broj_Telefona'),
            Email: podaci.get('Email'),  
            Clan: podaci.get('clan')=='on' ? true : false             
        });
    }

    
    return (

        <Container>
            <Form onSubmit={handleSubmit}>
                    <InputText atribut='Ime' vrijednost={natjecatelj.Ime} />
                    <InputText atribut='Prezime' vrijednost={natjecatelj.Prezime} />
                    <InputText atribut='broj_Telefona' vrijednost={natjecatelj.broj_Telefona} />
                    <InputText atribut='Email' vrijednost={natjecatelj.Email} />
                    <InputCheckbox atribut='Član' vrijednost={natjecatelj.Clan} />
                    <Akcije odustani={RoutesNames.SMJER_PREGLED} akcija='Promjeni Natjecatelja' />
            </Form>
        </Container>

    );
}