import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidat } from '../models/Candidat';
import { CandidatService } from '../services/candidat.service';
import { formatDate } from '@angular/common';
import { Document } from '../models/Document';
import { Education } from '../models/Education';
import { Experience } from '../models/Experience';
import { Projet } from '../models/Projet';
import { Entretien } from '../models/Entretien';
import { Competence } from '../models/Competence';
import { Langue } from '../models/Langue';

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
        this.formEdu    = this.fb.group({educations : this.fb.array([ this.createEmptyEducationForm()  ])});
        this.formExp    = this.fb.group({experiences: this.fb.array([ this.createEmptyExperienceForm() ])});
        this.formCmp    = this.fb.group({competences: this.fb.array([ this.createEmptyCompetenceForm() ])});
        this.formLng    = this.fb.group({langues    : this.fb.array([ this.createEmptyLangueForm()     ])});
        this.formEtt    = this.fb.group({entretiens : this.fb.array([ this.createEmptyEntretienForm()  ])});
        this.formPrj    = this.fb.group({projets    : this.fb.array([ this.createEmptyProjetForm()     ])});
        this.formDoc    = this.fb.group({'nomDoc':[''], 'categorieDoc':['']});
        //this.formDoc    = this.fb.group({documents  : this.fb.array([ this.createEmptyDocForm()])});        
    
        this.idCandidat = Number(this.route.snapshot.paramMap.get('id'))
        if(this.idCandidat !== 0)
        {
            this.candidatService.getCandidat(this.idCandidat)
            .subscribe
            ({ 
                next : (candidat) => 
                {                     
                    this.formCdt = this.createFormCandidatFilled(candidat); 
                    this.switchFormCdtEnable(false); //disabled les inputs du formulaire
                    
                    if(candidat.educations.length > 0) 
                    {
                        this.removeEducationFromList(0); //supprimer le formulaire vide
                        for(let i = 0; i < candidat.educations.length; i++)
                        {
                            this.createFilledEducationForm(candidat.educations[i]);
                        }
                        this.switchFormEduEnable(false); //disabled les inputs du formulaire
                    }

                    if(candidat.experiences.length > 0) 
                    {
                        this.removeExperienceFromList(0); //supprimer le formulaire vide
                        for(let i = 0; i < candidat.experiences.length; i++)
                        {
                            this.createFilledExperienceForm(candidat.experiences[i]);
                        }
                        this.switchFormExpEnable(false); //disabled les inputs du formulaire
                    }

                    if(candidat.projets.length > 0) 
                    {
                        this.removeProjetFromList(0); //supprimer le formulaire vide
                        for(let i = 0; i < candidat.projets.length; i++)
                        {
                            this.createFilledProjetForm(candidat.projets[i]);
                        }
                        this.switchFormPrjEnable(false); //disabled les inputs du formulaire
                    }

                    if(candidat.entretiens.length > 0) 
                    {
                        this.removeEntretienFromList(0); //supprimer le formulaire vide
                        for(let i = 0; i < candidat.entretiens.length; i++)
                        {
                            this.createFilledEntretienForm(candidat.entretiens[i]);
                        }
                        this.switchFormEttEnable(false); //disabled les inputs du formulaire
                    }

                    if(candidat.competences.length > 0) 
                    {
                        this.removeCompetenceFromList(0); //supprimer le formulaire vide
                        for(let i = 0; i < candidat.competences.length; i++)
                        {
                            this.createFilledCompetenceForm(candidat.competences[i]);
                        }
                        this.switchFormCmpEnable(false); //disabled les inputs du formulaire
                    }

                    if(candidat.langues.length > 0) 
                    {
                        this.removeLangueFromList(0); //supprimer le formulaire vide
                        for(let i = 0; i < candidat.langues.length; i++)
                        {
                            this.createFilledLangueForm(candidat.langues[i]);
                        }
                        this.switchFormLngEnable(false); //disabled les inputs du formulaire
                    }
                },
                error : () => { },
            })
        }
        else
        {
            //enabled form inputs
            this.switchFormCdtEnable(true); 
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
        console.log(candidat);
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
            villeCdt      : candidat.ville.ville,
            postalCdt     : candidat.ville.postal,
            salaireCdt    : candidat.salaire,
            linkedinCdt   : candidat.pseudos[0].pseudo,
            githubCdt     : candidat.pseudos[1].pseudo,
            mobilCdt      : candidat.mobilite.zone,
            nationCdt     : candidat.pays.nationnalite,
            situationCdt  : candidat.marital,
            handicapCdt   : candidat.handicape,
            teletravailCdt: candidat.teletravail,
            permisCdt     : candidat.permis,
            vehiculeCdt   : candidat.vehicule,
            dispoCdt      : candidat.disponible,
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
            linkedinCdt   : '',
            githubCdt     : '',
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
        this.candidatService.getCandidatByName(this.formSearch.get('prenom1Cdt')?.value,this.formSearch.get('nom1Cdt')?.value)
        .subscribe
        ({ 
            next     : (candidat) => { if(candidat!=null) this.router.navigate(['/candidat/' + candidat.idCandidat]).then(() => { window.location.reload(); });},
            error    : ()         => {  },
            complete : ()         => {  } 
        })        
    }

    switchFormCdtEnable(enabling?: boolean)
    {
        if(enabling == false || this.isDisabledCdtForm == false)
        {            
            for (let j = 0; j < this.fb.group.length; j++)
            {
                Object.keys(this.formCdt.controls).forEach(key => { this.formCdt.controls[key].disable(); });
            }
            this.isDisabledCdtForm = this.slideCdtChecked = true;
            this.sliderCdtTxt = 'formulaire non modifiable';
        }
        else
        {             
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
            idEducation : null,
            diplomeEdu  : '',
            domaineEdu  : '',
            obtenuEdu   : false,
            lieuEdu     : '',
            ecoleEdu    : '',
            debutEdu    : null,
            finEdu      : null,
            textareaEdu : ''
        })
    }
    
    //creer un formulaire education rempli
    createFilledEducationForm(education : Education)
    {       
        this.educations.push
        (
            this.fb.group
            ({
                idEducation : [education.idEducation     , Validators.required],
                diplomeEdu  : [education.diplome.label   , Validators.required],
                domaineEdu  : [education.specialite.label, Validators.required],
                obtenuEdu   : [education.recu                                 ],
                lieuEdu     : [education.lieu                                 ],
                ecoleEdu    : [education.ecole                                ],
                debutEdu    : [education.debut                                ],
                finEdu      : [education.fin                                  ],
                textareaEdu : [education.info                                 ]
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
            let strDate1!  : string;
            let strDate2!  : string;
            let idEducation: number = this.educations.at(index).get('idEducation')?.value;
            
            date1 = this.educations.at(index).get("debutEdu")?.value;
            if(date1 != null) { strDate1 = formatDate(date1, 'yyyy-MM-dd', 'en_US'); };

            date2 = this.educations.at(index).get("finEdu")?.value;
            if(date2 != null) { strDate2 = formatDate(date2, 'yyyy-MM-dd', 'en_US'); };

            let requete = {
                "recu"      : this.educations.at(index).get("obtenuEdu")?.value,
                "lieu"      : this.educations.at(index).get("lieuEdu")?.value,
                "ecole"     : this.educations.at(index).get("ecoleEdu")?.value,               
                "debut"     : strDate1,
                "fin"       : strDate2,
                "info"      : this.educations.at(index).get("textareaEdu")?.value,
                "specialite": {
                    "label": this.educations.at(index).get("domaineEdu")?.value
                },
                "diplome": {                    
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
            //update education
            else
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
                next    : ()      => { this.removeEducationFromList(index);},
                error   : (error) => { console.log(error) },
                complete: ()      => { }
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
    
    getAllEducations()
    {
        for (let i = 0; i < this.educations.length; i++)
        {
            console.log(this.educations.at(i).get('diplomeEdu')?.value);
        }
    }

    
    //--------------------TAB EXPERIENCE--------------------

    //creer un formulaire experience vide
    createEmptyExperienceForm(): FormGroup
    {   
        return this.fb.group
        ({
            idExperience : null,
            missionExp   : '',
            entrepriseExp: '',
            villeExp     : '',
            paysExp      : '',            
            debutExp     : null,
            finExp       : null,
            textareaExp  : ''
        })
    }
    
    //creer un formulaire experience rempli
    createFilledExperienceForm(experience : Experience)
    {      
        this.experiences.push
        (
            this.fb.group
            ({
                idExperience  : [experience.idExperience            , Validators.required],
                missionExp    : [experience.mission.profession      , Validators.required],
                entrepriseExp : [experience.entreprise.raisonSociale, Validators.required],
                villeExp      : [experience.entreprise.ville.ville                       ],
                paysExp       : [experience.entreprise.ville.pays.pays                   ],
                debutExp      : [experience.debut                                        ],
                finExp        : [experience.fin                                          ],
                textareaExp   : [experience.info                                         ]
            })
        )
    }
        
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
            let idCandidat   : number;
            let date1!       : Date;
            let date2!       : Date;
            let idExperience : number = this.experiences.at(index).get('idExperience')?.value;
            let formData     : any    = new FormData();
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
            //modifier et sauvegarder experience
            else 
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
                next    : ()      => { this.removeExperienceFromList(index); },
                error   : (error) => { console.log(error) },
                complete: ()      => { }
            })
        }
        this.removeExperienceFromList(index);
    }

    //retirer et effacer une experience
    removeExperienceFromList(index: number)
    {
        (<FormArray>this.formExp.get('experiences')).removeAt(index);
    }

    //disable-enable la liste des formulaires experience
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
            idCompetence : null,
            competenceCmp: '',
            niveauCmp    : '',
            typeCmp      : '',
            textareaCmp  : ''
        })
    }
    
    //creer un formulaire compétence rempli
    createFilledCompetenceForm(competence : Competence)
    {     
        this.competences.push
        (
            this.fb.group
            ({
                idCompetence : [competence.idCompetence, Validators.required],
                competenceCmp: [competence.nom         , Validators.required],
                niveauCmp    : [competence.niveau                           ],
                typeCmp      : [competence.type                             ],
                textareaCmp  : [competence.info                             ]
            })
        )
    }
        
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
            //modifier et sauvegarder compétence
            else
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

    //disable-enable la liste des formulaires compétence
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
            idLangue         : null,
            langueLng        : '',
            niveauLng        : '',
            certificationLng : '',
            textareaLng      : ''
        })
    }
    
    //creer un formulaire langue rempli
    createFilledLangueForm(langue : Langue)
    {     
        this.langues.push
        (
            this.fb.group
            ({
                idLangue         : [langue.idLangue, Validators.required],
                langueLng        : [langue.nom     , Validators.required],
                niveauLng        : [langue.niveau                       ],
                certificationLng : [langue.certification                ],
                textareaLng      : [langue.info                         ]
            })
        )
    }
        
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

    //disable-enable la liste des formulaires langue
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
            idEntretien   : null,
            dateEtt       : '',
            lieuEtt       : '',
            evaluationEtt : '',
            nomRctrEtt    : '',
            prenomRctrEtt : '',           
            missionEtt    : null,
            contratEtt    : null,
            textareaEtt   : ''
        })
    }
    
    //creer un formulaire entretien rempli
    createFilledEntretienForm(entretien : Entretien)
    {        
        this.entretiens.push
        (
            this.fb.group
            ({
                idEntretien   : [entretien.idEntretien     , Validators.required],
                dateEtt       : [entretien.date            , Validators.required],
                lieuEtt       : [entretien.lieu                                 ],
                evaluationEtt : [entretien.evaluation                           ],
                nomRctrEtt    : [entretien.recruteur.nom   , Validators.required],
                prenomRctrEtt : [entretien.recruteur.prenom, Validators.required],
                missionEtt    : [entretien.poste                                ],
                contratEtt    : [entretien.contrat                              ],
                textareaEtt   : [entretien.resume                               ]
            })
        )
    }
        
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
                complete: ()      => {  }
            })
        }
        this.removeEntretienFromList(index);
    }

    //retirer et effacer une entretien
    removeEntretienFromList(index: number)
    {
        (<FormArray>this.formEtt.get('entretiens')).removeAt(index);
    }

    //disable-enable la liste des formulaires entretiens
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
            idProjet     : null,
            nomPrj       : '',
            typePrj      : '',
            domainePrj   : '',
            debutPrj     : null,            
            finPrj       : null,
            entreprisePrj: '',
            textareaPrj  : ''
        })
    }
    
    //creer un formulaire projet rempli
    createFilledProjetForm(projet : Projet)
    {        
        this.projets.push
        (
            this.fb.group
            ({
                idProjet      : [projet.idProjet, Validators.required],
                nomPrj        : [projet.nom     , Validators.required],
                typePrj       : [projet.type                         ],
                domainePrj    : [projet.activite.nom                 ],
                debutPrj      : [projet.debut                        ],            
                finPrj        : [projet.fin                          ],
                entreprisePrj : [projet.entreprise                   ],
                textareaPrj   : [projet.info                         ]
            })
        )
    }
        
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

    //disable-enable la liste des formulaires projet
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
        ["categorie 3",["document 7","document 8","document 9"]]]
    
    organiseDocumentsByCategorie()
    {
        let resultats : string[][] = [
            ["categorie 1","document 1"],
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

    
    /*//creer un formulaire document vide
    createEmptyDocForm(): FormGroup
    {   
        return this.fb.group
        ({
            idDoc        : null,
            nomDoc       : '',
            pathDoc      : '',
            typeDoc      : '',
            categorieDoc : '',            
        })
    }
    
    //creer un formulaire document rempli
    createFilledDocForm(document : Document)
    {        
        this.documents.push
        (
            this.fb.group
            ({
                idDoc        : [document.idDocument, Validators.required],
                nomDoc       : [document.nom       , Validators.required],
                pathDoc      : [document.path                           ],
                typeDoc      : [document.type                           ],
                categorieDoc : [document.categorie.label                ]
            })
        )
    }
        
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
            //modifier et sauvegarder document
            else 
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

    //disable-enable la liste des formulaires projet
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
