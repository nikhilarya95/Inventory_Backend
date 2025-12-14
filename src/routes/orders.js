// // // // const express = require('express');
// // // // const { body, validationResult } = require('express-validator');
// // // // const Order = require('../models/Order');
// // // // const Customer = require('../models/Customer');
// // // // const Stock = require('../models/Stock');
// // // // const { auth, authorize } = require('../middleware/auth');
// // // // const { generateOrderId } = require('../utils/helpers');

// // // // const router = express.Router();

// // // // router.get('/', auth, async (req, res) => {
// // // //   try {
// // // //     const orders = await Order.find({ isActive: true })
// // // //       .populate('customer')
// // // //       .populate('items.product')
// // // //       .populate('createdBy', 'firstName lastName')
// // // //       .sort({ createdAt: -1 });
// // // //     res.json(orders);
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // router.get('/:id', auth, async (req, res) => {
// // // //   try {
// // // //     const order = await Order.findById(req.params.id)
// // // //       .populate('customer')
// // // //       .populate('items.product')
// // // //       .populate('items.stock')
// // // //       .populate('createdBy', 'firstName lastName');
    
// // // //     if (!order || !order.isActive) {
// // // //       return res.status(404).json({ message: 'Order not found' });
// // // //     }
// // // //     res.json(order);
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // router.post('/', auth, authorize('Admin', 'Sales Man'), [
// // // //   body('customer').notEmpty().withMessage('Customer is required'),
// // // //   body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
// // // //   body('items.*.product').notEmpty().withMessage('Product is required'),
// // // //   body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
// // // //   body('items.*.mrp').isFloat({ min: 0 }).withMessage('MRP is required')
// // // // ], async (req, res) => {
// // // //   try {
// // // //     const errors = validationResult(req);
// // // //     if (!errors.isEmpty()) {
// // // //       return res.status(400).json({ errors: errors.array() });
// // // //     }

// // // //     const customer = await Customer.findById(req.body.customer);
// // // //     if (!customer || !customer.isActive) {
// // // //       return res.status(400).json({ message: 'Invalid customer' });
// // // //     }

// // // //     const orderId = generateOrderId();
// // // //     const order = new Order({
// // // //       ...req.body,
// // // //       orderId,
// // // //       orderDate: req.body.orderDate || new Date(),
// // // //       createdBy: req.user._id
// // // //     });

// // // //     await order.save();
// // // //     await order.populate('customer');
// // // //     await order.populate('items.product');

// // // //     res.status(201).json({ message: 'Order created successfully', order });
// // // //   } catch (error) {
// // // //     console.error('Create order error:', error);
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // router.put('/:id', auth, authorize('Admin', 'Sales Man'), [
// // // //   body('items').optional().isArray({ min: 1 }),
// // // //   body('status').optional().isIn(['Pending', 'Confirmed', 'Billed', 'Cancelled'])
// // // // ], async (req, res) => {
// // // //   try {
// // // //     const errors = validationResult(req);
// // // //     if (!errors.isEmpty()) {
// // // //       return res.status(400).json({ errors: errors.array() });
// // // //     }

// // // //     const updates = { ...req.body };
// // // //     delete updates.orderId;
// // // //     delete updates.createdBy;

// // // //     const order = await Order.findByIdAndUpdate(
// // // //       req.params.id,
// // // //       updates,
// // // //       { new: true }
// // // //     )
// // // //     .populate('customer')
// // // //     .populate('items.product');

// // // //     if (!order) {
// // // //       return res.status(404).json({ message: 'Order not found' });
// // // //     }

// // // //     res.json({ message: 'Order updated successfully', order });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // router.delete('/:id', auth, authorize('Admin', 'Sales Man'), async (req, res) => {
// // // //   try {
// // // //     const order = await Order.findByIdAndUpdate(
// // // //       req.params.id,
// // // //       { isActive: false, status: 'Cancelled' },
// // // //       { new: true }
// // // //     );

// // // //     if (!order) {
// // // //       return res.status(404).json({ message: 'Order not found' });
// // // //     }

// // // //     res.json({ message: 'Order deleted successfully' });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // module.exports = router;



