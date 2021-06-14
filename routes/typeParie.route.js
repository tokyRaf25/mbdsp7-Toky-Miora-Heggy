const typeParie =  require("../models/TypeParie")
const parie_sport =  require("../models/parie_sport")
listTypeParie = async ( req , res ) => {  
   /*const val = await typeParie.find();
   res.send(val);*/
    var typeParieQuery = typeParie.aggregate();
  
	  typeParie.aggregatePaginate(
		typeParieQuery,
		{
		  page: parseInt(req.query.page) || 1,
		  limit: parseInt(req.query.limit) || 10,
		},
		(err, typeParies) => {
		  if (err) {
			res.send(err);
		  }
		  res.send(typeParies);
		}
	  );
}

insertTypeParie =  async(req,res) =>{
   let insert = new typeParie();
   insert.typeParie = req.body.typeParie;
   insert.save((err) => {
    if (err) {
      res.send("cant post typeParie ", err);
    }
    res.json({ message: `${insert.typeParie} saved!` });
  });
}

deleteTypeParie =  async(req,res) =>{
	typeParie.findByIdAndRemove(req.params.id, (err, typeParie) => {
    if (err) {
	 res.send(err);
    }
    res.json({ message: `${typeParie.typeParie} deleted` });
	});

}

updateTypeParie = async (req,res) => {
	typeParie.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, typeParie) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "updated" });
      }
    }
  );
}

listMacthParTypeParie = async(req,res) =>{
	
	 var parie_sportQuery = parie_sport.aggregate();
  
	  parie_sport.aggregatePaginate(
		parie_sportQuery,
		{
		  page: parseInt(req.query.page) || 1,
		  limit: parseInt(req.query.limit) || 10,
		  idTypePari: req.params.id
		},
		(err, parie_sport) => {
		  if (err) {
			res.send(err);
		  }
		  res.send(parie_sport);
		}
	  );
	
}

module.exports = { 
  listTypeParie,
  insertTypeParie,
  deleteTypeParie,
  updateTypeParie,
  listMacthParTypeParie
}