# -videojuego-2D-
# Space Hunter 2D - Proyecto de Graficación

Este proyecto consiste en el desarrollo de un videojuego interactivo en 2D utilizando tecnologías web estándar (HTML5 Canvas, CSS3 y JavaScript). El software ha sido diseñado bajo el paradigma de Programación Orientada a Objetos (POO) para cumplir con los requisitos académicos de las Unidades III y IV de la materia de Graficación.

## 1. Contexto del Proyecto
El videojuego se sitúa en un entorno de combate espacial donde el usuario controla una nave defensora. En un ecosistema académico de 5to semestre, este proyecto sirve como demostración práctica del manejo de coordenadas en el plano cartésiano digital, el ciclo de vida de una animación (`Game Loop`) y la gestión de recursos multimedia en tiempo real.

## 2. Objetivo
Desarrollar una aplicación gráfica interactiva que gestione múltiples objetos simultáneos en pantalla, aplicando algoritmos de detección de colisiones, transformación de vectores para el movimiento y retroalimentación auditiva polifónica para validar la interacción entre entidades (jugador, proyectiles y enemigos).

## 3. Justificación Técnica
La implementación de este software se justifica mediante tres pilares de ingeniería:
* **Física y Matemáticas:** Uso de funciones trigonométricas (`Math.atan2`, `Math.cos`, `Math.sin`) para calcular ángulos de rotación y trayectorias de proyectiles.
* **Eficiencia en POO:** Uso de clases para encapsular el comportamiento de `Player`, `Enemy` y `Bullet`, permitiendo una gestión de memoria eficiente mediante el filtrado de arreglos dinámicos.
* **Experiencia de Usuario (UX):** Integración de librerías como Bootstrap 5 para el diseño responsivo y el uso de la API de Audio de HTML5 para proporcionar feedback inmediato al usuario durante la acción de disparo y eliminación de objetivos.

## 4. Operación del Sistema
1. **Carga de Activos:** El sistema utiliza un control de carga (`checkLoad`) que asegura que las imágenes de la nave, enemigos y fondo estén listas antes de iniciar el ciclo `animate()`.
2. **Control del Jugador:** El movimiento de rotación de la nave sigue la posición del puntero del mouse en el lienzo.
3. **Mecánica de Disparo:** Al detectar un evento `mousedown`, se instancia un proyectil con polifonía de audio independiente.
4. **Detección de Colisiones:** Se emplea un algoritmo de proximidad por coordenadas que valida si el proyectil se encuentra dentro del área (`size`) del enemigo.
5. **Efecto de Explosión:** Al impactar, el enemigo activa un estado de muerte (`isDying`) que escala su tamaño y reduce su opacidad antes de ser reiniciado en el pool de objetos.

## 5. Conclusiones (Sin puntos)
Esta actividad permitió integrar conocimientos avanzados de Programación Orientada a Objetos para resolver problemas complejos de graficación digital mediante la implementación de una clase especializada que gestiona de manera autónoma el estado y la física de múltiples objetos en un lienzo dinámico

La solución técnica desarrollada no solo cumplió con los requisitos de detección de colisiones y rebotes en direcciones opuestas según las leyes de la física elástica sino que también incorporó retroalimentación visual inmediata mediante el uso de efectos de iluminación neón y un sistema de flash azul eléctrico que se activa únicamente en el momento del impacto para validar el correcto funcionamiento de los algoritmos de proximidad y la animación de explosiones por expansión

Finalmente el ejercicio fortaleció el dominio de herramientas fundamentales para la ingeniería de sistemas como el control de versiones con Git y la manipulación del DOM en tiempo real consolidando una base sólida para el desarrollo de aplicaciones interactivas que requieren una alta eficiencia en el procesamiento de gráficos y lógica matemática simultánea integrando además elementos multimedia para una experiencia de usuario completa y profesional conforme a los estándares académicos de la carrera de Ingeniería en Sistemas Computacionales

---
**Desarrollado por:** Valeria Abigail Villeda Hernández  
**Materia:** Graficación  
**Institución:** Tecnológico de Estudios Superiores (El Tec)
