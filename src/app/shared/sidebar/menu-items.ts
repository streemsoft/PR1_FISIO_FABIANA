import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    
    {
        path: '', title: 'Dashboard', icon: 'mdi mdi-gauge', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/dashboard/dashboard1', title: 'Home', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
        ]
    },
    {
        path: '', title: 'Paciente', icon: 'mdi mdi-apps', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/pacientes/cadastro', title: 'Cadastro', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/pacientes/busca', title: 'Manutenção', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/pacientes/busca-atendimento', title: 'Consultar', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Agendamento', icon: 'mdi mdi-bullseye', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/pacientes/busca-agend', title: 'Novo', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/agendamento/consulta', title: 'Consultar', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },            
        ]
    },
    {
        path: '', title: 'Produtos', icon: 'mdi mdi-dropbox', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/pacientes/busca-financeiro', title: 'Vendas', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/financeiro/estoque', title: 'Estoque', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }            
        ]
    },
    {
        path: '', title: 'Financeiro', icon: 'mdi mdi-apps', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/financeiro/faturamento', title: 'Faturamento', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/financeiro/boletos', title: 'Boletos', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }            
        ]
    }      
];

