const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Gasto = require('./data/gastos'); // Asegúrate de que el modelo esté bien definido

// URI de conexión (¡entre comillas!)
const URI = 'mongodb+srv://msalazar:CXaPc7Q8nPxVffMe@cluster0.nce8d7z.mongodb.net/gastos_db?retryWrites=true&w=majority&appName=Cluster0';


//const URI = 'mongodb://127.0.0.1:27017/gastos';


// Conexión a MongoDB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Conexión a MongoDB establecida');

  // Verifica si hay documentos
  const count = await Gasto.countDocuments();
  if (count === 0) {
    const filePath = path.join(__dirname, 'data', 'gastos.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const gastos = JSON.parse(jsonData);

    await Gasto.insertMany(gastos);
    console.log('📥 Datos insertados desde gastos.json');
  } else {
    console.log('📦 Datos ya existen en la base de datos, no se insertó nada.');
  }
})
.catch(err => {
  console.error('❌ Error al conectar a MongoDB:', err);
});

module.exports = mongoose;


