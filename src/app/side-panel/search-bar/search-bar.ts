import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  imports: [FontAwesomeModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  public faGear = faGear;
  public faUser = faUser;
}
