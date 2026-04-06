
import { Email } from "../../commons/email.js";
import { contactDAO } from "./contact.repository.js";
import { Hostname } from "./host-name.js";
import { Description } from "./description.js";
import { Name } from "./name.js";


export  class Contact
{
    private _name :Name;
    private _email :Email;
    private _description:Description;
    private _hostname:Hostname; 

    public constructor (name:Name,email:Email,description:Description,hostname:Hostname){
        this._name = name;
        this._email = email;
        this._description = description; 
        this._hostname = hostname; 
      }

    public async insert(){
        return await contactDAO.insert(this._name,this._email,this._description,this._hostname)
    }

}
 