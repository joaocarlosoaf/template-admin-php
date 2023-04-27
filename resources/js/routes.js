import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const NovoFormulario = React.lazy(() => import('./views/formularios/novo-formulario/NovoFormulario'))
const NovoProcessoSeletivo = React.lazy(() => import('./views/processos/novo-processo/NovoProcessoSeletivo'))

const routes = [
  //{ path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/novo-formulario', name: 'Novo Formulario', element: NovoFormulario },
  { path: '/novo-processo-seletivo', name: 'Novo Processo Seletivo', element: NovoProcessoSeletivo },
]

export default routes
