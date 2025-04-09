# PRÁCTICA: DESARROLLO DE APLICACIÓN WEB HEROES&HOSTIAS

## 1. DESCRIPCIÓN GENERAL

En esta práctica se desarrollará una aplicación web que emula un juego de estrategia por turnos inspirado en la mecánica de juegos clásicos como la saga Heroes of Might and Magic (HOMM). **Este es un proyecto estrictamente educativo** y no pretende utilizar ni infringir ninguna marca registrada. La mecánica de juego tomará inspiración del estilo de HOMM1, mientras que la interfaz gráfica se inspirará en HOMM3, utilizando gráficos 2D originales. El juego permitirá a los jugadores registrarse, gestionar partidas y competir contra una IA alimentada por modelos de lenguaje de GroQ.

El proyecto está diseñado para ser desarrollado por un equipo de 3 personas, cada una con un rol específico: Frontend Developer, Backend Developer y AI/ML Specialist. Esta estructura permitirá una división equilibrada del trabajo y facilitará el desarrollo paralelo de los diferentes componentes del sistema.

## 2. OBJETIVOS

* Desarrollar una aplicación web funcional con frontend en JavaScript/TypeScript y backend en Python
* Implementar una interfaz gráfica inspirada en juegos de estrategia por turnos clásicos
* Crear una mecánica de juego por turnos original aunque inspirada en títulos clásicos
* Integrar IAs de GroQ como oponentes
* Aplicar conocimientos de desarrollo web, APIs, y comunicación cliente-servidor
* Utilizar IA generativa para la creación de recursos (imágenes, mapas, sonidos) para fines exclusivamente educativos

## 3. REQUISITOS FUNCIONALES

### 3.1. Sistema de Usuarios y Partidas

#### Gestión de Usuarios
* Sistema de registro y autenticación de usuarios
* Almacenamiento seguro de credenciales
* Perfiles básicos de usuario
* Sesiones de juego persistentes

#### Gestión de Partidas
* Guardar partidas manualmente en cualquier momento
* Sistema de autoguardado al final de cada turno
* Cargar partidas guardadas
* Listar partidas disponibles por usuario
* Almacenamiento de partidas en formato JSON
* Selección de escenarios al iniciar nueva partida

### 3.2. Sistema de Juego

#### Mecánica de Turnos
* El juego se desarrollará por turnos alternando entre el jugador humano y la IA
* Cada turno incluirá:
  - Fase de movimiento (desplazamiento de héroes por el mapa)
  - Fase de exploración (descubrimiento de recursos, ciudades, etc.)
  - Fase de combate (si corresponde)
  - Fase de gestión (compra de edificios, unidades, etc.)
  - Fase de fin de turno (recaudación de recursos, crecimiento de poblaciones)

#### Escenarios
* Se debe implementar al menos un escenario jugable completo
* El escenario debe incluir:
  - Mapa con terrenos variados
  - Ciudades
  - Recursos
  - Elementos especiales (tesoros, artefactos, etc.)
  - Fog of War (zonas no exploradas permanecen ocultas)

#### Héroes
* Posibilidad de reclutar múltiples héroes
* Cada héroe debe tener:
  - Estadísticas básicas (ataque, defensa, poder mágico, conocimiento)
  - Inventario para equipar artefactos
  - Ejército de unidades
  - Puntos de movimiento limitados por turno

#### Economía y Recursos
* Sistema de recursos que incluya al menos:
  - Oro
  - Madera
  - Piedra
  - Gemas u otros recursos especiales
* Cálculo correcto de ingresos al final de cada turno basado en:
  - Ciudades controladas
  - Minas controladas
  - Otros generadores de recursos

### 3.3. Elementos del Mapa

#### Ciudades
* Interfaz de gestión de ciudad con:
  - Edificios construibles (al menos 5 tipos diferentes)
  - Edificios para reclutar unidades (al menos 3 tipos de unidades)
  - Taberna para contratar héroes
  - Información de recursos y producción

#### Minas y Generadores de Recursos
* Al menos 3 tipos diferentes de minas:
  - Mina de oro
  - Aserradero (madera)
  - Cantera (piedra)
* Cada tipo de mina debe generar una cantidad fija de recursos por turno

#### Otros Elementos
* Implementar al menos 2 tipos adicionales de elementos:
  - Lugares de poder (bonificaciones temporales)
  - Artefactos (mejoras permanentes para héroes)
  - Tesoros (recursos instantáneos)
  - Portales (teletransporte)
  - Criaturas neutrales que guardan recursos o artefactos

### 3.4. Combate
* Implementar sistema de combate por turnos
* Opción 1 (Deseable): Vista completa de combate similar a HOMM
  - Campo de batalla con posicionamiento de unidades
  - Turnos basados en velocidad de unidades
  - Habilidades especiales de unidades
* Opción 2 (Mínima): Simulación de combate
  - Cálculo automático de resultados basado en estadísticas
  - Mostrar resumen de bajas y resultado

### 3.5. Inteligencia Artificial

* Implementar IA como oponente usando modelos de GroQ
* La IA deberá:
  - Recibir información del estado del juego en formato JSON
  - Tomar decisiones estratégicas (movimiento, combate, gestión)
  - Respetar las reglas del juego
  - Proporcionar un desafío adecuado al jugador
* Sistema de respaldo para múltiples modelos:
  - Configurar varios endpoints de GroQ
  - Implementar cambio automático en caso de error 429 (límite de tokens)
  - Mantener contexto al cambiar entre modelos

