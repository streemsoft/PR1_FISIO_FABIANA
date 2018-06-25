import { SessoesComponent } from './sessoes/sessoes.component';
import { PafComponent } from './paf/paf.component';
import { PacoComponent } from './paco/paco.component';
import { PacComponent } from './pac/pac.component';
import { Routes } from '@angular/router';
import { AuthguardGuard } from './../authguard.guard';
import { PeComponent } from './pe/pe.component';
import { OrtoComponent } from './orto/orto.component';


export const ServicoRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'pac',
      component: PacComponent,
      data: {
        title: 'Avaliação de Acne e Seborreia',
        urls: [{title: 'Avaliação',url: '/pac'},{title: 'PAS'}]
      },
      canActivate: [AuthguardGuard]
    },{
      path: 'pe',
      component: PeComponent,
      data: {
        title: 'Avaliação de Estrias',
        urls: [{title: 'Avaliação',url: '/pe'},{title: 'PE'}]
      },
      canActivate: [AuthguardGuard]
    },{
      path: 'paco',
      component: PacoComponent,
      data: {
        title: 'Avaliação Corporal',
        urls: [{title: 'Avaliação',url: '/paco'},{title: 'PAC'}]
      },
      canActivate: [AuthguardGuard]
    },{
      path: 'orto',
      component: OrtoComponent,
      data: {
        title: 'Avaliação Facial',
        urls: [{title: 'Avaliação',url: '/paf'},{title: 'Facial'}]
      },
      canActivate: [AuthguardGuard]
    },{
      path: 'paf',
      component: PafComponent,
      data: {
        title: 'Avaliação Facial',
        urls: [{title: 'Avaliação',url: '/orto'},{title: 'Facial'}]
      },
      canActivate: [AuthguardGuard]
    },{
      path: 'avaliacoes',
      component: SessoesComponent,
      data: {
        title: 'Avaliações',
        urls: [{title: 'Avaliação',url: '/avaliacoes'},{title: 'Lista'}]
      },
      canActivate: [AuthguardGuard]
    }
    ]
  }
];
