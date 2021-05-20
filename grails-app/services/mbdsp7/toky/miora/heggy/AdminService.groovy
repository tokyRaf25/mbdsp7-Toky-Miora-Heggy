package mbdsp7.toky.miora.heggy

import grails.gorm.transactions.Transactional

@Transactional
class AdminService {
    def save(Admin a){
        a.save();
    }
    def authentificate(Admin a){
        def matchAdmin  = Admin.createCriteria().list{
            eq("nom",a.nom)
            and {
                eq("motdepasse",a.motdepasse)
            }
        }
    }


}
