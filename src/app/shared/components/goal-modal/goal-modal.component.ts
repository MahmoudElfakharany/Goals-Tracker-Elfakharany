import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Goal } from '../../../core/models/goal.model';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastService } from '../../../core/services/toast.service';
import { GoalsService } from '../../../core/services/goal.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';

export interface DialogData {
  action: string;
  goal: Goal;
}

@Component({
  selector: 'app-goal-modal',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogClose,
  ],
  templateUrl: './goal-modal.component.html',
})
export class GoalModalComponent {
  goalForm: UntypedFormGroup;
  dialogTitle: string;
  goal: Goal;
  today: Date = new Date();

  parentGoals: Goal[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<any>,
    private formBuilder: UntypedFormBuilder,
    private toast: ToastService,
    private goalService: GoalsService
  ) {
    this.goal = this.data.goal;
    this.dialogTitle =
      this.data.action === 'edit'
        ? `Edit ${data.goal.title}`
        : 'Create a goal';
    this.data.goal = this.data.action === 'edit' ? data.goal : new Goal();

    this.getParentGoals();
    this.goalForm = this.createGoalForm();
  }

  //************************************************************ GET DATA */
  getParentGoals() {
    this.goalService.getCurrentUserParentGoals().subscribe({
      next: (res) => {
        if (res.data) {
          this.parentGoals = res.data;
          console.log(this.parentGoals);
        }
      },
    });
  }

  //************************************************************ FORM CREATION */
  createGoalForm(): UntypedFormGroup {
    const goal = this.data.goal;
    const action = this.data.action;

    const createdAt = goal.createdAt
      ? formatDate(goal.createdAt, 'yyyy-MM-dd', 'en')
      : null;

    const form = this.formBuilder.group({
      id: [action === 'edit' ? goal.id : null],

      title: [goal.title || null, [Validators.required]],
      description: [goal.description || null],
      deadline: [goal.deadline || null],
      isPublic: [goal.isPublic || null, [Validators.required]],
      order: [goal.order || null],
      parentId: [goal.parentId || null],

    });
    return form;
  }

  //************************************************************ Form submit */
  submitGoalForm(): void {
    const handleSuccess = (response: any, message: string): void => {
      this.toast.success(message);
      this.dialogRef.close(response);
    };

    if (!this.goalForm.valid) return;

    const form = this.goalForm;
    const formValues = form.getRawValue();

    let goalBody: Partial<Goal> = {};

    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);

      if (control?.dirty) {
        goalBody[key as keyof Goal] = formValues[key];
      }
    });

    if (this.data.action === 'edit') {
      this.goalService.updateGoal(this.data.goal.id, goalBody).subscribe({
        next: (response) =>
          handleSuccess(response, 'Goal updated successfully'),
      });
    } else {
      this.goalService.createGoal(goalBody).subscribe({
        next: (response) => {
          handleSuccess(response, 'Goal created successfully');
        },
      });
    }
  }

  //******************************************** */
  onClose() {
    console.log(this.data);
    this.dialogRef.close();
  }
}
