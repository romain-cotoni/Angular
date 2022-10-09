import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidat } from '../models/Candidat';
import { CandidatService } from '../services/candidat.service';
import { formatDate } from '@angular/common';
import { Doc } from '../models/Doc';

@Component({
  selector   : 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls  : ['./candidat.component.scss']
})
export class CandidatComponent implements OnInit 
{ 
    formSearch! : FormGroup;
    formCdt!    : FormGroup;
    formEdu!    : FormGroup;
    formExp!    : FormGroup
    formCmp!    : FormGroup
    formLng!    : FormGroup
    formEtt!    : FormGroup
    formPrj!    : FormGroup
    formDoc!    : FormGroup

    candidat!         : Candidat;
    idCandidat!       : number;
    isDisabledCdtForm!: boolean;
    slideCdtChecked!  : boolean;
    sliderCdtTxt!     : String;

    isDisabledEduForm!: boolean;
    slideEduChecked!  : boolean;
    sliderEduTxt!     : String;

    isDisabledExpForm!: boolean;
    slideExpChecked!  : boolean;
    sliderExpTxt!     : String;

    isDisabledCmpForm!: boolean;
    slideCmpChecked!  : boolean;
    sliderCmpTxt!     : String;

    isDisabledLngForm!: boolean;
    slideLngChecked!  : boolean;
    sliderLngTxt!     : String;

    isDisabledEttForm!: boolean;
    slideEttChecked!  : boolean;
    sliderEttTxt!     : String;

    isDisabledPrjForm!: boolean;
    slidePrjChecked!  : boolean;
    sliderPrjTxt!     : String;

    isDisabledDocForm!: boolean;
    slideDocChecked!  : boolean;
    sliderDocTxt!     : String;
    
    

    constructor(private fb: FormBuilder, private candidatService: CandidatService, private route: ActivatedRoute, private router: Router) 
    { 
        
    }

    ngOnInit(): void 
    { 
        this.formSearch = this.fb.group({'prenom1Cdt':[''], 'nom1Cdt':['']});
        this.formCdt    = this.createFormCandidatEmpty();
        this.formEdu    = this.fb.group({educations : this.fb.array([this.createEmptyEducationForm()] , Validators.required)});
        this.formExp    = this.fb.group({experiences: this.fb.array([this.createEmptyExperienceForm()], Validators.required)});
        this.formCmp    = this.fb.group({competences: this.fb.array([this.createEmptyCompetenceForm()], Validators.required)});
        this.formLng    = this.fb.group({langues    : this.fb.array([this.createEmptyLangueForm()]    , Validators.required)});
        this.formEtt    = this.fb.group({entretiens : this.fb.array([this.createEmptyEntretienForm()] , Validators.required)});
        this.formPrj    = this.fb.group({projets    : this.fb.array([this.createEmptyProjetForm()]    , Validators.required)});
        this.formDoc    = this.fb.group({'nomDoc':[''], 'categorieDoc':['']});
        //this.formDoc    = this.fb.group({documents  : this.fb.array([this.createEmptyDocForm()]       , Validators.required)});        
        
        this.idCandidat = Number(this.route.snapshot.paramMap.get('id'))
        if(this.idCandidat !== 0)
        {
            this.candidatService.getCandidat(this.idCandidat)
            .subscribe
            ({ 
                next : (candidat) => 
                { 
                    this.formCdt = this.createFormCandidatFilled(candidat); 
                    this.switchFormCdtEnable(false); //disabled form inputs; 
                },
                error : () => 
                { 
                    this.formCdt = this.createFormCandidatEmpty() 
                },
            })
            
            this.candidatService.getEducations(this.idCandidat)
            .subscribe
            ({                
                next: (educations) => 
                { 
                    this.removeEducationFromList(0);
                    
                    for(let i = 0; i < educations.length; i++)
                    {                                                                              
                        this.createFilledEducationForm(educations[i]["idEducation"],educations[i]["diplome"]["label"],educations[i]["specialite"]["label"], educations[i]["lieu"], educations[i]["recu"], educations[i]["ecole"], educations[i]["debut"], educations[i]["fin"],educations[i]["info"]);
                    };
                    if(educations.length>0) this.switchFormEduEnable(false); //disabled form inputs
                },
            })

            this.candidatService.getExperience(this.idCandidat)
            .subscribe
            ({                
                next: (experiences) => 
                { 
                    this.removeExperienceFromList(0);
                    
                    for(let i = 0; i < experiences.length; i++)
                    {
                        this.createFilledExperienceForm(experiences[i]["idExperience"],experiences[i]["mission"],experiences[i]["entreprise"], experiences[i]["ville"], experiences[i]["pays"], experiences[i]["debut"], experiences[i]["fin"],experiences[i]["details"]);
                    };
                    if(experiences.length>0) this.switchFormExpEnable(false); //disabled form inputs
                },
            })

            this.candidatService.getCompetence(this.idCandidat)
            .subscribe
            ({                
                next: (competences) => 
                { 
                    this.removeCompetenceFromList(0);
                    
                    for(let i = 0; i < competences.length; i++)
                    {
                        this.createFilledCompetenceForm(competences[i]["idCompetence"],competences[i]["competence"],competences[i]["niveau"], competences[i]["type"], competences[i]["details"]);
                    };
                    if(competences.length>0) this.switchFormCmpEnable(false); //disabled form inputs
                },
            })

            this.candidatService.getLangue(this.idCandidat)
            .subscribe
            ({                
                next: (langues) => 
                { 
                    this.removeLangueFromList(0);
                    
                    for(let i = 0; i < langues.length; i++)
                    {
                        this.createFilledLangueForm(langues[i]["idLangue"],langues[i]["langue"],langues[i]["niveau"], langues[i]["certification"], langues[i]["details"]);
                    };
                    if(langues.length>0) this.switchFormLngEnable(false); //disabled form inputs
                },
            })

            this.candidatService.getEntretien(this.idCandidat)
            .subscribe
            ({                
                next: (entretiens) => 
                { 
                    this.removeEntretienFromList(0);
                    
                    for(let i = 0; i < entretiens.length; i++)
                    {
                        this.createFilledEntretienForm(entretiens[i]["idEntretien"],entretiens[i]["date"],entretiens[i]["lieu"], entretiens[i]["evaluation"], entretiens[i]["recruteur"], entretiens[i]["mission"], entretiens[i]["contrat"], entretiens[i]["resume"]);
                    };
                    if(entretiens.length>0) this.switchFormEttEnable(false); //disabled form inputs
                },
            })

            this.candidatService.getProjet(this.idCandidat)
            .subscribe
            ({                
                next: (projets) => 
                { 
                    this.removeProjetFromList(0);
                    
                    for(let i = 0; i < projets.length; i++)
                    {
                        this.createFilledProjetForm(projets[i]["idProjet"], projets[i]["nom"], projets[i]["type"], projets[i]["domaine"], projets[i]["debut"], projets[i]["fin"], projets[i]["entreprise"], projets[i]["details"]);
                    };
                    if(projets.length>0) this.switchFormPrjEnable(false); //disabled form inputs
                },
            })

            //this.organiseDocumentsByCategorie();
        }
        else
        {
            this.switchFormCdtEnable(true); //enabled form inputs
            this.switchFormEduEnable(true);
            this.switchFormExpEnable(true);
            this.switchFormCmpEnable(true);
            this.switchFormLngEnable(true);
            this.switchFormEttEnable(true);
            this.switchFormPrjEnable(true);
        }
    }



