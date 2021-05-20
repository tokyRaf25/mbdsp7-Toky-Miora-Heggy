package mbdsp7.toky.miora.heggy

import grails.gorm.transactions.Transactional
import javassist.bytecode.ByteArray

@Transactional
class AdminService {
    def passwordservice = new PasswordService();
    def save(Admin a){
        a.save();
    }
    def authentificate(Admin a){
        def listAdmin  = Admin.list()
        for(def i=0;i<listAdmin.size();i++){
            /*println(a.motdepasse+ " et "+listAdmin[i].motdepasse)
            println(a.motdepasse+ " et "+listAdmin[i].motdepasse)*/
            if(passwordservice.testPassword(a.motdepasse, listAdmin[i].motdepasse) &&
                    listAdmin[i].nom.equals(a.nom)){
                return listAdmin[i]
            }

        }

    }



}
