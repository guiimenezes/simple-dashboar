import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuAdmin from '../../../components/menu-admin'
import Footer from '../../../components/footer-admin'
import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import api from '../../../services/api'

import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    // padding: theme.spacing(2),
    padding: '15px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    width: "100%"
  }
}));

export default function UsuariosEditar() {
  const classes = useStyles();

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState('')

  const { idUsuario } = useParams()

  useEffect(() => {
    async function getUsuario() {
      const response = await api.get('/api/usuarios/details/' + idUsuario)
      if (response.status === 200) {
        const { nome_usuario, email_usuario, senha_usuario, tipo_usuario } = response.data
        setNome(nome_usuario)
        setEmail(email_usuario)
        setTipo(tipo_usuario)
        setSenha(senha_usuario)
      }
    }
    getUsuario()
  }, [])

  async function handleSubmit() {
    const data = {
      nome_usuario: nome,
      email_usuario: email,
      senha_usuario: senha,
      tipo_usuario: tipo,
      _id: idUsuario
    }

    if (nome !== '' && email !== '' && senha !== '' && tipo !== '') {
      const response = await api.put('/api/usuarios', data)
      console.log(response.status)
      if (response.status === 200) {
        window.location.href = '/admin/usuarios'
      } else {
        alert('Erro ao atualizar Usuário')
      }
    } else {
      alert('Todos os campos devem ser preenchidos')

    }

  }

  return (
    <div className={classes.root}>

      {/* MENU DRAWER */}
      <MenuAdmin title={'USUÁRIOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Atualização de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome Completo"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={e => { setNome(e.target.value); console.log(e.target.value) }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="E-mail"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="LabelTipo">Tipo</InputLabel>
                      <Select
                        labelId="LabelTipo"
                        id="tipo"
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Gerente</MenuItem>
                        <MenuItem value={3}>Funcionário</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="senha"
                      name="senha"
                      label="Senha"
                      type="password"
                      fullWidth
                      autoComplete="senha"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item sx={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}