    //--------------------TAB CANDIDAT----------------------

    createFormCandidatFilled(candidat: Candidat): FormGroup
    {
        return this.fb.group
        ({
            prenom1Cdt    : '',
            nom1Cdt       : '',
            idCandidat    : candidat.idCandidat,
            prenom2Cdt    : candidat.prenom,
            nom2Cdt       : candidat.nom,
            telMobCdt     : candidat.mob,
            emailCdt      : candidat.email,
            adresseCdt    : candidat.adresse,
            adresse2Cdt   : candidat.adresse2,
            villeCdt      : candidat.ville,
            postalCdt     : candidat.postal,
            salaireCdt    : candidat.salaire,
            mobilCdt      : candidat.mobilite,
            nationCdt     : candidat.nationnal,
            situationCdt  : candidat.situation,
            handicapCdt   : candidat.handicape,
            teletravailCdt: candidat.teletravail,
            permisCdt     : candidat.permis,
            vehiculeCdt   : candidat.vehicule,
            dispoCdt      : candidat.dispo,
            textareaCdt   : candidat.info
        });
    }

    createFormCandidatEmpty(): FormGroup
    {
        return this.fb.group
        ({
            prenom1Cdt    : '', 
            nom1Cdt       : '',
            idCandidat    : '',
            prenom2Cdt    : '', 
            nom2Cdt       : '',
            telMobCdt     : '', 
            emailCdt      : '', 
            adresseCdt    : '', 
            adresse2Cdt   : '', 
            villeCdt      : '', 
            postalCdt     : '',
            salaireCdt    : '',
            nationCdt     : '',
            situationCdt  : '',
            mobilCdt      : '', 
            handicapCdt   : '', 
            teletravailCdt: '', 
            permisCdt     : '', 
            vehiculeCdt   : '',
            dispoCdt      : '',
            textareaCdt   : ''
        });
    }

    chercher()
    {
        //this.candidatService.getCandidatByName(this.formSearch.get('prenom1Cdt')?.value,this.formSearch.get('nom1Cdt')?.value)
        //this.candidatService.getCandidatByName(this.formSearch.value.prenom1Cdt,this.formSearch.value.nom1Cdt)
        console.log( this.candidatService.getCandidatByName(this.formSearch.get('prenom1Cdt')?.value,this.formSearch.get('nom1Cdt')?.value) )
        
        this.candidatService.getCandidatByName(this.formSearch.get('prenom1Cdt')?.value,this.formSearch.get('nom1Cdt')?.value)
        .subscribe
        ({ 
            next    : (candidat) => { if(candidat!=null) this.router.navigate(['/candidat/' + candidat.idCandidat]).then(() => { window.location.reload(); });},
            error   : ()         => {  },
            complete: ()         => {  } 
        })
        
    }

    switchFormCdtEnable(enabling?: boolean)
    {
        if(enabling == false || this.isDisabledCdtForm == false)
        {
            //console.log("disabling");               
            for (let j = 0; j < this.fb.group.length; j++)
            {
                Object.keys(this.formCdt.controls).forEach(key => { this.formCdt.controls[key].disable(); });
            }
            this.isDisabledCdtForm = this.slideCdtChecked = true;
            this.sliderCdtTxt = 'formulaire non modifiable';
        }
        else
        {
            //console.log("enabling");                
            for (let j = 0; j < this.fb.group.length; j++)
            {
                Object.keys(this.formCdt.controls).forEach(key => { this.formCdt.controls[key].enable(); });
            }
            
            this.isDisabledCdtForm = this.slideCdtChecked = false;
            this.sliderCdtTxt = 'formulaire modifiable';
        }
    }


