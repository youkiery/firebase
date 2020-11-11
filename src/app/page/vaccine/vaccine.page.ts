import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
})
export class VaccinePage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {}

}
