import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFilter, ILaunchDetails } from './launch.model';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {
  private spaceXAPI = environment.spaceXDomain;

  constructor(private http: HttpClient) { }

  fetchLaunchDetails(filter: IFilter): Observable<ILaunchDetails[]> {
    const limit = 100;
    let launchUrl = `${this.spaceXAPI}/launches?limit=${limit}`;
    if (filter.isLaunchSuccess) {
      launchUrl = `${launchUrl}&launch_success=${filter.isLaunchSuccess}`;
    }
    if (filter.isLandSuccess) {
      launchUrl = `${launchUrl}&land_success=${filter.isLandSuccess}`;
    }
    if (filter.selectedYear) {
      launchUrl = `${launchUrl}&launch_year=${filter.selectedYear}`;
    }
    return this.http.get<ILaunchDetails[]>(launchUrl);
  }
}
