import { db } from "../../database/db";
import type { TSERVICE, TSERVICECATEGORY } from "../../types";
import { asyncHandler } from "../../utils/asyncHandlerUtils";
import { httpResponse } from "../../utils/apiResponseUtils";
import { BADREQUESTCODE, BADREQUESTMSG, SUCCESSCODE, SUCCESSMSG } from "../../constants";
import type { _Request } from "../../middlewares/authMiddleware";
import { generateSlug } from "../../services/slugStringGeneratorService";
// import logger from "../../utils/loggerUtils";

export default {
  // ** Create navigation page controller
  createCategory: asyncHandler(async (req: _Request, res) => {
    const { name } = req.body as TSERVICECATEGORY;
    if (!name) {
      throw {
        status: BADREQUESTCODE,
        message: BADREQUESTMSG
      };
    }
    await db.serviceCategory.create({ data: { name: name } });
    httpResponse(req, res, SUCCESSCODE, SUCCESSMSG, { name });
  }),
  fetchAllCategory: asyncHandler(async (req: _Request, res) => {
    const allCategory = await db.serviceCategory.findMany({
      select: {
        id: true,
        name: true,
        subcategories: {
          select: { slug: true, name: true }
        }
      }
    });
    httpResponse(req, res, SUCCESSCODE, SUCCESSMSG, { allCategory });
  }),
  createService: asyncHandler(async (req: _Request, res) => {
    const { name, categoryId, detailPage, description } = req.body as TSERVICE;
    //TODO: HANDLE VALIDATION IN MIDDLEWARE
    await db.service.create({
      data: {
        name,
        categoryId,
        detailPage,
        description,
        slug: generateSlug(name)
      }
    });
    httpResponse(req, res, SUCCESSCODE, SUCCESSMSG, { name });
  }),
  fetchAllServices: asyncHandler(async (req: _Request, res) => {
    const allServices = await db.service.findMany({
      select: { name: true, slug: true, description: true }
    });
    httpResponse(req, res, SUCCESSCODE, SUCCESSMSG, { allServices });
  }),
  fetchSingleServiceDetail: asyncHandler(async (req: _Request, res) => {
    const { slug } = req.params;
    if (!slug) {
      throw {
        status: BADREQUESTCODE,
        message: BADREQUESTMSG
      };
    }
    const singleService = await db.service.findUnique({ where: { slug: slug } });
    httpResponse(req, res, SUCCESSCODE, SUCCESSMSG, { singleService });
  }),
  deleteCategory: asyncHandler(async (req: _Request, res) => {
    const { id } = req.body as TSERVICECATEGORY;
    if (!id) {
      throw {
        status: BADREQUESTCODE,
        message: BADREQUESTMSG
      };
    }
    await db.serviceCategory.delete({ where: { id: id } });
    httpResponse(req, res, SUCCESSCODE, SUCCESSMSG, { message: `category deleted successfully!` });
  }),
  updateService: asyncHandler(async (req: _Request, res) => {
    const { detailPage, id } = req.body as TSERVICE;

    if (!detailPage) {
      throw {
        status: BADREQUESTCODE,
        message: BADREQUESTMSG
      };
    }
    if (!id) {
      throw {
        status: BADREQUESTCODE,
        message: BADREQUESTMSG
      };
    }
    await db.service.update({
      where: { id: id },
      data: { detailPage: detailPage }
    });
    httpResponse(req, res, SUCCESSCODE, SUCCESSMSG, { message: `services detail updated successfully!` });
  })
};
