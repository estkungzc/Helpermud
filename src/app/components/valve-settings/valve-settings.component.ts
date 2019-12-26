import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { modes } from 'src/app/constant/valve-config';
import { ValveSettingModel } from 'src/app/models/valve-setting.model';

@Component({
  selector: 'app-valve-settings',
  templateUrl: './valve-settings.component.html'
})
export class ValveSettingsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject();
  modes = modes;

  modeSelected = 0;
  thresholdSelected = 0;
  wateringPeriodSelected = 0;
  constructor(
    public bsModalRef: BsModalRef,
    private dbService: DashboardService
  ) {}

  ngOnInit() {
    this.dbService
      .getValveSettings()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        if (!x) {
          return;
        }
        this.modeSelected = x.state;
        this.thresholdSelected = x.threshold;
        this.wateringPeriodSelected = x.wateringPeriod;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  onSubmit(f: NgForm) {
    if (f.invalid) {
      return;
    }
    const settings: ValveSettingModel = {
      state: this.modeSelected,
      threshold: this.thresholdSelected,
      wateringPeriod: this.wateringPeriodSelected
    }
    this.dbService
      .changeValveState(settings)
      .then(() => this.bsModalRef.hide());
  }
}