### 3.6. Modo Cheat

* Implementar un sistema de códigos de cheat que faciliten las pruebas del juego
* El jugador podrá activar la ventana de chat presionando Ctrl+Tab en el mapa
* La entrada de los siguientes códigos producirá efectos inmediatos:
  - **construir_todos_edificios** - Construir todos los edificios en el castillo seleccionado
  - **derrota_inmediata** - Perder la partida inmediatamente
  - **victoria_inmediata** - Ganar la partida inmediatamente
  - **escuadron_arcangeles** - El héroe seleccionado obtiene 35 arcángeles adicionales
  - **equipo_asedio** - El héroe seleccionado obtiene tienda, balista y munición
  - **subir_nivel** - El héroe seleccionado sube un nivel
  - **maxima_suerte** - El héroe seleccionado maximiza su suerte
  - **movimiento_infinito** - Puntos de movimiento ilimitados para el héroe seleccionado
  - **maxima_moral** - El héroe seleccionado maximiza su moral
  - **revelar_tesoros** - Revelar ubicaciones de todos los objetos especiales en el mapa
  - **revelar_mapa** - Revelar mapa completo (eliminar fog of war)
* Los cheats deben registrarse en un log para facilitar el debug
* Debe existir la posibilidad de desactivar los cheats en entorno de producción

## 4. REQUISITOS TÉCNICOS

**¡IMPORTANTE!**: A cada grupo se le asignará una combinación específica de tecnologías para el frontend y backend. **Es absolutamente obligatorio utilizar exclusivamente las tecnologías asignadas**. Los proyectos que no cumplan con este requisito **NO SERÁN EVALUADOS**, independientemente de su funcionalidad o calidad.

### 4.1. Frontend

* La tecnología de frontend asignada será una de las siguientes:
  - React
  - Angular
  - Vue
  - Svelte
* Se recomienda fuertemente el uso de TypeScript para mejorar la robustez del código
* Entorno Node.js para gestión de dependencias y build
* Implementación de las siguientes vistas:
  - Vista de mapa principal
  - Vista de ciudad
  - Vista de combate (si se implementa la opción 1)
  - Interfaces de gestión (héroes, recursos, etc.)
* Interfaz gráfica original inspirada en juegos de estrategia por turnos:
  - Estilo visual coherente (paneles, iconos, etc.)
  - Gráficos 2D originales o generados por IA (con el etiquetado adecuado)
  - Animaciones básicas

### 4.2. Visualización del Turno de la IA

* Modo de visualización para el turno de la IA con dos opciones implementadas:
  - **Opción 1 - Cambio de vista**: Cuando llegue el turno de la IA, la vista del jugador se reemplaza temporalmente por la vista de la IA, mostrando sus acciones en tiempo real. Al finalizar el turno de la IA, se vuelve a la vista del jugador.
  - **Opción 2 - Vista dividida**: Durante el turno de la IA, la pantalla se divide en dos secciones:
    * Lado izquierdo: Vista del jugador (estática)
    * Lado derecho: Vista de la IA (dinámica) mostrando sus movimientos y acciones
* Visualización clara y detallada de las acciones de la IA:
  - Movimientos de héroes con indicadores visuales de la ruta
  - Combates iniciados por la IA con resultados visibles
  - Construcciones y reclutamientos en ciudades
  - Recolección de recursos y objetos
* Control de velocidad para la visualización de acciones de la IA (normal, rápido, instantáneo)
* Opción para activar/desactivar esta visualización detallada

### 4.3. Backend

* La tecnología de backend asignada será una de las siguientes:
  - Flask
  - FastAPI
* Implementación de API REST para:
  - Gestión del estado del juego
  - Autenticación y gestión de usuarios
  - Guardar y cargar partidas
  - Comunicación con modelos de GroQ
* Sistema de autenticación utilizando bibliotecas establecidas:
  - JWT para tokens de autenticación
  - OAuth2 mediante FastAPI/Flask extensions
  - Opción de usar servicios como Auth0, Firebase Authentication, etc.

### 4.4. Componente para Llamadas a LLMs

* Módulo específico para interactuar con los modelos de GroQ
* Funcionalidades:
  - Preparación de prompts con descripción del juego
  - Envío de estado actual en formato JSON
  - Gestión de respuestas
  - Manejo de errores y fallback a modelos alternativos
  - Control de tokens utilizados

### 4.5. Comunicación entre Componentes

* Frontend → Backend:
  - Comunicación mediante peticiones HTTP REST
  - Formato JSON para intercambio de datos
  - Endpoints para todas las acciones del juego (movimiento, combate, gestión)

* Backend → LLM:
  - Llamadas a la API de GroQ
  - Prompt inicial con descripción del juego y reglas
  - Actualización del estado visible para la IA (respetando Fog of War)
  - Procesamiento de respuestas para traducirlas a acciones del juego

* LLM → Backend:
  - Recepción de respuestas en formato JSON
  - Validación de acciones propuestas
  - Implementación de acciones válidas

* Backend → Frontend:
  - Respuestas HTTP con resultados de acciones
  - Notificaciones de eventos (WebSockets opcional)
  - Actualizaciones del estado del juego

## 5. ARQUITECTURA DEL SISTEMA

### 5.1. Componentes

El sistema estará compuesto por cuatro componentes principales, cada uno en su propio contenedor Docker:

