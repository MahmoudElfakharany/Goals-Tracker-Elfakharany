import { Component } from '@angular/core';
import { GoalCardComponent } from '../../shared/components/goal-card/goal-card.component';
import { GoalsService } from '../../core/services/goal.service';
import { Goal } from '../../core/models/goal.model';
import { ToastService } from '../../core/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { GoalModalComponent } from '../../shared/components/goal-modal/goal-modal.component';
import { NestToParentModalComponent } from '../../shared/components/nest-to-parent-modal/nest-to-parent-modal.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GoalCardComponent, MatIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  goals: Goal[] = [];
  topLevelGoals: Goal[] = [];

  constructor(
    private goalsService: GoalsService,
    private toast: ToastService,
    public dialog: MatDialog
  ) {
    this.goalsService.getCurrentUserGoals().subscribe({
      next: (res) => {
        if (res.data) {
          this.goals = res.data;
          this.topLevelGoals = this.goals.filter((g) => g.parentId === null);
        }
      },
    });
  }

  //************************************************************* HELPER METHODS */
  openDialog(action: 'add' | 'edit', component: any, data?: Goal) {
    const dialogRef = this.dialog.open(component, {
      width: '60vw',
      maxWidth: '100vw',
      data: { goal: data, action },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        const updatedGoal: Goal = result.data;

        // Update in goals array
        const goalIndex = this.goals.findIndex((g) => g.id === updatedGoal.id);
        if (goalIndex !== -1) {
          this.goals[goalIndex] = updatedGoal;
        } else {
          this.goals.unshift(updatedGoal);
        }

        // Handle top-level goals
        if (!updatedGoal.parentId) {
          const topLevelIndex = this.topLevelGoals.findIndex(
            (g) => g.id === updatedGoal.id
          );
          if (topLevelIndex !== -1) {
            this.topLevelGoals[topLevelIndex] = updatedGoal;
          } else {
            this.topLevelGoals = [updatedGoal, ...this.topLevelGoals];
          }
        } else {
          // It’s a sub-goal: Find parent and update children
          const parent = this.goals.find((g) => g.id === updatedGoal.parentId);
          if (parent) {
            if (!parent.children) parent.children = [];

            const childIndex = parent.children.findIndex(
              (c) => c.id === updatedGoal.id
            );
            if (childIndex !== -1) {
              parent.children[childIndex] = updatedGoal;
            } else {
              parent.children.unshift(updatedGoal);
            }
          }
        }
      }
    });
  }

  //************************************************************* GOAL METHODS */
  // Done
  onEdit(goal: Goal): void {
    this.openDialog('edit', GoalModalComponent, goal);
  }

  onAdd(): void {
    this.openDialog('add', GoalModalComponent);
  }

  // Done
  onDelete(goalToDelete: Goal): void {
    this.goalsService.deleteGoal(goalToDelete.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.toast.success('Goal Deleted Successfully');

          if (!goalToDelete.parentId) {
            this.topLevelGoals = this.goals.filter(
              (goal) =>
                goal.id !== goalToDelete.id && goal.parentId !== goalToDelete.id
            );
          } else if (goalToDelete.parentId) {
            const parent = this.goals.find(
              (g) => g.id === goalToDelete.parentId
            );
            if (parent?.children) {
              parent.children = parent.children.filter(
                (child) => child.id !== goalToDelete.id
              );
            }
          } else {
            this.goals = this.goals.filter((g) => g.id !== goalToDelete.id);
          }
        }
      },
    });
  }

  // Done
  onToggleVisibility(goalToUpdate: Goal): void {
    this.goalsService
      .updateGoal(goalToUpdate.id, { isPublic: !goalToUpdate.isPublic })
      .subscribe({
        next: (res) => {
          if (res.success) {
            goalToUpdate.isPublic = res.data.isPublic;
            this.toast.success(
              `Goal visibility changed to ${
                res.data.isPublic ? 'Public' : 'Private'
              }`
            );
          }
        },
      });
  }

  onNestSubGoal(goal: Goal): void {
    this.openDialog('edit', NestToParentModalComponent, goal);
  }

  onUnnest(goal: Goal): void {
    this.goalsService.updateGoal(goal.id, { parentId: null }).subscribe({
      next: (res) => {
        if (res.success) {
          goal.parentId = null;

          // Remove from parent
          const parent = this.goals.find((g) =>
            g.children?.some((child) => child.id === goal.id)
          );
          if (parent?.children) {
            parent.children = parent.children.filter(
              (child) => child.id !== goal.id
            );
          }

          //Add to the topLevelGoals
          const existsInTop = this.topLevelGoals.some((g) => g.id === goal.id);
          if (!existsInTop) {
            this.topLevelGoals = [goal, ...this.topLevelGoals];
          }

          this.toast.success(`Goal successfully un-nested.`);
        }
      },
    });
  }
}
