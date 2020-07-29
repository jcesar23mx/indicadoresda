export class User {
    public u_name: string;
    public u_numemp: string;
    public u_perfil: string;
    public token: string;
}

export class Session {
  public u_name: string;
  public u_numemp: string;
  public u_perfil: string;
  public token: string;
}


export class LoginObject {
    public usuario: string;
    public contrasena: string;
    constructor( object: any){
      this.usuario = (object.usuario) ? object.usuario : null;
      this.contrasena = (object.contrasena) ? object.contrasena : null;
    }
  }
