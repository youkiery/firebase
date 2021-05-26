import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-col',
  templateUrl: './col.page.html',
  styleUrls: ['./col.page.scss'],
})
export class ColPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
    
  }

  public parseCurrency(text: any) {
    let check = text.length - Math.floor(text.length / 3) * 3
    let mainkey = text.substr(0, check)
    let subkey = text.substr(check)
    if (text.length > 2) text = (check ? mainkey + ',' : '') + subkey.match(/.{1,3}/g).join(',')
    else text = mainkey
    return text
  }

  public parseClock(text: any) {
    let number = Number(text)
    if (text.search(',') < 0) {
      number *= 10
    }
    return number;
  }

  public parseNumber(number: number) {
    let text = '0'
    if (number == 0) text = String(number) + ',0'
    else while (number < 10) text = String(Number(text) * 10)
    return text.substr(0, text.length - 1) + ',' + text.substr(-1)
  }

  public parsing(name: string) {
    this.rest.ride.edit[name] = this.parseNumber(this.rest.ride.edit[name])
    this.total()
  }

  public total() {
    let from = this.parseClock(this.rest.ride.edit.from)
    let end = this.parseClock(this.rest.ride.edit.end)
    // let end = Number(String(this.rest.ride.edit.end).replace(/,/g, '')) / 10
    // let amount = String(Number(Math.abs(from - end)).toFixed(1) * 1000)
    // if (from > end) {
    //   let temp = this.rest.ride.edit.from
    //   this.rest.ride.edit.from = this.rest.ride.edit.end
    //   this.rest.ride.edit.end = temp
    // }
    this.rest.ride.edit.amount = this.parseCurrency(Math.abs(from - end))
  }

  public async save() {
    await this.rest.freeze('Thêm phiếu...')
    this.rest.check({
      action: 'ride-insert',
      type: 0,
      doctorid: this.rest.ride.edit.doctorid,
      from: this.rest.ride.edit.from,
      end: this.rest.ride.edit.end,
      amount: this.rest.ride.edit.amount,
      destination: this.rest.ride.edit.destination,
      note: this.rest.ride.edit.note,
    }).then(response => {
      this.rest.ride.edit['from'] = String(response.end).replace(/\,|\./g, "")
      this.rest.ride.edit['end'] = String(Number(String(response.end).replace(/\,|\./g, "")) + 1)
      this.rest.ride.edit['amount']  = '10,000'
      this.rest.ride.edit['destination']  = ''
      this.rest.ride.edit['note']  = ''
      this.rest.defreeze()
    }, () => {
      this.rest.defreeze()
    })
  }
}
