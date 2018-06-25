import { KeypacGuard } from './../keypac.guard';
import { ConsultaComponent } from './consulta/consulta.component';
import { Routes } from '@angular/router';
import { AuthguardGuard } from './../authguard.guard';
import { CadastroComponent } from './cadastro/cadastro.component';


export const AgendamentoRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'consulta',
      component: ConsultaComponent,
      data: {
        title: 'Agendamento de Consultas',
        urls: [{title: 'Agendamento',url: '/consulta'},{title: 'Consulta'}]
      },
      canActivate: [AuthguardGuard]
    },{
      path: 'cadastro',
      component: CadastroComponent,
      data: {
        title: 'Agendamento de Consultas',
        urls: [{title: 'Agendamento',url: '/cadastro'},{title: 'Cadastro'}]
      },
      canActivate: [KeypacGuard]
    }
    ]
  }
];
