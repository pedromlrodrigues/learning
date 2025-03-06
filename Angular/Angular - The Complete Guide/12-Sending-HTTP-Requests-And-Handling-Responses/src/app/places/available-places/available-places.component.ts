import { Component, DestroyRef, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  places = signal<Place[] | undefined>(undefined);

  ngOnInit() {
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .subscribe({
        next: (res) => this.places.set(res.places),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
