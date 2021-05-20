package mbdsp7.toky.miora.heggy

import grails.web.JSONBuilder

import javax.servlet.http.HttpServletResponse

class ApiController {
    def adminService;
    def compteBancaireService;
    def mouvementBancaireService;
    def builder = new JSONBuilder()

    def admin() {
        if (request.getMethod().equals("POST")) {
                if (request.JSON.nom && request.JSON.motdepasse) {
                    Admin aa = new Admin()
                    aa.nom = request.JSON.nom
                    aa.motdepasse = request.JSON.motdepasse
                    adminService.save(aa)
                    def json = builder.build {
                        message = " insert success"
                    }
                    render(status: 201, contentType: 'application/json', text: json)
                    return response.status = 201
                }
                return response.status = HttpServletResponse.SC_NOT_ACCEPTABLE
        }
        return response.status = HttpServletResponse.SC_NOT_ACCEPTABLE
    }

    def adminAuthentifacte() {
        if (request.getMethod().equals("POST")) {
              if (request.JSON.nom && request.JSON.motdepasse) {
                    Admin aa = new Admin()
                    aa.nom = request.JSON.nom
                    aa.motdepasse = request.JSON.motdepasse
                    def rs = adminService.authentificate(aa)
                    if(rs[0] == null){
                        def json = builder.build {
                            message = " aucune correspondance"
                        }
                        render(status: 206, contentType: 'application/json', text: json)
                        return response.status = 206
                    }
                    else {
                        def json = builder.build {
                            rs
                        }
                        render(status: 200, contentType: 'application/json', text: json)
                        return response.status = 200
                    }
                }
        }
        return response.status = HttpServletResponse.SC_NOT_ACCEPTABLE
    }

    def comptebancaire() {
        switch (request.getMethod()) {
            case "POST":
                if (request.JSON.titulaire && request.JSON.motdepasse) {
                    CompteBancaire cb = new CompteBancaire()
                    cb.numerosdecompte = String.valueOf((int) (Math.random() * 1000))
                    cb.titulaire = request.JSON.titulaire
                    cb.motdepasse = request.JSON.motdepasse
                    if (request.JSON.soldeencours) {
                        cb.soldeencours = Double.parseDouble(request.JSON.soldeencours)
                    } else {
                        cb.soldeencours = 0;
                    }
                    compteBancaireService.save(cb)
                    def json = builder.build {
                        message = " insert success"
                    }
                    render(status: 201, contentType: 'application/json', text: json)
                    return response.status = 201
                }

            case "GET":
                def rs = CompteBancaire.list()
                def json = builder.build {
                    rs
                }
                render(status: 200, contentType: 'application/json', text: json)
                return response.status = 200
                return response.status = HttpServletResponse.SC_NOT_ACCEPTABLE
        }
    }
    def mouvementbancaire(){
        switch (request.getMethod()) {
            case "POST":
                if (request.JSON.somme && request.JSON.id && request.JSON.typeMouvement) {
                    MouvementBancaire mb = new MouvementBancaire()
                    mb.dateMouvement = new Date()
                    mb.somme = request.JSON.somme
                    mb.typeMouvement = MouvementBancaire.TypeMouvement.valueOf(request.JSON.typeMouvement)
                    mb.compteBancaire = compteBancaireService.get(request.JSON.id)
                    mouvementBancaireService.save(mb)
                    CompteBancaire cb = compteBancaireService.get(request.JSON.id)

                    if (mb.typeMouvement.name().equals("DEBIT")) {
                        if(cb.soldeencours>mb.somme) {
                                cb.soldeencours -= mb.somme
                        } else{
                            def json = builder.build {
                                message = " Votre solde est insuffisant"
                            }
                            render(status: 406, contentType: 'application/json', text: json)
                            return response.status = 406
                        }
                    }
                    else {
                        cb.soldeencours += mb.somme
                    }
                    compteBancaireService.save(cb)
                    def json = builder.build {
                        message = " insert success"
                    }
                    render(status: 201, contentType: 'application/json', text: json)
                    return response.status = 201
                }
            case "GET":
                def rs = MouvementBancaire.list()
                def json = builder.build {
                    rs
                }
                render(status: 200, contentType: 'application/json', text: json)
                return response.status = 200
                return response.status = HttpServletResponse.SC_NOT_ACCEPTABLE
        }
        return response.status = HttpServletResponse.SC_NOT_ACCEPTABLE
    }
}