1. **Frontend**: Aplicación web basada en React/Angular/Vue/Svelte
2. **Backend**: API REST en Flask/FastAPI
3. **Base de datos MongoDB**: Almacenamiento de usuarios, partidas y escenarios
4. **Servicio de IA**: Componente para gestionar llamadas a los modelos de GroQ

### 5.2. Comunicación entre Componentes

* Frontend → Backend:
  - Comunicación mediante peticiones HTTP REST
  - Formato JSON para intercambio de datos
  - Endpoints para todas las acciones del juego (movimiento, combate, gestión)

* Backend → MongoDB:
  - Almacenamiento de datos de usuario
  - Persistencia de partidas guardadas y autoguardados
  - Gestión de escenarios disponibles

* Backend → Servicio de IA:
  - Peticiones para obtener decisiones de la IA
  - Gestión de fallbacks entre diferentes modelos
  - Actualización del contexto de juego

* Servicio de IA → GroQ:
  - Llamadas a la API externa de GroQ
  - Gestión de tokens y limitaciones de API
  - Procesamiento de respuestas

## 6. DEPLOYMENT

* Containerización completa con Docker:
  - Dockerfile para frontend
  - Dockerfile para backend
  - Docker Compose para orquestación

* Requisitos de deployment:
  - Configuración mediante variables de entorno
  - Persistencia de datos (volúmenes Docker)
  - Documentación clara del proceso de deployment

* Instrucciones de ejecución:
  - Clonar repositorio
  - Configurar variables de entorno (.env)
  - Ejecutar `docker compose up --build`
  - Acceder a la aplicación vía navegador

## 7. RECURSOS GENERADOS POR IA

* Utilización de IA generativa para:
  - Imágenes de unidades y héroes
  - Tiles para el mapa
  - Iconos de recursos y edificios
  - Efectos de sonido básicos (opcional)
  - Música de fondo (opcional)

* Documentación del proceso de generación:
  - Prompts utilizados
  - Herramientas empleadas
  - Post-procesamiento aplicado

### 7.1. Recursos Recomendados para Generación de Contenido con IA

Para facilitar la generación de recursos sin incurrir en gastos excesivos, se recomiendan las siguientes herramientas. **Es importante que todos los recursos generados por IA lleven una clara indicación de que han sido creados con IA para fines exclusivamente educativos**, tanto en los metadatos como en la documentación del proyecto.

#### Indicaciones obligatorias para recursos generados por IA
* Añadir la frase "Generado con IA para proyecto educativo Heroes&Hostias" en:
  - Metadatos de cada archivo cuando sea posible
  - Esquina inferior derecha en imágenes (con tamaño pequeño pero legible)
  - Documentación técnica con lista de todos los recursos generados
  - Comentarios en el código cuando se utilizan estos recursos
* Para archivos de audio, incluir una breve nota en README y en la documentación
* Mantener una carpeta separada (ej: `/assets/ai-generated/`) para todos los recursos generados por IA

#### Imágenes y Gráficos
* **Stable Diffusion** (implementación local o mediante Google Colab gratuito)
* **Leonardo.ai** (plan gratuito con generaciones limitadas)
* **Midjourney** (suscripción básica por un mes, compartida entre el equipo)
* **DALL-E mini / Craiyon** (gratuito, calidad menor)
* **Bing Image Creator** (gratuito con límite diario)
* **RunwayML** (versión gratuita con limitaciones)

#### Sprites y Tiles
* **PixelMe** (generador de sprites pixelados)
* **Pixelicious** (transformación de imágenes a estilo pixel art)
* **Pixelorama** (editor gratuito para refinar imágenes generadas)

#### Música y Efectos de Sonido
* **AIVA** (versión gratuita limitada)
* **Mubert** (plan gratuito para efectos de sonido básicos)
* **Soundraw** (período de prueba)
* **Riffusion** (generación de música basada en Stable Diffusion, código abierto)
* **FreeSound** (biblioteca de efectos de sonido con licencias libres)

#### Conversión y Post-procesamiento
* **GIMP** (editor gratuito para ajustes de imágenes)
* **Inkscape** (editor vectorial gratuito para iconos)
* **Audacity** (editor de audio gratuito)

Todas estas herramientas ofrecen opciones gratuitas o de muy bajo costo que resultan suficientes para el alcance del proyecto. Se recomienda que el equipo planifique las necesidades de recursos y concentre la generación en períodos específicos para aprovechar al máximo los límites gratuitos de las plataformas.

## 8. ORGANIZACIÓN DEL TRABAJO

### 8.1. Distribución de Roles y Responsabilidades

Al ser un grupo de 3 personas, se recomienda la siguiente distribución de roles:

#### Rol 1: Frontend Developer
* Responsabilidades:
  - Implementación completa de la interfaz de usuario
  - Diseño visual inspirado en HOMM3
  - Integración con API del backend
  - Implementación de las diferentes vistas (mapa, ciudad, combate)
  - Interfaz de gestión de usuarios y partidas
  - Generación y adaptación de recursos visuales con IA
  - Implementación del sistema de visualización del turno de la IA
  - Desarrollo de la interfaz para el modo cheat

#### Rol 2: Backend Developer
* Responsabilidades:
  - Diseño e implementación de la API REST
  - Lógica de juego (reglas, turnos, combate)
  - Sistema de gestión de recursos y estado del juego
  - Autenticación y gestión de usuarios
  - Integración con MongoDB
  - Configuración del deployment con Docker
  - Implementación de la lógica para el modo cheat

