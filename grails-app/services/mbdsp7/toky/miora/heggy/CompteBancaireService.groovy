package mbdsp7.toky.miora.heggy

import grails.gorm.transactions.Transactional

@Transactional
class CompteBancaireService {

    def save(CompteBancaire c){
        c.save();
    }

    def get (long id){
        CompteBancaire.get(id);
    }

}
