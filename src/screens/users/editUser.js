import { AppBar, Avatar, Button, Card, CardContent, CircularProgress, IconButton, TextField, Toolbar, Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './styles.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditUser(){
  const [user, setUser] = useState({});
  const [first_name, setFirst_name] = useState();
  const [last_name, setLast_name] = useState();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  let code = window.location.pathname.split('/')[2]
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://reqres.in/api/users/${code}`)
      .then((res) => {
        setUser(res.data.data);
        setFirst_name(res.data.data.first_name)
        setLast_name(res.data.data.last_name)
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      })


  }, [code])

  const handleClose = () => {
    setOpen(false);
  }

  async function editActualUser(){
    axios.put(`https://reqres.in/api/users/${code}`, {first_name, last_name})
      .then((res) => {
        console.log(res);
        setOpen(true);
      }).catch((err) => {
        console.log(err)
      })
  }



  return(
    <div className="bg-container">
      <div>
      <AppBar position="static">
          <Toolbar className="toolbar">
            <Typography variant="h6" className="appBar">
              <IconButton onClick={() => history.push('/users')} edge="start" aria-label="delete">
                <ChevronLeftIcon style={{color: '#fff'}} />
              </IconButton>
            </Typography>
            <Button color="inherit">Sign out</Button>
          </Toolbar>
        </AppBar>
        {loading ? <div className="background"><CircularProgress /></div> :
        <div className="background">
          <Card>
            <CardContent>
              <Avatar className="avatar" alt="user" src={user.avatar} />
            </CardContent>
            <CardContent className="row">
            <TextField
                label="Nome"
                type="text"
                variant="outlined"
                value={first_name || ''}
                onChange={e => setFirst_name(e.target.value)}  />

            </CardContent>
            <CardContent className="row">
            <TextField
                label="Sobrenome"
                type="text"
                variant="outlined"
                value={last_name || ''}
                onChange={e => setLast_name(e.target.value)}  />
            </CardContent>
            <CardContent className="row">
            <TextField
                label="Email"
                type="text"
                variant="outlined"
                disabled
                value={user.email || ''}
                />
            </CardContent>
            <CardContent className="botoes">
            <Button variant="contained" onClick={editActualUser} style={{backgroundColor: '#b278d3', color: '#fff', }}>
              Alterar
            </Button>
            </CardContent>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert severity="success" onClose={handleClose}>
                Usuário alterado com sucesso!
              </Alert>
            </Snackbar>
          </Card>
        </div>
        }
      </div>
    </div>
  );
}