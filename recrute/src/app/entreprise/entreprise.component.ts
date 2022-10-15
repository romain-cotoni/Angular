import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector   : 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls  : ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit 
{
    formEtp!: FormGroup;

  constructor(private fb: FormBuilder) 
  { 

  }

  ngOnInit(): void 
  {
    this.formEtp    = this.createEmptyEntrepriseForm();
  }

  createEmptyEntrepriseForm()
  {
    return this.fb.group
    ({
        idEntreprise  : '',
        raisonEtp     : '',
        recruteEtp    : true, 
        lieuEtp       : '',
        siretEtp      : '', 
        infoEtp       : '', 
        emailEtp      : '', 
    })
  }

  saveEntreprises() 
  {

      
  }

  createEntreprise()
  {
      
  }



  addEntreprise() 
  {
     
  }

  onDeleteEntreprise()
  {
   
  }
  
  getAllEntreprises()
  {
    
  }
}
