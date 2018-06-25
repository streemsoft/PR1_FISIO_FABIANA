import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const routes: Routes = [
{
    path: '',
    component: FullComponent,
    children: [
        { path: '', redirectTo: '/dashboard/dashboard1', pathMatch: 'full' },
        { path: 'dashboard', loadChildren: './dashboards/dashboard.module#DashboardModule' },
        { path: 'pacientes', loadChildren: './pacientes/pacientes.module#PacientesModule' },
        { path: 'agendamento', loadChildren: './agendamento/agendamento.module#AgendamentoModule' },
        { path: 'atendimento', loadChildren: './atendimento/atendimento.module#AtendimentoModule' },
        { path: 'servicos', loadChildren: './servicos/servicos.module#ServicosModule' },
        { path: 'financeiro', loadChildren: './financeiro/financeiro.module#FinanceiroModule' }
    ]
},
{
    path: '',
    component: BlankComponent,
    children: [
        {
            path: 'authentication',
            loadChildren: './authentication/authentication.module#AuthenticationModule'
        }
    ]
}, 
{
    path: '**',
    redirectTo: '404' 
}];

@NgModule({
    imports: [RouterModule.forRoot(routes), NgbModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule { }

