# **DOGS** | Proyecto Individual

## **📌 OBJETIVOS**

-  Construir una Single Page Application utlizando las tecnologías: **React**, **Redux**, **Node**, **Express** y **Sequelize**.
-  Poner en práctica recursos básicos de estilos y diseño (UX : UI).
-  Afirmar y conectar los conceptos aprendidos en la carrera.
-  Aprender mejores prácticas.
-  Aprender y practicar el workflow de GIT.
-  Utilizar y practicar testing.

<br />

---

## **⚠️ IMPORTANTE**

Actualmente las versiónes en este proyecto son:

-  **Node**: 20.3.1
-  **NPM**: 9.7.2

**ACLARACIÓN:** las dependencias actuales del proyecto

-  **axios**: 1.5.1
-  **body-parser**: 1.20.2
-  **cookie-parser**: 1.4.6
-  **cors**: 2.8.5
-  **dotenv**: 16.3.1
-  **express**: 4.18.2
-  **jest**: 29.7.0
-  **morgan**: 1.10.0
-  **pg**: 8.11.3
-  **sequelize**: 6.33.0
-  **uuid**: 9.0.1

<br />

---
# **A continuación** se da a conocer los rubros que se siguieron para esta aplicación.

## **📖 ENUNCIADO GENERAL**

La idea de este proyecto es construir una aplicación web a partir de la API [**TheDogApi**](https://thedogapi.com/) y en la que se pueda:

-  Buscar perros.
-  Visualizar la información de los perros.
-  Filtrarlos.
-  Ordenarlos.
-  Crear nuevos perros.

⚠️ Para las funcionalidades de filtrado y ordenamiento NO se puede utilizar los endpoints de la API externa que ya devuelven los resultados filtrados u ordenados.

---

<br />

<div align="center">

## **📁 INSTRUCCIONES**

</div>

<br />

### **🖱 BASE DE DATOS**

Deberás crear dos modelos para tu base de datos. Una será para las razas de perros y la otra será para los temperamentos (pueden llevar el nombre que tu quieras). La relación entre ambos modelos debe ser de muchos a muchos. A continuación te dejamos **todas** las propiedades que debe tener cada modelo.

**📍 MODELO 1 | Dogs**

-  ID.\*
-  Imagen.\*
-  Nombre.\*
-  Altura.\*
-  Peso.\*
-  Años de vida.\*

<br />

**📍 MODELO 2 | Temperaments**

-  ID.\*
-  Nombre.\*

<br />

---

<br />

### **🖱 BACK-END**

Para esta parte deberás construir un servidor utilizando **NodeJS** y **Express**. Tendrás que conectarlo con tu base de datos mediante **Sequelize**.

Tu servidor deberá contar con las siguientes rutas:

#### **📍 GET | /dogs/raza/all**

-  Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.

#### **📍 GET | /dogs/raza/:idRaza**

-  Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con la información pedida en el detalle de un perro.
-  La raza es recibida por parámetro (ID).
-  Tiene que incluir los datos de los temperamentos asociadas a esta raza.
-  Debe funcionar tanto para los perros de la API como para los de la base de datos.

#### **📍 GET | /dogs/raza/?name="..."**

-  Esta ruta debe obtener todas aquellas razas de perros que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
-  Debe poder buscarlo independientemente de mayúsculas o minúsculas.
-  Si no existe la raza, debe mostrar un mensaje adecuado.
-  Debe buscar tanto los de la API como los de la base de datos.

#### **📍 POST | /dogs/raza/**

-  Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados.
-  Toda la información debe ser recibida por body.
-  Debe crear la raza de perro en la base de datos, y esta debe estar relacionada con los temperamentos indicados (al menos uno).

#### **📍 GET | /dogs/temps**

-  Obtiene todos los temperamentos existentes.
-  Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

<br />

---

### **🖱 RUTAS DEL BACK-END QUE SE IMPLEMENTARON POR CUENTA PROPIA**

#### **📍GET | /dogs/raza/api**

-  Obtiene un arreglo de objetos únicamente de la API, donde cada objeto es la raza de un perro.

#### **📍GET | /dogs/raza/db**

-  Obtiene un arreglo de objetos únicamente de la DataBase, donde cada objeto es la raza de un perro.

#### **📍PUT | /dogs/raza/:idRaza**

-  Actualiza el objeto de la raza, es necesario pasar como parametro el identificador que hará el update.

#### **📍DELETE | /dogs/raza/:idRaza**

-  Elimina el objeto de la raza, es necesario pasar como parametro el identificadorque hará el delete.

#### **📍 POST | /dogs/temp/**

-  Esta ruta recibirá todos los datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociados.
-  Toda la información debe ser recibida por body.

#### **📍 GET | /dogs/temp/all**

-  Obtiene un arreglo de objetos, donde cada objeto es el temperamento de un perro.

#### **📍 GET | /dogs/temp/:idTemp**

-  Devuelve un objeto con el id y nombre del temperamento.

#### **📍PUT | /dogs/temp/:idTemp**

-  Actualiza un temperamento, es necesario pasar como parametro el identificador al que hará el update.

#### **📍DELETE | /dogs/raza/:idTemp**

-  Elimina el temperamento, es necesario pasar como parametro el identificador que hará el delete.
