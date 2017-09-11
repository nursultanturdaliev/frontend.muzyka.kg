/**
 * Created by nursultan on 9/11/17.
 */
import {Component} from '@angular/core';
import {Team} from "../../Models/Team";
import {TeamMember} from '../../Models/TeamMember';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  public team:Team;

  constructor() {
    this.team = new Team();
    this.team.members.push(new TeamMember("Адилет", "Эгембердиев", "Программист",  "https://www.facebook.com/AdiletEgemberdievv", "","adilet.egemberdiev.jpg"));
    this.team.members.push(new TeamMember("Айкут", "Конушбаев", "Универсал",  "https://www.facebook.com/Aykut.Konushbai", "","aykut.konushbai.jpg"));
    this.team.members.push(new TeamMember("Бектур", "Өмүров", "Дизайнер",  "https://www.facebook.com/bekturomurov", "","bekturomurov.jpg"));
    this.team.members.push(new TeamMember("Нурсултан", "Турдалиев", "Программист",  "https://www.facebook.com/turdaliev.nursultan", "https://www.linkedin.com/in/nurolopher/","nursultan.turdaliev.jpg"));
    this.team.members.push(new TeamMember("Шерказы", "Кокумбаев", "Программист",  "https://www.facebook.com/sheki92m", "","sherkazy.kokumbaev.jpg"));
    this.team.members.push(new TeamMember("Аким", "Болушбек уулу", "Программист",  "https://www.facebook.com/akim.bolushbekuulu", "","akim.bolushbekuulu.jpg"));
  }
}