// // // const express = require('express');
// // // const { body, validationResult } = require('express-validator');
// // // const Order = require('../models/Order');
// // // const Customer = require('../models/Customer');
// // // const Stock = require('../models/Stock');
// // // const { auth, authorize } = require('../middleware/auth');
// // // const { generateOrderId } = require('../utils/helpers');

// // // const router = express.Router();

// // // /* =============================
// // //    GET ALL ORDERS
// // // ============================= */
// // // router.get('/', auth, async (req, res) => {
// // //   try {
// // //     const orders = await Order.find({ isActive: true })
// // //       .populate('customer')
// // //       .populate('items.product')
// // //       .populate('items.stock')
// // //       .populate('createdBy', 'firstName lastName')
// // //       .sort({ createdAt: -1 });

// // //     res.json(orders);
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Server error' });
// // //   }
// // // });


// // // /* =============================
// // //    GET ORDER BY ID
// // // ============================= */
// // // router.get('/:id', auth, async (req, res) => {
// // //   try {
// // //     const order = await Order.findById(req.params.id)
// // //       .populate('customer')
// // //       .populate('items.product')
// // //       .populate('items.stock')
// // //       .populate('createdBy', 'firstName lastName');

// // //     if (!order || !order.isActive) {
// // //       return res.status(404).json({ message: 'Order not found' });
// // //     }

// // //     res.json(order);
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Server error' });
// // //   }
// // // });


// // // /* =============================
// // //    CREATE ORDER (PRODUCT + STOCK + MRP AUTO)
// // // ============================= */
// // // router.post(
// // //   '/',
// // //   auth,
// // //   authorize('Admin', 'Sales Man'),
// // //   [
// // //     body('customer').notEmpty().withMessage('Customer is required'),
// // //     body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
// // //     body('items.*.product').notEmpty().withMessage('Product is required'),
// // //     body('items.*.stock').notEmpty().withMessage('Stock batch is required'),
// // //     body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
// // //   ],
// // //   async (req, res) => {
// // //     try {
// // //       const errors = validationResult(req);
// // //       if (!errors.isEmpty()) {
// // //         return res.status(400).json({ errors: errors.array() });
// // //       }

// // //       const customer = await Customer.findById(req.body.customer);
// // //       if (!customer || !customer.isActive) {
// // //         return res.status(400).json({ message: 'Invalid customer' });
// // //       }

// // //       /* ------------------------------
// // //          VALIDATE STOCK FOR EACH ITEM
// // //          AUTO MRP SET FROM STOCK
// // //       ------------------------------ */
// // //       for (const item of req.body.items) {
// // //         const stock = await Stock.findById(item.stock).populate("product");

// // //         if (!stock || !stock.isActive) {
// // //           return res.status(400).json({ message: `Invalid stock batch for product` });
// // //         }

// // //         if (item.quantity > stock.quantity) {
// // //           return res.status(400).json({
// // //             message: `${stock.product.productName} has only ${stock.quantity} left`
// // //           });
// // //         }

// // //         // Auto-set MRP from stock
// // //         item.mrp = stock.mrp;
// // //       }

// // //       const orderId = generateOrderId();

// // //       const order = new Order({
// // //         ...req.body,
// // //         orderId,
// // //         orderDate: req.body.orderDate || new Date(),
// // //         createdBy: req.user._id
// // //       });

// // //       await order.save();

// // //       /* ------------------------------
// // //          DEDUCT STOCK QUANTITY
// // //       ------------------------------ */
// // //       for (const item of req.body.items) {
// // //         await Stock.findByIdAndUpdate(item.stock, {
// // //           $inc: { quantity: -item.quantity }
// // //         });
// // //       }

// // //       await order.populate('customer');
// // //       await order.populate('items.product');
// // //       await order.populate('items.stock');

// // //       res.status(201).json({ message: 'Order created successfully', order });
// // //     } catch (error) {
// // //       console.error('Create order error:', error);
// // //       res.status(500).json({ message: 'Server error' });
// // //     }
// // //   }
// // // );


