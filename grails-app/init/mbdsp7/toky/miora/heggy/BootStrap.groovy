package mbdsp7.toky.miora.heggy

import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->
        JSON.registerObjectMarshaller(MouvementBancaire) {
            def returnArray = [:]
            returnArray['somme'] = it.somme
            returnArray['dateMouvement'] = it.dateMouvement
            returnArray['typeMouvement'] = it.typeMouvement.name()
            returnArray['compteBancaire'] = it.compteBancaire.id
            return returnArray
        }
    }
    def destroy = {
    }
}
