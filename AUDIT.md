# Auditoría y refurbish — LaLigaVacceos

Fecha: 2026-08-24

Contexto: se ha perdido el acceso a la base de datos MySQL remota (`remotemysql.com`)
que usaba `server/`, y la arquitectura de backend/BD va a cambiar próximamente.
Como paso intermedio se ha eliminado el sistema de login y se han sustituido las
llamadas al backend muerto por datos mock, para poder seguir trabajando en el
frontend sin depender de infraestructura que ya no existe.

## Cambios realizados en este refurbish

- **Datos mock**: se creó `client/src/mocks/data.js` con atletas, competiciones y
  wods de ejemplo. Todas las pantallas que llamaban por Axios a
  `http://localhost:3001/*` (`ManTable`, `WomanTable`, `AthletesScreen`,
  `CompetitionScreen`, `CreateScreen`, `PlayerInfoScreen`) ahora usan estos datos
  en memoria; altas/bajas (crear competición, borrar atleta, añadir wod) se
  reflejan solo en el estado local del componente, no persisten en ningún sitio.
- **Eliminación completa del login/registro (Firebase Auth)**: se borraron
  `LoginScreen`, `RegisterScreen`, `AuthRouter`, `PrivateRoute`, `PublicRoute`,
  `actions/auth.js`, `reducers/authReducer.js`, `firebase/firebase-config.js` y
  sus estilos. `AppRouter` ya no comprueba sesión y renderiza el dashboard
  directamente. `store.js` ya no incluye el reducer de auth. `Navbar` ya no
  depende de un usuario logueado ni de un UID hardcodeado para mostrar las
  secciones de administración (ver hallazgo de seguridad más abajo: ese control
  nunca tuvo respaldo real en el servidor).
- **Limpieza de dependencias huérfanas** en `client/package.json`: `firebase`,
  `axios` y `validator` ya no se usan en ningún sitio del código y se han
  quitado.
- **Credenciales del servidor**: `server/index.js` leía usuario/contraseña/host
  de MySQL en texto plano directamente del código fuente. Se movieron a
  variables de entorno (`server/.env`, no versionado) con `server/.env.example`
  como plantilla, y se añadió `server/.gitignore`.
- **`server/node_modules` estaba commiteado** (628 archivos, sin `.gitignore`
  previo). Se ha desvinculado del control de versiones; ya no volverá a
  trackearse gracias al nuevo `.gitignore`.
- Verificado que `npm install` y `npm run build` en `client/` terminan sin
  errores tras todos los cambios.

## Hallazgos de la auditoría

### Críticos

1. **Credenciales de base de datos en texto plano committeadas** en
   `server/index.js` (usuario, contraseña y host de `remotemysql.com`).
   Aunque ya no hay acceso a esa base de datos, la credencial quedó expuesta en
   el historial de un repositorio público — debe considerarse comprometida. Ya
   corregido de cara a futuro (variables de entorno), pero si ese servicio
   sigue activo en algún sitio, rotar la contraseña.

2. **El backend Express no tiene ninguna autenticación ni autorización.**
   Cualquiera con la URL puede insertar/borrar atletas y competiciones, y varios
   endpoints ejecutan DDL arbitrario (`CREATE TABLE`, `ALTER TABLE`,
   `DROP TABLE`) usando el nombre de tabla que llega en la request
   (`/createCompetition/:name`, `/createWod/:name`, `/dropTable/:name`). El
   login de Firebase del frontend nunca se validaba en el servidor, así que la
   protección era puramente cosmética.

3. **Contraseñas de atletas guardadas en texto plano** en la tabla `atletas`
   (endpoint `POST /create`, invocado desde `RegisterScreen`, ya eliminado).
   Esto duplicaba y contradecía el hashing que ya hace Firebase Auth, creando
   una segunda copia insegura de las contraseñas de los usuarios.

### Importantes

4. **Control de acceso "admin" basado en comparar un UID de Firebase
   hardcodeado** en `Navbar.js` (seguridad por oscuridad, sin respaldo en
   servidor). Con el login eliminado, esa distinción ha desaparecido: todas las
   secciones son visibles ahora, lo cual no reduce la seguridad real porque
   nunca la hubo a nivel de servidor.
5. **CORS totalmente abierto** (`app.use(cors())` sin whitelist de orígenes).
6. Endpoints que interpolan nombres de tabla/columna vía `??` de mysql2 sin
   lista blanca (`req.params.name`, `req.body.wodName`) — combinado con el
   punto 2, es una superficie real de inyección/DoS (borrado de tablas
   arbitrario), no solo un problema teórico.

### Menores / deuda técnica

7. Bug preexistente en `CreateScreen`: `addWod()` se llamaba sin argumentos
   aunque la función esperaba `(name, wodName)`, por lo que nunca funcionó.
   Corregido en este refurbish usando inputs controlados.
8. Bastante código muerto/comentado (bloques comentados en `ManTable`,
   `WomanTable`, `AthletesScreen`, `VacceosScreen`) y pantallas a medio hacer
   (`PlayerInsertData`, `PlayerInfoScreen` solo hacían `console.log`, sin
   persistir nada — se mantienen así intencionadamente por ahora).
9. Typo `protoTypes` (en vez de `propTypes`) en los antiguos `PrivateRoute` /
   `PublicRoute` hacía que la validación de tipos nunca se ejecutara (código ya
   eliminado).
10. `npm audit` reporta ~74 vulnerabilidades (varias críticas), heredadas de
    `react-scripts`/Create React App, que está descontinuado. No se han
    introducido por este cambio; conviene evaluar una migración (p. ej. a Vite)
    cuando se acometa el rediseño de arquitectura.

## Pendiente / recomendado para cuando se defina la nueva arquitectura

- Añadir autenticación real en el servidor (verificar el ID token de Firebase
  en cada request, por ejemplo) antes de volver a conectar cualquier pantalla
  a datos reales.
- Decidir si `server/` se conserva, se reescribe o se elimina; mientras tanto
  queda claramente desconectado del frontend.
- Quitar el almacenamiento de contraseñas en la tabla `atletas` si se retoma
  ese flujo — la autenticación ya la resuelve Firebase Auth.