// // // /* =============================
// // //    UPDATE ORDER
// // // ============================= */
// // // router.put(
// // //   '/:id',
// // //   auth,
// // //   authorize('Admin', 'Sales Man'),
// // //   [
// // //     body('status').optional().isIn(['Pending', 'Confirmed', 'Billed', 'Cancelled'])
// // //   ],
// // //   async (req, res) => {
// // //     try {
// // //       const errors = validationResult(req);
// // //       if (!errors.isEmpty()) {
// // //         return res.status(400).json({ errors: errors.array() });
// // //       }

// // //       const updates = { ...req.body };
// // //       delete updates.orderId;
// // //       delete updates.createdBy;

// // //       const order = await Order.findByIdAndUpdate(req.params.id, updates, { new: true })
// // //         .populate('customer')
// // //         .populate('items.product')
// // //         .populate('items.stock');

// // //       if (!order) {
// // //         return res.status(404).json({ message: 'Order not found' });
// // //       }

// // //       res.json({ message: 'Order updated successfully', order });
// // //     } catch (error) {
// // //       res.status(500).json({ message: 'Server error' });
// // //     }
// // //   }
// // // );


// // // /* =============================
// // //    DELETE ORDER
// // // ============================= */
// // // router.delete('/:id', auth, authorize('Admin', 'Sales Man'), async (req, res) => {
// // //   try {
// // //     const order = await Order.findByIdAndUpdate(
// // //       req.params.id,
// // //       { isActive: false, status: 'Cancelled' },
// // //       { new: true }
// // //     );

// // //     if (!order) {
// // //       return res.status(404).json({ message: 'Order not found' });
// // //     }

// // //     res.json({ message: 'Order deleted successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Server error' });
// // //   }
// // // });

// // // module.exports = router;


// // const express = require('express');
// // const { body, validationResult } = require('express-validator');
// // const Order = require('../models/Order');
// // const Customer = require('../models/Customer');
// // const Product = require('../models/Product');
// // const Stock = require('../models/Stock');
// // const { auth, authorize } = require('../middleware/auth');
// // const { generateOrderId } = require('../utils/helpers');

// // const router = express.Router();

// // // GET all orders
// // router.get('/', auth, async (req, res) => {
// //   try {
// //     const orders = await Order.find({ isActive: true })
// //       .populate('customer')
// //       .populate('items.product')
// //       .populate('items.stock')
// //       .populate('createdBy', 'firstName lastName')
// //       .sort({ createdAt: -1 });

// //     res.json(orders);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // GET single order
// // router.get('/:id', auth, async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id)
// //       .populate('customer')
// //       .populate('items.product')
// //       .populate('items.stock')
// //       .populate('createdBy', 'firstName lastName');

// //     if (!order || !order.isActive) return res.status(404).json({ message: 'Order not found' });

// //     res.json(order);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // CREATE order
// // router.post(
// //   '/',
// //   auth,
// //   authorize('Admin', 'Sales Man'),
// //   [
// //     body('customer').notEmpty().withMessage('Customer is required'),
// //     body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
// //     body('items.*.product').notEmpty().withMessage('Product is required'),
// //     body('items.*.stock').notEmpty().withMessage('Stock is required'),
// //     body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
// //     body('items.*.mrp').isFloat({ min: 0 }).withMessage('MRP is required'),
// //   ],
// //   async (req, res) => {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

// //     try {
// //       const customer = await Customer.findById(req.body.customer);
// //       if (!customer || !customer.isActive) return res.status(400).json({ message: 'Invalid customer' });

// //       let totalAmount = 0;

// //       // Validate each item: stock exists, enough quantity
// //       for (const item of req.body.items) {
// //         const stock = await Stock.findById(item.stock);
// //         if (!stock) return res.status(400).json({ message: 'Invalid stock selected' });
// //         if (item.quantity > stock.quantity) return res.status(400).json({ message: `Not enough stock for ${stock.batchName}` });

// //         totalAmount += item.quantity * item.mrp;
// //       }

// //       const order = new Order({
// //         orderId: generateOrderId(),
// //         customer: req.body.customer,
// //         orderDate: req.body.orderDate || new Date(),
// //         items: req.body.items,
// //         totalAmount,
// //         status: 'Pending',
// //         createdBy: req.user._id,
// //       });

// //       await order.save();
// //       await order.populate('customer').populate('items.product').populate('items.stock');

// //       res.status(201).json({ message: 'Order created successfully', order });
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).json({ message: 'Server error' });
// //     }
// //   }
// // );

