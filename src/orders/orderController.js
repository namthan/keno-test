import _ from 'lodash';
import orderDAO from './orderDAO';

class OrderController {
  create = async (req, res) => {
    // validation
    if (!_.isArray(req.body.products)) {
      return res.status(422).send({
        message: 'products must be an array'
      })
    }

    if (!await orderDAO.checkIfCustomerIdIsValid(req.body.customerId)) {
      return res.status(422).send({
        message: 'customerId invalid'
      })
    }
    let productIds = []
    req.body.products.forEach(async(product) => {
      productIds.push(product.id)
      if (!product || !product.id) {
        return res.status(422).send({
          message: 'productId invalid'
        })
      }
      let isValidProduct = await orderDAO.checkIfProductIdIsValid(product.id)
      if (!isValidProduct) {
        return res.status(422).send({
          message: 'productId invalid'
        })
      }
      if (!product.quantity || !_.isInteger(product.quantity) || !parseInt(product.quantity) > 0) {
        return res.status(422).send({
          message: 'quantity invalid'
        })
      }
    });
    req.body.productIds = productIds;

    // create order
    orderDAO.save(req.body).then(function (result) {
      return res.status(200).json({ data: result });
    }).catch(function (err) {
      return res.status(400).send({
        message: 'Order created failed'
      });
    });
  }
  
  getById = (req, res) => {
    // validation
    if (!req.params.id) {
      return res.status(422).send({
        message: 'id is required'
      })
    }

    // get order 
    const data = orderDAO.getById(req.params.id);

    data.then(function (result) {
      if (result === null) {
        res.status(404).json({
          message: 'Order not found'
        });
      } else {
        return res.json({ data: result });
      }
    }).catch(function (err) {
      return res.status(500).send({
        message: 'Internal Server Error'
      });
    });
  }

  deleteById = async (req, res) => {
    // validation
    if (!req.params.id) {
      return res.status(422).send({
        message: 'id is required'
      })
    }

    // delete order
    const result = orderDAO.deleteById(req.params.id);
    result.then(_ => {
      return res.status(200).send({
        message: 'Deleted order successfully'
      })
    }).catch(function (err) {
      return res.status(400).send({
        message: 'Deleted order failed'
      });
    });
  }

  updateById = async (req, res) => {
    // validation
    if (!req.params.id) {
      return res.status(422).send({
        message: 'id is required'
      })
    }

    if (!_.isArray(req.body.products)) {
      return res.status(422).send({
        message: 'products must be an array'
      })
    }

    if (!await orderDAO.checkIfCustomerIdIsValid(req.body.customerId)) {
      return res.status(422).send({
        message: 'customerId invalid'
      })
    }
    let productIds = []
    req.body.products.forEach(async(product) => {
      productIds.push(product.id)
      if (!product || !product.id) {
        return res.status(422).send({
          message: 'productId invalid'
        })
      }
      let isValidProduct = await orderDAO.checkIfProductIdIsValid(product.id)
      if (!isValidProduct) {
        return res.status(422).send({
          message: 'productId invalid'
        })
      }
      if (!product.quantity || !_.isInteger(product.quantity) || !parseInt(product.quantity) > 0) {
        return res.status(422).send({
          message: 'quantity invalid'
        })
      }
    });
    req.body.productIds = productIds;

    // update order
    const data = orderDAO.updateById(req.params.id, req.body);
    data.then(function (result) {
      if (result === null) {
        res.status(404).json({
          message: 'Order not found'
        });
      } else {
        return res.status(200).json({ data: result });
      }
    }).catch(function (err) {
      return res.status(500).send({
        message: 'Internal Server Error'
      });
    });
  }
}
const orderController = new OrderController()
export default orderController;