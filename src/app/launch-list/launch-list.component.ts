import { Component, Input, OnInit } from '@angular/core';
import { ILaunchDetails } from '../helpers/launch.model';

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.scss']
})
export class LaunchListComponent {
  @Input() launchList: ILaunchDetails[];
}
