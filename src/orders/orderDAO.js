import { CustomerModel } from "./customerModel";
import { OrderModel } from "./orderModel";
import { ProductModel } from "./productModel";

class OrderDAO {
  save = (json) => {
    return new Promise(async function (resolve, reject) {
      const productInfo = await ProductModel.find({ _id: { $in: json.productIds } })
      json.cost = 0
      json.products.forEach(product => {
        let productItem = productInfo.find(e => e._id.toString() === product.id);
        if (productItem) json.cost += productItem.cost * parseInt(product.quantity);
      });
      json.customer = json.customerId
      const data = new OrderModel(json);

      data.save(function (err, result) {
        if (err) {
          console.log(err)
          reject(err);
        }
        else {
          resolve(result);
        }
      })
    })
  }

  // Check if a productId is valid
  checkIfProductIdIsValid = (productId) => {
    return new Promise(function (resolve, reject) {
      ProductModel.findById(productId, (err, data) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    })
  }

  // Check if a customerId is valid
  checkIfCustomerIdIsValid = (customerId) => {
    return new Promise(function (resolve, reject) {
      CustomerModel.findById(customerId, (err, data) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    })
  }

  // get order by id
  getById = (id) => {
    return new Promise(function (resolve, reject) {
      // Do async job
      OrderModel.findById(id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
  }

  // update order by id
  updateById = (id, json) => {
    return new Promise(async function (resolve, reject) {
      const productInfo = await ProductModel.find({ _id: { $in: json.productIds } })
      json.cost = 0
      json.products.forEach(product => {
        let productItem = productInfo.find(e => e._id.toString() === product.id);
        if (productItem) json.cost += productItem.cost * parseInt(product.quantity);
      });
      json.customer = json.customerId
      delete json.customerId
      delete json.productIds
      const order = await OrderModel.findById(id);
      // Do async job
      OrderModel.findByIdAndUpdate(id, { $set: json }, { useFindAndModify: false }, (err, data) => {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
  }

  // delete order by id
  deleteById = (id) => {
    return new Promise(function (resolve, reject) {
      // Do async job
      OrderModel.deleteById(id, (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    })
  }
}
const orderDAO = new OrderDAO();
export default orderDAO