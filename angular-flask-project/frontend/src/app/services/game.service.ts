import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Tile {
  type: string;
  x: number;
  y: number;
  object?: {
    type: string;
    subtype?: string;
    owner?: string;
  };
  explored: boolean;
  visible: boolean;
}

export interface Hero {
  id: string;
  name: string;
  position: { x: number; y: number };
  stats: {
    attack: number;
    defense: number;
    power: number;
    knowledge: number;
    movement_points: number;
    movement_points_left: number;
  };
  army: Array<{ type: string; count: number }>;
  artifacts: Array<{ id: string; name: string; slot: string }>;
}

export interface City {
  id: string;
  name: string;
  position: { x: number; y: number };
  buildings: Array<{ id: string; level: number }>;
  available_creatures: Array<{ type: string; count: number; growth_per_week: number }>;
  visible?: boolean;
}

export interface GameState {
  game_id: string;
  turn: number;
  current_player: 'player' | 'ai';
  player: {
    resources: {
      gold: number;
      wood: number;
      stone: number;
      gems: number;
    };
    heroes: Hero[];
    cities: City[];
  };
  ai: {
    heroes: Array<Partial<Hero> & { visible: boolean }>;
    cities: Array<Partial<City> & { visible: boolean }>;
  };
  map: {
    size: { width: number; height: number };
    tiles: Tile[][];
  };
}

export interface AIAction {
  action_id: number;
  type: string;
  heroId?: string;
  path?: Array<{ x: number; y: number }>;
  cityId?: string;
  structureType?: string;
  state_before?: any;
  state_after?: any;
  timestamp: string;
}

export interface AITurn {
  ai_turn_id: string;
  game_id: string;
  turn_number: number;
  actions: AIAction[];
  reasoning: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = environment.apiUrl || 'http://localhost:5000/api';
  private _currentGameState: GameState | null = null;
  private _currentAITurn: AITurn | null = null;
  