    //--------------------TAB EDUCATION---------------------
    
    //creer un formulaire education vide
    createEmptyEducationForm(): FormGroup
    {   
        return this.fb.group
        ({
            idEducation : [null],
            diplomeEdu  : ['', Validators.required],
            domaineEdu  : ['', Validators.required],
            obtenuEdu   : [false],
            lieuEdu     : [''],
            ecoleEdu    : [''],
            debutEdu    : [null],
            finEdu      : [null],
            textareaEdu : ['']
        })
    }
    
    //creer un formulaire education rempli
    createFilledEducationForm(idEducation: number | null, diplome: String | null, domaine: String | null, lieu: String | null, recu: boolean | null, ecole: String | null, debut: Date | null, fin: Date | null, details: String | null)
    {       
        this.educations.push
        (
            this.fb.group
            ({
                idEducation : [idEducation, Validators.required],
                diplomeEdu  : [diplome    , Validators.required],
                domaineEdu  : [domaine    , Validators.required],
                obtenuEdu   : [recu      ],
                lieuEdu     : [lieu      ],
                ecoleEdu    : [ecole     ],
                debutEdu    : [debut     ],
                finEdu      : [fin       ],
                textareaEdu : [details   ]
            })
        )
    }
        
    
    //retourne la liste des formulaires education
    get educations(): FormArray //à voir cette fonction
    {
        return <FormArray> this.formEdu.get('educations');
    }

