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
import { DialogData } from '../goal-modal/goal-modal.component';

@Component({
  selector: 'app-nest-to-parent-modal',
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
  templateUrl: './nest-to-parent-modal.component.html',
  styleUrl: './nest-to-parent-modal.component.scss',
})
export class NestToParentModalComponent {
  nestingForm: UntypedFormGroup;
  dialogTitle: string;
  goal: Goal;
  parentGoals: Goal[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<any>,
    private formBuilder: UntypedFormBuilder,
    private toast: ToastService,
    private goalService: GoalsService
  ) {
    this.goal = this.data.goal;
    this.dialogTitle = `Choose parent for goal: ${this.goal.title}`;

    this.getParentGoals();
    this.nestingForm = this.createNestingForm();
  }

  //************************************************************ GET DATA */
  getParentGoals() {
    this.goalService.getCurrentUserParentGoals().subscribe({
      next: (res) => {
        if (res.data) {
          this.parentGoals = res.data;
        }
      },
    });
  }

  //************************************************************ FORM CREATION */
  createNestingForm(): UntypedFormGroup {
    const goal = this.data.goal;
    const action = this.data.action;

    const form = this.formBuilder.group({
      id: [action === 'edit' ? goal.id : null],
      parentId: [goal.parentId || null, [Validators.required]],
    });
    return form;
  }

  //************************************************************ Form submit */
  submitNestingForm(): void {
    const handleSuccess = (response: any, message: string): void => {
      this.toast.success(message);
      this.dialogRef.close(response);
    };

    if (!this.nestingForm.valid) return;

    const form = this.nestingForm;
    const formValues = form.getRawValue();

    this.goalService
      .updateGoal(this.data.goal.id, { parentId: formValues.parentId })
      .subscribe({
        next: (response) =>
          handleSuccess(response, 'Goal updated successfully'),
      });
  }

  //******************************************** */
  onClose() {
    console.log(this.data);
    this.dialogRef.close();
  }
}
