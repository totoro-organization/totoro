
const axios = require("axios");

module.exports = {
  getAllByInsee: async function (type, value, data, organizationType) {

    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.INSEE}`};

    try {
        const request = await axios({
            method: "get",
            url: `https://api.insee.fr/entreprises/sirene/V3/${type}/${value}`,
            headers
        });
        const response = request.data["etablissement"];
        data["siren"] = response.siren
		data["siret"] = response.siret
		data["name"] = response.uniteLegale.denominationUniteLegale
        data["address"] = !response.adresseEtablissement.libelleVoieEtablissement ? null :`${response.adresseEtablissement.numeroVoieEtablissement} ${response.adresseEtablissement.typeVoieEtablissement} ${response.adresseEtablissement.libelleVoieEtablissement}`
		if(organizationType === "association"){
            data["creation_date"] = response.dateCreationEtablissement
            data["activity"] = response.uniteLegale.activitePrincipaleUniteLegale
            data["cp"] = response.adresseEtablissement.codePostalEtablissement
            data["commune"] = response.adresseEtablissement.libelleCommuneEtablissement 
        }else {
            data["address"] += data["address"]+" "+data["cp"]+" "+data["commune"]
        }
        
        let address =  "";
        if(data["address"]) address+=data["address"]+" ";
        address+=data["commune"];
        address.replaceAll(' ', '+');
        
        const getCordonates = await module.exports.getAddress(encodeURI(address), data["cp"]);
		data["longitude"] = getCordonates.long
		data["latitude"] = getCordonates.lat

        
    } catch (error) {
        data["statut"] = error.response.data.header.statut
        data["message"] = error.response.data.header.message
    }

    return data;
  },

  getAddress: async function(address, postalCode) {
    let url = `https://api-adresse.data.gouv.fr/search/?q=${address}`
    if(postalCode) url += `&postcode=${postalCode}`

    const request = await axios({
        method: "get",
        url
    });
    return {
        lat: request.data.features[0].geometry.coordinates[1],
        long: request.data.features[0].geometry.coordinates[0]
    }
  }
}
  