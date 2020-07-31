import { Component, ViewChild, ElementRef, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { element } from 'protractor';


export interface IWager{
  id: number,
  bet?: number,
  total?: number,
  ifWon?: number,
  profit?: number
}

export class Wager{
  constructor(
    public id: number,
    public bet?: number,
    public total?: number,
    public ifWon?: number,
    public profit?: number
  ){}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'bet-strategys';

  @ViewChild('initialBetElement') initialBetElement: ElementRef;
  @ViewChild('multiplierElement') multiplierElement: ElementRef;

  multiplier: number = 0;
  initialBet: number = 0;
  wagers: Array<IWager>;
  clicked: number = 0;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.initialBet = this.initialBetElement.nativeElement.value = 1;
    this.multiplier = this.multiplierElement.nativeElement.value = 14;
    // this.initialBetElement.nativeElement.value;
    // this.multiplierElement.nativeElement.value;
    this.generateTable();
  }

  generateTable(){

    this.initialBet = Number(this.initialBetElement.nativeElement.value);
    this.multiplier = Number(this.multiplierElement.nativeElement.value);

    // this.initialBet*=100;

    // console.log("initial: " + this.initialBet);
    // console.log("mult: " + this.multiplier);

    this.wagers = new Array<IWager>();
    console.log(this.initialBetElement);
    console.log(this.multiplierElement);   
    
    let repeats = 0;

    // console.log(this.wagers);
    if (this.multiplier >= 11) {
      repeats = 200;
    }else if (this.multiplier>=5 && this.multiplier<11) {
      repeats = 100;
    }else {
      repeats = 30;
    }
    if (this.multiplier>1) {
      for (let i = 0; i < repeats; i++) {
        if (i==0) {
          // console.log("entra no primeiro if, i = " + i);
          this.wagers.push({
              id:(i+1), 
              total: (this.initialBet), 
              bet: (this.initialBet), 
              ifWon: (this.initialBet*this.multiplier), 
              profit: ((this.initialBet*this.multiplier)-this.initialBet)
            });
        }else{
          const id = (i+1);
          let wager = new Wager(id);
  
          let total = Number((this.getTotal()).toFixed(2));
          // console.log("total: "+total);
          const bet = Number((this.getBet(total)).toFixed(2));
          total+=Number(bet.toFixed(2));
  
          const ifWon = Number((this.getIfWon(bet)).toFixed(2));
          const profit = Number((this.getProfit(total, ifWon)).toFixed(2));
  
          wager.bet = bet;
          wager.total = Number(total.toFixed(2));
          console.log(wager.total);
          wager.ifWon = ifWon;
          wager.profit = profit;
          this.wagers.push(wager);
        }
      }
    }
    // console.log(this.wagers);
  }

  getBet(total: number): number{
    let bet = this.initialBet;
    while((bet*this.multiplier)<=(bet+total+0.001)){
      bet = bet + Number(this.initialBet);
    }
    // console.log("sai do while");
    return bet;
  }


  getProfit(total: number, ifWon: number): number{
    return (ifWon-total);
  }

  getIfWon(bet: number):number{
    return (bet*this.multiplier);
  }

  // getBet(lastBet: number, total:number):any{
  //   let bet = lastBet;
  //   let totalAdd = 0;
  //   while((bet*this.multiplier)<=total){
  //     bet++;
  //     totalAdd++;
  //   }
  //   return {bet: bet, totalAdd: totalAdd};
  // }

  getTotal(): number{
    let t = 0;
    this.wagers.forEach(element => {
      t+=element.bet;
    });
    return t;
  }

  // getTotal(nextWager: Wager): number{
  //   let t = nextWager.bet;
  //   this.wagers.forEach(element => {
  //     t+=(element.bet);
  //   });
  //   return t;
  // }

  color(wagerId: number){
    this.clicked = wagerId;
  }
}
