import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
import { MyEntity } from '../models/MyEntity';

@Component({
  selector   : 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls  : ['./candidat.component.scss']
})
export class CandidatComponent implements OnInit 
{  
    entity: MyEntity = new MyEntity(1,"label","level");
    prenomsListe : String[] = [];
    nomsListe    : String[] = [];
    nationsListe : String[] = [];
    
    formSearch! : FormGroup;
    formCdt!    : FormGroup;
    formEdu!    : FormGroup;
    formExp!    : FormGroup
    formCmp!    : FormGroup
    formLng!    : FormGroup
    formEtt!    : FormGroup
    formPrj!    : FormGroup
    formDoc!    : FormGroup
    
    txt = 'formulaire modifiable';
    
    candidat!         : Candidat;
    idCandidat!       : number;
    isDisabledCdtForm!: boolean;
    slideCdtChecked!  : boolean;
    sliderCdtTxt      = this.txt;
    
    isDisabledEduForm!: boolean;
    slideEduChecked!  : boolean;
    sliderEduTxt      = this.txt;
    
    isDisabledExpForm!: boolean;
    slideExpChecked!  : boolean;
    sliderExpTxt      = this.txt;
    
    isDisabledCmpForm!: boolean;
    slideCmpChecked!  : boolean;
    sliderCmpTxt      = this.txt;
    
    isDisabledLngForm!: boolean;
    slideLngChecked!  : boolean;
    sliderLngTxt      = this.txt;
    
    isDisabledEttForm!: boolean;
    slideEttChecked!  : boolean;
    sliderEttTxt      = this.txt;
    
    isDisabledPrjForm!: boolean;
    slidePrjChecked!  : boolean;
    sliderPrjTxt      = this.txt;
    
    isDisabledDocForm!: boolean;
    slideDocChecked!  : boolean;
    sliderDocTxt      = this.txt;
    
    
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

