    //Vi henter chai, chai-http og chai-integer
    const chai = require("chai")
    const chaiHttp = require("chai-http")
    const expect = chai.expect
    chai.use(chaiHttp)
    chai.use( require('chai-integer') );
    
    //Vi beskriver hvilket endpoint vi tester
    describe("POST a user", () => {
        //Vi beskriver hvad vi forventer der skal ske
        it("should post a user", async () => {
            let res = await chai
                //Vi henter api'et
                .request("http://localhost:7071/api")
                //Vi henter endpointet, som der postes til
                .post("/PostAndGetUser")
                //Vi sender test data afsted
                //Vi benytter et random generated username, da dette skal være unikt for hver bruger
                .send({
                username: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                password: "testing",
                firstname: "testing",
                lastname: "testing",
                birthdate: "0001-01-01",
                gender: "testing",
                lookingfor: "testing",
                agerange: "testing",
                region: "testing"
                })

                //Vi beskriver hvad vi forventer der skal ske
                expect(res).to.have.status(200)
        })
    })

    describe("Matchcounter", () => {
    it("should have status 200", async () => {
        let res = await chai
      
            .request("http://localhost:7071/api")
            .get("/matchcounter")
          
            expect(res).to.have.status(200)
            
                   
    })
    it("should get a number from the database", async () => {
        let res = await chai
      
            .request("http://localhost:7071/api")
            .get("/matchcounter")
          
           
           
    
            expect(JSON.parse(res.text)[0].value).to.be.an.integer()
        


                   
    })
})

