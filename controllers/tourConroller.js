const Tour = require('../models/tourModels');

console.log(Tour);

exports.getAllTours = async (req, res) => {
  //--------------Reading the document------------//
  try {
    // -----------*****************BUILD QUERY*************-----------------//
    //(1) Filtering
    console.log(req.query);
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //(2) ADVANCED FILTERING

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|)\b/g,
      (match) => `$${match}`,
    );

    console.log(JSON.parse(queryStr));

    // {difficulty: 'easy', duration: {$gte:5}}
    // {difficulty: 'easy', duration: {gte:5}}
    // gte, gt, lte,lt

    const query = Tour.find(queryObj);
    //----------------------------------  Execute Query-----
    const tours = await query;
    //filtering data by duration and difficulty
    /* 
    const tours = await Tour.find()
    .where('duration')
    .equals(5)
    .where('difficulty')
    equals('easy')
    {
      duration:5,

    })
  */

    //----------------------------------Send Response-----------------------------//
    res.status(200).json({
      status: 'success',

      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id: req.params.id})

    res.status(200).json({
      status: 'success',

      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }

  //  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);
};

exports.createTour = async (req, res) => {
  //console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;
  //const newTour = Object.assign({ id: newId }, req.body);

  // tours.push(newTour);

  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      Message: err,
    });
  }

  //   },
  // );
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      Message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      Message: err,
    });
  }
};