        this.candidatService.getCandidatsPrenoms().subscribe(reponse => { this.prenomsListe = reponse; })
        this.candidatService.getCandidatsNoms().subscribe(reponse => { this.nomsListe = reponse; })
        this.candidatService.getPays()
        .subscribe(reponse => { reponse.forEach(element => {this.nationsListe.push(element.nationnalite) })});
    }

    //--------------------TAB CANDIDAT----------------------

    createFormCandidatFilled(candidat: Candidat): FormGroup
    {
        let ville = '';
        let postal = '';
        if(candidat.ville != null) 
        {
            ville = candidat.ville.ville;
            postal = candidat.ville.postal;
        }

        let linkedin = '';
        let github = '';
        if(candidat.pseudos.length > 0)
        {            
            if(candidat.pseudos[0] != null) 
            {
                if(candidat.pseudos[0].reseau.reseau=="Linkedin")    linkedin = candidat.pseudos[0].pseudo;
                else if(candidat.pseudos[0].reseau.reseau=="Github") github   = candidat.pseudos[0].pseudo;
            }
            if(candidat.pseudos[1] != null)
            {
                if(candidat.pseudos[1].reseau.reseau=="Linkedin")    linkedin = candidat.pseudos[1].pseudo;
                else if(candidat.pseudos[1].reseau.reseau=="Github") github   = candidat.pseudos[1].pseudo;
            }
        }

        let mobilite = 0;
        if(candidat.mobilite != null) mobilite = candidat.mobilite.zone;
        
        let nationnalite = '';
        if(candidat.pays != null) nationnalite = candidat.pays.nationnalite;


        return this.fb.group
        ({
            prenom1Cdt    : [''                  , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]        ],
            nom1Cdt       : [''                  , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]        ],
            idCandidat    : [candidat.idCandidat , [Validators.required]                                                    ],
            prenom2Cdt    : [candidat.prenom     , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]        ],
            nom2Cdt       : [candidat.nom        , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]        ],
            telMobCdt     : [candidat.mob        , [Validators.required, Validators.pattern("^[0-9\\-_ +()]*$")]            ],
            emailCdt      : [candidat.email      , [Validators.required, Validators.pattern("^[0-9A-Za-z'\\-_ .@]*$")]      ],
            adresseCdt    : [candidat.adresse    , [Validators.required, Validators.pattern("^[0-9A-Za-zÀ-ÿ'\\-_ ]*$")]     ],
            adresse2Cdt   : [candidat.adresse2   , [Validators.required, Validators.pattern("^[0-9A-Za-zÀ-ÿ'\\-_ ]*$")]     ],
            villeCdt      : [ville               , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]        ],
            postalCdt     : [postal              , [Validators.required, Validators.pattern("^[0-9A-Za-z'\\-_ ]*$")]        ],
            salaireCdt    : [candidat.salaire    , [Validators.required]                                                    ],
            linkedinCdt   : [linkedin            , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ .]*$")]       ],
            githubCdt     : [github              , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ .]*$")]       ],
            mobiliteCdt   : [mobilite            , [Validators.required]                                                    ],
            nationCdt     : [nationnalite        , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]        ],
            situationCdt  : [candidat.marital    , [Validators.required]                                                    ],
            handicapCdt   : [candidat.handicape  , [Validators.required]                                                    ],
            teletravailCdt: [candidat.teletravail, [Validators.required]                                                    ],
            permisCdt     : [candidat.permis     , [Validators.required]                                                    ],
            vehiculeCdt   : [candidat.vehicule   , [Validators.required]                                                    ],
            dispoCdt      : [candidat.disponible , [Validators.required]                                                    ],
            textareaCdt   : [candidat.info       , [Validators.required, Validators.pattern("^[0-9A-Za-zÀ-ÿ'\\-_ ?!.+=]*$")]]
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
            mobiliteCdt   : '', 
            handicapCdt   : '', 
            teletravailCdt: '', 
            permisCdt     : '', 
            vehiculeCdt   : '',
            dispoCdt      : '',
            textareaCdt   : ''
        });
    }

    updateCandidat()
    {        
        let idCandidat: number = this.formCdt.get('idCandidat')?.value;
        
        let requete = {                        
            "prenom": this.formCdt.get('prenom2Cdt')?.value,
            "nom": this.formCdt.get('nom2Cdt')?.value,
            "naissance": null,
            "email": this.formCdt.get('emailCdt')?.value,
            "fixe": null,
            "mob": this.formCdt.get('telMobCdt')?.value,
            "adresse": this.formCdt.get('adresseCdt')?.value,
            "adresse2": this.formCdt.get('adresse2Cdt')?.value,
            "ville": 
            {
                "ville": this.formCdt.get('villeCdt')?.value,
                "postal": this.formCdt.get('postalCdt')?.value
            },
            "pays": 
            {
                "nationnalite": this.formCdt.get('nationCdt')?.value,
            },
            "mobilite": 
            {
                "zone": this.formCdt.get('mobiliteCdt')?.value,
            },
            "pseudos": 
            [
                {                   
                    "pseudo": this.formCdt.get('linkedinCdt')?.value,
                    "reseau":{
                        "reseau": "Linkedin"
                    }
                },
                {
                    "pseudo": this.formCdt.get('githubCdt')?.value,
                    "reseau": {                     
                        "reseau": "Github"
                    }
                }
            ],
            "salaire": null,
            "marital": this.formCdt.get('situationCdt')?.value,
            "handicape": this.formCdt.get('handicapCdt')?.value,
            "permis": this.formCdt.get('permisCdt')?.value,
            "vehicule": this.formCdt.get('vehiculeCdt')?.value,
            "teletravail": this.formCdt.get('teletravailCdt')?.value,
            "disponible": this.formCdt.get('dispoCdt')?.value,
            "info": this.formCdt.get('textareaCdt')?.value,
        } 
        //modifier et sauvegarder un candidat 
        if(idCandidat != null) 
        {               
            this.candidatService.updateCandidat(idCandidat, requete)
            .subscribe
            ({
                next : (response) => { console.log(response); },
                error: (error)    => { console.log(error);    }
            });
        }
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
                idEducation : [ education.idEducation     , [Validators.required]                                                  ],
                diplomeEdu  : [ education.diplome.label   , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]      ],
                domaineEdu  : [ education.specialite.label, [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]      ],
                obtenuEdu   : [ education.recu            , [Validators.required]                                                  ],
                lieuEdu     : [ education.lieu            , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]      ],
                ecoleEdu    : [ education.ecole           , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]      ],
                debutEdu    : [ education.debut           , [Validators.required]                                                  ],
                finEdu      : [ education.fin             , [Validators.required]                                                  ],
                textareaEdu : [ education.info            , [Validators.required, Validators.pattern("^[0-9A-Za-zÀ-ÿ'\\-_ ?!.]*$")]]
            })
        )
    }
    
    //retourne la liste des formulaires education
    get educations(): FormArray
    {
        return <FormArray> this.formEdu.get('educations');
    }

    saveEducation(index: number)
    {
        if(this.educations.at(index).status == 'VALID')
        {
            let idCandidat  : number;
            let date1!      : Date;
            let date2!      : Date;
            let strDate1!   : string;
            let strDate2!   : string;
            let idEducation : number = this.educations.at(index).get('idEducation')?.value;
            
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
        else
        {

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
            idExperience  : null,
            debutExp      : null,
            finExp        : null,
            lieuExp       : '',
            missionExp    : '',
            entrepriseExp : '',
            textareaExp   : ''
        })
    }
    
    //creer un formulaire experience rempli
    createFilledExperienceForm(experience : Experience)
    {      
        this.experiences.push
        (
            this.fb.group
            ({
                idExperience  : [experience.idExperience            , [Validators.required]                                                  ],
                debutExp      : [experience.debut                   , [Validators.required]                                                  ],
                finExp        : [experience.fin                     , [Validators.required]                                                  ],
                lieuExp       : [experience.lieu                    , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]      ],
                missionExp    : [experience.mission.profession      , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]      ],
                entrepriseExp : [experience.entreprise.raisonSociale, [Validators.required, Validators.pattern("^[0-9A-Za-z'\\-_ .]*$")]     ],
                textareaExp   : [experience.info                    , [Validators.required, Validators.pattern("^[0-9A-Za-zÀ-ÿ'\\-_ ?!.]*$")]],
            })
        )
    }
        
    //retourne la liste des formulaires expérience
    get experiences(): FormArray
    {
        return <FormArray> this.formExp.get('experiences');
    }
        
    //créer ou modifier les formulaires expérience dans la base de données
    saveExperience(index: number)
    {
        if(this.experiences.at(index).status == 'VALID')
        {
            let idCandidat   : number;
            let debutStr!    : string;
            let finStr!      : string;
            let debut        : Date   = this.experiences.at(index).get("debutExp")?.value;
            let fin          : Date   = this.experiences.at(index).get("finExp")?.value;
            let idExperience : number = this.experiences.at(index).get('idExperience')?.value;

            if(debut != null) 
            { 
                debutStr = formatDate(debut, 'yyyy-MM-dd', 'en_US');
            };
        
            if(fin != null) 
            { 
                finStr = formatDate(fin, 'yyyy-MM-dd', 'en_US');
            };

            let requete = {
                "debut": debutStr,
                "fin"  : finStr,
                "lieu" : this.experiences.at(index).get("lieuExp")?.value,
                "info" : this.experiences.at(index).get("textareaExp")?.value,
                "mission": {
                    "profession": this.experiences.at(index).get("missionExp")?.value,
                },
                "entreprise": {
                    "raisonSociale": this.experiences.at(index).get("entrepriseExp")?.value,
                }
            } 

            //créer et sauvegarder experience
            if(idExperience == null) 
            {   
                idCandidat = this.formCdt.get('idCandidat')?.value;
                this.candidatService.createExperience(idCandidat, requete)
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }

            //modifier et sauvegarder experience
            else 
            {
                this.candidatService.updateExperience(idExperience, requete)
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
                idCompetence : [competence.idCompetence, [Validators.required]                                                  ],
                competenceCmp: [competence.nom         , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ ]*$")]      ],
                niveauCmp    : [competence.niveau      , [Validators.required]                                                  ],
                typeCmp      : [competence.type        , [Validators.required]                                                  ],
                textareaCmp  : [competence.info        , [Validators.required, Validators.pattern("^[0-9A-Za-zÀ-ÿ'\\-_ ?!.]*$")]],
            })
        )
    }
        
    //retourne la liste des formulaires compétence
    get competences(): FormArray
    {
        return <FormArray> this.formCmp.get('competences');
    }
        
    //créer ou modifier les formulaires compétence dans la base de données
    saveCompetence(index: number)
    {
        if(this.competences.at(index).status == 'VALID')
        {
            let idCandidat   : number;           
            let idCompetence : number = this.competences.at(index).get('idCompetence')?.value;

            let requete = {
                "nom"   :  this.competences.at(index).get("competenceCmp")?.value,
                "niveau": this.competences.at(index).get("niveauCmp")?.value,
                "type"  : this.competences.at(index).get("typeCmp")?.value,
                "info"  : this.competences.at(index).get("textareaCmp")?.value
            }
            
            //créer et sauvegarder une competence
            if(idCompetence == null) 
            {   
                idCandidat = this.formCdt.get('idCandidat')?.value;
                this.candidatService.createCompetence(idCandidat, requete)
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log("erreur : "+error);    }
                });
            }
            
            //modifier et sauvegarder une competence
            else 
            {
                this.candidatService.updateCompetence(idCompetence, requete)
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
                complete: ()      => { }
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
                idLangue         : [langue.idLangue     , [Validators.required]                                                  ],
                langueLng        : [langue.nom          , [Validators.required, Validators.pattern('')]                          ],
                niveauLng        : [langue.niveau       , [Validators.required]                                                  ],
                certificationLng : [langue.certification, [Validators.required]                                                  ],
                textareaLng      : [langue.info         , [Validators.required, Validators.pattern("^[0-9A-Za-zÀ-ÿ'\\-_ ?!.]*$")]],
            })
        )
    }
        
    //retourne la liste des formulaires langue
    get langues(): FormArray
    {
        return <FormArray> this.formLng.get('langues');
    }
        
    //créer ou modifier les formulaires langue dans la base de données
    saveLangue(index: number)
    {
        if(this.langues.at(index).status == 'VALID')
        {
            let idCandidat : number;
            let idLangue   : number = this.langues.at(index).get('idLangue')?.value;

            let requete = {
                "nom"          : this.langues.at(index).get('langueLng')?.value,
                "niveau"       : this.langues.at(index).get('niveauLng')?.value,
                "certification": this.langues.at(index).get('certificationLng')?.value,
                "info"         : this.langues.at(index).get('textareaLng')?.value
            }

            //créer et sauvegarder une langue
            if(idLangue == null) 
            {   
                idCandidat = this.formCdt.get('idCandidat')?.value;
                this.candidatService.createLangue(idCandidat, requete)
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }

            //modifier et sauvegarder une langue
            else 
            {
                this.candidatService.updateLangue(idLangue, requete)
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
                complete: ()      => {  }
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
                idEntretien   : [entretien.idEntretien     , [Validators.required]                                                  ],
                dateEtt       : [entretien.date            , [Validators.required]                                                  ],
                lieuEtt       : [entretien.lieu            , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ .]*$")]     ],
                nomRctrEtt    : [entretien.recruteur.nom   , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ .]*$")]     ],
                prenomRctrEtt : [entretien.recruteur.prenom, [Validators.required, Validators.pattern("^[0-9A-Za-zÀ-ÿ'\\-_ .]*$")]  ],
                missionEtt    : [entretien.poste           , [Validators.required, Validators.pattern("^[0-9A-Za-zÀ-ÿ'\\-_ .]*$")]  ],
                contratEtt    : [entretien.contrat         , [Validators.required]                                                  ],
                textareaEtt   : [entretien.resume          , [Validators.required, Validators.pattern("^[0-9A-Za-zÀ-ÿ'\\-_ ?!.]*$")]],
            })
        )
    }
        
    //retourne la liste des formulaires entretien
    get entretiens(): FormArray
    {
        return <FormArray> this.formEtt.get('entretiens');
    }
        
    //créer ou modifier les formulaires entretien dans la base de données
    saveEntretien(index: number)
    {
        if(this.entretiens.at(index).status == 'VALID')
        {
            let idCandidat  : number;
            let dateStr!    : string;
            let date        : Date   = this.entretiens.at(index).get("dateEtt")?.value;
            let idEntretien : number = this.entretiens.at(index).get('idEntretien')?.value;            
            
            if(date != null) 
            { 
                dateStr = formatDate(date, 'yyyy-MM-dd', 'en_US');
            }            
                
            let requete = {
                "date"     : dateStr,
                "lieu"     : this.entretiens.at(index).get("lieuEtt")?.value,
                "poste"    : this.entretiens.at(index).get("missionEtt")?.value,
                "contrat"  : this.entretiens.at(index).get("contratEtt")?.value,
                "resume"   : this.entretiens.at(index).get("textareaEtt")?.value,
                "recruteur": {
                    "prenom": this.entretiens.at(index).get("prenomRctrEtt")?.value,               
                    "nom"   : this.entretiens.at(index).get("nomRctrEtt")?.value,
                }
            }

            //créer et sauvegarder experience
            if(idEntretien == null) 
            {   
                idCandidat = this.formCdt.get('idCandidat')?.value;
                this.candidatService.createEntretien(idCandidat, requete)
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }

            //modifier et sauvegarder experience
            else 
            {
                this.candidatService.updateEntretien(idEntretien, requete)
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
                idProjet      : [projet.idProjet    , [Validators.required]                                             ],
                nomPrj        : [projet.nom         , [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ .]*$")]],
                typePrj       : [projet.type        , [Validators.required]                                             ],
                domainePrj    : [projet.activite.nom, [Validators.required, Validators.pattern("^[A-Za-zÀ-ÿ'\\-_ .]*$")]],
                debutPrj      : [projet.debut       , [Validators.required]                                             ],            
                finPrj        : [projet.fin         , [Validators.required]                                             ],
                textareaPrj   : [projet.info        , [Validators.required, Validators.pattern("^[0-9A-Za-zÀ-ÿ'\\-_ ?!.]*$")]],
            })
        )
    }
        
    //retourne la liste des formulaires projet
    get projets(): FormArray
    {
        return <FormArray> this.formPrj.get('projets');
    }
        
    //créer ou modifier les formulaires projet dans la base de données
    saveProjet(index: number)
    {
        if(this.projets.at(index).status == 'VALID')
        {
            let idCandidat : number;
            let debutStr!  : string;
            let finStr!    : string;
            let debut      : Date   = this.projets.at(index).get("debutPrj")?.value;
            let fin        : Date   = this.projets.at(index).get("finPrj")?.value;
            let idProjet   : number = this.projets.at(index).get("idProjet")?.value;

            if(debut != null) 
            { 
                debutStr = formatDate(debut, 'yyyy-MM-dd', 'en_US');
            };
        
            if(fin != null) 
            { 
                finStr = formatDate(fin, 'yyyy-MM-dd', 'en_US');
            };

            let requete = {
                "nom"  : this.projets.at(index).get("nomPrj")?.value,
                "type" : this.projets.at(index).get("typePrj")?.value,
                "debut": debutStr,
                "fin"  : finStr,
                "info" : this.projets.at(index).get("textareaPrj")?.value,
                "activite": {
                    "nom": this.projets.at(index).get("domainePrj")?.value,
                }
            }        

            //créer et sauvegarder un projet
            if(idProjet == null) 
            {   
                idCandidat = this.formCdt.get('idCandidat')?.value;
                this.candidatService.createProjet(idCandidat, requete)
                .subscribe
                ({
                    next : (response) => { console.log(response); },
                    error: (error)    => { console.log(error);    }
                });
            }

            //modifier et sauvegarder un projet
            else 
            {
                this.candidatService.updateProjet(idProjet, requete)
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
                complete: ()      => { }
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
        ["Cv",["cv n°1"]], 
        ["Lettre de motivation",["lettre n°1"]],
        ["Diplôme",["copie diplome n°1","copie diplome n°2","copie diplome n°3"]],
        ["Pièce d'identité",["carte d'identité recto","carte d'identité verso"]]]

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
