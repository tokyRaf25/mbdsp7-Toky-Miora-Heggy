package mbdsp7.toky.miora.heggy

class Admin {
    String nom;
    String motdepasse;
    static constraints = {
        nom nullable: false, blank: false
        motdepasse  nullable: false, blank: false
    }
}
