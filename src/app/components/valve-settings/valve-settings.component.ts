import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { modes } from 'src/app/constant/valve-config';

@Component({
  selector: 'app-valve-settings',
  templateUrl: './valve-settings.component.html'
})
export class ValveSettingsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject();
  modes = modes;

  modeSelected = 0;
  thresholdSelected = 0;
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
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  onSubmit(f: NgForm) {
    this.dbService
      .changeValveState(this.modeSelected, this.thresholdSelected)
      .then(() => this.bsModalRef.hide());
  }
}
