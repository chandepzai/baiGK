const axios = require("axios");

const BASE_URL = "https://api.dak.edu.vn/api_rau/vegetables.php";

// Lấy danh sách rau củ theo trang
async function getVegetables(page = 1) {
  try {
    const res = await axios.get(`${BASE_URL}?page=${page}&limit=5`);
    return res.data.data; // Trả về danh sách rau củ
  } catch (err) {
    console.error("Lỗi khi lấy danh sách rau:", err.message);
    return [];
  }
}

// Thêm rau mới
async function addVegetable(veg) {
  if (!veg.name || !veg.price || !veg.group || !veg.description) {
    throw new Error("Vui lòng cung cấp đầy đủ thông tin rau.");
  }
  try {
    const res = await axios.post(BASE_URL, veg, {
      headers: { "Content-Type": "application/json" }
    });
    return res.data; // Trả về dữ liệu phản hồi sau khi thêm rau
  } catch (err) {
    throw new Error("Lỗi khi thêm rau: " + (err.response?.data || err.message));
  }
}

// Cập nhật giá và mô tả theo ID
async function updateVegetable(id, price, description) {
  if (!id || !price || !description) {
    throw new Error("Cần cung cấp ID, giá và mô tả mới.");
  }
  try {
    const res = await axios.put(`${BASE_URL}?id=${id}`, {
      price: parseInt(price),
      description
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return res.data; // Trả về thông báo cập nhật thành công
  } catch (err) {
    throw new Error("Lỗi khi cập nhật: " + (err.response?.data || err.message));
  }
}

// Xóa rau theo ID
async function deleteVegetable(id) {
  if (!id) {
    throw new Error("ID không hợp lệ!");
  }
  try {
    const res = await axios.delete(`${BASE_URL}?id=${id}`);
    return res.data; // Trả về thông báo xóa thành công
  } catch (err) {
    throw new Error("Lỗi khi xóa rau: " + (err.response?.data || err.message));
  }
}

module.exports = {
  getVegetables,
  addVegetable,
  updateVegetable,
  deleteVegetable
};
