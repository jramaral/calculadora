import { Component, OnInit } from '@angular/core';
import {CalculadoraService} from "../services";

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numberOne: string;
  private numberTwo: string;
  private resultOfOperation: number;
  private operation: string;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    this.limpar();
  }

  limpar(): void {

    this.numberOne = '0';
    this.numberTwo = null;
    this.resultOfOperation = null;
    this.operation = null;

  }

  addNumber(number: string): void {
    
    if (this.operation === null){
      this.numberOne = this.concatenarNumero(this.numberOne, number);
    }else{
      this.numberTwo = this.concatenarNumero(this.numberTwo, number);
    }
  }
  concatenarNumero(numeroAtual: string, numConcat: string): string {
   
      if(numeroAtual === '0' || numeroAtual === null) {
        numeroAtual = '';
      }

      if(numConcat === '.' && numeroAtual === ''){
        return '0.';
      }

      if(numConcat === '.' && numeroAtual.indexOf('.')> -1){
        return numeroAtual;
      }

      return numeroAtual + numConcat;
  }

  definirOperacao(operacao: string): void {
    if(this.operation === null) {
      this.operation = operacao;
      return;
    }

    if(this.numberTwo !== null){
      this.resultOfOperation =  this.calculadoraService.calcular(
        parseFloat(this.numberOne),
        parseFloat(this.numberTwo),
        this.operation
        );

        this.operation = operacao;
        this.numberOne = this.resultOfOperation.toString();
        this.numberTwo = null;
        this.resultOfOperation = null;
    }

  }

  calcular(): void {
    if(this.numberTwo === null){
      return;
    }

    this.resultOfOperation = this.calculadoraService
    .calcular(
      parseFloat(this.numberOne),
      parseFloat(this.numberTwo),
      this.operation
    );
  }

  get display(): string {
    if(this.resultOfOperation !== null){
      return this.resultOfOperation.toString();
    }
    if(this.numberTwo !== null){
      return this.numberTwo;
    }

    return this.numberOne;
  }



}
