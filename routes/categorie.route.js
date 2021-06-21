const categorie =  require("../models/Categorie")

listCategorie = async ( req , res ) => { 
   /*const val = await categorie.find();
   res.send(val);*/
   var categorieQuery = categorie.aggregate();
  
	  categorie.aggregatePaginate(
		categorieQuery,
		{
		  page: parseInt(req.query.page) || 1,
		  limit: parseInt(req.query.limit) || 10,
		},
		(err, categories) => {
		  if (err) {
			res.send(err);
		  }
		  res.send(categories);
		}
	  );
}

insertCategorie =  async(req,res) =>{
   let insert = new categorie();
   insert.nomcategorie = req.body.nomcategorie;
   insert.save((err) => {
    if (err) {
      res.send("cant post categorie ", err);
    }
    res.json({ message: `${insert.nomcategorie} saved!` });
  });
}

deleteCategorie =  async(req,res) =>{
	categorie.findByIdAndRemove(req.params.id, (err, categorie) => {
    if (err) {
	 res.send(err);
    }
    res.json({ message: `${categorie.nomcategorie} deleted` });
	});

}

updateCategorie = async (req,res) => {
	categorie.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, categorie) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }
    }
  );
}

function getNomByIdCategorie(idCategorie){
  var result = null;
  categorie.findOne({ _id: idCategorie }, (err, categorie) => {
    result = categorie.nomcategorie;
    //console.log(result);
  });
  return result;
}

module.exports = { 
  listCategorie,
  insertCategorie,
  deleteCategorie,
  updateCategorie,
  getNomByIdCategorie
}