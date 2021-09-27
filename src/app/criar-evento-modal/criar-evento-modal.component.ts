import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventInterface } from '../interfaces/EventInterface';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-criar-evento-modal',
  templateUrl: './criar-evento-modal.component.html',
  styleUrls: ['./criar-evento-modal.component.css']
})
export class CriarEventoModalComponent implements OnInit {

  eventInfo: EventInterface = {
    eventId: undefined,
    title: '',
    description: '',
    date: '',
    startTime: '',
    finishTime: ''

  }

  constructor(
    private dialogRef: MatDialogRef<CriarEventoModalComponent>,
    private authService: AuthService,
    @Inject (MAT_DIALOG_DATA) public data: ({date: string})
    ) { }

  ngOnInit(): void {
  }

cancel(): void {
  this.dialogRef.close()
}

// função que pega os dados colocados pelo usuário, e envia pro servidor, através do authService
create(): void {
  this.eventInfo.date = this.data.date

  this.authService.createEvent(this.eventInfo).subscribe()
  this.dialogRef.close()
}


}
