import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Bell as BellIcon } from '../icons/bell';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {zerarNotificacoes} from '.././store/tarefas-reducer';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));


  const DashboardNavbar = (props) => {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState('Sair');

  const logout = () => {
    localStorage.removeItem('userLogged');
    router.push('/login');
     props.zerarNotificacoes();
  }

  const { onSidebarOpen, ...other } = props;

  useEffect(() => {
    setLoggedUser(`${localStorage.getItem('userLogged')} | Sair`);

  }, [] );

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Notificações">
            <IconButton sx={{ ml: 1 }}>
              <Badge
                badgeContent={props.notificcacoes}
                color="primary"
              >
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title={loggedUser}>
            <IconButton sx={{ ml: 1 }} onClick={logout}>
              <ExitToAppIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};

const mapStateToProps = state => ({
  notificcacoes: state.tarefas.quantidade
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {zerarNotificacoes}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNavbar);
