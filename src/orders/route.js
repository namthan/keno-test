import orderController from "./orderController";

export const orderRoute = (app) => {
    app.route('/orders')
        .post(orderController.create);
    app.route('/orders/:id')
        .get(orderController.getById);
    app.route('/orders/:id')
        .delete(orderController.deleteById);
    app.route('/orders/:id')
        .put(orderController.updateById);
}

export default orderRoute;