#### Rol 3: AI/ML Specialist
* Responsabilidades:
  - Integración con modelos de GroQ
  - Diseño de prompts y formato de datos para la IA
  - Sistema de gestión de múltiples modelos y fallback
  - Generación de contenido (mapas, unidades) con IA
  - Estructura de datos para guardar/cargar partidas
  - Documentación del sistema y manual de usuario
  - Optimización del comportamiento de la IA para simular estrategias de juego

### 8.2. Plan de Desarrollo Sugerido

| Semana | Rol 1 (Frontend) | Rol 2 (Backend) | Rol 3 (AI/ML) |
|--------|------------------|-----------------|---------------|
| 1 | Diseño inicial UI y auth | Diseño API y modelo de datos | Investigación de GroQ |
| 2 | Implementación registro/login | Setup MongoDB y auth | Diseño de formato JSON partidas |
| 3 | Implementación vista mapa | Lógica de juego básica | Diseño de prompts |
| 4 | Vista de ciudad | Gestión partidas (guardar/cargar) | Integración con GroQ |
| 5 | Vista combate y sistema cheat | Integración con servicio IA | Sistema multi-modelo |
| 6 | Visualización turno IA | Deployment Docker | Documentación |

### 8.3. Coordinación del Equipo

Es fundamental establecer mecanismos de coordinación entre los miembros del equipo:

* Reuniones semanales de seguimiento
* Uso de herramientas de gestión de proyectos (Trello, Jira, etc.)
* Control de versiones con Git y pull requests para integraciones
* Documentación compartida de decisiones técnicas
* Estándares de código y convenciones acordadas al inicio

## 9. ENTREGABLES

1. Código fuente completo en repositorio Git
2. Documentación técnica:
   - Arquitectura del sistema
   - API endpoints
   - Modelo de datos
   - Integración con GroQ
   - Estructura de las partidas guardadas
   - **Inventario detallado de recursos generados por IA** con indicación de:
     - Herramienta utilizada
     - Prompt aplicado
     - Fecha de generación
     - Uso en el proyecto
3. Declaración de originalidad y uso educativo (confirmar que el proyecto es puramente educativo y no comercial)
4. Manual de usuario
5. Presentación del proyecto
6. Ficheros Docker para deployment (4 contenedores)
7. Memoria del proyecto que incluya:
   - Contribución de cada miembro
   - Retos enfrentados y soluciones
   - Decisiones de diseño e implementación

## 10. CRITERIOS DE EVALUACIÓN

### 10.1. Requisito Imprescindible

**¡ATENCIÓN!**: Para aprobar la práctica, **LA APLICACIÓN DEBE FUNCIONAR CORRECTAMENTE** y **DEBE ESTAR DESARROLLADA CON LAS TECNOLOGÍAS ASIGNADAS**. Estos son requisitos absolutamente imprescindibles y no negociables. Si la aplicación no funciona en el entorno de pruebas mediante el procedimiento de deployment especificado (docker compose up) o si se han utilizado tecnologías diferentes a las asignadas, la práctica quedará automáticamente suspensa independientemente de la calidad del código o la documentación.

Se entiende por "funcionar correctamente" que:
- La aplicación se inicia sin errores
- Es posible jugar al menos un escenario completo
- La mecánica de turnos, combate y gestión de recursos opera conforme a las especificaciones
- La integración con GroQ responde adecuadamente
- No hay errores críticos que impidan la experiencia de juego

### 10.2. Evaluación Grupal (70%)

| Criterio | Porcentaje |
|----------|------------|
| Funcionalidad completa | 25% |
| Calidad del código | 15% |
| Integración con GroQ | 10% |
| Interfaz gráfica | 10% |
| Deployment correcto | 5% |
| Documentación | 5% |

### 10.3. Evaluación Individual (30%)

| Criterio | Porcentaje |
|----------|------------|
| Contribución al código (commits) | 10% |
| Calidad del trabajo individual | 10% |
| Cumplimiento de responsabilidades asignadas | 5% |
| Participación en la presentación | 5% |

Se realizará una evaluación por pares dentro del grupo para validar las contribuciones individuales.

### 10.4. Aspectos Legales y Éticos

* **Uso educativo**: Este proyecto tiene exclusivamente finalidad educativa, sin propósito comercial.
* **Originalidad del contenido**:
  - Está prohibido el uso de activos gráficos, audio o código provenientes de juegos comerciales.
  - Todo el contenido debe ser original, de dominio público o generado mediante IA.
* **Contenido generado por IA**:
  - Todo contenido generado mediante IA debe estar claramente etiquetado.
  - Se debe mantener un registro detallado de los prompts utilizados.
  - Las imágenes generadas por IA deben incluir una marca de agua o mención visual discreta.
* **Atribución**:
  - Cualquier uso de bibliotecas de terceros debe estar correctamente atribuido.
  - El uso de recursos de dominio público debe ser documentado con sus respectivas licencias.
* **Transparencia**:
  - La documentación debe incluir una sección específica sobre la procedencia de todos los recursos.
  - Se debe indicar claramente que el juego es "inspirado por" juegos de estrategia por turnos clásicos, sin mencionar marcas registradas.

El incumplimiento de estos aspectos puede afectar a la evaluación del proyecto.

## 11. ANEXO: DESCRIPCIÓN TÉCNICA DE LA COMUNICACIÓN Y ARQUITECTURA

### 11.1. Arquitectura General del Sistema

