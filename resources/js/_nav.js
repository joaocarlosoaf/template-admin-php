import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilSpeedometer,
  cilStar,
  cilList,
  cilNoteAdd,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { IconUsers } from './components/Icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Formulário de Inscrição',
  },
  {
    component: CNavItem,
    name: 'Listar Todos',
    to: '/formularios_inscricao/listar',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Cadastrar Novo',
    to: '/novo-formulario',
    icon: <CIcon icon={cilNoteAdd} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Sistema',
  },
  {
    component: CNavGroup,
    name: 'Usuários',
    icon: IconUsers,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Cadastrar',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },

    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
