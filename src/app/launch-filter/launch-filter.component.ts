import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFilter, launchYear, outcome } from '../helpers/launch.model';

@Component({
  selector: 'app-launch-filter',
  templateUrl: './launch-filter.component.html',
  styleUrls: ['./launch-filter.component.scss']
})
export class LaunchFilterComponent implements OnInit {
  @Input() selectedYear: number;
  @Input() isLaunchSuccess: string;
  @Input() isLandSuccess: string;
  @Output() filterChange = new EventEmitter();
  launchYears: (string | launchYear)[];
  outcomes: any;

  constructor() { }

  ngOnInit() {
    this.outcomes = Object.entries(outcome);
    this.launchYears = Object.values(launchYear).filter((val) => !isNaN(+val));
  }

  setFilter(event) {
    const filterType = event.target.id.split('-')[0];
    switch (filterType) {
      case 'year':
        this.selectedYear = event.target.value;
        break;
      case 'launch':
        this.isLaunchSuccess = event.target.value?.toLowerCase();
        break;
      case 'land':
        this.isLandSuccess = event.target.value?.toLowerCase();
    }
    this.emitFilter();
  }

  emitFilter() {
    const filter: IFilter = {
      selectedYear: this.selectedYear,
      isLaunchSuccess: this.isLaunchSuccess,
      isLandSuccess: this.isLandSuccess
    };
    this.filterChange.emit(filter);
  }
}