  // Pour le mode démo/dev
  private _isDevMode = true;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}
  
  // Récupérer l'état actuel du jeu
  getCurrentGameState(): Observable<GameState> {
    if (this._isDevMode) {
      return this.getMockGameState().pipe(
        tap(state => this._currentGameState = state)
      );
    }
    
    return this.http.get<GameState>(`${this.apiUrl}/game/state`).pipe(
      tap(state => this._currentGameState = state),
      catchError(error => {
        this.snackBar.open('Failed to load game state', 'Error', {
          duration: 3000
        });
        return throwError(error);
      })
    );
  }
  
  // Récupérer une partie sauvegardée
  loadGame(gameId: string): Observable<GameState> {
    if (this._isDevMode) {
      return this.getMockGameState().pipe(
        tap(state => this._currentGameState = state)
      );
    }
    
    return this.http.get<GameState>(`${this.apiUrl}/games/${gameId}`).pipe(
      tap(state => this._currentGameState = state),
      catchError(error => {
        this.snackBar.open(`Failed to load game ${gameId}`, 'Error', {
          duration: 3000
        });
        return throwError(error);
      })
    );
  }
  
  // Créer une nouvelle partie
  newGame(scenarioId: string): Observable<GameState> {
    if (this._isDevMode) {
      return this.getMockGameState().pipe(
        tap(state => this._currentGameState = state)
      );
    }
    
    return this.http.post<GameState>(`${this.apiUrl}/games`, { scenario_id: scenarioId }).pipe(
      tap(state => this._currentGameState = state),
      catchError(error => {
        this.snackBar.open('Failed to create new game', 'Error', {
          duration: 3000
        });
        return throwError(error);
      })
    );
  }
  
  // Sauvegarder la partie actuelle
  saveGame(name?: string): Observable<{success: boolean, message: string}> {
    if (!this._currentGameState) {
      return throwError('No active game to save');
    }
    
    if (this._isDevMode) {
      this.snackBar.open('Game saved successfully (Dev Mode)', 'Success', {
        duration: 2000
      });
      return of({success: true, message: 'Game saved successfully (Dev Mode)'});
    }
    
    return this.http.post<{success: boolean, message: string}>(
      `${this.apiUrl}/games/${this._currentGameState.game_id}/save`, 
      { name: name || `Autosave - Turn ${this._currentGameState.turn}` }
    ).pipe(
      catchError(error => {
        this.snackBar.open('Failed to save game', 'Error', {
          duration: 3000
        });
        return throwError(error);
      })
    );
  }
  
  // Récupérer la liste des parties sauvegardées
  getSavedGames(): Observable<any[]> {
    if (this._isDevMode) {
      return of([
        { id: 'mock-1', name: 'Test Game 1', scenario: 'Basic Map', turn: 5, last_saved: new Date() },
        { id: 'mock-2', name: 'Test Game 2', scenario: 'Valley Map', turn: 12, last_saved: new Date() }
      ]);
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/games`).pipe(
      catchError(error => {
        this.snackBar.open('Failed to retrieve saved games', 'Error', {
          duration: 3000
        });
        return throwError(error);
      })
    );
  }
  
  // Récupérer la liste des scénarios disponibles
  getAvailableScenarios(): Observable<any[]> {
    if (this._isDevMode) {
      return of([
        { id: 'basic_map_1', name: 'Valley of Heroes', difficulty: 'Easy', size: 'Medium' },
        { id: 'advanced_map_1', name: 'Islands of Conquest', difficulty: 'Medium', size: 'Large' },
        { id: 'challenge_map_1', name: 'Mountain Stronghold', difficulty: 'Hard', size: 'Small' }
      ]);
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/scenarios`).pipe(
      catchError(error => {
        this.snackBar.open('Failed to retrieve scenarios', 'Error', {
          duration: 3000
        });
        return throwError(error);
      })
    );
  }
  
  // Gérer la sélection d'une tuile
  handleTileSelection(tile: Tile): Observable<any> {
    if (!this._currentGameState) {
      return throwError('No active game');
    }
    
    if (this._isDevMode) {
      return of({ success: true, message: `Selected tile at (${tile.x}, ${tile.y})` });
    }
    
    return this.http.post(`${this.apiUrl}/game/action`, {
      type: 'select',
      position: { x: tile.x, y: tile.y }
    }).pipe(
      tap(response => {
        // Mise à jour du state si nécessaire
        this.getCurrentGameState().subscribe();
      }),
      catchError(error => {
        this.snackBar.open('Failed to process tile selection', 'Error', {
          duration: 3000
        });
        return throwError(error);
      })
    );
  }
  
  // Déplacer un héros vers une tuile
  moveHero(heroId: string, targetPosition: { x: number, y: number }): Observable<any> {
    if (!this._currentGameState) {
      return throwError('No active game');
    }
    
    if (this._isDevMode) {
      this.snackBar.open(`Moving hero ${heroId} to (${targetPosition.x}, ${targetPosition.y})`, 'Info', {
        duration: 2000
      });
      return of({ success: true, message: 'Hero moved' });
    }
    
    return this.http.post(`${this.apiUrl}/game/action`, {
      type: 'moveHero',
      heroId: heroId,
      destination: targetPosition
    }).pipe(
      tap(response => {
        // Mise à jour du state
        this.getCurrentGameState().subscribe();
      }),
      catchError(error => {
        this.snackBar.open('Failed to move hero', 'Error', {
          duration: 3000
        });
        return throwError(error);
      })
    );
  }
  
  // Construire un bâtiment
  buildStructure(cityId: string, structureType: string): Observable<any> {
    if (!this._currentGameState) {
      return throwError('No active game');
    }
    
    if (this._isDevMode) {
      this.snackBar.open(`Building ${structureType} in city ${cityId}`, 'Info', {
        duration: 2000
      });
      return of({ success: true, message: 'Structure built' });
    }
    
    return this.http.post(`${this.apiUrl}/game/action`, {
      type: 'buildStructure',
      cityId: cityId,
      structureType: structureType
    }).pipe(
      tap(response => {
        // Mise à jour du state
        this.getCurrentGameState().subscribe();
      }),
      catchError(error => {
        this.snackBar.open('Failed to build structure', 'Error', {
          duration: 3000
        });
        return throwError(error);
      })
    );
  }
  
  // Recruter des unités
  recruitUnits(cityId: string, unitType: string, quantity: number): Observable<any> {
    if (!this._currentGameState) {
      return throwError('No active game');
    }
    
    if (this._isDevMode) {
      this.snackBar.open(`Recruiting ${quantity} ${unitType}(s) in city ${cityId}`, 'Info', {
        duration: 2000
      });
      return of({ success: true, message: 'Units recruited' });
    }
    
    return this.http.post(`${this.apiUrl}/game/action`, {
      type: 'recruitUnits',
      cityId: cityId,
      unitType: unitType,
      quantity: quantity
    }).pipe(
      tap(response => {
        // Mise à jour du state
        this.getCurrentGameState().subscribe();
      }),
      catchError(error => {
        this.snackBar.open('Failed to recruit units', 'Error', {
          duration: 3000
        });
        return throwError(error);
      })
    );
  }
  
  // Fin du tour du joueur
  endTurn(): Observable<AITurn> {
    if (!this._currentGameState) {
      return throwError('No active game');
    }
    
    if (this._isDevMode) {
      this.snackBar.open('Ending turn...', '', {
        duration: 1000
      });
      
      // Simuler le tour de l'IA en mode dev
      return of(this.getMockAITurn()).pipe(
        delay(2000),
        tap(aiTurn => {
          this._currentAITurn = aiTurn;
          this.snackBar.open('AI turn completed', 'OK', {
            duration: 2000
          });
          // Mise à jour du state après le tour de l'IA
          this.getCurrentGameState().subscribe();
        })
      );
    }
    
    return this.http.post<AITurn>(`${this.apiUrl}/game/end-turn`, {}).pipe(
      tap(aiTurn => {
        this._currentAITurn = aiTurn;
        // Mise à jour du state après le tour de l'IA
        this.getCurrentGameState().subscribe();
      }),
      catchError(error => {
        this.snackBar.open('Failed to end turn', 'Error', {
          duration: 3000
        });
        return throwError(error);
      })
    );
  }
  
  // Système de cheat codes
  executeCheat(code: string): Observable<any> {
    if (!this._currentGameState) {
      return throwError('No active game');
    }
    
    const validCheats = [
      'construir_todos_edificios', 
      'derrota_inmediata', 
      'victoria_inmediata',
      'escuadron_arcangeles',
      'equipo_asedio',
      'subir_nivel',
      'maxima_suerte',
      'movimiento_infinito',
      'maxima_moral',
      'revelar_tesoros',
      'revelar_mapa'
    ];
    
    if (!validCheats.includes(code)) {
      return throwError('Invalid cheat code');
    }
    
    if (this._isDevMode) {
      this.snackBar.open(`Cheat code "${code}" activated`, 'Success', {
        duration: 2000
      });
      return of({ 
        success: true, 
        message: `Cheat code "${code}" activated`,
        game_state: this._currentGameState
      }).pipe(
        tap(() => {
          // Mise à jour du state après le cheat
          this.getCurrentGameState().subscribe();
        })
      );
    }
    
    return this.http.post(`${this.apiUrl}/game/cheat`, { code }).pipe(
      tap(response => {
        this.snackBar.open(`Cheat code "${code}" activated`, 'Success', {
          duration: 2000
        });
        // Mise à jour du state après le cheat
        this.getCurrentGameState().subscribe();
      }),
      catchError(error => {
        this.snackBar.open('Cheat execution failed', 'Error', {
          duration: 3000
        });
        return throwError(error);
      })
    );
  }
  
  // Récupérer le dernier tour de l'IA
  getLastAITurn(): AITurn | null {
    return this._currentAITurn;
  }
  
  // Générer un état de jeu mock pour le développement
  private getMockGameState(): Observable<GameState> {
    const mockState: GameState = {
      game_id: 'mock-game-123',
      turn: 5,
      current_player: 'player',
      player: {
        resources: {
          gold: 5420,
          wood: 28,
          stone: 15,
          gems: 3
        },
        heroes: [
          {
            id: 'hero1',
            name: 'Sir Mullich',
            position: { x: 5, y: 5 },
            stats: {
              attack: 3,
              defense: 2,
              power: 1,
              knowledge: 2,
              movement_points: 18,
              movement_points_left: 12
            },
            army: [
              { type: 'pikeman', count: 35 },
              { type: 'archer', count: 20 },
              { type: 'griffin', count: 3 }
            ],
            artifacts: [
              { id: 'art1', name: 'Breastplate of Brimstone', slot: 'armor' }
            ]
          }
        ],
        cities: [
          {
            id: 'city1',
            name: 'Steadwick',
            position: { x: 3, y: 3 },
            buildings: [
              { id: 'townhall', level: 1 },
              { id: 'barracks', level: 1 },
              { id: 'archery_range', level: 1 }
            ],
            available_creatures: [
              { type: 'pikeman', count: 12, growth_per_week: 14 },
              { type: 'archer', count: 8, growth_per_week: 9 }
            ]
          }
        ]
      },
      ai: {
        heroes: [
          {
            id: 'ai_hero1',
            name: 'Gelu',
            position: { x: 12, y: 12 },
            visible: false
          }
        ],
        cities: [
          {
            id: 'ai_city1',
            name: 'Pierpont',
            position: { x: 15, y: 15 },
            visible: false
          }
        ]
      },
      map: {
        size: { width: 20, height: 20 },
        tiles: this.generateMockMapTiles(20, 20)
      }
    };
    
    return of(mockState);
  }
  
  private generateMockMapTiles(width: number, height: number): Tile[][] {
    const tiles: Tile[][] = [];
    const terrainTypes = ['grass', 'forest', 'mountain', 'water'];
    const objectTypes = ['goldmine', 'castle', 'sawmill', 'artifact', 'hero'];
    
    for (let y = 0; y < height; y++) {
      const row: Tile[] = [];
      
      for (let x = 0; x < width; x++) {
        // Déterminer le type de terrain aléatoirement
        const terrainIndex = Math.floor(Math.random() * terrainTypes.length);
        const terrainType = terrainTypes[terrainIndex];
        
        // Déterminer si cette tuile a un objet (10% de chance)
        let object = undefined;
        if (Math.random() < 0.1) {
          const objectIndex = Math.floor(Math.random() * objectTypes.length);
          const objectType = objectTypes[objectIndex];
          
          object = {
            type: objectType,
            owner: Math.random() < 0.5 ? 'player' : 'ai'
          };
        }
        
        // Déterminer si la tuile est explorée et visible
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - width / 2, 2) + 
          Math.pow(y - height / 2, 2)
        );
        
        const explored = distanceFromCenter < width / 1.5;
        const visible = distanceFromCenter < width / 2;
        
        row.push({
          type: terrainType,
          x,
          y,
          object,
          explored,
          visible
        });
      }
      
      tiles.push(row);
    }
    
    return tiles;
  }
  
  // Générer un tour d'IA mock pour le développement
  private getMockAITurn(): AITurn {
    return {
      ai_turn_id: 'mock-ai-turn-123',
      game_id: 'mock-game-123',
      turn_number: 5,
      actions: [
        {
          action_id: 1,
          type: 'moveHero',
          heroId: 'ai_hero1',
          path: [
            { x: 12, y: 12 },
            { x: 11, y: 12 },
            { x: 10, y: 13 }
          ],
          state_before: {},
          state_after: {},
          timestamp: new Date().toISOString()
        },
        {
          action_id: 2,
          type: 'buildStructure',
          cityId: 'ai_city1',
          structureType: 'mage_guild',
          state_before: {},
          state_after: {},
          timestamp: new Date().toISOString()
        },
        {
          action_id: 3,
          type: 'endTurn',
          timestamp: new Date().toISOString()
        }
      ],
      reasoning: "Je déplace mon héros vers la mine d'or et je construis un bâtiment pour améliorer ma ville principale."
    };
  }
}
