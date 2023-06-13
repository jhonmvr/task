import  jwt from 'jsonwebtoken';
import data from '../config/database'

export function verifyToken(req:any, role:string[]) {
  try {
    console.log("authorization",req.headers.authorization)
    if(req.headers.authorization){
      const decoded:any = jwt.verify(req.headers.authorization.split(' ')[1], data.Secret);
      console.log("decoded",decoded)
      const rol = role.find(x=> x == decoded.role)
      console.log("rol",rol)
      if(rol)
        return true;

    }

  } catch(err) {
  }
  return false
}