```
+------------------+       +-----------------+       +------------------+
|                  |       |                 |       |                  |
|     FRONTEND     |<----->|     BACKEND     |<----->|   SERVICIO IA    |
|                  |  HTTP |                 |  HTTP |                  |
| (React/Angular/  |  REST | (Flask/FastAPI) |       | (Gestor de GroQ) |
|  Vue/Svelte)     |       |                 |       |                  |
+------------------+       +-----------------+       +------------------+
                                   ^ |                       |
                                   | v                       v
                           +----------------+        +----------------+
                           |                |        |                |
                           |    MONGODB     |        |   GROQ MODELS  |
                           |                |        |                |
                           | (Usuarios,     |        |    (LLMs)      |
                           |  Partidas)     |        |                |
                           +----------------+        +----------------+
```

### 11.2. Comunicación Frontend-Backend

```
+----------------+       HTTP Request        +----------------+
|                |  ---------------------->  |                |
|    Frontend    |                           |    Backend     |
|    (Node.js)   |  <----------------------  |    (Python)    |
|                |       HTTP Response       |                |
+----------------+                           +----------------+
```

#### Comunicación para Visualización de Turno IA

```
+------------------+                               +------------------+
|                  |  1. POST /api/game/endTurn    |                  |
|     Frontend     |  ----------------------->     |     Backend      |
| (React/Vue/etc.) |                               |   (FastAPI)      |
|                  |  2. Procesa acciones IA       |                  |
|                  |                               |                  |
|                  |  3. Devuelve lista secuencial |                  |
|                  |     de acciones y estados     |                  |
|                  |  <-----------------------     |                  |
|                  |                               |                  |
|   Visualización  |  4. Reproduce secuencialmente |                  |
|   dividida del   |     las acciones (animación)  |                  |
|   turno de la IA |                               |                  |
+------------------+                               +------------------+
```

#### Flujo de comunicación:

1. **Autenticación y Gestión de Usuarios**:
   - Registro de nuevo usuario (POST /api/auth/register)
   - Login de usuario (POST /api/auth/login)
   - Obtener perfil de usuario (GET /api/auth/profile)
   - Actualizar perfil (PUT /api/auth/profile)

2. **Gestión de Partidas**:
   - Listar partidas guardadas (GET /api/games)
   - Crear nueva partida (POST /api/games)
   - Guardar partida actual (POST /api/games/{gameId}/save)
   - Cargar partida guardada (GET /api/games/{gameId})
   - Listar escenarios disponibles (GET /api/scenarios)

3. **Durante el turno del jugador**:
   - Frontend envía acciones del jugador (POST /api/games/{gameId}/action)
   - Backend valida y procesa acciones
   - Backend devuelve resultado y nuevo estado

4. **Fin de turno del jugador**:
   - Frontend envía petición de fin de turno (POST /api/games/{gameId}/endTurn)
   - Backend procesa fin de turno (cálculo de recursos, etc.)
   - Backend guarda estado actual (autoguardado)
   - Backend inicia turno de IA

5. **Sistema de Cheats**:
   - Frontend detecta combinación Ctrl+Tab y muestra interfaz de chat
   - Frontend envía código de cheat (POST /api/games/{gameId}/cheat)
   - Backend valida el código y aplica los efectos correspondientes
   - Backend devuelve el nuevo estado del juego con los cambios aplicados

### 11.3. Comunicación Backend-MongoDB

```
+----------------+      MongoDB Driver       +----------------+
|                |  ---------------------->  |                |
|    Backend     |                           |    MongoDB     |
|    (Python)    |  <----------------------  |                |
|                |       Query Results       |                |
+----------------+                           +----------------+
```

#### Estructura de la Base de Datos:

1. **Colección de Usuarios**:
   ```json
   {
     "_id": "ObjectId",
     "username": "string",
     "email": "string",
     "password_hash": "string",
     "created_at": "date",
     "last_login": "date"
   }
   ```

2. **Colección de Partidas**:
   ```json
   {
     "_id": "ObjectId",
     "user_id": "ObjectId",
     "name": "string",
     "scenario_id": "string",
     "created_at": "date",
     "last_saved": "date",
     "is_autosave": "boolean",
     "cheats_used": ["string"],
     "game_state": {
       "turn": "number",
       "player": {
         "heroes": [...],
         "cities": [...],
         "resources": {...}
       },
       "ai": {
         "heroes": [...],
         "cities": [...],
         "resources": {...}
       },
       "map": {
         "size": {"width": "number", "height": "number"},
         "tiles": [...],
         "fog_of_war": [...]
       },
       "current_player": "string"
     }
   }
   ```

3. **Colección de Escenarios**:
   ```json
   {
     "_id": "ObjectId",
     "name": "string",
     "description": "string",
     "difficulty": "string",
     "map_size": {"width": "number", "height": "number"},
     "initial_state": {...}
   }
   ```

### 11.4. Comunicación Backend-Servicio IA

```
+----------------+       API Request         +----------------+
|                |  ---------------------->  |                |
|    Backend     |                           |  GroQ Models   |
|    (Python)    |  <----------------------  |                |
|                |       API Response        |                |
+----------------+                           +----------------+
```

#### Flujo de comunicación:

1. **Inicialización de IA**:
   - Backend envía prompt inicial con descripción del juego y reglas
   - Backend guarda contexto de conversación

