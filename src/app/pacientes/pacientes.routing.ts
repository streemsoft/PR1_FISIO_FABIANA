import { BuscaFinanceiroComponent } from './busca-financeiro/busca-financeiro.component';
import { BuscaAtendimentoComponent } from './busca-atendimento/busca-atendimento.component';
import { BuscaAgendComponent } from './busca-agend/busca-agend.component';
import { KeypacGuard } from './../keypac.guard';
import { BuscaComponent } from './busca/busca.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { Routes } from '@angular/router';

import { AuthguardGuard } from './../authguard.guard';
import { ManutencaoComponent } from './manutencao/manutencao.component';


export const PacientesRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'cadastro',
      component: CadastroComponent,
      data: {
        title: 'Cadastro de Paciente',
        urls: [{title: 'Paciente',url: '/cadastro'},{title: 'Cadastro'}]
      },
      canActivate: [AuthguardGuard]
    },
    {
        path: 'manutencao',
        component: ManutencaoComponent,
        data: {
          title: 'Manutenção de Cadastro',
          urls: [{title: 'Paciente',url: '/manutencao'},{title: 'Manutenção'}]
        },
        canActivate: [KeypacGuard]
      },
      {
        path: 'busca',
        component: BuscaComponent,
        data: {
          title: 'Buscar Paciente',
          urls: [{title: 'Paciente',url: '/busca'},{title: 'Busca'}]
        },
        canActivate: [AuthguardGuard]
      },
      {
        path: 'busca-agend',
        component: BuscaAgendComponent,
        data: {
          title: 'Buscar Paciente',
          urls: [{title: 'Paciente',url: '/busca-agend'},{title: 'Busca'}]
        },
        canActivate: [AuthguardGuard]
      },
      {
        path: 'busca-atendimento',
        component: BuscaAtendimentoComponent,
        data: {
          title: 'Buscar Paciente',
          urls: [{title: 'Paciente',url: '/busca-atendimento'},{title: 'Busca'}]
        },
        canActivate: [AuthguardGuard]
      },
      {
        path: 'busca-financeiro',
        component: BuscaFinanceiroComponent,
        data: {
          title: 'Buscar Paciente',
          urls: [{title: 'Paciente',url: '/busca-financeiro'},{title: 'Busca'}]
        },
        canActivate: [AuthguardGuard]
      }
    ]
  }
];
