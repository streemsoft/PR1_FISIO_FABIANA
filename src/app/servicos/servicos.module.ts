import { ServicoFireService } from './servico-fire.service';
import { ServicoRoutes } from './servicos.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ToastModule } from 'ng2-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { PacComponent } from './pac/pac.component';
import { SessoesComponent } from './sessoes/sessoes.component';
import { PeComponent } from './pe/pe.component';
import { PacoComponent } from './paco/paco.component';
import { OrtoComponent } from './orto/orto.component';
import { PafComponent } from './paf/paf.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(ServicoRoutes),
    ToastModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  declarations: [PacComponent, SessoesComponent, PeComponent, PacoComponent, OrtoComponent, PafComponent],
  providers:[ServicoFireService]
})
export class ServicosModule { }