2. **Turno de IA**:
   - Backend prepara estado visible para IA (JSON)
   - Backend envía estado a modelo primario de GroQ
   - Si hay error 429 (límite de tokens), cambia a modelo alternativo
   - GroQ devuelve decisiones de IA en formato JSON
   - Backend valida y ejecuta acciones de IA
   - Backend actualiza estado del juego
   - Backend envía la secuencia de acciones al frontend para visualización

3. **Gestión de contexto**:
   - Backend mantiene historial resumido de acciones importantes
   - Se limita contexto para evitar superar límites de tokens
   - Se almacenan estrategias aprendidas entre turnos

4. **Visualización de acciones de IA**:
   - Backend genera lista ordenada de acciones realizadas
   - Cada acción incluye estado antes y después
   - Se envía secuencia completa al frontend para animación

## 12. ANEXO: ESTRUCTURA DE DATOS PARA PARTIDAS

A continuación se muestra un ejemplo del formato JSON para guardar partidas:

### 12.1 Formato de Partida Guardada

```json
{
  "game_id": "65f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Mi partida contra IA",
  "scenario_id": "basic_map_1",
  "created_at": "2025-04-01T18:30:22.123Z",
  "last_saved": "2025-04-01T19:45:33.456Z",
  "turn": 12,
  "current_player": "player",
  "cheats_used": ["revelar_mapa", "subir_nivel"],
  "player": {
    "resources": {
      "gold": 5420,
      "wood": 28,
      "stone": 15,
      "gems": 3
    },
    "heroes": [
      {
        "id": "hero1",
        "name": "Sir Mullich",
        "position": {"x": 15, "y": 22},
        "stats": {
          "attack": 3,
          "defense": 2,
          "power": 1,
          "knowledge": 2,
          "movement_points": 18,
          "movement_points_left": 5
        },
        "army": [
          {"type": "pikeman", "count": 35},
          {"type": "archer", "count": 20},
          {"type": "griffin", "count": 3}
        ],
        "artifacts": [
          {"id": "art1", "name": "Breastplate of Brimstone", "slot": "armor"}
        ]
      }
    ],
    "cities": [
      {
        "id": "city1",
        "name": "Steadwick",
        "position": {"x": 12, "y": 18},
        "buildings": [
          {"id": "townhall", "level": 1},
          {"id": "barracks", "level": 1},
          {"id": "archery_range", "level": 1}
        ],
        "available_creatures": [
          {"type": "pikeman", "count": 12, "growth_per_week": 14},
          {"type": "archer", "count": 8, "growth_per_week": 9}
        ]
      }
    ]
  },
  "ai": {
    "resources": {
      "gold": 3800,
      "wood": 22,
      "stone": 10,
      "gems": 1
    },
    "heroes": [
      {
        "id": "ai_hero1",
        "name": "Gelu",
        "position": {"x": 42, "y": 35},
        "visible": false
      }
    ],
    "cities": [
      {
        "id": "ai_city1",
        "name": "Pierpont",
        "position": {"x": 45, "y": 38},
        "visible": false
      }
    ]
  },
  "map": {
    "size": {"width": 72, "height": 72},
    "explored": [
      [0, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    "visible_objects": [
      {
        "type": "goldmine",
        "position": {"x": 14, "y": 25},
        "owner": "player"
      },
      {
        "type": "sawmill",
        "position": {"x": 18, "y": 19},
        "owner": "player"
      },
      {
        "type": "artifact",
        "position": {"x": 22, "y": 28},
        "subtype": "sword",
        "name": "Titan's Gladius"
      }
    ]
  }
}
```

### 12.2 Estructura de Visualización del Turno IA

Para facilitar la implementación de la visualización del turno de la IA, se utilizará el siguiente formato JSON:

```json
{
  "ai_turn_id": "65f1a2b3c4d5e6f7a8b9c0d2",
  "game_id": "65f1a2b3c4d5e6f7a8b9c0d1",
  "turn_number": 12,
  "actions": [
    {
      "action_id": 1,
      "type": "moveHero",
      "heroId": "ai_hero1",
      "path": [
        {"x": 42, "y": 35},
        {"x": 43, "y": 35},
        {"x": 44, "y": 36}
      ],
      "state_before": {
        "resources": { /* estado resumido antes */ },
        "heroes": { /* estado resumido antes */ },
        "visible_map": { /* estado resumido antes */ }
      },
      "state_after": {
        "resources": { /* estado resumido después */ },
        "heroes": { /* estado resumido después */ },
        "visible_map": { /* estado resumido después */ }
      },
      "timestamp": "2025-04-01T19:40:15.123Z"
    },
    {
      "action_id": 2,
      "type": "buildStructure",
      "cityId": "ai_city1",
      "structureType": "mage_guild",
      "state_before": { /* estado resumido antes */ },
      "state_after": { /* estado resumido después */ },
      "timestamp": "2025-04-01T19:40:18.456Z"
    },
    {
      "action_id": 3,
      "type": "combat",
      "attacker": {
        "heroId": "ai_hero1",
        "army": [/* unidades */]
      },
      "defender": {
        "type": "neutral",
        "position": {"x": 44, "y": 36},
        "army": [/* unidades */]
      },
      "result": {
        "winner": "attacker",
        "casualties": {
          "attacker": [/* bajas */],
          "defender": [/* bajas */]
        },
        "rewards": {
          "experience": 450,
          "resources": {"gold": 500},
          "artifacts": []
        }
      },
      "state_before": { /* estado resumido antes */ },
      "state_after": { /* estado resumido después */ },
      "timestamp": "2025-04-01T19:40:25.789Z"
    },
    {
      "action_id": 4,
      "type": "endTurn",
      "state_before": { /* estado resumido antes */ },
      "state_after": { /* estado resumido después */ },
      "timestamp": "2025-04-01T19:40:30.123Z"
    }
  ],
  "reasoning": "Estoy moviendo mi héroe principal hacia la mina de oro al este mientras desarrollo mi ciudad principal con un gremio de magos para obtener hechizos."
}
```

