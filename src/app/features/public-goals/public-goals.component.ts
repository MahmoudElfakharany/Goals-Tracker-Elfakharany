import { Component } from '@angular/core';
import { Goal } from '../../core/models/goal.model';
import { GoalsService } from '../../core/services/goal.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { PublicCardModalComponent } from '../../shared/components/public-card-modal/public-card-modal.component';

@Component({
  selector: 'app-public-goals',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './public-goals.component.html',
  styleUrl: './public-goals.component.scss',
})
export class PublicGoalsComponent {
  publicGoals: Goal[] = [];
  loading = true;

  constructor(private goalsService: GoalsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.goalsService.getPublicGoals().subscribe({
      next: (res) => {
        if (res.data) {
          this.publicGoals = res.data;
          this.loading = false;
        }
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  openGoalDetails(goal: Goal): void {
    this.dialog.open(PublicCardModalComponent, {
      data: goal,
      width: '500px',
    });
  }
}
