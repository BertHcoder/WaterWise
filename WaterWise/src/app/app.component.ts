import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ToolbarModule, CardModule, TimelineModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'WaterWise';
}
