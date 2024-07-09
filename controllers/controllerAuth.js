const admin = require('firebase-admin');

const serviceAccount = process.env.SEC;

//initializing our secret key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const postData = (req, res) => {
    
    console.log(req.body);
    
    let name = req.body.name;
    let email = req.body.email;
    let msg = req.body.message;

    function generateAlphanumericID(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
    
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    }
    
    // Example usage:
    const id = generateAlphanumericID(10);
    console.log(id);

            async function run() {
      
                const data = {Name: String(name), Email: String(email), Message: String(msg), createdAt: Date.now()};
                
                try {
                    await db.collection('formData').doc(id).set(data);
                    let resObj = {
                        status: "Success",
                        statusCode: 200,
                        message: "OK",
                        data,
                        error: null
                    };
                    // res.status(200).json(resObj);
                    console.log(resObj);

                    setTimeout(() => {
                        res.redirect("viewdata");
                    }, 1000);

                } catch (error) {
                    let resObj = {
                        status: "Fail",
                        statusCode: 500,
                        message: "Failed To Add Data",
                        data,
                        error: "Yes"
                    };
                    res.status(500).json(resObj);
                }
              
            }

            run().catch(console.error);


            

}; 


const getForm = (req, res) => {
res.render("formpage")
}; 


const getDBData = (req, res) => {
    
    async function run() {
      const dbData = db.collection('formData');
      const snapshot = await dbData.get(); 
      
      if (snapshot.empty) {
        console.log('Enter the Data to DB first');
        res.json({
          status: "No Content",
          statusCode: 204,
          message: "Collection Seems To Be Empty",
          data,
          error: null
      })
        return;
      } 
      
      data = []
      console.log("Our Data Is:")
      snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      data.push({id: doc.id, name: doc.data().Name, email: doc.data().Email, message: doc.data().Message, createdAt: doc.data().createdAt})
      });

      console.log(data);

      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      res.render("viewdbdata", data);
  
          
      }
        
      run().catch(console.error);

  
  }; 


module.exports = {postData, getForm, getDBData}
