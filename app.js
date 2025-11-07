const express = require('express');
const app = express();
app.use(express.json());
const items = [
  { id: 1, name: 'Cahier',price: 15 },
  { id: 2, name: 'Stylo' ,price: 3 },
  { id: 3, name: 'livre' ,price: 8 }
];



app.get('/items', (req, res) => {
  res.status(201).json(items);
});

app.get('/items/:id', (req, res) => {
  const id = Number(req.params.id);       
  const item = items.find(i => i.id === id);

if (item){
    res.status(200).json(item)
}else 
    res.status(404).json({error:'Item not found'})
})


app.post('/items', (req, res) => {
const { name , price } = req.body;
const id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
const newItem = { id, name, price };
items.push(newItem)
res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);

  if (item) {
    item.name = req.body.name;
    item.price = req.body.price;
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);         
  const index = items.findIndex(i => i.id === id);  

  if (index !== -1) {
    items.splice(index, 1);                     
    res.status(200).json({message:'Item supprimer avec succes'});                    
  } else {
    res.status(404).json({ error: 'Item not found' });
  
  }
});


app.delete('/items', (req, res) => {
  items.length = 0;                
  res.status(204).send();     
});


module.exports = app ; 


