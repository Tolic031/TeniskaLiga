import { useEffect, useState } from "react";
import {  Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/NatjecateljService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function NatjecateljiPromjeni(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [natjecatelj, setNatjecatelj] = useState({});
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

   async function dohvatiNatjecatelje(){
        showLoading();
        const o = await Service.getById('Natjecatelj', routeParams.id);
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            navigate(RoutesNames.NATJECATELJ_PREGLED)
            return;
        }
        setNatjecatelj(odgovor.podaci);
   }

   useEffect(()=>{
    dohvatiNatjecatelje();
    // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

   async function promjeniNatjecatelje(natjecatelj){
    showLoading();
    const odgovor = await Service.promjeni('Natjecatelj',routeParams.id,natjecatelj);
    hideLoading();
    if (odgovor.ok){
        navigate(RoutesNames.NATJECATELJ_PREGLED)
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