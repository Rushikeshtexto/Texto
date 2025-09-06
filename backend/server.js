const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const ExcelJS = require('exceljs');
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(cors());
app.use(express.json());

// ================= MySQL Connection =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",            // your MySQL username
  password: "@Rushi1234",  // your MySQL password
  database: "profile"      // your database name
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection error:", err.message);
    return;
  }
  console.log("✅ MySQL Connected...");
});





// ================= Routes =================

// GET all users

app.get("/users", ( req,res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ Error fetching users:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    
    res.json(result);
  });
});

// POST add new user

app.post("/users", (req, res) => {
  const { name, email, phone, location, first_active, last_updated, password } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required" });
  }

  const sql = `
    INSERT INTO users (name, email, phone, location, first_active, last_updated, password)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, phone, location, first_active, last_updated, password],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting user:", err.message);
        return res.status(500).json({ error: "Database error" });
      }
      
    }
  );
});

////normalize function for date value
function normalizeDate(value) {
  if (!value) return null;

  let dateObj;

  if (value instanceof Date) {
    dateObj = value;
  } else if (typeof value === "object" && value.text) {
    dateObj = new Date(value.text);
  } else if (typeof value === "string") {
    dateObj = new Date(value);
    if (isNaN(dateObj)) {
      const parts = value.split("-");
      if (parts.length === 3) {
        dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }
    }
  } else if (typeof value === "number") {
    dateObj = new Date(Math.round((value - 25569) * 86400 * 1000));
  }

  if (isNaN(dateObj)) return null;

  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}


function parseCellValue(cellValue) {
  if (!cellValue) return "";
  if (typeof cellValue === "object") {
    if (cellValue.text) return String(cellValue.text);
    if (cellValue.result) return String(cellValue.result);
    if (cellValue.richText) {
      return cellValue.richText.map(r => r.text).join("");
    }
    return JSON.stringify(cellValue); 
  }
  return String(cellValue);
}

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const workbook = new ExcelJS.Workbook();

    // Detect file type
    const fileExt = req.file.originalname.split('.').pop().toLowerCase();

    if (fileExt === "csv") {
      // For CSV, read as text string
      const csvText = req.file.buffer.toString('utf8');
      await workbook.csv.read(csvText);
    } else if (fileExt === "xlsx") {
      // For XLSX, read from buffer
      await workbook.xlsx.load(req.file.buffer); // ✅ ExcelJS v4+
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    const worksheet = workbook.worksheets[0];
    if (!worksheet) return res.status(400).json({ error: "No worksheet found in file" });

    const values = [];
   worksheet.eachRow((row, rowNumber) => {
  if (rowNumber === 1) return; // skip header row

  const name = parseCellValue(row.getCell(1).value);
  const email = parseCellValue(row.getCell(2).value).toLowerCase();
  const phone = parseCellValue(row.getCell(3).value);
  const location = parseCellValue(row.getCell(4).value);
  const first_active = normalizeDate(row.getCell(5).value);
  const last_updated = normalizeDate(row.getCell(6).value);
  const password = parseCellValue(row.getCell(7).value);

  if (name && email) {
    values.push([name, email, phone, location, first_active, last_updated, password]);
  }
});

    if (values.length === 0) return res.status(400).json({ error: "No valid rows in file" });

    const sql = `
      INSERT INTO users (name, email, phone, location, first_active, last_updated, password)
      VALUES ?
    `;

    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("❌ DB insert failed:", err.message);
        return res.status(500).json({ error: "Database insert failed", details: err.message });
      }
      res.json({ message: "✅ File uploaded and data saved", rows: result.affectedRows });
    });

  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Failed to process file", details: err.message });
  }
});

// Signup API
/*
app.post("/signup", (req, res) => {
  const { name, email, phone,location, password } = req.body;

  if (!name || !email || !phone || !location|| !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO signup(name, email, phone, location, password) VALUES (?, ?, ?, ?,?)";
  db.query(sql, [name, email, phone, location,password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Email or Phone already exists" });
      }
      console.error("❌ Error inserting signup data:", err.message);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ message: "✅ User signed up successfully!", userId: result.insertId });
  });
});

*/

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});