### 12.3 Formato para Sistema de Cheats

Para la gestión de los códigos cheat, se utilizará el siguiente formato de petición y respuesta:

**Petición:**
```json
{
  "game_id": "65f1a2b3c4d5e6f7a8b9c0d1",
  "cheat_code": "subir_nivel",
  "target": {
    "type": "hero",
    "id": "hero1"
  }
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "El héroe ha subido un nivel",
  "affected_entity": {
    "type": "hero",
    "id": "hero1",
    "changes": {
      "level": {"before": 3, "after": 4},
      "stats": {
        "before": {"attack": 3, "defense": 2, "power": 1, "knowledge": 2},
        "after": {"attack": 4, "defense": 2, "power": 2, "knowledge": 2}
      }
    }
  },
  "game_state": {
    /* Estado actualizado del juego */
  }
}
```

## 13. ANEXO: PROMPT INICIAL PARA LLM

A continuación se muestra un ejemplo del prompt inicial que se enviará a los modelos de GroQ para describir el juego:

```
Here is the current game state:

<game_state>
{{GAME_STATE}}
</game_state>

You are an AI agent playing Heroes of Might and Magic, a turn-based strategy game. Your goal is to expand your empire, conquer cities, collect resources, and defeat your opponent. You will receive the current game state and must decide on your actions for this turn.

Your task is to analyze the game state, formulate a strategy, and determine the actions for your current turn. Follow these steps:

1. Analyze the game state, considering:
   - Your heroes' positions, stats, and armies
   - Your cities and their development
   - Available resources and income
   - Explored areas of the map
   - Known enemy positions and strength
   - Nearby opportunities (resources, neutral armies, artifacts)
   - Fog of war (areas of the map you haven't explored)

2. Formulate a strategy based on these priorities:
   - Exploration to uncover resources and cities
   - Securing income sources
   - City development for stronger unit recruitment
   - Hero improvement through experience and artifacts
   - Balancing economy and military strength

3. Generate a set of actions for this turn. You can perform multiple actions until you run out of movement points. Possible action types include:
   - moveHero: Move a hero to a new location
   - buildStructure: Construct a building in a city
   - recruitUnits: Recruit new units in a city
   - collectResource: Collect a resource on the map
   - attackEnemy: Initiate combat with an enemy
   - castSpell: Use a hero's spell
   - pickupArtifact: Equip a hero with an artifact

Before providing your final response, wrap your thought process and strategic considerations inside <strategic_planning> tags. In this section:

1. Summarize the current game state, including hero positions, resources, and known enemy information.
2. List out potential opportunities and threats.
3. Prioritize objectives based on the current situation.
4. Outline a short-term (this turn) and long-term (next few turns) strategy.

It's OK for this section to be quite long, as thorough planning is crucial for success in the game.

Your final response should be in the following JSON format:

{
  "actions": [
    {
      "type": "actionType",
      "details": {
        // Relevant details for the action
      }
    },
    // ... more actions ...
    {
      "type": "endTurn"
    }
  ],
  "reasoning": "Detailed explanation of your strategy and plans for the next few turns",
  "analysis": "Brief analysis of the current game situation and your opponent's position"
}

Here's an example of the action format:

{
  "actions": [
    {
      "type": "moveHero",
      "details": {
        "heroId": "hero1",
        "destination": {"x": 5, "y": 3}
      }
    },
    {
      "type": "buildStructure",
      "details": {
        "cityId": "city1",
        "structureType": "barracks"
      }
    },
    {
      "type": "recruitUnits",
      "details": {
        "cityId": "city1",
        "unitType": "archer",
        "quantity": 10
      }
    },
    {
      "type": "endTurn"
    }
  ],
  "reasoning": "Detailed explanation of strategy and plans for the next few turns",
  "analysis": "Brief analysis of the current game situation and opponent's position"
}

Remember:
- Think strategically and plan for the long term
- Manage your resources efficiently
- Adapt your strategy based on the game situation, including areas obscured by fog of war
- Balance economic development and military strength
- Exploit your strengths and your opponent's weaknesses
- Always end your turn with an "endTurn" action
- Provide thorough reasoning for your decisions
- Stay within the rules and mechanics of the game

Now, based on the provided game state, analyze the situation, formulate your strategy, and generate your actions, reasoning, and analysis for this turn.
```

## 14. ANEXO: IMPLEMENTACIÓN DE LA VISUALIZACIÓN DEL TURNO DE LA IA

Para implementar correctamente la visualización del turno de la IA, se deben seguir las siguientes pautas:

### 14.1. Estructura de Datos para la Visualización

El backend debe proporcionar una estructura de datos que permita al frontend animar de forma secuencial las acciones realizadas por la IA:

