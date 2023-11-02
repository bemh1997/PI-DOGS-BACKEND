require('dotenv').config()
const passwordenv = process.env.PASSWORD

const login = async(request, response)=>{
  try{
    const { password } = request.query;
    if( !password) return response.status(400).send('Faltan contraseña');

    password !== passwordenv 
    ? response.status(403).send('Contraseña incorrecta') 
    : response.status(201).json({access: true});

    return response;
  }catch(error){
    return response.status(500).json({error: error.message});
  }
}

module.exports=login;