package mbdsp7.toky.miora.heggy

import grails.gorm.transactions.Transactional

@Transactional
class MouvementBancaireService {

    def save(MouvementBancaire mb) {
        mb.save();
    }

    def list(Long nc){
       def result = MouvementBancaire.executeQuery("from MouvementBancaire  where compteBancaire.id ="+nc+"  order by dateMouvement desc")
        def resultLimited = []
        for(int i=0;i<result.size();i++){
            if(i>=10){
                return resultLimited
            }
            else{
                resultLimited.add(result[i])

            }
        }
    }
}
