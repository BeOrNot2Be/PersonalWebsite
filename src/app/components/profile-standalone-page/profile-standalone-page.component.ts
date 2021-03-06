import { Component, OnInit } from '@angular/core';
import { GithubProfile, Profile, ProfileLink } from '../../models/Profile';
import { ProfileService } from '../../services/profile.service';
import { LyIconService } from '@alyle/ui/icon';
import { shadowBuilder, LyTheme2, ThemeVariables } from '@alyle/ui';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigReaderService } from 'src/app/services/config-reader.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

const styles = (theme: ThemeVariables) => ({
  smbutton: {
    padding: '16px',
    textAlign: 'center',
    background: theme.background.default,
    height: '100%',
    borderRadius: '50px',
    boxShadow: '9px 9px 9px #cbcaca, -9px -9px 9px #ffffff',
    margin: 'auto auto'
  },
  paper: {
    display: 'block',
    position: 'relative',
    margin: 'auto auto',
    padding: '1em',
    background: theme.background.default,
    boxShadow: '9px 9px 9px #cbcaca, -9px -9px 9px #ffffff',
    borderRadius: '25px',
    maxWidth: '60vh'
  },
  iconListItem: {
    // textAlign: "center"
  },
  githubUsername: {
    color: '#ddd',
    fontWeight: 500,
    fontSize: '20px'
  },
  profileImage: {
    borderRadius: '20px!important',
    margin: 'auto auto',
    maxWidth: '180px',
    maxHeight: '180px',
    width: '100%',
    height: 'auto'
  },
  profileElement: {
    display: 'flex',
    height: '100%'
  },
  profileDescription: {
    margin: '1rem 0'
  },
  iconListItemComponent: {
    display: 'inline',
    verticalAlign: 'middle',
    wordBreak: 'break-word'
  },
  avatarContainer: {
    display: 'flex',
    height: '100%'
  },
  smbuttonContainer: {
    display: 'flex'
  },
  aboutMeButton: {
    textAlign: 'right',
    textDecoration: 'underline'
  },
  defaultAboutSectionStyle: {
    opacity: 0,
    paddingBottom: 0,
    overflow: 'hidden',
    maxHeight: 0
  },
  projectsButton: {
    color: '#eeeeee',
    background: '#252525',
    borderRadius: '50px',
    boxShadow: '9px 9px 9px #cbcaca, -9px -9px 9px #ffffff'
  },
  projectsButtonContainer: {
    textAlign: 'right'
  },
  iconContainer: {
    textAlign: 'right'
  }
});

@Component({
  selector: 'app-profile-standalone-page',
  templateUrl: './profile-standalone-page.component.html',
  styleUrls: ['./profile-standalone-page.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          maxHeight: '1000px'
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          overflow: 'hidden',
          maxHeight: 0
        })
      ),
      transition('open => closed', [animate('0.25s ease-out')]),
      transition('closed => open', [animate('0.25s ease-in')])
    ])
  ]
})
export class ProfileStandalonePageComponent implements OnInit {
  readonly classes = this.theme.addStyleSheet(styles);

  profile: Profile = new Profile();
  links: ProfileLink = new ProfileLink();
  aboutSectionIsOpen: boolean = false;

  constructor(
    private profileService: ProfileService,
    private configReaderService: ConfigReaderService,
    private theme: LyTheme2,
    private icon: LyIconService,
    private sanitizer: DomSanitizer
  ) {
    icon.setSvg(
      'linkedin',
      sanitizer.bypassSecurityTrustResourceUrl(
        './assets/socialmediaicons/045-linkedin'
      )
    );
    icon.setSvg(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl(
        './assets/socialmediaicons/038-github'
      )
    );
    icon.setSvg(
      'telegram',
      sanitizer.bypassSecurityTrustResourceUrl(
        './assets/socialmediaicons/029-telegram'
      )
    );
    icon.setSvg(
      'instagram',
      sanitizer.bypassSecurityTrustResourceUrl(
        './assets/socialmediaicons/025-instagram'
      )
    );
  }
  ngOnInit(): void {
    this.configReaderService.getProfile(this.profile);
    this.profileService.getProfile(this.profile);

    this.configReaderService.getLinks(this.links);
  }

  openTab(link: string): void {
    window.open(link);
  }

  toggleAboutSection() {
    this.aboutSectionIsOpen = !this.aboutSectionIsOpen;
  }

  public truncate(text: string): string {
    if (text.length > 600) {
      for (let i: number = 600; i > 0; i--) {
        if (text.slice(i) === '.') {
          text = text.slice(0, i);
          text += '..';
          break;
        } else if (text.slice(i) === ' ') {
          continue;
        } else {
          text = text.slice(0, i);
          text += '...';
          break;
        }
      }
    }
    return text;
  }
}
