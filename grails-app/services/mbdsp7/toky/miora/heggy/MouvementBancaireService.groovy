package mbdsp7.toky.miora.heggy

import grails.gorm.transactions.Transactional

@Transactional
class MouvementBancaireService {

    def save(MouvementBancaire mb) {
        mb.save();
    }


}
