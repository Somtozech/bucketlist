const router = require('express').Router();
const bucketListController = require('../controllers/bucketlist');
const validation = require('../middleware/validate');
const checkAuthorization = require('../middleware/check-auth');

// list all of the bucket list
router.get('/', checkAuthorization, bucketListController.getBucketLists);

//get a single bucket list
router.get('/:id', checkAuthorization, bucketListController.getBucketList);

//get all items in a bucket list
router.get(
  '/:id/items',
  checkAuthorization,
  bucketListController.getItemsInBucketList
);

// get a single item in a bucket list
router.get(
  '/:id/items/:item_id',
  checkAuthorization,
  bucketListController.getItemInBucketList
);

//create a new bucket list
router.post(
  '/',
  checkAuthorization,
  validation.checkBucketListIsValid,
  bucketListController.createBucketList
);

//add item to a bucket list
router.post(
  '/:id/items',
  checkAuthorization,
  validation.checkBucketListIsValid,
  bucketListController.createItemInBucketList
);

//update bucket list
router.put('/:id', checkAuthorization, bucketListController.updateBucketList);

//update item in bucket list
router.put(
  '/:id/items/:item_id',
  checkAuthorization,
  bucketListController.updateItemInBucketList
);

//delete bucket list
router.delete(
  '/:id',
  checkAuthorization,
  bucketListController.removeBucketList
);

//delete item in bucket list
router.delete(
  '/:id/items/:item_id',
  checkAuthorization,
  bucketListController.removeItemFromBucketList
);

module.exports = router;
