import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {  ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})

export class AppComponent implements OnInit {
  title = 'base_Converter';
  form: FormGroup = new FormGroup({
    'binary': new FormControl('', Validators.compose (
      [Validators.required,
      Validators.pattern('^[01]+$')]
    )),
    'decimal': new FormControl('',Validators.compose (
      [Validators.required,
      Validators.pattern('^[0-9]+$')]
    )),
    'octal': new FormControl(''),
    'hexa': new FormControl(''),
  });

  bol = false;

  ngOnInit(): void {
    this.form.get('binary')!.valueChanges.subscribe((newVal: string) => {
      if (newVal !== '') {
        this.form.patchValue({ 'decimal': parseInt(newVal, 2).toString(10) });
        this.form.patchValue({ 'octal': parseInt(newVal, 2).toString(8) });
        this.form.patchValue({ 'hexa': parseInt(newVal, 2).toString(16) });
      } else {
        this.form.patchValue({ 'decimal': '' });
        this.form.patchValue({ 'octal': '' });
        this.form.patchValue({ 'hexa': '' });
      }
    });

    this.form.get('decimal')!.valueChanges.subscribe((newVal: string) => {
      this.bol = !this.bol;
      if (this.bol) {
        if (newVal !== '') {
          this.form.patchValue({ 'binary': parseInt(newVal, 10).toString(2) });
          this.form.patchValue({ 'octal': parseInt(newVal, 10).toString(8) });
          this.form.patchValue({ 'hexa': parseInt(newVal, 10).toString(16) });
        } else {
          this.form.patchValue({ 'binary': '' });
          this.form.patchValue({ 'octal': '' });
          this.form.patchValue({ 'hexa': '' });
        }
      }
      this.bol = false;
    });

    // this.form.get('octal')!.valueChanges.subscribe((newVal: string) => {
    //   this.bol = !this.bol;
    //   if (this.bol) {
    //     if (newVal !== '') {
    //       this.form.patchValue({ 'binary': parseInt(newVal, 8).toString(2) });
    //       this.form.patchValue({ 'decimal': parseInt(newVal, 8).toString(10) });
    //       this.form.patchValue({ 'hexa': parseInt(newVal, 8).toString(16) });
    //     } else {
    //       this.form.patchValue({ 'binary': '' });
    //       this.form.patchValue({ 'decimal': '' });
    //       this.form.patchValue({ 'hexa': '' });
    //     }
    //   }
    //   this.bol = false;
    // });

    // this.form.get('hexa')!.valueChanges.subscribe((newVal: string) => {
    //   this.bol = !this.bol;
    //   if (this.bol) {
    //     if (newVal !== '') {
    //       this.form.patchValue({ 'binary': parseInt(newVal, 16).toString(2) });
    //       this.form.patchValue({ 'decimal': parseInt(newVal, 16).toString(10) });
    //       this.form.patchValue({ 'octal': parseInt(newVal, 16).toString(8) });
    //     } else {
    //       this.form.patchValue({ 'binary': '' });
    //       this.form.patchValue({ 'decimal': '' });
    //       this.form.patchValue({ 'octal': '' });
    //     }
    //   }
    //   this.bol = false;
    // });
  }
}
