# Code Review - Proyecto Agentemotor

- En general considero que el proyecto logró cumplir con el objetivo principal de la prueba, que era ayudar a gestionar las pólizas y darle importancia a la ventana de renovación de los 30 días. La aplicación quedó funcional y se puede ejecutar fácilmente sin configuraciones complicadas.

- Algo positivo es que se mantuvo una estructura simple y entendible tanto en backend como en frontend, el uso de Flask con SQLite3 fue una buena decisión para no hacer el proyecto más complejo de lo necesario y enfocarse más en resolver el problema de negocio. También fue útil manejar la base de datos con archivos como `schema.sql` y `seed.sql`, porque eso permite cargar datos rápidamente para probar la aplicación.

- La lógica principal de las pólizas vencidas y el cálculo de los días de atraso quedó funcionando correctamente, el frontend permite visualizar las pólizas activas y vencidas de forma clara y se logró conectar correctamente con los endpoints usando Fetch API.

- En cuanto a cosas por mejorar creo que todavía faltan validaciones y manejo de errores más completos, en algunos casos los errores solo aparecen en consola y no directamente en la interfaz. También siento que el archivo `app.py` quedó con bastante lógica junta y más adelante podría dividirse mejor en rutas o módulos separados.

- En las pruebas unitarias se cubrieron los casos más importantes relacionados con la ventana de 30 días, aunque podrían agregarse más escenarios para tener mayor cobertura.

- Si este proyecto fuera para producción seguramente faltaría agregar autenticación, una base de datos más robusta como PostgreSQL, mejores validaciones y una estructura más escalable. Pero para el alcance de la prueba técnica considero que el proyecto quedó bien enfocado y funcional.
