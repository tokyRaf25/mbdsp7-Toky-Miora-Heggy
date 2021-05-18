package mbdsp7.toky.miora.heggy

class CompteBancaire {

    String numerosdecompte
    String titulaire
    Double soldeencours
    String motdepasse

    static hasMany = [mouvementbancaire: MouvementBancaire]

    static constraints = {
        numerosdecompte       nullable: false, blank: false, unique: true
        titulaire nullable: false, blank: false, unique: true
        motdepasse nullable: false, blank: false, password: true
        soldeencours       min: 0D
    }
}
