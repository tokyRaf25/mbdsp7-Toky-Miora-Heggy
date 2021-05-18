package mbdsp7.toky.miora.heggy

class MouvementBancaire {

    enum TypeMouvement{
        DEBIT,CREDIT
    }

    Date dateMouvement
    TypeMouvement typeMouvement
    Double somme

    static belongsTo = [compteBancaire: CompteBancaire]

    static constraints = {
        dateMouvement       nullable: false, blank: false
        typeMouvement       nullable: false, blank: false
        somme       min: 0D
    }
}
