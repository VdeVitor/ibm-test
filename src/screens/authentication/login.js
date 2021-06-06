import './styles.css';
import logo from '../../assets/ufo.png';
import { Button, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';


export default function Login(){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let history = useHistory();

  useEffect(() => {
    setEmail('');
    setPassword('');

  }, [])

  async function handleSubmit(){
    console.log('email: ', email);
    console.log('password: ', password);

    axios.post('https://reqres.in/api/email', {email, password})
    .then((res) => {
      if(res.status === 201){
        history.push('/users');
      }
    })
  }

  return (
    <div className="bg-container">
      <div className="background">
        <div className="modal-email">
          <div className="modal-top">
          <img alt="logo" width="200" src={logo} />
          </div>
          <div className="row">
              <span className="texto" style={{marginLeft: '6rem', fontSize: '24px'}}>Faça seu login</span>
          </div>
          <div className="formulario">
            <div className="row" style={{ marginBottom: '1rem'}}>
            <TextField
                label="Email"
                type="text"
                variant="outlined"
                value={email || ''}
                onChange={e => setEmail(e.target.value)}  />
            </div>
            <div className="row">
            <TextField id="filled-password-input"
                label="Senha"
                type="password"
                variant="outlined"
                value={password || ''}
                onChange={e => setPassword(e.target.value)}  />
            </div>
            <div className="botao">
            <Button variant="contained" onClick={handleSubmit} style={{backgroundColor: '#b278d3', color: '#fff'}}>
              Autenticar
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}