// // // UPDATE order
// // router.put('/:id', auth, authorize('Admin', 'Sales Man'), async (req, res) => {
// //   try {
// //     const updates = { ...req.body };
// //     delete updates.orderId;
// //     delete updates.createdBy;

// //     const order = await Order.findByIdAndUpdate(req.params.id, updates, { new: true })
// //       .populate('customer')
// //       .populate('items.product')
// //       .populate('items.stock');

// //     if (!order) return res.status(404).json({ message: 'Order not found' });

// //     res.json({ message: 'Order updated successfully', order });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // DELETE order
// // router.delete('/:id', auth, authorize('Admin', 'Sales Man'), async (req, res) => {
// //   try {
// //     const order = await Order.findByIdAndUpdate(
// //       req.params.id,
// //       { isActive: false, status: 'Cancelled' },
// //       { new: true }
// //     );

// //     if (!order) return res.status(404).json({ message: 'Order not found' });

// //     res.json({ message: 'Order deleted successfully' });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // module.exports = router;

// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const Order = require('../models/Order');
// const Customer = require('../models/Customer');
// const Product = require('../models/Product');
// const Stock = require('../models/Stock');
// const { auth, authorize } = require('../middleware/auth');
// const { generateOrderId } = require('../utils/helpers');

// const router = express.Router();

// /* =============================
//    GET ALL ORDERS
// ============================= */
// router.get('/', auth, async (req, res) => {
//   try {
//     const orders = await Order.find({ isActive: true })
//       .populate('customer')
//       .populate('items.product')
//       .populate('items.stock')
//       .populate('createdBy', 'firstName lastName')
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// /* =============================
//    GET SINGLE ORDER
// ============================= */
// router.get('/:id', auth, async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order || !order.isActive) return res.status(404).json({ message: 'Order not found' });

//     // Populate all required fields separately (safe for document instances)
//     await order.populate('customer');
//     await order.populate('items.product');
//     await order.populate('items.stock');
//     await order.populate('createdBy', 'firstName lastName');

//     res.json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// /* =============================
//    CREATE ORDER
// ============================= */
// router.post(
//   '/',
//   auth,
//   authorize('Admin', 'Sales Man'),
//   [
//     body('customer').notEmpty().withMessage('Customer is required'),
//     body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
//     body('items.*.product').notEmpty().withMessage('Product is required'),
//     body('items.*.stock').notEmpty().withMessage('Stock is required'),
//     body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     try {
//       const customer = await Customer.findById(req.body.customer);
//       if (!customer || !customer.isActive) return res.status(400).json({ message: 'Invalid customer' });

//       let totalAmount = 0;

//       // Validate each item: stock exists, enough quantity, auto-set MRP
//       for (const item of req.body.items) {
//         const stock = await Stock.findById(item.stock).populate('product');
//         if (!stock || !stock.isActive) return res.status(400).json({ message: 'Invalid stock selected' });
//         if (item.quantity > stock.quantity)
//           return res.status(400).json({ message: `Not enough stock for ${stock.product.productName}` });

//         item.mrp = stock.mrp;
//         totalAmount += item.quantity * stock.mrp;
//       }

//       const order = new Order({
//         orderId: generateOrderId(),
//         customer: req.body.customer,
//         orderDate: req.body.orderDate || new Date(),
//         items: req.body.items,
//         totalAmount,
//         status: 'Pending',
//         createdBy: req.user._id,
//       });

//       await order.save();

//       // Deduct stock quantity
//       for (const item of req.body.items) {
//         await Stock.findByIdAndUpdate(item.stock, { $inc: { quantity: -item.quantity } });
//       }

//       // Populate before sending response
//       await order.populate('customer');
//       await order.populate('items.product');
//       await order.populate('items.stock');

//       res.status(201).json({ message: 'Order created successfully', order });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   }
// );

// /* =============================
//    UPDATE ORDER
// ============================= */
// router.put('/:id', auth, authorize('Admin', 'Sales Man'), async (req, res) => {
//   try {
//     const updates = { ...req.body };
//     delete updates.orderId;
//     delete updates.createdBy;

