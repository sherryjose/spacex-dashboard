import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilter, ILaunchDetails } from '../helpers/launch.model';
import { LaunchService } from '../helpers/launch.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'spacex-programme';
  appliedYear: string;
  isLaunchSuccess: string;
  isLandSuccess: string;
  launchList: ILaunchDetails[];
  @HostListener('window:resize')
  onResize() {
    const headerHeight = document.querySelector('header').clientHeight;
    const footerHeight = document.querySelector('footer').clientHeight;
    console.log(headerHeight, footerHeight);
    (document.querySelector('.container') as HTMLElement).style.minHeight = `calc( 100vh - ${headerHeight + footerHeight}px )`;
  }
  constructor(
    private launchService: LaunchService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getLaunchDetailsByUrl();
  }

  getLaunchDetailsByUrl() {
    this.route.queryParamMap.subscribe((params) => {
      this.isLaunchSuccess = params.get('launch_success');
      this.isLandSuccess = params.get('land_success');
      this.appliedYear = params.get('launch_year');
      this.fetchLaunchDetails({ selectedYear: this.appliedYear, isLaunchSuccess: this.isLaunchSuccess, isLandSuccess: this.isLandSuccess });
    });
  }

  applyFilters(filter: IFilter) {
    this.mapQueryParams(filter);
    this.fetchLaunchDetails(filter);
  }

  mapQueryParams(filter: IFilter) {
    this.router.navigate(['/'], {
      queryParams: {
        launch_success: filter.isLaunchSuccess,
        land_success: filter.isLandSuccess,
        launch_year: filter.selectedYear
      },
    });
  }

  fetchLaunchDetails(filter: IFilter) {
    this.launchService.fetchLaunchDetails(filter).subscribe((data: ILaunchDetails[]) =>
      this.launchList = data
    );
  }
}

