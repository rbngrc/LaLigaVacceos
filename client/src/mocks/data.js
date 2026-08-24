// Datos de ejemplo usados mientras no hay backend/BD real conectado.
// Sustituyen las llamadas a la API (http://localhost:3001) que dependian
// de una base de datos MySQL a la que ya no hay acceso.

export const mockCompetitions = [
    { name: 'Vacceos Open 2022', date: '2022-03-12' },
    { name: 'Vacceos Winter Throwdown', date: '2022-01-22' },
];

export const mockMaleAthletes = [
    { position: 1, name: 'Carlos Fernández', nickname: 'Charly', last: 320, best: 1 },
    { position: 2, name: 'Alberto Ruiz', nickname: 'Beto', last: 305, best: 1 },
    { position: 3, name: 'David Martín', nickname: 'Dave', last: 298, best: 2 },
];

export const mockFemaleAthletes = [
    { position: 1, name: 'Laura Gómez', nickname: 'Lau', last: 312, best: 1 },
    { position: 2, name: 'Marta Sánchez', nickname: 'Mar', last: 300, best: 1 },
    { position: 3, name: 'Elena Torres', nickname: 'Ele', last: 289, best: 3 },
];

export const mockAllAthletes = [
    { email: 'carlos@example.com', name: 'Carlos Fernández', nickname: 'Charly', sex: 'Masculino', competition: 'Vacceos Open 2022' },
    { email: 'alberto@example.com', name: 'Alberto Ruiz', nickname: 'Beto', sex: 'Masculino', competition: 'Vacceos Open 2022' },
    { email: 'laura@example.com', name: 'Laura Gómez', nickname: 'Lau', sex: 'Femenino', competition: 'Vacceos Winter Throwdown' },
    { email: 'marta@example.com', name: 'Marta Sánchez', nickname: 'Mar', sex: 'Femenino', competition: 'Vacceos Winter Throwdown' },
];

export const mockWods = {
    'Vacceos Open 2022': [
        { name: 'WOD 1 - Fran' },
        { name: 'WOD 2 - Murph' },
    ],
    'Vacceos Winter Throwdown': [
        { name: 'WOD 1 - Grace' },
    ],
};
