package mbdsp7.toky.miora.heggy

import grails.gorm.transactions.Transactional

@Transactional
class CompteBancaireService {
    def passwordservice = new PasswordService();
    def save(CompteBancaire c){
        c.save();
    }

    def get (long id){
        CompteBancaire.get(id);
    }

    def verify(int num){
      CompteBancaire.executeQuery("from CompteBancaire where  numerosdecompte="+num)

    }
    def authentificate(String num,String mdp){
        def list  = CompteBancaire.list()
        for(def i=0;i<list.size();i++){
            if(passwordservice.testPassword(mdp, list[i].motdepasse) &&
                    list[i].numerosdecompte.equals(num)){
                return list[i]
            }

        }

    }

}
