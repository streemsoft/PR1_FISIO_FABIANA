import { FaturamentoComponent } from './faturamento/faturamento.component';
import { BoletosComponent } from './boletos/boletos.component';
import { Routes } from '@angular/router';

import { AuthguardGuard } from './../authguard.guard';
import { EstoqueComponent } from './estoque/estoque.component';
import { VendasComponent } from './vendas/vendas.component';


export const FinanceiroRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'boletos',
      component: BoletosComponent,
      data: {
        title: 'Boletos',
        urls: [{title: 'Financeiro',url: '/boletos'},{title: 'Boletos'}]
      },
      canActivate: [AuthguardGuard]
    },{
      path: 'faturamento',
      component: FaturamentoComponent,
      data: {
        title: 'Faturamento',
        urls: [{title: 'Financeiro',url: '/faturamento'},{title: 'Faturamento'}]
      },
      canActivate: [AuthguardGuard]
    },{
      path: 'estoque',
      component: EstoqueComponent,
      data: {
        title: 'Manutenção de Estoque',
        urls: [{title: 'Estoque',url: '/estoque'},{title: 'Manutenção'}]
      },
      canActivate: [AuthguardGuard]
    },{
      path: 'vendas',
      component: VendasComponent,
      data: {
        title: 'Venda de Produtos',
        urls: [{title: 'Estoque',url: '/vendas'},{title: 'Venda'}]
      },
      canActivate: [AuthguardGuard]
    }
    ]
  }
];
