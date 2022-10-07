import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector   : 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls  : ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit 
{
    educationForm!: FormGroup;

  constructor(private fb: FormBuilder) 
  { 

  }

  ngOnInit(): void 
  {
      this.educationForm = this.fb.group
      ({
          educations:this.fb.array([this.createEducation()],Validators.required)
      })
  }

  saveEducations() 
  {

      if(this.educationForm.status == 'VALID')
      {
          console.log(this.educationForm.value);
      }
  }

  createEducation(): FormGroup
  {
      return this.fb.group
      ({
          diplomeEdu  : [null, Validators.required],
          obtenuEdu   : [null, Validators.required],
          lieuEdu     : [null, Validators.required],
          ecoleEdu    : [null, Validators.required],
          debutEdu    : [null, Validators.required],
          finEdu      : [null, Validators.required],
          textAreaEdu : [null, Validators.required]
      })
  }

  get educations(): FormArray
  {
      return <FormArray> this.educationForm.get('educations');
  }


  addEducation() 
  {
      this.educations.push(this.createEducation());
  }

  onDeleteEducation(index: number)
  {
    console.log(index);
    console.log((<FormArray>this.educationForm.get('educations')).at(index).get('diplomeEdu')?.value);
    console.log((<FormArray>this.educationForm.get('educations')).at(index).get('ecoleEdu')?.value); 
    //this.getAllEducations();
    (<FormArray>this.educationForm.get('educations')).removeAt(index);
  }
  
  getAllEducations()
  {
    for (let i = 0; i < this.educations.length; i++)
    {
        console.log(this.educations.at(i).get('diplomeEdu')?.value);
    }
  }
}
