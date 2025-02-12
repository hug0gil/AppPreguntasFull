export interface Pregunta {
    _id:               string;
    id:                number;
    pregunta:          string;
    respuestas:        string[];
    respuestaCorrecta: string;
    categoria:         string;
}

