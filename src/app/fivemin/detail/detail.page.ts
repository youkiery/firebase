import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

  public update() {
    // this.rest.fivemin.data = JSON.parse(JSON.stringify(this.rest.fivemin.list[this.rest.fivemin.index]))
    // this.rest.router.navigateByUrl('/fivemin/update')
  }
}
