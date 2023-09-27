import { Route } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { GameComponent } from './pages/game/game.component';

export const appRoutes: Route[] = [
    { path: "", component: StartComponent },
    { path: "game", component: GameComponent }
];
