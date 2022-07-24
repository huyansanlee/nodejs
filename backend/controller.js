const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfig = require("./config/multer_config");
const upload = multer(multerConfig.config).single(multerConfig.keyUpload); // multerConfig.keyUpload คีย์สำหรับอัปโหลด
const db = require("./models");
const product = require("./models/product");

//เรียกดูข้อมูล
router.get("/product", async (req, res) => {
  try {
    const result = await db.Product.findAll({
      order: [["id", "DESC"]],
      // attributes:['name','image']
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//ค้นหา
router.get("/product/:id", async (req, res) => {
  try {
    const result = await db.Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// insert into to DB
router.post("/product", (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.log(`error: ${JSON.stringify(err)}`);
      return res.status(500).json({ message: err });
    } else if (err) {
      console.log(`error: ${JSON.stringify(err)}`);
      return res.status(500).json({ message: err });
    }

    const data = {
      ...req.body,
      image: req.file ? req.file.filename : undefined,
    };

    try {
      const product = await db.Product.create(data);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
});

// update DB
router.put("/product/:id", async (req, res) => {
  try {
    const result = await db.Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    updateProduct(req, res, result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete DB
router.delete("/product/:id", async (req, res) => {
  try {
    const deleted = await db.Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      return res.status(204).json({ message: "Product deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function updateProduct(req, res, product) {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.log(`error: ${JSON.stringify(err)}`);
      return res.status(500).json({ message: err });
    } else if (err) {
      console.log(`error: ${JSON.stringify(err)}`);
      return res.status(500).json({ message: err });
    }

    const data = {
      ...req.body,
      image: req.file ? req.file.filename : undefined,
    };

    try {
      const [updated] = await db.Product.update(data, {
        where: {
          id: product.id,
        },
      });
      if (updated) {
        const updateProduct = await db.Product.findByPk(product.id);
        res.status(200).json(updateProduct);
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}

// localhost:1150
// app.get("/", (req, res)=> {
//   res.send("Hello World");
// });

// localhost:1150/sayhi
// app.get("/sayhi", (req, res) => {
//   res.send("Habib sanlee");
// });

// localhost:1150/sayhi/Kropinang
// router.get("/sayhi/:name", (req, res) => {
//   res.send(`Habib sanlee, ${req.params.name}`);
// });

// // localhost:1150/sayhi/Kropinang/sanlee
// router.get("/sayhi/:name/:lastname", (req, res) => {
//   res.send(`${req.params.name}, ${req.params.lastname}`);
// });

// // localhost:1150/product?name=macbook
// app.get("/product", (req, res) => {
//   res.send(`${req.query.name}`);
// });

// localhost:1150/product?name=macbook&price=1234
// app.get("/product", (req, res) => {
//   res.send(`${req.query.name}, ${req.query.price}`);
// });

// app.post("/product/:id", (req, res) => {
//     console.log(req.body);
//     res.send(`POST Product: ${req.params.id}`);
//   });

// middle ware ใช้ multer()  ==== upload.none()
// app.post("/product/:id", upload.none(), (req, res) => {
//   console.log(req.body);
//   res.send(`POST Product: ${req.params.id}`);
// });

// upload photo
// router.post("/product/:id", (req, res) => {
//   upload(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       console.log(`error: ${JSON.stringify(err)}`);
//     } else if (err) {
//       console.log(`error: ${JSON.stringify(err)}`);
//     }

//     const fileName = req.file ? req.file.fieldname : undefined;
//     res.send(`POST Product: ${req.params.id}, ${fileName}`);
//   });
// });

module.exports = router;
