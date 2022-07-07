const pagination = require('./../generique/pagination');
const {response201, response200, bodyParam, param} = require("../generique");

module.exports = {
    "/api/jobs": {
        get: {
          tags: [
            "Jobs"
          ],
          "x-swagger-router-controller": "jobs",
          operationId: "getAllJobs",
          parameters: [
            {
              name: "status",
              in: "query",
              type: "string",
              required: false,
              enum: [
                "actived",
                "deleted"
              ]
            },
            ...pagination,
            ...param("latitude","query","integer",false,"La longitude de l'utilisateur"),
            ...param("longitude","query","integer",false,"La latitude de l'utilisateur"),
            ...param("distance","query","integer",false),
            ...param("title","query","string",false),
            ...param("min","query","integer",false),
            ...param("max","query","integer",false),
            ...param("isExpired","query","string",false),
            ...param("end_date","query","string",false),
            ...param("cp","query","integer",false),
            ...param("commune","query","string",false),
            ...param("type","query","string",false),
            ...param("category","query","string",false),
          ],
          responses: response200("getAllJobs")
        },
        post: {
          tags: [
            "Jobs"
          ],
          "x-swagger-router-controller": "jobs",
          operationId: "postJob",
          consumes: [
            "multipart/form-data"
          ],
          parameters: [
            ...param("tags","formData",["array",{items: {type: "string"}}],true,"Liste des id des tags"),
            ...param("difficulty_id","formData","string",true,"Id difficulté de la maison"),
            ...param("assos_user_id","formData","string",true,"Id du membre de la table association utilisateur"),
            ...param("title","formData","string",true,"Titre de la mission"),
            ...param("description","formData","string",true,"Description de la mission"),
            ...param("participants_max","formData","integer",false,"Nombre maximum de participants"),
            ...param("start_date","formData","string",true,"Date du début de la mission"),
            ...param("end_date","formData","string",false,"Date de fin de la mission"),
            ...param("address","formData","string",true,"Adresse où se passe la mission (n° + nom de la rue)"),
            ...param("cp","formData","integer",true,"Code postal où se passe la mission"),
            ...param("commune","formData","string",true,"Commune où se passe la mission"),
            ...param("longitude","formData","integer",true,"La longitude de l'adresse"),
            ...param("latitude","formData","integer",true,"La latitude de l'adresse"),
            ...param("images","formData", ["array", {items: {type:"string", format:"binary"}}],true,"Illustrations (images liées à la mission)"),
            /*{
              "files[]": {
                "name": "files",
                "in": "formData"
              },
              description: "Upload multiple files",
              required: true,
              type: "array",
              items:{
                type: "file"
              },
              collectionFormat: "multi"
            }*/
            //...param("images","formData",["array",{items: {type: "File"}}],true,"Illustrations (images liées à la mission)", "multi"),
          ],
          responses: response201("Job Created")
        }
    },
    "/api/jobs/{id}": {
        get: {
          tags: [
            "Jobs"
          ],
          "x-swagger-router-controller": "jobs",
          operationId: "getJobById",
          parameters: [
            ...param("id","path","string"),
            ...param("longitude","query","integer",false,"La longitude de l'utilisateur"),
            ...param("latitude","query","integer",false,"La latitude de l'utilisateur")
          ],
          responses: response200("getJob")
        },
        put: {
          tags: [
            "Jobs"
          ],
          "x-swagger-router-controller": "jobs",
          operationId: "putJob",
          parameters: [
            ...param("id","path","string"),
            ...bodyParam("Update Job", "putJob")
          ],
          responses: response201("Job Updated")
        },
        delete: {
          tags: [
            "Jobs"
          ],
          "x-swagger-router-controller": "jobs",
          operationId: "deleteJob",
          parameters: param("id","path","string"),
          responses: response201()
        }
    },
    "/api/jobs/{id}/register": {
        post: {
          tags: [
            "Jobs"
          ],
          "x-swagger-router-controller": "jobs",
          operationId: "registerToJob",
          parameters: [
            ...param("id","path","string"),
          ],
          responses: response201("Register Created")
        }
    },
    "/api/jobs/{id}/participants": {
        get: {
          tags: [
            "Jobs"
          ],
          "x-swagger-router-controller": "jobs",
          operationId: "getParticipantsJobById",
          parameters: [
            ...param("id","path","string"),
            {
                name: "status",
                in: "query",
                type: "string",
                required: false,
                enum: [
                  "actived",
                  "deleted"
                ]
            },
            ...pagination
          ],
          responses: response200("getParticipantsJob")
        }
    },
    "/api/jobs/{id}/favorites": {
        get: {
          tags: [
            "Jobs"
          ],
          "x-swagger-router-controller": "jobs",
          operationId: "getFavoritesJobById",
          parameters: [
            ...param("id","path","string"),
            ...pagination
          ],
          responses: response200("getFavoritesJob")
        }
    },
    "/api/jobs/{id}/litigations": {
        get: {
          tags: [
            "Jobs"
          ],
          "x-swagger-router-controller": "jobs",
          operationId: "getLitigationsJobById",
          parameters: [
            ...param("id","path","string"),
            {
                name: "status",
                in: "query",
                type: "string",
                required: false,
                enum: [
                  "actived",
                  "deleted"
                ]
            },
            ...pagination
          ],
          responses: response200("getLitigationsJob")
        }
    },
    "/api/jobs/image/{attachment_jobs_id}": {
        put: {
          tags: [
            "Jobs"
          ],
          "x-swagger-router-controller": "jobs",
          operationId: "putJob",
          consumes: [
            "multipart/form-data"
          ],
          parameters: [
            ...param("attachment_jobs_id","path","string"),
            ...param("image","formData","file",true,"Image liée à la mission"),
          ],
          responses: response201("Image Job Updated")
        },
        delete: {
          tags: [
            "Jobs"
          ],
          "x-swagger-router-controller": "jobs",
          operationId: "deleteImageJob",
          parameters: param("attachment_jobs_id","path","string"),
          responses: response201()
        }
    }
}