//     const order = await Order.findByIdAndUpdate(req.params.id, updates, { new: true });
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     await order.populate('customer');
//     await order.populate('items.product');
//     await order.populate('items.stock');

//     res.json({ message: 'Order updated successfully', order });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// /* =============================
//    DELETE ORDER
// ============================= */
// router.delete('/:id', auth, authorize('Admin', 'Sales Man'), async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { isActive: false, status: 'Cancelled' },
//       { new: true }
//     );
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     res.json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const Stock = require('../models/Stock');
const { auth, authorize } = require('../middleware/auth');
const { generateOrderId } = require('../utils/helpers');

const router = express.Router();

/* =============================
   GET ALL ORDERS
============================= */
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ isActive: true })
      .populate('customer')
      .populate('items.product')
      .populate('items.stock')
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/* =============================
   GET SINGLE ORDER
============================= */
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order || !order.isActive)
      return res.status(404).json({ message: 'Order not found' });

    await order.populate('customer');
    await order.populate('items.product');
    await order.populate('items.stock');
    await order.populate('createdBy', 'firstName lastName');

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/* =============================
   CREATE ORDER
   Allowed Roles: Admin, Manager, Sales Man
============================= */
router.post(
  '/',
  auth,
  authorize('Admin', 'Manager', 'Sales Man'),
  [
    body('customer').notEmpty().withMessage('Customer is required'),
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*.product').notEmpty().withMessage('Product is required'),
    body('items.*.stock').notEmpty().withMessage('Stock is required'),
    body('items.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be at least 1'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const customer = await Customer.findById(req.body.customer);
      if (!customer || !customer.isActive)
        return res.status(400).json({ message: 'Invalid customer' });

      let totalAmount = 0;

      for (const item of req.body.items) {
        const stock = await Stock.findById(item.stock).populate('product');
        if (!stock || !stock.isActive)
          return res.status(400).json({ message: 'Invalid stock selected' });

        if (item.quantity > stock.quantity)
          return res
            .status(400)
            .json({ message: `Not enough stock for ${stock.product.productName}` });

        item.mrp = stock.mrp;
        totalAmount += item.quantity * stock.mrp;
      }

      const order = new Order({
        orderId: generateOrderId(),
        customer: req.body.customer,
        orderDate: req.body.orderDate || new Date(),
        items: req.body.items,
        totalAmount,
        status: 'Pending',
        createdBy: req.user._id,
      });

      await order.save();

      // Deduct stock
      for (const item of req.body.items) {
        await Stock.findByIdAndUpdate(item.stock, {
          $inc: { quantity: -item.quantity },
        });
      }

      await order.populate('customer');
      await order.populate('items.product');
      await order.populate('items.stock');

      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/* =============================
   UPDATE ORDER
   Allowed Roles: Admin ONLY
============================= */
/* =============================
   UPDATE ORDER + AUTO BILL GENERATION
============================= */
router.put('/:id', auth, authorize('Admin'), async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.orderId;
    delete updates.createdBy;

    const order = await Order.findById(req.params.id)
      .populate('customer')
      .populate('items.product')
      .populate('items.stock');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const previousStatus = order.status;

    // Apply updates
    Object.assign(order, updates);
    await order.save();

    /* ======================================
       AUTO BILL GENERATION WHEN CONFIRMED
    ====================================== */
    if (previousStatus !== 'Confirmed' && order.status === 'Confirmed') {
      const Bill = require('../models/Bill');

      // Check if bill already exists (prevent duplicates)
      const existingBill = await Bill.findOne({ order: order._id, isActive: true });
      if (!existingBill) {
        const newBill = new Bill({
          customer: order.customer._id,
          order: order._id,
          billDate: new Date(),
          totalAmount: order.totalAmount,
          paidAmount: 0,
          balanceAmount: order.totalAmount,
          status: 'Unpaid',
          createdBy: req.user._id
        });

        await newBill.save();
      }
    }

    await order.populate('customer');
    await order.populate('items.product');
    await order.populate('items.stock');

    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/* =============================
   DELETE ORDER
   Allowed Roles: Admin ONLY
============================= */
router.delete('/:id', auth, authorize('Admin'), async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { isActive: false, status: 'Cancelled' },
      { new: true }
    );

    if (!order)
      return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

