const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


// Подключение к базе данных через try/catch
(async () => {
try {
await mongoose.connect(process.env.MONGO_URI);
console.log('✅ Connected to MongoDB');
} catch (err) {
console.error('❌ Error connecting to MongoDB:', err);
}
})();


// Шаблон хранения пользователей (в основном файле)
const userSchema = new mongoose.Schema({
name: { type: String, required: true },
createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);


// API: сохранить имя
app.post('/api/users', async (req, res) => {
try {
const { name } = req.body;
if (!name) return res.status(400).json({ error: 'Name required' });


const user = new User({ name });
await user.save();
res.json({ message: 'User saved', user });
} catch (err) {
console.error('Error saving user:', err);
res.status(500).json({ error: 'Server error' });
}
});


// API: список имён
app.get('/api/users', async (req, res) => {
try {
const users = await User.find().sort({ createdAt: -1 });
res.json(users);
} catch (err) {
console.error('Error fetching users:', err);
res.status(500).json({ error: 'Server error' });
}
});


// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));