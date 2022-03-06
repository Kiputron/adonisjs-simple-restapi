"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Hotel = use("App/Models/Hotel");
const { validate } = use("Validator");

/**
 * Resourceful controller for interacting with hotels
 */
class HotelController {
  /**
   * Show a list of all hotels.
   * GET hotels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    const result = await Hotel.all();
    const restData = {
      message: "Hotel has been listed successfully",
      data: result,
    };

    return response.status(200).json(restData);
  }

  /**
   * Create/save a new hotel.
   * POST hotels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const req = request.all();

    // rule validator
    const rules = {
      name: "required",
      address: "required",
    };

    const validation = await validate(req, rules);

    // check if request body validation
    if (validation.fails())
      return response
        .status(400)
        .json({ message: validation.messages()[0].message });

    const result = await Hotel.create({
      ...req,
    });

    const restData = {
      message: "Hotel has been created successfully",
      data: result,
    };
    return response.status(201).json(restData);
  }

  /**
   * Display a single hotel.
   * GET hotels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const hotel = await Hotel.find(params.id);

    // Check if hotel with params.id not found
    if (!hotel)
      return response
        .status(200)
        .json({ message: `Hotel with id ${params.id} is not found`, data: {} });

    const resData = {
      message: "Hotel been fetched successfully.",
      data: hotel,
    };
    return response.status(200).json(resData);
  }

  /**
   * Update hotel details.
   * PUT or PATCH hotels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const req = request.all();
    const hotel = await Hotel.find(params.id);

    // rules validator
    const rules = {
      name: "required",
      address: "required",
    };
    const validation = await validate(req, rules);

    // Check if request body validation
    if (validation.fails())
      return response
        .status(400)
        .json({ message: validation.messages()[0].message });

    // Check if hotel with params.id not found
    if (!hotel)
      return response.status(200).json({
        message: `Hotel with id ${params.id} is not found or has not been created`,
        data: {},
      });

    // update
    hotel.name = req.name;
    hotel.address = req.address;
    await hotel.save();

    const resData = {
      message: "Hotel has been fetched successfully.",
      data: hotel,
    };
    return response.status(200).json(resData);
  }

  /**
   * Delete a hotel with id.
   * DELETE hotels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const hotel = await Hotel.find(params.id);

    // Check if hotel with params.id not found
    if (!hotel)
      return response.status(200).json({
        message: `Hotel with id ${params.id} is not found`,
        data: {},
      });

    await hotel.delete();
    const resData = {
      message: `Hotel with id ${params.id} has been deleted successfully.`,
      data: hotel,
    };
    return response.status(200).json(resData);
  }
}

module.exports = HotelController;