    saveEducation(index: number)
    {
        if(this.educations.at(index).status == 'VALID')
        {
            let idCandidat : number;
            let date1!     : Date;
            let date2!     : Date;
            let strDate1!   : string;
            let strDate2!   : string;
            let idEducation: number = this.educations.at(index).get('idEducation')?.value;
            
            date1 = this.educations.at(index).get("debutEdu")?.value;
            if(date1 != null) { strDate1 = formatDate(date1, 'yyyy-MM-dd', 'en_US'); };

            date2 = this.educations.at(index).get("finEdu")?.value;
            if(date2 != null) { strDate2 = formatDate(date2, 'yyyy-MM-dd', 'en_US'); };

            let requete = 
            {
                "recu": this.educations.at(index).get("obtenuEdu")?.value,
                "lieu": this.educations.at(index).get("lieuEdu")?.value,
                "ecole": this.educations.at(index).get("ecoleEdu")?.value,               
                "debut": strDate1,
                "fin": strDate2,
                "info": this.educations.at(index).get("textareaEdu")?.value,
                "specialite": 
                {
                    "label": this.educations.at(index).get("domaineEdu")?.value
                },
                "diplome": 
                {                    
                    "label": this.educations.at(index).get("diplomeEdu")?.value
                }
            }

            //create education
            if(idEducation == null) 
            {   
                idCandidat = this.formCdt.get('idCandidat')?.value;
                this.candidatService.createEducation(idCandidat, requete)
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
            else //update education
            {   
                this.candidatService.updateEducation(idEducation, requete)
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
        }
    }


    //ajouter un formulaire education à la liste educations
    addEducationFormToList()
    {
        this.educations.push(this.createEmptyEducationForm());
        this.switchFormEduEnable(true);
    }

    deleteEducation(index: number)
    {
        let id = this.educations.at(index).get('idEducation')?.value;
        
        if(id != null)
        {
            this.candidatService.deleteEducation(id).subscribe
            ({
                next    : ()      => {  this.removeEducationFromList(index);},
                error   : (error) => { console.log(error) },
                complete: ()      => { /*console.log("index: " + index + " - id: " + id);*/  }
            })
        }
        this.removeEducationFromList(index);
    }

    //retirer et effacer une education
    removeEducationFromList(index: number)
    {
        (<FormArray>this.formEdu.get('educations')).removeAt(index);
    }

    //disable/enable la liste des formulaires education
    switchFormEduEnable(enabling?: boolean)
    {
        let switchOn! : boolean;
        if(enabling != null)
        {
            if(enabling == true) switchOn = true;
            else switchOn = false;
        }
        else
        {
            if(this.isDisabledEduForm == true) switchOn = true;
            else switchOn = false;
        }

        if(switchOn == false)
        {
            //console.log(this.isDisabledEduForm);
            //console.log("disabling");
            for (let i = 0; i < this.educations.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formEdu.controls).forEach(key => { this.formEdu.controls[key].disable(); });
                }
            }
            this.isDisabledEduForm = this.slideEduChecked = true;
            this.sliderEduTxt = 'formulaire non modifiable';
        }
        else
        {
            //console.log(this.isDisabledEduForm);
            //console.log("enabling");
            for (let i = 0; i < this.educations.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formEdu.controls).forEach(key => { this.formEdu.controls[key].enable(); });
                }
            }
            this.isDisabledEduForm = this.slideEduChecked = false;
            this.sliderEduTxt = 'formulaire modifiable';
        }
    }
    
    /*
    console.log((<FormArray>this.formEdu.get('educations')).at(index).get('diplomeEdu')?.value);
    
    getAllEducations()
    {
        for (let i = 0; i < this.educations.length; i++)
        {
            console.log(this.educations.at(i).get('diplomeEdu')?.value);
        }
    }
    */

    
    //--------------------TAB EXPERIENCE--------------------

    //creer un formulaire experience vide
    createEmptyExperienceForm(): FormGroup
    {   
        return this.fb.group
        ({
            idExperience : [null],
            missionExp   : ['', Validators.required],
            entrepriseExp: ['', Validators.required],
            villeExp     : [''],
            paysExp      : [''],            
            debutExp     : [null],
            finExp       : [null],
            textareaExp  : ['']
        })
    }
    
    //creer un formulaire experience rempli
    createFilledExperienceForm(idExperience: number | null, mission: String | null, entreprise: String | null, ville: String | null, pays: String | null, debut: Date | null, fin: Date | null, details: String | null)
    {
        
        this.experiences.push
        (
            this.fb.group
            ({
                idExperience  : [idExperience, Validators.required],
                missionExp    : [mission     , Validators.required],
                entrepriseExp : [entreprise  , Validators.required],
                villeExp      : [ville      ],
                paysExp       : [pays       ],
                debutExp      : [debut      ],
                finExp        : [fin        ],
                textareaExp   : [details    ]
            })
        )
    }
        
    //---------a voir cette fonction----------------
    //retourne la liste des formulaires expérience
    get experiences(): FormArray
    {
        return <FormArray> this.formExp.get('experiences');
    }
        
    //créer ou modifier les formulaires expérience dans la db
    saveExperience(index: number)
    {
        if(this.experiences.at(index).status == 'VALID')
        {
            let idCandidat  : number;
            let date1!      : Date;
            let date2!      : Date;
            let idExperience: number = this.experiences.at(index).get('idExperience')?.value;
            let formData    : any    = new FormData();
            formData.append("mission"   , this.experiences.at(index).get("missionExp")?.value);
            formData.append("entreprise", this.experiences.at(index).get("entrepriseExp")?.value);
            formData.append("ville"     , this.experiences.at(index).get("villeExp")?.value);
            formData.append("pays"      , this.experiences.at(index).get("paysExp")?.value);
            date1 = this.experiences.at(index).get("debutExp")?.value;
            if(date1 != null) 
            { 
                formData.append("debut", formatDate(date1, 'yyyy-MM-dd', 'en_US')); 
            }
            date2 = this.experiences.at(index).get("finExp")?.value;
            if(date2 != null)
            { 
                formData.append("fin", formatDate(date2, 'yyyy-MM-dd', 'en_US'));
            }
            formData.append("details" , this.experiences.at(index).get("textareaExp")?.value);
            
            //créer et sauvegarder experience
            if(idExperience == null) 
            {   
                idCandidat = this.formCdt.get('idCandidat')?.value;
                this.candidatService.createExperience(idCandidat, formData.entries())
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
            else //modifier et sauvegarder experience
            {
                formData.append("idExperience", this.experiences.at(index).get("idExperience"));
                this.candidatService.updateExperience(idExperience, formData.entries())
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
        }
    }


    //ajouter un formulaire experience à la liste experiences
    addExperienceFormToList()
    {
        this.experiences.push(this.createEmptyExperienceForm());
        this.switchFormExpEnable(true);
    }

    deleteExperience(index: number)
    {
        let id = this.experiences.at(index).get('idExperience')?.value;
        
        if(id != null)
        {
            this.candidatService.deleteExperience(id).subscribe
            ({
                next    : ()      => {  this.removeExperienceFromList(index);},
                error   : (error) => { console.log(error) },
                complete: ()      => { /*console.log("index: " + index + " - id: " + id);*/  }
            })
        }
        this.removeExperienceFromList(index);
    }

    //retirer et effacer une experience
    removeExperienceFromList(index: number)
    {
        (<FormArray>this.formExp.get('experiences')).removeAt(index);
    }

    //disable/enable la liste des formulaires experience
    switchFormExpEnable(enabling?: boolean)
    {
        let switchOn! : boolean;
        if(enabling != null)
        {
            if(enabling == true) switchOn = true;
            else switchOn = false;
        }
        else
        {
            if(this.isDisabledExpForm == true) switchOn = true;
            else switchOn = false;
        }

        if(switchOn == false)
        {
            for (let i = 0; i < this.experiences.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formExp.controls).forEach(key => { this.formExp.controls[key].disable(); });
                }
            }
            this.isDisabledExpForm = this.slideExpChecked = true;
            this.sliderExpTxt = 'formulaire non modifiable';
        }
        else
        {
            for (let i = 0; i < this.experiences.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formExp.controls).forEach(key => { this.formExp.controls[key].enable(); });
                }
            }
            this.isDisabledExpForm = this.slideExpChecked = false;
            this.sliderExpTxt = 'formulaire modifiable';
        }
    }
    

    //--------------------TAB COMPETENCE--------------------


    //creer un formulaire compétence vide
    createEmptyCompetenceForm(): FormGroup
    {   
        return this.fb.group
        ({
            idCompetence : [null],
            competenceCmp: ['', Validators.required],
            niveauCmp    : [''],
            typeCmp      : [''],
            textareaCmp  : ['']
        })
    }
    
    //creer un formulaire compétence rempli
    createFilledCompetenceForm(idCompetence: number | null, competence: String | null, niveau: String | null, type: String | null, details: String | null)
    {     
        this.competences.push
        (
            this.fb.group
            ({
                idCompetence : [idCompetence, Validators.required],
                competenceCmp: [competence  , Validators.required],
                niveauCmp    : [niveau],
                typeCmp      : [type],
                textareaCmp  : [details]
            })
        )
    }
        
    //---------a voir cette fonction----------------
    //retourne la liste des formulaires compétence
    get competences(): FormArray
    {
        return <FormArray> this.formCmp.get('competences');
    }
        
    //créer ou modifier les formulaires compétence dans la db
    saveCompetence(index: number)
    {
        if(this.competences.at(index).status == 'VALID')
        {
            let idCandidat  : number;
            let idCompetence: number = this.competences.at(index).get('idCompetence')?.value;
            let formData    : any    = new FormData();
            formData.append("competence", this.competences.at(index).get("competenceCmp")?.value);
            formData.append("niveau"    , this.competences.at(index).get("niveauCmp")?.value);
            formData.append("type"      , this.competences.at(index).get("typeCmp")?.value);
            formData.append("details"   , this.competences.at(index).get("textareaCmp")?.value);
            
            //créer et sauvegarder compétence
            if(idCompetence == null) 
            {   
                idCandidat = this.formCdt.get('idCandidat')?.value;
                this.candidatService.createExperience(idCandidat, formData.entries())
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
            else //modifier et sauvegarder compétence
            {
                formData.append("idCompetence", this.competences.at(index).get("idCompetence"));
                this.candidatService.updateCompetence(idCompetence, formData.entries())
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
        }
    }


    //ajouter un formulaire compétence à la liste competences
    addCompetenceFormToList()
    {
        this.competences.push(this.createEmptyCompetenceForm());
        this.switchFormCmpEnable(true);
    }

    deleteCompetence(index: number)
    {
        let id = this.competences.at(index).get('idCompetence')?.value;
        
        if(id != null)
        {
            this.candidatService.deleteCompetence(id).subscribe
            ({
                next    : ()      => {  this.removeCompetenceFromList(index);},
                error   : (error) => { console.log(error) },
                complete: ()      => { /*console.log("index: " + index + " - id: " + id);*/  }
            })
        }
        this.removeCompetenceFromList(index);
    }

    //retirer et effacer une compétence
    removeCompetenceFromList(index: number)
    {
        (<FormArray>this.formCmp.get('competences')).removeAt(index);
    }

    //disable/enable la liste des formulaires compétence
    switchFormCmpEnable(enabling?: boolean)
    {
        let switchOn! : boolean;
        if(enabling != null)
        {
            if(enabling == true) switchOn = true;
            else switchOn = false;
        }
        else
        {
            if(this.isDisabledCmpForm == true) switchOn = true;
            else switchOn = false;
        }

        if(switchOn == false)
        {
            for (let i = 0; i < this.competences.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formCmp.controls).forEach(key => { this.formCmp.controls[key].disable(); });
                }
            }
            this.isDisabledCmpForm = this.slideCmpChecked = true;
            this.sliderCmpTxt = 'formulaire non modifiable';
        }
        else
        {
            for (let i = 0; i < this.competences.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formCmp.controls).forEach(key => { this.formCmp.controls[key].enable(); });
                }
            }
            this.isDisabledCmpForm = this.slideCmpChecked = false;
            this.sliderCmpTxt = 'formulaire modifiable';
        }
    }

    //--------------------TAB LANGUE------------------------

    //creer un formulaire langue vide
    createEmptyLangueForm(): FormGroup
    {   
        return this.fb.group
        ({
            idLangue         : [null],
            langueLng        : ['', Validators.required],
            niveauLng        : [''],
            certificationLng : [''],
            textareaLng      : ['']
        })
    }
    
    //creer un formulaire langue rempli
    createFilledLangueForm(idLangue: number | null, langue: String | null, niveau: String | null, certification: String | null, details: String | null)
    {     
        this.langues.push
        (
            this.fb.group
            ({
                idLangue         : [idLangue, Validators.required],
                langueLng        : [langue  , Validators.required],
                niveauLng        : [niveau],
                certificationLng : [certification],
                textareaLng      : [details]
            })
        )
    }
        
    //---------a voir cette fonction----------------
    //retourne la liste des formulaires langue
    get langues(): FormArray
    {
        return <FormArray> this.formLng.get('langues');
    }
        
    //créer ou modifier les formulaires langue dans la db
    saveLangue(index: number)
    {
        if(this.langues.at(index).status == 'VALID')
        {
            let idCandidat : number;
            let idLangue   : number = this.langues.at(index).get('idLangue')?.value;
            let formData   : any    = new FormData();
            formData.append("langue"       , this.langues.at(index).get("langueLng")?.value);
            formData.append("niveau"       , this.langues.at(index).get("niveauLng")?.value);
            formData.append("certification", this.langues.at(index).get("certificationLng")?.value);
            formData.append("details"      , this.langues.at(index).get("textareaLng")?.value);
            
            //créer et sauvegarder langue
            if(idLangue == null) 
            {   
                idCandidat = this.formCdt.get('idCandidat')?.value;
                this.candidatService.createLangue(idCandidat, formData.entries())
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
            else //modifier et sauvegarder langue
            {
                formData.append("idLangue", this.langues.at(index).get("idLangue"));
                this.candidatService.updateLangue(idLangue, formData.entries())
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
        }
    }


    //ajouter un formulaire langue à la liste langues
    addLangueFormToList()
    {
        this.langues.push(this.createEmptyLangueForm());
        this.switchFormLngEnable(true);
    }

    deleteLangue(index: number)
    {
        let id = this.langues.at(index).get('idLangue')?.value;
        
        if(id != null)
        {
            this.candidatService.deleteLangue(id).subscribe
            ({
                next    : ()      => {  this.removeLangueFromList(index);},
                error   : (error) => { console.log(error) },
                complete: ()      => { /*console.log("index: " + index + " - id: " + id);*/  }
            })
        }
        this.removeLangueFromList(index);
    }

    //retirer et effacer une langue
    removeLangueFromList(index: number)
    {
        (<FormArray>this.formLng.get('langues')).removeAt(index);
    }

    //disable/enable la liste des formulaires langue
    switchFormLngEnable(enabling?: boolean)
    {
        let switchOn! : boolean;
        if(enabling != null)
        {
            if(enabling == true) switchOn = true;
            else switchOn = false;
        }
        else
        {
            if(this.isDisabledLngForm == true) switchOn = true;
            else switchOn = false;
        }

        if(switchOn == false)
        {
            for (let i = 0; i < this.langues.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formLng.controls).forEach(key => { this.formLng.controls[key].disable(); });
                }
            }
            this.isDisabledLngForm = this.slideLngChecked = true;
            this.sliderLngTxt = 'formulaire non modifiable';
        }
        else
        {
            for (let i = 0; i < this.langues.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formLng.controls).forEach(key => { this.formLng.controls[key].enable(); });
                }
            }
            this.isDisabledLngForm = this.slideLngChecked = false;
            this.sliderLngTxt = 'formulaire modifiable';
        }
    }
    
    //--------------------TAB ENTRETIEN---------------------

    //creer un formulaire entretien vide
    createEmptyEntretienForm(): FormGroup
    {   
        return this.fb.group
        ({
            idEntretien   : [null],
            dateEtt       : ['', Validators.required],
            lieuEtt       : [''],
            evaluationEtt : [''],
            recruteurEtt  : ['', Validators.required],            
            missionEtt    : [null],
            contratEtt    : [null],
            textareaEtt   : ['']
        })
    }
    
    //creer un formulaire entretien rempli
    createFilledEntretienForm(idEntretien: number | null, date: Date | null, lieu: String | null, evaluation: String | null, recruteur: String | null, mission: String | null, contrat: String | null, resume: String | null)
    {        
        this.entretiens.push
        (
            this.fb.group
            ({
                idEntretien   : [idEntretien, Validators.required],
                dateEtt       : [date, Validators.required],
                lieuEtt       : [lieu],
                evaluationEtt : [evaluation],
                recruteurEtt  : [recruteur, Validators.required],
                missionEtt    : [mission],
                contratEtt    : [contrat],
                textareaEtt   : [resume]
            })
        )
    }
        
    //---------a voir cette fonction----------------
    //retourne la liste des formulaires entretien
    get entretiens(): FormArray
    {
        return <FormArray> this.formEtt.get('entretiens');
    }
        
    //créer ou modifier les formulaires entretien dans la db
    saveEntretien(index: number)
    {
        if(this.entretiens.at(index).status == 'VALID')
        {
            let idCandidat  : number;
            let date1       : Date;
            let idEntretien : number = this.entretiens.at(index).get('idEntretien')?.value;
            let formData    : any    = new FormData();
            date1 = this.experiences.at(index).get("dateEtt")?.value;
            if(date1 != null) 
            { 
                formData.append("date", formatDate(date1, 'yyyy-MM-dd', 'en_US')); 
            }            
            formData.append("lieu"      , this.entretiens.at(index).get("lieuEtt")?.value);
            formData.append("evaluation", this.entretiens.at(index).get("evaluationEtt")?.value);
            formData.append("recruteur" , this.entretiens.at(index).get("recruteurEtt")?.value);
            formData.append("mission"   , this.entretiens.at(index).get("missionEtt")?.value);
            formData.append("contrat"   , this.entretiens.at(index).get("contratEtt")?.value);
            formData.append("resume"    , this.entretiens.at(index).get("textareaEtt")?.value);
            
            //créer et sauvegarder entretien
            if(idEntretien == null) 
            {   
                idCandidat = this.formCdt.get('idCandidat')?.value;
                this.candidatService.createEntretien(idCandidat, formData.entries())
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
            else //modifier et sauvegarder entretien
            {
                formData.append("idEntretien", this.entretiens.at(index).get("idEntretien"));
                this.candidatService.updateEntretien(idEntretien, formData.entries())
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
        }
    }


    //ajouter un formulaire entretien à la liste entretiens
    addEntretienFormToList()
    {
        this.entretiens.push(this.createEmptyEntretienForm());
        this.switchFormEttEnable(true);
    }

    deleteEntretien(index: number)
    {
        let id = this.entretiens.at(index).get('idEntretien')?.value;
        
        if(id != null)
        {
            this.candidatService.deleteEntretien(id).subscribe
            ({
                next    : ()      => {  this.removeEntretienFromList(index);},
                error   : (error) => { console.log(error) },
                complete: ()      => { /*console.log("index: " + index + " - id: " + id);*/  }
            })
        }
        this.removeEntretienFromList(index);
    }

    //retirer et effacer une entretien
    removeEntretienFromList(index: number)
    {
        (<FormArray>this.formEtt.get('entretiens')).removeAt(index);
    }

    //disable/enable la liste des formulaires entretien
    switchFormEttEnable(enabling?: boolean)
    {
        let switchOn! : boolean;
        if(enabling != null)
        {
            if(enabling == true) switchOn = true;
            else switchOn = false;
        }
        else
        {
            if(this.isDisabledEttForm == true) switchOn = true;
            else switchOn = false;
        }

        if(switchOn == false)
        {
            for (let i = 0; i < this.entretiens.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formEtt.controls).forEach(key => { this.formEtt.controls[key].disable(); });
                }
            }
            this.isDisabledEttForm = this.slideEttChecked = true;
            this.sliderEttTxt = 'formulaire non modifiable';
        }
        else
        {
            for (let i = 0; i < this.entretiens.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formEtt.controls).forEach(key => { this.formEtt.controls[key].enable(); });
                }
            }
            this.isDisabledEttForm = this.slideEttChecked = false;
            this.sliderEttTxt = 'formulaire modifiable';
        }
    }
    
    //--------------------TAB PROJET------------------------
     
    //creer un formulaire projet vide
    createEmptyProjetForm(): FormGroup
    {   
        return this.fb.group
        ({
            idProjet     : [null],
            nomPrj       : ['', Validators.required],
            typePrj      : [''],
            domainePrj   : [''],
            debutPrj     : [null],            
            finPrj       : [null],
            entreprisePrj: [''],
            textareaPrj  : ['']
        })
    }
    
    //creer un formulaire projet rempli
    createFilledProjetForm(idProjet: number | null, nom: String | null, type: String | null, domaine: String | null, debut: Date | null, fin: Date | null, entreprise: String | null, details: String | null)
    {        
        this.projets.push
        (
            this.fb.group
            ({
                idProjet      : [idProjet, Validators.required],
                nomPrj        : [nom     , Validators.required],
                typePrj       : [type],
                domainePrj    : [domaine],
                debutPrj      : [debut],            
                finPrj        : [fin],
                entreprisePrj : [entreprise],
                textareaPrj   : [details]
            })
        )
    }
        
    //---------a voir cette fonction----------------
    //retourne la liste des formulaires projet
    get projets(): FormArray
    {
        return <FormArray> this.formPrj.get('projets');
    }
        
    //créer ou modifier les formulaires projet dans la db
    saveProjet(index: number)
    {
        if(this.projets.at(index).status == 'VALID')
        {
            let idCandidat  : number;
            let date1       : Date;
            let date2       : Date;
            let idProjet    : number = this.projets.at(index).get('idProjet')?.value;
            let formData    : any    = new FormData();
            formData.append("nom"       , this.projets.at(index).get("nomPrj")?.value);
            formData.append("type"      , this.projets.at(index).get("typePrj")?.value);
            formData.append("domaine"   , this.projets.at(index).get("domainePrj")?.value);
            date1 = this.projets.at(index).get("debutPrj")?.value;
            if(date1 != null) 
            { 
                formData.append("debut", formatDate(date1, 'yyyy-MM-dd', 'en_US')); 
            }
            date2 = this.projets.at(index).get("finPrj")?.value;
            if(date2 != null) 
            { 
                formData.append("fin", formatDate(date2, 'yyyy-MM-dd', 'en_US')); 
            }               
            formData.append("perso"     , this.projets.at(index).get("persoPrj")?.value);
            formData.append("pro"       , this.projets.at(index).get("proPrj")?.value);
            formData.append("entreprise", this.projets.at(index).get("entreprisePrj")?.value);
            formData.append("details"   , this.projets.at(index).get("textareaPrj")?.value);

            //créer et sauvegarder projet
            if(idProjet == null) 
            {   
                idCandidat = this.formCdt.get('idCandidat')?.value;
                this.candidatService.createProjet(idCandidat, formData.entries())
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
            else //modifier et sauvegarder projet
            {
                formData.append("idProjet", this.projets.at(index).get("idProjet"));
                this.candidatService.updateProjet(idProjet, formData.entries())
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
        }
    }


    //ajouter un formulaire projet à la liste projets
    addProjetFormToList()
    {
        this.projets.push(this.createEmptyProjetForm());
        this.switchFormPrjEnable(true);
    }

    deleteProjet(index: number)
    {
        let id = this.projets.at(index).get('idProjet')?.value;
        
        if(id != null)
        {
            this.candidatService.deleteProjet(id).subscribe
            ({
                next    : ()      => { this.removeProjetFromList(index);},
                error   : (error) => { console.log(error) },
                complete: ()      => { /*console.log("index: " + index + " - id: " + id);*/  }
            })
        }
        this.removeProjetFromList(index);
    }

    //retirer et effacer une projet
    removeProjetFromList(index: number)
    {
        (<FormArray>this.formPrj.get('projets')).removeAt(index);
    }

    //disable/enable la liste des formulaires projet
    switchFormPrjEnable(enabling?: boolean)
    {
        let switchOn! : boolean;
        if(enabling != null)
        {
            if(enabling == true) switchOn = true;
            else switchOn = false;
        }
        else
        {
            if(this.isDisabledPrjForm == true) switchOn = true;
            else switchOn = false;
        }

        if(switchOn == false)
        {
            for (let i = 0; i < this.projets.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formPrj.controls).forEach(key => { this.formPrj.controls[key].disable(); });
                }
            }
            this.isDisabledPrjForm = this.slidePrjChecked = true;
            this.sliderPrjTxt = 'formulaire non modifiable';
        }
        else
        {
            for (let i = 0; i < this.projets.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formPrj.controls).forEach(key => { this.formPrj.controls[key].enable(); });
                }
            }
            this.isDisabledPrjForm = this.slidePrjChecked = false;
            this.sliderPrjTxt = 'formulaire modifiable';
        }
    }

    //--------------------TAB DOCUMENT----------------------
    
    documents: [string, string[]] [] = [
        ["categorie 1",["document 1","document 2","document 3"]], 
        ["categorie 2",["document 4","document 5","document 6"]],
        ["categorie 3",["document 7","document 8","document 9"]]
        ]
    
    organiseDocumentsByCategorie()
    {
        let resultats : string[][]=
               [["categorie 1","document 1"],
                ["categorie 1","document 2"],
                ["categorie 1","document 3"],
                ["categorie 2","document 4"],
                ["categorie 2","document 5"],
                ["categorie 2","document 6"]];

        var cat = "";
        for(let i=0; i<resultats.length; i++)
        {
            if(cat != resultats[i][0]) 
            {
                //console.log(resultats[i][0]);
                this.documents[i].push(resultats[i][0]); console.log(resultats[i][0]);
            }
            //this.documents[i][1].push(resultats[i][1]); console.log(resultats[i][1]);
        }

    }


    //ajouter un document à la liste documents
    addDocument()
    {
        
    }

    //effacer un document de la liste des documents
    deleteDocument(index: number)
    {
        
    }

    viewDocument(index: number)
    {

    }


    /*
    //creer un formulaire document vide
    createEmptyDocForm(): FormGroup
    {   
        return this.fb.group
        ({
            idDoc        : [null],
            nomDoc       : ['', Validators.required],
            typeDoc      : [''],
            categorieDoc : [''],
            cheminDoc    : ['', Validators.required],            
        })
    }
    
    //creer un formulaire document rempli
    createFilledDocForm(idDoc: number | null, nom: String | null, type: String | null, categorie: String | null, chemin: String | null)
    {        
        this.documents.push
        (
            this.fb.group
            ({
                idDoc        : [idDoc, Validators.required],
                nomDoc       : [nom  , Validators.required],
                typeDoc      : [type],
                categorieDoc : [categorie],
                cheminDoc    : [chemin],
            })
        )
    }
        
    //---------a voir cette fonction----------------
    //retourne la liste des formulaires document
    get documents(): FormArray
    {
        return <FormArray> this.formDoc.get('documents');
    }
        
    //créer ou modifier les formulaires document dans la db
    saveDoc(index: number)
    {
        if(this.documents.at(index).status == 'VALID')
        {
            let idCandidat : number;            
            let idDoc      : number = this.documents.at(index).get('idDoc')?.value;
            let formData   : any    = new FormData();
            formData.append("nom"      , this.documents.at(index).get("nomDoc")?.value);
            formData.append("type"     , this.documents.at(index).get("typeDoc")?.value);
            formData.append("categorie", this.documents.at(index).get("categorieDoc")?.value);
            formData.append("chemin"   , this.documents.at(index).get("cheminDoc")?.value);

            //créer et sauvegarder document
            if(idDoc == null)
            {
                idCandidat = this.formCdt.get('idCandidat')?.value;
                this.candidatService.createDocument(idCandidat, formData.entries())
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
            else //modifier et sauvegarder document
            {
                formData.append("idDoc", this.documents.at(index).get("idDoc"));
                this.candidatService.updateDocument(idDoc, formData.entries())
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }
        }
    }

    

    //ajouter un formulaire document à la liste documents
    addDocFormToList()
    {
        this.documents.push(this.createEmptyDocForm());
        this.switchFormDocEnable(true);
    }

    deleteDoc(index: number)
    {
        let id = this.documents.at(index).get('idDoc')?.value;
        
        if(id != null)
        {
            this.candidatService.deleteDocument(id).subscribe
            ({
                next    : ()      => { this.removeDocFromList(index);},
                error   : (error) => { console.log(error) },
            })
        }
        this.removeDocFromList(index);
    }

    //retirer et effacer une projet
    removeDocFromList(index: number)
    {
        (<FormArray>this.formDoc.get('documents')).removeAt(index);
    }

    

    //disable/enable la liste des formulaires projet
    switchFormDocEnable(enabling?: boolean)
    {
        let switchOn! : boolean;
        if(enabling != null)
        {
            if(enabling == true) switchOn = true;
            else switchOn = false;
        }
        else
        {
            if(this.isDisabledDocForm == true) switchOn = true;
            else switchOn = false;
        }

        if(switchOn == false)
        {
            for (let i = 0; i < this.documents.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formDoc.controls).forEach(key => { this.formDoc.controls[key].disable(); });
                }
            }
            this.isDisabledDocForm = this.slideDocChecked = true;
            this.sliderDocTxt = 'formulaire non modifiable';
        }
        else
        {
            for (let i = 0; i < this.documents.length; i++)
            {                
                for (let j = 0; j < this.fb.group.length; j++)
                {
                    Object.keys(this.formDoc.controls).forEach(key => { this.formDoc.controls[key].enable(); });
                }
            }
            this.isDisabledDocForm = this.slideDocChecked = false;
            this.sliderDocTxt = 'formulaire modifiable';
        }
    }*/
    
    //--------------------TAB MATCHER-----------------------
}
