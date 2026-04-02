const { Router } = require('express');
const authRouter = require('./auth');
const roleRouter = require('./roleRoutes');
const userRouter = require('./userRoutes');
const guestCartRouter = require('./guestCartRoutes');
const productRouter = require('./productRoutes');
const productVariantRouter = require('./productVariantRoutes');
const productMediaRouter = require('./productMediaRoutes');
const categoryRouter = require('./categoryRoutes');
const inventoryRouter = require('./inventoryRoutes');
const locationRouter = require('./locationRoutes');
const stockReservationRouter = require('./stockReservationRoutes');
const stockMovementRouter = require('./stockMovementRoutes');
const priceRouter = require('./priceRoutes');
const priceHistoryRouter = require('./priceHistoryRoutes');
const cartRouter = require('./cartRoutes');




const router = Router();

router.use('/auth',authRouter);
router.use('/role', roleRouter);
router.use('/users', userRouter);
router.use('/cart', guestCartRouter);
router.use('/products', productRouter); 
router.use('/productVariants', productVariantRouter);
router.use('/productMedia', productMediaRouter);
router.use('/category', categoryRouter);
router.use('/inventoryItems', inventoryRouter);
router.use('/location', locationRouter);
router.use('/stockReservation', stockReservationRouter);
router.use('/stockMovement', stockMovementRouter);
router.use('/price', priceRouter);
router.use('/priceHistory', priceHistoryRouter);
router.use('/cart', cartRouter);

module.exports = router;