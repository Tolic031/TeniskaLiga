import Container from 'react-bootstrap/Container';

function saznajVisinu(){
    return window.innerHeight - 100 + 'px';
}

export default function Pocetna(){

    return(
        <>
           <Container id='pozadina' style={{height: saznajVisinu()}}>
            Dobrodošli na Tenisku Ligu
           </Container>
        </>
    );
}