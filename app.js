const express = require('express');
const path = require('path');
const {
  getVegetables,
  addVegetable,
  updateVegetable,
  deleteVegetable
} = require('./vegetableAPI');

const app = express();
const port = 3000;

// Cấu hình view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware xử lý form POST
app.use(express.urlencoded({ extended: true }));

// Route: Trang chủ hiển thị danh sách rau củ
app.get('/', async (req, res) => {
  try {
    const vegetables = await getVegetables(1); // Trang đầu tiên
    res.render('index', { vegetables });
  } catch (err) {
    console.error('Lỗi khi lấy danh sách rau củ:', err.message);
    res.render('index', { vegetables: [] });
  }
});

// Route: Thêm rau củ mới
app.post('/add', async (req, res) => {
  const { name, price, group, description } = req.body;
  const newVegetable = { name, price, group, description };

  try {
    await addVegetable(newVegetable);
    res.redirect('/');
  } catch (err) {
    console.error('Lỗi khi thêm rau củ:', err.message);
    res.redirect('/');
  }
});

// Route: Hiển thị form chỉnh sửa rau củ
app.get('/edit/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const vegetables = await getVegetables(1);
    const vegetable = vegetables.find(v => String(v.id) === id);

    if (vegetable) {
      res.render('edit', { vegetable });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.error('Lỗi khi lấy thông tin rau củ:', err.message);
    res.redirect('/');
  }
});

// Route: Xử lý cập nhật rau củ
app.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { price, description } = req.body;

  try {
    await updateVegetable(id, price, description);
    res.redirect('/');
  } catch (err) {
    console.error('Lỗi khi cập nhật rau củ:', err.message);
    res.redirect('/');
  }
});

// Route: Xóa rau củ
app.post('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await deleteVegetable(id);
    res.redirect('/');
  } catch (err) {
    console.error('Lỗi khi xóa rau củ:', err.message);
    res.redirect('/');
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});
