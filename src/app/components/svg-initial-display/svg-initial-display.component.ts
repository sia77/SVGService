import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SvgService } from '../../services/svg.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { heroArrowLeft, heroArrowRight } from '@ng-icons/heroicons/outline';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-svg-initial-display',
  imports: [NgIcon, MatButtonModule],
  providers: [provideIcons({ heroArrowLeft, heroArrowRight })],

  templateUrl: './svg-initial-display.component.html',
  styleUrl: './svg-initial-display.component.scss'
})
export class SvgInitialDisplayComponent {

  svgContent!:SafeHtml;
  svgRawString:string = "";

  constructor(
    private svgService: SvgService,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.svgService.svg$.subscribe(svg => {
      if(svg){
        this.svgRawString = svg;
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(this.svgRawString);
      }
    });
    this.canGoBack();
    this.canGoForward();
  }

  canGoBack(){    
    return this.svgService.canGoBack();
  }

  canGoForward(){
    return this.svgService.canGoForward()
  }

  goBack(){
    this.svgService.goBack();
  }

  goForward(){
    this.svgService.goForward();
  }

}
