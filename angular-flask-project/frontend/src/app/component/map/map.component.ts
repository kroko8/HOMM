import { Component, OnInit } from '@angular/core';
import { GameService, Tile } from '../../services/game.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MapComponent implements OnInit {
  mapData: Tile[][] = [];
  selectedTile?: Tile;
  isAITurn: boolean = false;
  mapSize = { width: 15, height: 15 }; // Taille de la carte pour les données de test
  terrainTypes = ['grass', 'forest', 'mountain', 'water'];
  objectTypes = ['goldmine', 'castle', 'sawmill', 'artifact', 'hero'];
  
  constructor(
    private gameService: GameService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Essayer d'abord de charger les données du service
    this.gameService.getCurrentGameState().subscribe(
      gameState => {
        this.mapData = gameState.map.tiles;
        this.isAITurn = gameState.current_player === 'ai';
      },
      error => {
        console.error('Error loading game state:', error);
        // En cas d'erreur, générer des données de test
        this.generateTestMapData();
      }
    );

    // Listen for cheat code combination (Ctrl+Tab)
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === 'Tab') {
        this.openCheatConsole();
        event.preventDefault();
      }
    });
  }

  generateTestMapData() {
    this.mapData = [];
    
    // Générer une carte avec des tuiles aléatoires
    for (let y = 0; y < this.mapSize.height; y++) {
      const row: Tile[] = [];
      
      for (let x = 0; x < this.mapSize.width; x++) {
        // Déterminer le type de terrain aléatoirement
        const terrainIndex = Math.floor(Math.random() * this.terrainTypes.length);
        const terrainType = this.terrainTypes[terrainIndex];
        
        // Déterminer si cette tuile a un objet (10% de chance)
        let object = undefined;
        if (Math.random() < 0.1) {
          const objectIndex = Math.floor(Math.random() * this.objectTypes.length);
          const objectType = this.objectTypes[objectIndex];
          
          object = {
            type: objectType,
            owner: Math.random() < 0.5 ? 'player' : 'ai'
          };
        }
        
        // Déterminer si la tuile est explorée et visible
        // Pour les tests: tout est exploré dans un rayon central, et visible dans un rayon plus petit
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - this.mapSize.width / 2, 2) + 
          Math.pow(y - this.mapSize.height / 2, 2)
        );
        
        const explored = distanceFromCenter < this.mapSize.width / 2;
        const visible = distanceFromCenter < this.mapSize.width / 3;
        
        row.push({
          type: terrainType,
          x,
          y,
          object,
          explored,
          visible
        });
      }
      
      this.mapData.push(row);
    }
    
    console.log('Test map data generated:', this.mapData);
  }

  onTileClick(tile: Tile) {
    if (!this.isAITurn && tile.visible) {
      this.selectedTile = tile;
      
      this.gameService.handleTileSelection(tile).subscribe(
        response => {
          console.log('Tile selection response:', response);
          // Mettre à jour l'état du jeu si nécessaire
        },
        error => {
          console.error('Error handling tile selection:', error);
          this.snackBar.open('Failed to process tile selection', 'Error', {
            duration: 3000
          });
        }
      );
    }
  }

  openCheatConsole() {
    const cheatCode = prompt('Enter cheat code:');
    if (cheatCode) {
      this.gameService.executeCheat(cheatCode).subscribe(
        response => {
          console.log('Cheat executed:', response);
          this.snackBar.open(`Cheat executed: ${cheatCode}`, 'Success', {
            duration: 2000
          });
        },
        error => {
          console.error('Cheat failed:', error);
          this.snackBar.open('Cheat execution failed', 'Error', {
            duration: 3000
          });
        }
      );
    }
  }

  endTurn() {
    if (this.isAITurn) return;
    
    this.snackBar.open('Ending turn...', '', {
      duration: 1000
    });
    
    this.gameService.endTurn().subscribe(
      response => {
        console.log('End turn response:', response);
        this.isAITurn = true;
        
        // Simulation du tour de l'IA
        setTimeout(() => {
          this.isAITurn = false;
          this.gameService.getCurrentGameState().subscribe(
            gameState => {
              this.mapData = gameState.map.tiles;
            }
          );
        }, 3000);
      },
      error => {
        console.error('Error ending turn:', error);
        this.snackBar.open('Failed to end turn', 'Error', {
          duration: 3000
        });
      }
    );
  }
}
