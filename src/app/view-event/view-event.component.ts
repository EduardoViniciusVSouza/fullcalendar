import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {
  editMode: boolean

  constructor(
    private dialog: MatDialogRef<ViewEventComponent>,
    private authService: AuthService,
    // decorador para injetar os dados do evento escolhido no dialog
    @Inject(MAT_DIALOG_DATA) public data: { 
      eventId: number,
      title: string,
      description: string,
      date: string,
      startTime: string,
      finishTime: string
    }) { }

  ngOnInit(): void {
    this.editMode = false
  }

  // função para toggle do modo de edição
  changeEditMode(option: boolean) {
    this.editMode = option
  }

  // função para remover o evento, usando o authService, envia o eventId injetado
  removeEvent() {
    this.authService.removeEvent(this.data.eventId).subscribe()
    this.dialog.close()
  }

  // função para atualizar o evento, usando o authService, envia o dados injetados e que foram editados
  updateEvent() {
    this.authService.updateEvent(this.data).subscribe()
    this.dialog.close()
  }
  
  closeDialog() {
    this.dialog.close()
  }

}
