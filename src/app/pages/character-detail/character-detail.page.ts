import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ShareModule]
})
export class CharacterDetailPage implements OnInit {

  characterId: string= "";
  character = null as any;
  episodes: any[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private rickAndMortySvc: RickAndMortyService
  ) { 
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string
    console.log(this.characterId);
  }

  ngOnInit() {
  }

ionViewWillEnter() {
  this.getCharacter()
}

  getCharacter(){
  

    this.rickAndMortySvc.getCharacterById(this.characterId).subscribe({

  next: (res: any) => {

  
    this.character = res;
    this.getEpisodes();
  
  },
  error: (error: any) => {
    
  }


    })
  }

  getEpisodes(){
  
    for(let url of this.character.episode){

      this.rickAndMortySvc.getByUrl(url).subscribe({

        next: (res: any) => {
      
       console.log(res);
       this.episodes.push(res)
        
        },
        error: (error: any) => {
          
        }
      
      
          })
    }
    
  }

}