```json
{
  "ai_turn_summary": {
    "total_actions": 8,
    "main_focus": "expansion",
    "resources_gained": {"gold": 1200, "wood": 5, "stone": 3},
    "territories_explored": 12,
    "combat_results": [
      {"location": {"x": 25, "y": 42}, "outcome": "victory", "reward": "artifact"}
    ]
  },
  "ai_actions_sequence": [
    {
      "id": 1,
      "action_type": "movement",
      "entity": {"id": "ai_hero_1", "name": "Sandro", "type": "hero"},
      "path": [{"x": 10, "y": 15}, {"x": 11, "y": 16}, {"x": 12, "y": 16}],
      "movement_points": {"initial": 45, "remaining": 35},
      "state_snapshot_before": {...},
      "state_snapshot_after": {...}
    },
    ...
  ]
}
```

### 14.2. Modos de Visualización

El sistema debe ofrecer al menos dos modos de visualización del turno de la IA:

1. **Modo Pantalla Completa**:
   - Durante el turno de la IA, la vista del jugador se reemplaza completamente por la vista de la IA
   - Se muestra una animación secuencial de todas las acciones
   - Se incluye un panel lateral con información contextual (recursos, ciudades)
   - Al finalizar, se vuelve automáticamente a la vista del jugador

2. **Modo Pantalla Dividida**:
   - La pantalla se divide horizontalmente en dos secciones
   - A la izquierda: vista estática del jugador al final de su turno
   - A la derecha: vista dinámica que muestra la secuencia de acciones de la IA

### 14.3. Controles de Reproducción

Para mejorar la experiencia de visualización del turno de la IA, se deben implementar controles que permitan al jugador:

- Pausar/reanudar la reproducción de las acciones
- Avanzar paso a paso (siguiente acción)
- Retroceder paso a paso (acción anterior)
- Ajustar velocidad de reproducción (normal, rápido, instantáneo)
- Saltar directamente al resultado final

### 14.4. Elementos Visuales

La visualización debe incluir elementos gráficos que faciliten el seguimiento de las acciones:

- Indicadores de ruta para movimientos de héroes
- Etiquetas con valores numéricos para cambios de recursos
- Animaciones para combates y construcciones
- Indicadores de cambio de estado (antes/después)
- Resaltado de áreas afectadas en el mapa

## 15. ANEXO: IMPLEMENTACIÓN DE GAMEPLAY

Para garantizar que el juego captura la esencia de los juegos de estrategia por turnos como Heroes of Might and Magic, es importante implementar las siguientes mecánicas de gameplay:

### 15.1. Sistema de Progresión de Héroes

* **Experiencia y Niveles**: Los héroes ganan experiencia por combates y suben de nivel
* **Puntos de Atributos**: Al subir de nivel, el jugador puede asignar puntos a las estadísticas del héroe
* **Habilidades**: Al subir de nivel, los héroes pueden aprender nuevas habilidades o mejorar las existentes

### 15.2. Sistema de Captura de Recursos

* **Minas y Generadores**: Pueden ser capturados al visitar su ubicación con un héroe
* **Control de Territorio**: El control de minas genera recursos al final de cada turno
* **Competencia por Recursos**: Tanto el jugador como la IA deben competir por los recursos limitados

### 15.3. Mecánica de Ciudades

* **Crecimiento de Población**: Las ciudades generan nuevas unidades semanalmente
* **Árboles de Construcción**: Algunos edificios requieren otros como prerrequisito
* **Especialización**: Cada ciudad puede especializarse en diferentes tipos de tropas

### 15.4. Sistema de Combate

* **Iniciativa por Velocidad**: Las unidades más rápidas actúan primero
* **Posicionamiento en Cuadrícula**: La posición de las unidades afecta a la estrategia
* **Habilidades Especiales**: Cada unidad tiene al menos una habilidad o característica única
* **Moral y Suerte**: Sistemas que pueden dar turnos extra o daño crítico respectivamente

### 15.5. Tablero de Turnos

Para el sistema de turnos se debe implementar un tablero visual que muestre:
* Orden de las unidades en combate
* Próximas unidades en actuar
* Indicadores de moral/suerte activos
* Estado actual (esperando acción, moviendo, atacando)

### 15.6. Sistema de Victoria/Derrota

* **Victoria por Eliminación**: Eliminar todos los héroes y ciudades del oponente
* **Victoria por Conquista**: Capturar todas las ciudades del oponente
* **Victoria por Objetivo Especial**: Algunos escenarios pueden tener condiciones especiales
* **Derrota por Tiempo**: Opcionalmente, implementar límite de turnos

## 16. CONSEJOS PARA LA IMPLEMENTACIÓN

### 16.1. Estrategias de Desarrollo

1. **Desarrollo por fases**:
   - Fase 1: Implementar sistema de usuarios y partidas básico
   - Fase 2: Implementar mapa y movimiento básico
   - Fase 3: Añadir ciudades y gestión de recursos
   - Fase 4: Implementar sistema de combate simplificado
   - Fase 5: Integrar IA con GroQ
   - Fase 6: Pulido y optimización

2. **Desarrollo paralelo por roles**:
   - Frontend: Puede comenzar con mocks de API para avanzar sin depender del backend
   - Backend: Puede implementar endpoints con respuestas estáticas inicialmente
   - AI/ML: Puede trabajar con modelos locales antes de la integración final con GroQ

3. **Reducción de alcance** (para mantener 50 horas por alumno):
   - Simplificar el sistema de combate (opción de simulación)
   - Limitar variedad de unidades y edificios al mínimo requerido
   - Priorizar funcionalidad sobre pulido visual
   - Minimizar elementos opcionales (sonidos, animaciones)