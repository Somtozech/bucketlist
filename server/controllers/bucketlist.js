const bucketListModel = require('../models/bucketList');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

class BucketList {
  async createBucketList(req, res, next) {
    try {
      const userId = req.user.id;
      const { name } = req.body;
      const validBucketList = {};
      if (name) validBucketList.name = name;
      validBucketList.created_by = userId;

      const newBucketList = new bucketListModel(validBucketList);
      await newBucketList.save();
      res.status(200).json({
        name: newBucketList.name,
        _id: newBucketList.id,
        items: newBucketList.items,
        date_created: newBucketList.date_created,
        date_modified: newBucketList.date_modified,
        created_by: newBucketList.created_by
      });
    } catch (error) {
      next(error);
    }
  }

  async getBucketLists(req, res, next) {
    try {
      const query = req.query;

      let limit = parseInt(query.limit) || 20;
      limit = limit > 100 ? 100 : limit;
      let page = parseInt(query.page) || 1;
      const filter = {};
      if (query.q) {
        filter.name = {
          $regex: query.q,
          $options: 'i'
        };
      }

      filter.created_by = req.user.id;

      const bucketLists = await bucketListModel
        .find(filter)
        .select('name items date_created date_modified created_by')
        .skip(page * limit - limit)
        .limit(limit)
        .sort('-date_created');

      res.status(200).send(bucketLists);
    } catch (error) {
      next(error);
    }
  }

  async getBucketList(req, res, next) {
    try {
      const { id } = req.params;
      const bucketList = await bucketListModel
        .findOne({ _id: id, created_by: req.user.id })
        .select('name items date_created date_modified created_by');
      if (!bucketList) {
        return res.status(404).send({
          status: 'Not Found',
          message: ` Bucket list with ${id} not found`
        });
      }
      res.status(200).send(bucketList);
    } catch (error) {
      next(error);
    }
  }

  async updateBucketList(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const filter = {};
      if (typeof id === 'undefined' || !id) {
        return res.status(400).send({
          message: 'Id is required in the params to update bucket list'
        });
      }
      if (name) {
        filter.name = name;
        filter.date_modified = new Date();
      }

      const bucketList = await bucketListModel
        .findOneAndUpdate({ _id: id }, { $set: filter }, { new: true })
        .select('name items date_created date_modified created_by');

      if (!bucketList) {
        return res.status(404).send({
          status: 'Not Found',
          message: ` Bucket list with ${id} not found`
        });
      }
      res.status(200).send(bucketList);
    } catch (error) {
      next(error);
    }
  }

  async removeBucketList(req, res, next) {
    try {
      await bucketListModel.remove({ _id: req.params.id });
      res.status(200).send({
        message: 'Bucket List was deleted'
      });
    } catch (error) {
      next(error);
    }
  }

  async createItemInBucketList(req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.params;

      const bucketList = await bucketListModel.findOneAndUpdate(
        { _id: id },
        { $push: { items: { name } } },
        { new: true }
      );

      if (!bucketList) {
        return res.status(404).send({
          status: 'Not Found',
          message: ` Bucket list with ${id} not found`
        });
      }

      res.status(200).send(bucketList);
    } catch (error) {
      next(error);
    }
  }

  async getItemsInBucketList(req, res, next) {
    try {
      const { id } = req.params;
      const bucketList = await bucketListModel
        .findOne({ _id: id, created_by: req.user.id })
        .select('items');
      if (!bucketList) {
        return res.status(404).send({
          status: 'Not Found',
          message: ` Bucket list with ${id} not found`
        });
      }
      res.status(200).send(bucketList.items);
    } catch (error) {
      next(error);
    }
  }

  async getItemInBucketList(req, res, next) {
    try {
      let { item_id } = req.params;
      item_id =
        item_id.length < 24 || item_id.length > 24
          ? item_id
          : ObjectId(item_id);

      const bucketListItem = await bucketListModel.aggregate([
        { $match: { 'items._id': item_id } },
        {
          $project: {
            items: {
              $filter: {
                input: '$items',
                as: 'item',
                cond: { $eq: ['$$item._id', item_id] }
              }
            }
          }
        }
      ]);

      if (!bucketListItem.length) {
        return res.status(404).send({
          message: 'Item not found in bucket list'
        });
      }

      const items = bucketListItem[0].items ? bucketListItem[0].items : [];
      res.status(200).send(items);
    } catch (error) {
      next(error);
    }
  }

  async updateItemInBucketList(req, res, next) {
    const { item_id, id } = req.params;
    const { name, done } = req.body;
    const filter = {};
    if (name) filter['items.$.name'] = name;
    if (done) filter['items.$.done'] = done;
    if (name || done) {
      filter['items.$.date_modified'] = new Date();
    }
    const bucketList = await bucketListModel.findOneAndUpdate(
      { _id: id, 'items._id': item_id },
      { $set: filter },
      { new: true }
    );

    if (!bucketList) {
      return res.status(404).send({
        message: 'Bucket List with item not found'
      });
    }

    return res.status(200).send(bucketList);
  }

  async removeItemFromBucketList(req, res, next) {
    try {
      const { item_id, id } = req.params;
      const bucketList = await bucketListModel.findOneAndUpdate(
        { _id: id },
        { $pull: { items: { _id: item_id } } },
        { new: true }
      );

      res.status(200).json(bucketList.items);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BucketList();
