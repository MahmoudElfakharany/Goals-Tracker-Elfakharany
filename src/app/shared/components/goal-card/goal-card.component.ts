// goal-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Goal } from '../../../core/models/goal.model';

@Component({
  selector: 'app-goal-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, CdkDrag],
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss']
})
export class GoalCardComponent {
  @Input() goal!: Goal;
  @Input() isSubGoal = false;

  @Output() edit = new EventEmitter<Goal>();
  @Output() delete = new EventEmitter<Goal>();
  @Output() toggleVisibility = new EventEmitter<Goal>();
  @Output() nestSubGoal = new EventEmitter<Goal>();
  @Output() unnest = new EventEmitter<Goal>();
}
