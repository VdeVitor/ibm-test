import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';
import { AppBar,
        Avatar,
        Button,
        IconButton,
        List,
        ListItem,
        ListItemAvatar,
        ListItemSecondaryAction,
        ListItemText,
        Modal,
        Toolbar,
        Typography } from '@material-ui/core';
import axios from 'axios';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Users(){
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState();
  const [openError, setOpenError] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [idUser, setIdUser] = useState();
  let pagina = 1;
  let idUsuario = '';

  useEffect(() => {
    getUsers();
  }, [])

  const nextPage = () => {
    pagina = pagina + 1;
    const url = `/users?page=${pagina}`;
    getUsers();
    history.push(url);
  }

  const previousPage = () => {
    pagina = pagina - 1;
    const url = `/users?page=${pagina}`;
    getUsers();
    history.push(url);
  }

  async function getUsers(){
    axios.get(`https://reqres.in/api/users?page=${pagina}`).then((res) => {
      console.log(res);
      setUser(res.data.data);
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  const handleClose = () => {
    setOpen(false);
    setOpenModal(false);
    setOpenError(false);
  }

  const handleDelete = (id) => {
    setIdUser(id);
    idUsuario = id;
    setOpenModal(true);
    console.log(idUsuario);
  }

  async function deleteUser() {
    axios.delete(`https://reqres.in/api/users/${idUsuario}`).then((res) => {
      console.log(res)
      setOpen(true);
      setOpenModal(false);
    }).catch((err) => {
      setOpenError(true);
    }).finally(() => {
      setOpenError(false);
      setOpen(false);
    })
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Você deseja excluir este usuário?</h2>
      <div style={{}}>
      <Button onClick={() => setOpenModal(false)} style={{backgroundColor: '#f24b4b', color: '#fff', marginRight: '2rem', marginLeft: '7rem'}}>Não</Button>
      <Button onClick={deleteUser} style={{backgroundColor: '#2dc653', color: '#fff',}}>Sim</Button>
      </div>
    </div>
  );

  return(
    <div className="bg-container">
        <div>
        <AppBar position="static">
          <Toolbar className="toolbar">
            <Typography variant="h6" className="appBar">
              Sistema Teste
            </Typography>
            <Button onClick={() => history.push('/')} color="inherit">Sign out</Button>
          </Toolbar>
        </AppBar>
        <div className="background">
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert severity="success" onClose={handleClose}>
                Usuário alterado com sucesso!
              </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
              <Alert severity="error" onClose={handleClose}>
                Parece que algo deu errado!
              </Alert>
            </Snackbar>
          <span className="texto"><strong>LIST OF USERS</strong></span>
        <List className="lista">
          { user ? user.map((usr) => {
            return (
              <ListItem key={usr.id}>
                <IconButton value={usr.id} onClick={() => handleDelete(usr.id)} edge="start" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
              <ListItemAvatar>
              <Avatar className="avatar" alt="user" src={usr.avatar} />
              </ListItemAvatar>
              <ListItemText primary={usr.first_name} secondary={usr.email} />
              <ListItemSecondaryAction>
                    <IconButton onClick={() => history.push(`/user/${usr.id}`)} edge="end" aria-label="delete">
                      <ChevronRightIcon />
                    </IconButton>

                  </ListItemSecondaryAction>
            </ListItem>)
          }) : null}
        </List>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
      </Modal>
        <div className="botoes">
          <Button onClick={previousPage} style={{backgroundColor: '#b278d3', color: '#fff', marginRight: '1rem', marginTop: '2rem'}}>Previous Page</Button>
          <Button onClick={nextPage} style={{backgroundColor: '#b278d3', color: '#fff', marginTop: '2rem'}}>Next Page</Button>
        </div>
        </div>
      </div>
    </div>
  );
}