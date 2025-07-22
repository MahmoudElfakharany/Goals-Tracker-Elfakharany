import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Goal } from '../../../core/models/goal.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-public-card-modal',
  templateUrl: './public-card-modal.component.html',
  styleUrls: ['./public-card-modal.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, DatePipe],
})
export class PublicCardModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public goal: Goal) {
    console.log(goal)
  }
}
